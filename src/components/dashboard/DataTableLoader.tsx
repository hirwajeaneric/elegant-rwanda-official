"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableLoaderProps {
  /** Number of table columns (default: 6) */
  columnCount?: number;
  /** Number of skeleton rows (default: 8) */
  rowCount?: number;
}

/**
 * Reusable loading skeleton for admin list pages that use DataTable.
 * Matches the layout: breadcrumbs, header (title + button), card with search/filters and table.
 */
export function DataTableLoader({
  columnCount = 6,
  rowCount = 8,
}: DataTableLoaderProps) {
  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-full sm:max-w-sm" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: rowCount }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: columnCount }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton
                          className={
                            j === 1 || j === 2
                              ? "h-6 w-16 rounded-full"
                              : "h-4 w-full max-w-[200px]"
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
