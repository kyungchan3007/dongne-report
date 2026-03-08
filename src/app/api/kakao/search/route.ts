import { NextRequest, NextResponse } from "next/server";

import { getKakaoKeywordSearchCached } from "@/shared/lib/kakao";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query")?.trim();
    const x = request.nextUrl.searchParams.get("x") ?? undefined;
    const y = request.nextUrl.searchParams.get("y") ?? undefined;
    const radiusRaw = request.nextUrl.searchParams.get("radius");

    if (!query) {
      return NextResponse.json({ message: "query is required" }, { status: 400 });
    }

    const data = await getKakaoKeywordSearchCached({
      query,
      x,
      y,
      radius: radiusRaw ? Number(radiusRaw) : undefined,
      page: 1,
      size: 15,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
