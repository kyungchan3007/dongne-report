"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import type { NeighborhoodReport } from "@/entities/report/model/types";

type Params = {
  placeId: string;
  x?: string;
  y?: string;
  name?: string;
  address?: string;
};

function buildQueryString(params: Omit<Params, "placeId">) {
  const queryParams = new URLSearchParams();
  if (params.x) queryParams.set("x", params.x);
  if (params.y) queryParams.set("y", params.y);
  if (params.name) queryParams.set("name", params.name);
  if (params.address) queryParams.set("address", params.address);
  return queryParams.toString();
}

export function useNeighborhoodReport({ placeId, x, y, name, address }: Params) {
  const queryString = useMemo(() => buildQueryString({ x, y, name, address }), [x, y, name, address]);

  return useQuery({
    queryKey: ["report", placeId, x, y, name, address],
    queryFn: async () => {
      const response = await fetch(`/api/report/${placeId}?${queryString}`);
      if (!response.ok) {
        const body = (await response.json()) as { message?: string };
        throw new Error(body.message ?? "Failed to load report");
      }
      return (await response.json()) as NeighborhoodReport;
    },
  });
}
