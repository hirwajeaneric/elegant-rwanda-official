"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequestDisplayConfig, getRequestDisplayRows, getKnownKeys } from "@/lib/request-display";

interface RequestDetailsDisplayProps {
  type: string;
  data: Record<string, unknown>;
}

export function RequestDetailsDisplay({ type, data }: RequestDetailsDisplayProps) {
  const config = getRequestDisplayConfig(type);
  const displayRows = config ? getRequestDisplayRows(type, data) : [];
  const knownKeys = getKnownKeys(type);
  const otherKeys = Object.keys(data).filter((k) => !knownKeys.has(k));
  const hasOther = otherKeys.length > 0;

  if (!config && otherKeys.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Request details</CardTitle>
          <CardDescription>No structured data for this request type</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-sm bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    );
  }

  if (!config) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Request details</CardTitle>
          <CardDescription>Raw submitted data</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-sm bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>Submitted form data, laid out by section</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {displayRows.map((section) => (
          <div key={section.section}>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              {section.section}
            </h4>
            <dl className="space-y-2">
              {section.rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <dt className="text-muted-foreground text-xs font-medium">{row.label}</dt>
                  <dd className="text-sm font-medium whitespace-pre-wrap">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        {hasOther && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Other fields
            </h4>
            <dl className="space-y-2">
              {otherKeys.map((key) => (
                <div key={key} className="flex flex-col gap-1">
                  <dt className="text-muted-foreground text-xs font-medium">{key}</dt>
                  <dd className="text-sm font-medium">
                    {typeof data[key] === "object"
                      ? JSON.stringify(data[key])
                      : String(data[key] ?? "—")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
