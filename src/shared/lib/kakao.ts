import "server-only";

import { env } from "@/shared/config/env";
import type { KakaoCoord2RegionResponse, KakaoSearchResponse } from "@/entities/kakao/model/types";
import { withSixHourCache } from "@/shared/lib/cache";

const BASE_URL = "https://dapi.kakao.com";

type KeywordSearchParams = {
  query: string;
  page?: number;
  size?: number;
  x?: string;
  y?: string;
  radius?: number;
};

type CategorySearchParams = {
  category_group_code: string;
  x: string;
  y: string;
  radius: number;
  page?: number;
  size?: number;
};

async function kakaoFetch<T>(path: string, params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    searchParams.set(key, String(value));
  });

  const response = await fetch(`${BASE_URL}${path}?${searchParams.toString()}`, {
    headers: {
      Authorization: `KakaoAK ${env.KAKAO_REST_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 6,
    },
  });

  if (!response.ok) {
    throw new Error(`Kakao API failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getKakaoKeywordSearchCached(params: KeywordSearchParams) {
  return withSixHourCache(
    [
      "kakao-keyword",
      params.query,
      params.x ?? "",
      params.y ?? "",
      params.radius ?? "",
      params.page ?? 1,
      params.size ?? 15,
    ],
    () =>
      kakaoFetch<KakaoSearchResponse>("/v2/local/search/keyword.json", {
        query: params.query,
        page: params.page ?? 1,
        size: params.size ?? 15,
        x: params.x,
        y: params.y,
        radius: params.radius,
      }),
  );
}

export function getKakaoCategorySearchCached(params: CategorySearchParams) {
  return withSixHourCache(
    [
      "kakao-category",
      params.category_group_code,
      params.x,
      params.y,
      params.radius,
      params.page ?? 1,
      params.size ?? 15,
    ],
    () =>
      kakaoFetch<KakaoSearchResponse>("/v2/local/search/category.json", {
        category_group_code: params.category_group_code,
        x: params.x,
        y: params.y,
        radius: params.radius,
        page: params.page ?? 1,
        size: params.size ?? 15,
      }),
  );
}

export function getKakaoCoord2RegionCached(x: string, y: string) {
  return withSixHourCache(["kakao-coord2region", x, y], () =>
    kakaoFetch<KakaoCoord2RegionResponse>("/v2/local/geo/coord2regioncode.json", {
      x,
      y,
    }),
  );
}
