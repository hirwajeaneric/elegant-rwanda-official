import { getWebsiteSettings } from "@/lib/settings";
import { WebsiteSettingsProvider } from "@/contexts/WebsiteSettingsContext";

export default async function PublicPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getWebsiteSettings();
  return (
    <WebsiteSettingsProvider initial={settings}>
      {children}
    </WebsiteSettingsProvider>
  );
}
