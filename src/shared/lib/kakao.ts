import "server-only";

import type {
  KakaoCoord2RegionResponse,
  KakaoDirectionsResponse,
  KakaoSearchResponse,
} from "@/entities/kakao/model/types";
import { env } from "@/shared/config/env";
import { withSixHourCache } from "@/shared/lib/cache";

const KAKAO_BASE_URL = "https://dapi.kakao.com";
const KAKAO_MOBILITY_BASE_URL = "https://apis-navi.kakaomobility.com";

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

type DistanceParams = {
  x: string;
  y: string;
  name: string;
};

type DistanceTimeSlot = {
  key: "morning8" | "noon12" | "evening19";
  label: string;
  hour: number;
  minute: number;
};

export type DistanceTimeSlotKey = DistanceTimeSlot["key"];

export type FutureDistanceSummary = {
  label: string;
  departureTime: string;
  durationSec: number | null;
  distanceM: number | null;
};

export type KakaoDistanceResult = {
  current: KakaoDirectionsResponse;
  byDeparture: Record<DistanceTimeSlotKey, FutureDistanceSummary>;
};

const DISTANCE_TIME_SLOTS: readonly DistanceTimeSlot[] = [
  { key: "morning8", label: "08:00", hour: 8, minute: 0 },
  { key: "noon12", label: "12:00", hour: 12, minute: 0 },
  { key: "evening19", label: "19:00", hour: 19, minute: 0 },
] as const;

const GANGNAM_STATION = {
  name: "강남역",
  x: "127.027621",
  y: "37.497942",
} as const;

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

async function kakaoFetch<T>(
  baseUrl: string,
  path: string,
  params: Record<string, string | number | undefined>
): Promise<T> {
  const url = new URL(`${baseUrl}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString(), {
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

function twoDigit(value: number): string {
  return String(value).padStart(2, "0");
}

function formatKstCompact(shiftedKstMs: number): string {
  const d = new Date(shiftedKstMs);
  return (
    `${d.getUTCFullYear()}` +
    `${twoDigit(d.getUTCMonth() + 1)}` +
    `${twoDigit(d.getUTCDate())}` +
    `${twoDigit(d.getUTCHours())}` +
    `${twoDigit(d.getUTCMinutes())}`
  );
}

function getNextKstDepartureTime(hour: number, minute: number): string {
  const nowKstShifted = Date.now() + KST_OFFSET_MS;
  const nowKst = new Date(nowKstShifted);
  let targetKstShifted = Date.UTC(
    nowKst.getUTCFullYear(),
    nowKst.getUTCMonth(),
    nowKst.getUTCDate(),
    hour,
    minute,
    0,
    0
  );

  if (targetKstShifted <= nowKstShifted) {
    targetKstShifted += DAY_MS;
  }

  return formatKstCompact(targetKstShifted);
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
      kakaoFetch<KakaoSearchResponse>(KAKAO_BASE_URL, "/v2/local/search/keyword.json", {
        query: params.query,
        page: params.page ?? 1,
        size: params.size ?? 15,
        x: params.x,
        y: params.y,
        radius: params.radius,
      })
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
      kakaoFetch<KakaoSearchResponse>(KAKAO_BASE_URL, "/v2/local/search/category.json", {
        category_group_code: params.category_group_code,
        x: params.x,
        y: params.y,
        radius: params.radius,
        page: params.page ?? 1,
        size: params.size ?? 15,
      })
  );
}

export function getKakaoCoord2RegionCached(x: string, y: string) {
  return withSixHourCache(["kakao-coord2region", x, y], () =>
    kakaoFetch<KakaoCoord2RegionResponse>(KAKAO_BASE_URL, "/v2/local/geo/coord2regioncode.json", {
      x,
      y,
    })
  );
}

export function getKakaoDistance(params: DistanceParams) {
  const departures = DISTANCE_TIME_SLOTS.map((slot) => ({
    ...slot,
    departureTime: getNextKstDepartureTime(slot.hour, slot.minute),
  }));

  return withSixHourCache(
    [
      "kakao-navidirections",
      params.x,
      params.y,
      ...departures.map((item) => `${item.key}:${item.departureTime}`),
    ],
    async (): Promise<KakaoDistanceResult> => {
      const [current, ...futureItems] = await Promise.all([
        kakaoFetch<KakaoDirectionsResponse>(KAKAO_MOBILITY_BASE_URL, "/v1/directions", {
          origin: `${params.x},${params.y},name=${params.name}`,
          destination: `${GANGNAM_STATION.x},${GANGNAM_STATION.y},name=${GANGNAM_STATION.name}`,
          priority: "RECOMMEND",
          summary: "false",
          road_details: "true",
        }),
        ...departures.map(async (departure) => {
          try {
            const response = await kakaoFetch<KakaoDirectionsResponse>(
              KAKAO_MOBILITY_BASE_URL,
              "/v1/future/directions",
              {
                origin: `${params.x},${params.y},name=${params.name}`,
                destination: `${GANGNAM_STATION.x},${GANGNAM_STATION.y},name=${GANGNAM_STATION.name}`,
                priority: "RECOMMEND",
                summary: "true",
                departure_time: departure.departureTime,
              }
            );

            const summary = response.routes[0]?.summary;
            return {
              key: departure.key,
              summary: {
                label: departure.label,
                departureTime: departure.departureTime,
                durationSec: summary?.duration ?? null,
                distanceM: summary?.distance ?? null,
              },
            };
          } catch {
            return {
              key: departure.key,
              summary: {
                label: departure.label,
                departureTime: departure.departureTime,
                durationSec: null,
                distanceM: null,
              },
            };
          }
        }),
      ]);

      const byDeparture = Object.fromEntries(
        futureItems.map((item) => [item.key, item.summary])
      ) as Record<DistanceTimeSlotKey, FutureDistanceSummary>;

      return {
        current,
        byDeparture,
      };
    }
  );
}
