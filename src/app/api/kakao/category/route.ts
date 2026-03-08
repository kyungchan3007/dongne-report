import { NextRequest, NextResponse } from "next/server";

import { getKakaoCategorySearchCached } from "@/shared/lib/kakao";

export async function GET(request: NextRequest) {
  try {
    const category_group_code = request.nextUrl.searchParams.get("category_group_code")?.trim();
    const x = request.nextUrl.searchParams.get("x")?.trim();
    const y = request.nextUrl.searchParams.get("y")?.trim();
    const radiusRaw = request.nextUrl.searchParams.get("radius")?.trim();

    if (!category_group_code || !x || !y || !radiusRaw) {
      return NextResponse.json(
        { message: "category_group_code, x, y, radius are required" },
        { status: 400 },
      );
    }

    const radius = Number(radiusRaw);
    if (!Number.isFinite(radius)) {
      return NextResponse.json({ message: "radius must be number" }, { status: 400 });
    }

    const data = await getKakaoCategorySearchCached({
      category_group_code,
      x,
      y,
      radius,
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
