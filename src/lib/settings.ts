/**
 * Website settings: contact info, business hours, social links.
 * Server-only; use getWebsiteSettings() in layout. Client components use context (from settings-types).
 */

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  type SocialLink,
  type WebsiteSettingsData,
  DEFAULT_WEBSITE_SETTINGS,
} from "@/lib/settings-types";

export type { SocialLink, WebsiteSettingsData } from "@/lib/settings-types";
export { DEFAULT_WEBSITE_SETTINGS } from "@/lib/settings-types";

export const WEBSITE_SETTINGS_CACHE_TAG = "website-settings";
const CACHE_REVALIDATE_SECONDS = 60;

function normalizeSocialLinks(raw: unknown): SocialLink[] {
  if (!Array.isArray(raw)) return DEFAULT_WEBSITE_SETTINGS.socialLinks;
  return raw
    .filter(
      (item): item is { platform?: string; label?: string; url?: string } =>
        item != null && typeof item === "object"
    )
    .map((item) => ({
      platform: String(item.platform ?? "").trim() || "other",
      label: String(item.label ?? "").trim() || "Link",
      url: String(item.url ?? "").trim(),
    }))
    .filter((item) => item.url.length > 0);
}

function rowToData(row: {
  siteName: string | null;
  tagline: string | null;
  address: string | null;
  phonePrimary: string | null;
  phoneSecondary: string | null;
  emailPrimary: string | null;
  emailSecondary: string | null;
  businessHours: string | null;
  emergencyPhone: string | null;
  emergencyNote: string | null;
  socialLinks: unknown;
}): WebsiteSettingsData {
  return {
    siteName: row.siteName ?? DEFAULT_WEBSITE_SETTINGS.siteName,
    tagline: row.tagline ?? DEFAULT_WEBSITE_SETTINGS.tagline,
    address: row.address ?? DEFAULT_WEBSITE_SETTINGS.address,
    phonePrimary: row.phonePrimary ?? DEFAULT_WEBSITE_SETTINGS.phonePrimary,
    phoneSecondary: row.phoneSecondary ?? DEFAULT_WEBSITE_SETTINGS.phoneSecondary,
    emailPrimary: row.emailPrimary ?? DEFAULT_WEBSITE_SETTINGS.emailPrimary,
    emailSecondary: row.emailSecondary ?? DEFAULT_WEBSITE_SETTINGS.emailSecondary,
    businessHours: row.businessHours ?? DEFAULT_WEBSITE_SETTINGS.businessHours,
    emergencyPhone: row.emergencyPhone ?? DEFAULT_WEBSITE_SETTINGS.emergencyPhone,
    emergencyNote: row.emergencyNote ?? DEFAULT_WEBSITE_SETTINGS.emergencyNote,
    socialLinks: normalizeSocialLinks(row.socialLinks),
  };
}

async function getWebsiteSettingsUncached(): Promise<WebsiteSettingsData> {
  let row = await prisma.websiteSettings.findUnique({
    where: { id: "default" },
  });
  if (!row) {
    await prisma.websiteSettings.create({
      data: {
        id: "default",
        siteName: DEFAULT_WEBSITE_SETTINGS.siteName ?? undefined,
        tagline: DEFAULT_WEBSITE_SETTINGS.tagline ?? undefined,
        address: DEFAULT_WEBSITE_SETTINGS.address ?? undefined,
        phonePrimary: DEFAULT_WEBSITE_SETTINGS.phonePrimary ?? undefined,
        emailPrimary: DEFAULT_WEBSITE_SETTINGS.emailPrimary ?? undefined,
        emailSecondary: DEFAULT_WEBSITE_SETTINGS.emailSecondary ?? undefined,
        businessHours: DEFAULT_WEBSITE_SETTINGS.businessHours ?? undefined,
        emergencyPhone: DEFAULT_WEBSITE_SETTINGS.emergencyPhone ?? undefined,
        emergencyNote: DEFAULT_WEBSITE_SETTINGS.emergencyNote ?? undefined,
        socialLinks: DEFAULT_WEBSITE_SETTINGS.socialLinks as unknown as object,
      },
    });
    row = await prisma.websiteSettings.findUnique({ where: { id: "default" } });
  }
  if (!row) return DEFAULT_WEBSITE_SETTINGS;
  return rowToData(row as Parameters<typeof rowToData>[0]);
}

/**
 * Cached server-side read. Use in layout/page/server components.
 * Revalidates every CACHE_REVALIDATE_SECONDS.
 */
export async function getWebsiteSettings(): Promise<WebsiteSettingsData> {
  return unstable_cache(
    getWebsiteSettingsUncached,
    [WEBSITE_SETTINGS_CACHE_TAG],
    { revalidate: CACHE_REVALIDATE_SECONDS, tags: [WEBSITE_SETTINGS_CACHE_TAG] }
  )();
}

/**
 * Bypass cache (e.g. after admin update). Use in API route then revalidate.
 */
export async function getWebsiteSettingsRaw(): Promise<WebsiteSettingsData> {
  return getWebsiteSettingsUncached();
}

export { revalidatePath, revalidateTag } from "next/cache";
