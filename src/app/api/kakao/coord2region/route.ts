import { NextRequest, NextResponse } from "next/server";

import { getKakaoCoord2RegionCached } from "@/shared/lib/kakao";

export async function GET(request: NextRequest) {
  try {
    const x = request.nextUrl.searchParams.get("x")?.trim();
    const y = request.nextUrl.searchParams.get("y")?.trim();

    if (!x || !y) {
      return NextResponse.json({ message: "x and y are required" }, { status: 400 });
    }

    const data = await getKakaoCoord2RegionCached(x, y);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
