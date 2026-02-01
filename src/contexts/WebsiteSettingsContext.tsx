"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { WebsiteSettingsData } from "@/lib/settings-types";
import { DEFAULT_WEBSITE_SETTINGS } from "@/lib/settings-types";

const WebsiteSettingsContext = createContext<WebsiteSettingsData>(DEFAULT_WEBSITE_SETTINGS);

export function WebsiteSettingsProvider({
  initial,
  children,
}: {
  initial: WebsiteSettingsData;
  children: ReactNode;
}) {
  const value = useMemo(() => initial, [initial]);
  return (
    <WebsiteSettingsContext.Provider value={value}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
}

export function useWebsiteSettings(): WebsiteSettingsData {
  const ctx = useContext(WebsiteSettingsContext);
  return ctx ?? DEFAULT_WEBSITE_SETTINGS;
}
