import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/config/env";
import { API_TYPES } from "@/app/api/schoolinfo/model/model";
import {
  inferSchulKndCodeFromName,
  inferSchulSidoCodeFromName,
} from "@/app/api/schoolinfo/utils/utils";
import { maybeFilterRawResponse } from "@/app/api/schoolinfo/processor/serverDataProcessor";

export async function GET(request: NextRequest) {
  const schoolCode = request.nextUrl.searchParams.get("schoolCode")?.trim();
  const schoolName = request.nextUrl.searchParams.get("schoolName")?.trim();
  const address = request.nextUrl.searchParams.get("address")?.trim();
  const apiType = request.nextUrl.searchParams.get("apiType")?.trim();
  const all = request.nextUrl.searchParams.get("all") === "1";

  if (!schoolCode) {
    return NextResponse.json({ message: "schoolCode is required" }, { status: 400 });
  }

  if (!schoolName) {
    return NextResponse.json({ message: "schoolName is required" }, { status: 400 });
  }

  const types = all ? API_TYPES : [apiType ?? "0"];

  const schulKndCode = inferSchulKndCodeFromName(schoolName);
  const { sidoCode, sggCode } = await inferSchulSidoCodeFromName(address ?? "");

  const results = await Promise.all(
    types.map(async (type) => {
      const params = new URLSearchParams({
        apiKey: env.SCHOOLINFO_API_KEY,
        apiType: type,
        pbanYr: "2025",
        schulKndCode,
        ...(sidoCode ? { sidoCode } : {}),
        ...(sggCode ? { sggCode } : {}),
      });
      const response = await fetch(`${env.SCHOOLINFO_BASE_URL}?${params.toString()}`, {
        cache: "no-store",
      });
      const raw = await response.text();

      return {
        apiType: type,
        status: response.status,
        raw: maybeFilterRawResponse(raw, schoolCode, schoolName, address ?? ""),
      };
    })
  );

  return NextResponse.json({ schoolCode, year: 2025, results });
}
