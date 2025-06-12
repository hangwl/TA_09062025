"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import React from "react";

interface SearchPaginationProps {
  totalItems: number;
  startIndex: number;
  pageSize?: number;
  queryParams: Record<string, string | undefined>;
}

export function SearchPagination({
  totalItems,
  startIndex,
  pageSize = 10,
  queryParams,
}: SearchPaginationProps) {
  const pathname = usePathname();

  const currentPage = Math.floor(startIndex / pageSize) + 1;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([k, v]) => {
      if (v !== undefined && v !== "") params.set(k, v);
    });
    params.set("startIndex", ((page - 1) * pageSize).toString());
    return `${pathname}?${params.toString()}`;
  };

  const pagesToShow = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p >= 1 && p <= totalPages
  );

  return (
    <div className="sticky bottom-0 bg-background/90 backdrop-blur p-4 border-t mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? buildHref(currentPage - 1) : undefined}
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>

          {currentPage > 2 && (
            <>
              <PaginationItem>
                <PaginationLink href={buildHref(1)}>1</PaginationLink>
              </PaginationItem>
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {pagesToShow.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink href={buildHref(p)} isActive={p === currentPage}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* the pagination button for the last page is uncommented because the total number of pages is unknown */}
          {/* {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={buildHref(totalPages)}>{
                  totalPages
                }</PaginationLink>
              </PaginationItem>
            </>
          )} */}

          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages ? buildHref(currentPage + 1) : undefined
              }
              aria-disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
