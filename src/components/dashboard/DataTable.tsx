"use client";

import { useState, useMemo } from "react";
import { useSearchParamsStore } from "@/lib/stores/search-params-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  filterOptions?: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  dateFilterKey?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKey = "search",
  searchPlaceholder = "Search...",
  pageSize = 10,
  filterOptions = [],
  dateFilterKey,
}: DataTableProps<T>) {
  const { getParam, setParam } = useSearchParamsStore();
  const [localSearch, setLocalSearch] = useState(getParam(searchKey));

  const search = getParam(searchKey);
  const page = parseInt(getParam("page") || "1");
  const sortBy = getParam("sortBy");
  const sortOrder = getParam("sortOrder") as "asc" | "desc" | "";
  const dateFrom = getParam("dateFrom");
  const dateTo = getParam("dateTo");

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (search) {
      result = result.filter((item) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.values(item as Record<string, any>).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Filter options
    filterOptions.forEach((filter) => {
      const filterValue = getParam(filter.key);
      if (filterValue && filterValue !== "all") {
        result = result.filter((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const itemValue = (item as Record<string, any>)[filter.key];
          return String(itemValue) === filterValue;
        });
      }
    });

    // Date filter
    if (dateFilterKey && (dateFrom || dateTo)) {
      result = result.filter((item) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const itemDate = new Date((item as Record<string, any>)[dateFilterKey] as string);
        if (dateFrom && itemDate < new Date(dateFrom)) return false;
        if (dateTo && itemDate > new Date(dateTo)) return false;
        return true;
      });
    }

    // Sort
    if (sortBy && sortOrder) {
      result.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aVal = (a as Record<string, any>)[sortBy];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bVal = (b as Record<string, any>)[sortBy];
        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, sortBy, sortOrder, dateFrom, dateTo, filterOptions, dateFilterKey, getParam]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      if (sortOrder === "asc") {
        setParam("sortOrder", "desc");
      } else if (sortOrder === "desc") {
        setParam("sortBy", "");
        setParam("sortOrder", "");
      } else {
        setParam("sortOrder", "asc");
      }
    } else {
      setParam("sortBy", key);
      setParam("sortOrder", "asc");
    }
  };

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    setParam(searchKey, value);
    setParam("page", "1");
  };

  const handlePageChange = (newPage: number) => {
    setParam("page", String(newPage));
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={localSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {filterOptions.map((filter) => (
          <Select
            key={filter.key}
            value={getParam(filter.key) || "all"}
            onValueChange={(value) => {
              if (value === "all") {
                setParam(filter.key, "");
              } else {
                setParam(filter.key, value);
              }
              setParam("page", "1");
            }}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        {dateFilterKey && (
          <div className="flex gap-2">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setParam("dateFrom", e.target.value);
                setParam("page", "1");
              }}
              placeholder="From"
              className="w-full md:w-[150px]"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setParam("dateTo", e.target.value);
                setParam("page", "1");
              }}
              placeholder="To"
              className="w-full md:w-[150px]"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:text-foreground h-auto p-0 font-medium"
                    >
                      {column.label}
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render ? column.render(item) : String(item[column.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => (
                  <div key={p} className="flex items-center gap-1">
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-2">...</span>}
                    <Button
                      variant={page === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
