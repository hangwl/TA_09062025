"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PrefetchProps {
  queryParams: Record<string, string | undefined>;
  startIndex: number;
  pageSize?: number;
}

export function PrefetchNextPage({ queryParams, startIndex, pageSize = 10 }: PrefetchProps) {
  const router = useRouter();

  useEffect(() => {
    const nextStart = startIndex + pageSize;
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([k, v]) => {
      if (v !== undefined && v !== "") params.set(k, v);
    });
    params.set("startIndex", nextStart.toString());
    router.prefetch(`/search?${params.toString()}`);
  }, [queryParams, startIndex, pageSize, router]);

  return null;
}
