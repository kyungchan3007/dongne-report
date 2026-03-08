import { NextRequest, NextResponse } from "next/server";

import type { KakaoPlace } from "@/entities/kakao/model/types";
import type { NeighborhoodReport, ReportPoi } from "@/entities/report/model/types";
import { withSixHourCache } from "@/shared/lib/cache";
import {
  getKakaoCategorySearchCached,
  getKakaoCoord2RegionCached,
  getKakaoKeywordSearchCached,
} from "@/shared/lib/kakao";
import { loadSafetyLookup, mapSchoolCode } from "@/shared/lib/report-data";

const CATEGORY = {
  SUBWAY: "SW8",
  SCHOOL: "SC4",
  CHILDCARE: "PS3",
} as const;

function toReportPoi(place: KakaoPlace, schoolCode?: string | null): ReportPoi {
  return {
    id: place.id,
    name: place.place_name,
    address: place.address_name,
    roadAddress: place.road_address_name,
    x: place.x,
    y: place.y,
    schoolCode,
  };
}

async function buildReport(params: {
  placeId: string;
  x?: string;
  y?: string;
  name?: string;
  address?: string;
}) {
  const placeId = params.placeId;

  return withSixHourCache(["report", placeId], async () => {
    let resolvedX = params.x;
    let resolvedY = params.y;
    let resolvedName = params.name ?? "";
    let resolvedAddress = params.address ?? "";

    if (!resolvedX || !resolvedY || !resolvedName || !resolvedAddress) {
      const fallbackQuery = params.name?.trim() || placeId;
      const fallback = await getKakaoKeywordSearchCached({ query: fallbackQuery, page: 1, size: 15 });
      const matched = fallback.documents.find((doc) => doc.id === placeId) ?? fallback.documents[0];
      if (matched) {
        resolvedX = resolvedX ?? matched.x;
        resolvedY = resolvedY ?? matched.y;
        resolvedName = resolvedName || matched.place_name;
        resolvedAddress = resolvedAddress || matched.road_address_name || matched.address_name;
      }
    }

    if (!resolvedX || !resolvedY) {
      throw new Error("Could not resolve place coordinates");
    }

    const region = await getKakaoCoord2RegionCached(resolvedX, resolvedY);
    const regionDoc =
      region.documents.find((doc) => doc.region_type === "H") ??
      region.documents.find((doc) => doc.region_type === "B") ??
      region.documents[0];

    const sido = regionDoc?.region_1depth_name ?? "";
    const sigungu = regionDoc?.region_2depth_name ?? "";
    const fullName = `${sido} ${sigungu}`.trim();

    const safetyLookup = await loadSafetyLookup();
    const safety = safetyLookup.get(fullName) ?? {
      fullName,
      crimePer100k: null,
      grade: "UNKNOWN",
    };

    const [subway, schools, childcare, buses] = await Promise.all([
      getKakaoCategorySearchCached({
        category_group_code: CATEGORY.SUBWAY,
        x: resolvedX,
        y: resolvedY,
        radius: 1000,
        page: 1,
        size: 15,
      }),
      getKakaoCategorySearchCached({
        category_group_code: CATEGORY.SCHOOL,
        x: resolvedX,
        y: resolvedY,
        radius: 1500,
        page: 1,
        size: 15,
      }),
      getKakaoCategorySearchCached({
        category_group_code: CATEGORY.CHILDCARE,
        x: resolvedX,
        y: resolvedY,
        radius: 1000,
        page: 1,
        size: 15,
      }),
      getKakaoKeywordSearchCached({
        query: "버스정류장",
        x: resolvedX,
        y: resolvedY,
        radius: 1000,
        page: 1,
        size: 15,
      }),
    ]);

    const schoolPois: ReportPoi[] = [];

    for (const school of schools.documents) {
      const schoolCode = await mapSchoolCode({
        schoolName: school.place_name,
        sigungu,
        kakaoRoadAddress: school.road_address_name,
      });
      schoolPois.push(toReportPoi(school, schoolCode));
    }

    const mappedCount = schoolPois.filter((s) => s.schoolCode).length;


    const report: NeighborhoodReport = {
      place: {
        placeId,
        name: resolvedName || `Place ${placeId}`,
        address: resolvedAddress,
        x: resolvedX,
        y: resolvedY,
        sido,
        sigungu,
      },
      safety: {
        fullName,
        crimePer100k: safety.crimePer100k,
        grade: safety.grade,
      },
      transport: {
        subwayTop3: subway.documents.slice(0, 3).map((item) => toReportPoi(item)),
        busCount: buses.documents.length,
        busTop5: buses.documents.slice(0, 5).map((item) => toReportPoi(item)),
      },
      childcare: {
        count: childcare.documents.length,
        top5: childcare.documents.slice(0, 5).map((item) => toReportPoi(item)),
      },
      schools: {
        count: schoolPois.length,
        top10: schoolPois.slice(0, 10),
        mappedCount,
        unmappedCount: schoolPois.length - mappedCount,
      },
    };

    return report;
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ placeId: string }> },
) {
  try {
    const { placeId } = await context.params;
    const x = request.nextUrl.searchParams.get("x") ?? undefined;
    const y = request.nextUrl.searchParams.get("y") ?? undefined;
    const name = request.nextUrl.searchParams.get("name") ?? undefined;
    const address = request.nextUrl.searchParams.get("address") ?? undefined;

    const report = await buildReport({ placeId, x, y, name, address });
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
