import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

// POST /api/vehicles - Create new vehicle
export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const body = await request.json();
    const {
      name,
      slug,
      category,
      description,
      shortDescription,
      images,
      specifications,
      available,
      pickupLocations,
      includedServices,
      additionalServices,
      requirements,
      insurance,
      make,
      model,
      year,
      plateNumber,
      dailyRate,
      status,
      location,
      mileage,
      lastService,
      nextService,
    } = body;

    if (!name || !slug || !shortDescription || !description || !make || !model || year == null || !plateNumber || dailyRate == null || !location) {
      return NextResponse.json(
        { error: "Name, slug, shortDescription, description, make, model, year, plateNumber, dailyRate, and location are required" },
        { status: 400 }
      );
    }

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { slug },
    });

    if (existingVehicle) {
      return NextResponse.json(
        { error: "Vehicle with this slug already exists" },
        { status: 409 }
      );
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        slug,
        category: category || "Economy",
        description,
        shortDescription,
        images: Array.isArray(images) ? images : [],
        specifications: specifications ?? {},
        available: available ?? true,
        pickupLocations: Array.isArray(pickupLocations) ? pickupLocations : [],
        includedServices: Array.isArray(includedServices) ? includedServices : [],
        additionalServices: Array.isArray(additionalServices) ? additionalServices : [],
        requirements: Array.isArray(requirements) ? requirements : [],
        insurance: insurance ?? { included: true, coverage: "", excess: "" },
        make,
        model,
        year: Number(year),
        plateNumber,
        dailyRate: Number(dailyRate),
        status: status || "available",
        location,
        mileage: mileage != null ? Number(mileage) : 0,
        lastService: lastService || null,
        nextService: nextService || null,
      },
    });

    return NextResponse.json({ success: true, vehicle }, { status: 201 });
  } catch (error) {
    console.error("Create vehicle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/vehicles - List vehicles (admin)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { make: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
        { plateNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.vehicle.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      vehicles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("List vehicles error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
