import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import * as XLSX from "xlsx";

interface ExcelImageRow {
  publicId: string;
  url: string;
  urlRaw: string | null;
  title: string | null;
  alt: string | null;
  description: string | null;
  category: string | null;
  folder: string | null;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number | null;
  tags: string | null; // JSON array string like "{}" or '["tag1","tag2"]'
  featured: boolean | string;
  active: boolean | string;
}

// POST /api/images/seed-excel - Seed images from Excel file
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Find ADMIN user
    const adminUser = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
        active: true,
      },
      select: {
        id: true,
      },
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: "No active ADMIN user found in the database" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validExtensions = [".xlsx", ".xls"];
    const fileName = file.name.toLowerCase();
    const isValidFile = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValidFile) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Please upload an Excel file (.xlsx or .xls)",
        },
        { status: 400 }
      );
    }

    // Read Excel file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const rows = XLSX.utils.sheet_to_json<ExcelImageRow>(worksheet);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Excel file is empty or has no data rows" },
        { status: 400 }
      );
    }

    const results = {
      total: rows.length,
      created: 0,
      skipped: 0,
      errors: [] as Array<{ row: number; error: string }>,
    };

    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2; // +2 because Excel rows start at 1 and we skip header

      try {
        // Validate required fields
        if (!row.publicId || !row.url) {
          results.skipped++;
          results.errors.push({
            row: rowNumber,
            error: "Missing required fields: publicId or url",
          });
          continue;
        }

        // Check if image already exists
        const existingImage = await prisma.image.findUnique({
          where: { publicId: row.publicId },
        });

        if (existingImage) {
          results.skipped++;
          results.errors.push({
            row: rowNumber,
            error: `Image with publicId "${row.publicId}" already exists`,
          });
          continue;
        }

        // Parse tags (handle JSON string format like "{}" or '["tag1","tag2"]')
        let tags: string[] = [];
        if (row.tags) {
          try {
            const parsedTags = JSON.parse(row.tags);
            if (Array.isArray(parsedTags)) {
              tags = parsedTags;
            } else if (
              typeof parsedTags === "object" &&
              Object.keys(parsedTags).length === 0
            ) {
              tags = [];
            }
          } catch {
            // If parsing fails, treat as empty array
            tags = [];
          }
        }

        // Parse boolean values (handle string "TRUE"/"FALSE" or boolean)
        const featured =
          typeof row.featured === "string"
            ? row.featured.toUpperCase() === "TRUE"
            : Boolean(row.featured);

        const active =
          typeof row.active === "string"
            ? row.active.toUpperCase() === "TRUE"
            : Boolean(row.active);

        // Parse numeric values
        const width = row.width ? Number(row.width) : null;
        const height = row.height ? Number(row.height) : null;
        const bytes = row.bytes ? Number(row.bytes) : null;

        // Create image record
        await prisma.image.create({
          data: {
            publicId: row.publicId,
            url: row.url,
            urlRaw: row.urlRaw || null,
            title: row.title && row.title !== "NULL" ? row.title : null,
            alt: row.alt && row.alt !== "NULL" ? row.alt : null,
            description:
              row.description && row.description !== "NULL"
                ? row.description
                : null,
            category:
              row.category && row.category !== "NULL" ? row.category : null,
            folder: row.folder && row.folder !== "NULL" ? row.folder : null,
            width: width && !isNaN(width) ? width : null,
            height: height && !isNaN(height) ? height : null,
            format: row.format && row.format !== "NULL" ? row.format : null,
            bytes: bytes && !isNaN(bytes) ? bytes : null,
            tags: tags,
            featured: featured,
            active: active,
            uploadedBy: adminUser.id,
          },
        });

        results.created++;
      } catch (error) {
        results.skipped++;
        results.errors.push({
          row: rowNumber,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Seeding completed: ${results.created} created, ${results.skipped} skipped`,
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Excel seeding error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
