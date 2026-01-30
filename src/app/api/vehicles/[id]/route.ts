import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

// GET /api/vehicles/[id] - Get vehicle by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vehicle });
  } catch (error) {
    console.error("Get vehicle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/vehicles/[id] - Update vehicle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;
    const body = await request.json();

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    if (body.slug && body.slug !== existingVehicle.slug) {
      const slugExists = await prisma.vehicle.findUnique({
        where: { slug: body.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "Vehicle with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name: body.name ?? existingVehicle.name,
        slug: body.slug ?? existingVehicle.slug,
        category: body.category ?? existingVehicle.category,
        description: body.description ?? existingVehicle.description,
        shortDescription: body.shortDescription ?? existingVehicle.shortDescription,
        images: body.images !== undefined ? body.images : existingVehicle.images,
        specifications: body.specifications !== undefined ? body.specifications : existingVehicle.specifications,
        available: body.available !== undefined ? body.available : existingVehicle.available,
        pickupLocations: body.pickupLocations !== undefined ? body.pickupLocations : existingVehicle.pickupLocations,
        includedServices: body.includedServices !== undefined ? body.includedServices : existingVehicle.includedServices,
        additionalServices: body.additionalServices !== undefined ? body.additionalServices : existingVehicle.additionalServices,
        requirements: body.requirements !== undefined ? body.requirements : existingVehicle.requirements,
        insurance: body.insurance !== undefined ? body.insurance : existingVehicle.insurance,
        make: body.make ?? existingVehicle.make,
        model: body.model ?? existingVehicle.model,
        year: body.year !== undefined ? Number(body.year) : existingVehicle.year,
        plateNumber: body.plateNumber ?? existingVehicle.plateNumber,
        dailyRate: body.dailyRate !== undefined ? Number(body.dailyRate) : existingVehicle.dailyRate,
        status: body.status ?? existingVehicle.status,
        location: body.location ?? existingVehicle.location,
        mileage: body.mileage !== undefined ? Number(body.mileage) : existingVehicle.mileage,
        lastService: body.lastService !== undefined ? body.lastService : existingVehicle.lastService,
        nextService: body.nextService !== undefined ? body.nextService : existingVehicle.nextService,
      },
    });

    return NextResponse.json({ success: true, vehicle });
  } catch (error) {
    console.error("Update vehicle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/vehicles/[id] - Delete vehicle
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("Delete vehicle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
