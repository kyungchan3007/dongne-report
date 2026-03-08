import { NextRequest, NextResponse } from "next/server";

import { env } from "@/shared/config/env";

const API_TYPES = ["0", "08", "62", "63", "09", "94", "51"] as const;

export async function GET(request: NextRequest) {
  const schoolCode = request.nextUrl.searchParams.get("schoolCode")?.trim();
  const apiType = request.nextUrl.searchParams.get("apiType")?.trim();
  const all = request.nextUrl.searchParams.get("all") === "1";

  if (!schoolCode) return NextResponse.json({ message: "schoolCode is required" }, { status: 400 });

  const types = all ? API_TYPES : [apiType ?? "0"];

  const results = await Promise.all(
      types.map(async (type) => {
        const params = new URLSearchParams({
          apiKey: env.SCHOOLINFO_API_KEY,
          apiType: type,
          pbanYy: "2025",
          schulCode: schoolCode,
        });
        const r = await fetch(`${env.SCHOOLINFO_BASE_URL}?${params.toString()}`, { cache: "no-store" });
        return { apiType: type, status: r.status, raw: await r.text() };
      }),
  );

  return NextResponse.json({ schoolCode, year: 2025, results });
}