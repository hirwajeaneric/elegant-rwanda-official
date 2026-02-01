import { NextRequest, NextResponse } from "next/server";
import { getWebsiteSettings, getWebsiteSettingsRaw, revalidateTag, WEBSITE_SETTINGS_CACHE_TAG } from "@/lib/settings";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import type { WebsiteSettingsData, SocialLink } from "@/lib/settings-types";

/**
 * Public API: returns website settings (contact, hours, social links).
 * Cached via getWebsiteSettings(); revalidates every 60s.
 */
export async function GET() {
  try {
    const settings = await getWebsiteSettings();
    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Admin only: update website settings.
 */
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const body = (await request.json()) as Partial<WebsiteSettingsData>;
    const socialLinks = Array.isArray(body.socialLinks)
      ? (body.socialLinks as SocialLink[])
      : undefined;

    const data: Parameters<typeof prisma.websiteSettings.upsert>[0]["create"] &
      Parameters<typeof prisma.websiteSettings.upsert>[0]["update"] = {
      siteName: body.siteName ?? undefined,
      tagline: body.tagline ?? undefined,
      address: body.address ?? undefined,
      phonePrimary: body.phonePrimary ?? undefined,
      phoneSecondary: body.phoneSecondary ?? undefined,
      emailPrimary: body.emailPrimary ?? undefined,
      emailSecondary: body.emailSecondary ?? undefined,
      businessHours: body.businessHours ?? undefined,
      emergencyPhone: body.emergencyPhone ?? undefined,
      emergencyNote: body.emergencyNote ?? undefined,
      ...(socialLinks !== undefined && { socialLinks: socialLinks as unknown as object }),
    };

    await prisma.websiteSettings.upsert({
      where: { id: "default" },
      create: { id: "default", ...data },
      update: data,
    });

    revalidateTag(WEBSITE_SETTINGS_CACHE_TAG, "max");

    const settings = await getWebsiteSettingsRaw();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
