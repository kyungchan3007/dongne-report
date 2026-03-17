import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/config/env";
import path from "node:path";
import {readFile} from "node:fs/promises";

const API_TYPES = ["0", "08", "62", "63", "09", "94", "51"] as const;

const SIDO_ALIASES: Record<string, string> = {
    서울: "서울특별시",
    부산: "부산광역시",
    대구: "대구광역시",
    인천: "인천광역시",
    광주: "광주광역시",
    대전: "대전광역시",
    울산: "울산광역시",
    세종: "세종특별자치시",
    경기: "경기도",
    강원: "강원특별자치도",
    충북: "충청북도",
    충남: "충청남도",
    전북: "전북특별자치도",
    전남: "전라남도",
    경북: "경상북도",
    경남: "경상남도",
    제주: "제주특별자치도",
};

type RegionCodeJson = {
    sido: Record<string, string>;
    sigungu: Record<string, string>;
};

type RegionCodeResult = {
    sidoCode: string | null;
    sggCode: string | null;
};

function inferSchulKndCodeFromName(name: string): string {
    if (name.includes("초등")) return "02";
    if (name.includes("중")) return "03";
    if (name.includes("고")) return "04";
    if (name.includes("특")) return "05";
    return "06"; // 그 외
}
let regionCodesPromise: Promise<RegionCodeJson> | null = null;

function loadRegionCodes(): Promise<RegionCodeJson> {
    if (!regionCodesPromise) {
        const filePath = path.join(process.cwd(), "public", "data", "schoolinfo-region-codes.json");
        regionCodesPromise = readFile(filePath, "utf-8").then((text) => JSON.parse(text) as RegionCodeJson);
    }
    return regionCodesPromise;
}

function normalizeSidoName(input: string): { first: string; sigg: string } {
    const parts = input.trim().split(/\s+/);
    const sigg = parts.slice(0, 3).join("");

    return {
        first: parts[0] ?? "",
        sigg,
    };
}

async function inferSchulSidoCodeFromName(sidoName: string): Promise<RegionCodeResult> {
    const { sido, sigungu } = await loadRegionCodes();
    const normalized = normalizeSidoName(sidoName);
    if (!normalized.first && !normalized.sigg) {
        return { sidoCode: null, sggCode: null };
    }
    const canonical = SIDO_ALIASES[normalized.first] ?? normalized.first;
    const sidoCode = canonical && sido[canonical] ? sido[canonical] : null;
    // 현재 sigungu json 키가 "시도|시군구" 형태면 아래는 매칭 안 될 수 있음
    // 그 경우 key를 "경기도|수원시 영통구" 형태로 만들어서 찾는 로직 추가 필요
    const sggCode = normalized.sigg && sigungu[normalized.sigg] ? sigungu[normalized.sigg] : null;
    return { sidoCode, sggCode };
}

export async function GET(request: NextRequest) {
  const schoolCode = request.nextUrl.searchParams.get("schoolCode")?.trim();
  const schoolName = request.nextUrl.searchParams.get("schoolName")?.trim();
  const address = request.nextUrl.searchParams.get("address")?.trim();
  const apiType = request.nextUrl.searchParams.get("apiType")?.trim();
  const all = request.nextUrl.searchParams.get("all") === "1";

  if (!schoolCode) return NextResponse.json({ message: "schoolCode is required" }, { status: 400 });
  if (!schoolName) return NextResponse.json({ message: "schoolName is required" }, { status: 400 });

  const types = all ? API_TYPES : [apiType ?? "0"];
    const schulKndCode = inferSchulKndCodeFromName(schoolName);
    const { sidoCode, sggCode } = await inferSchulSidoCodeFromName(address ?? "")
    console.log(sggCode)
  const results = await Promise.all(
      types.map(async (type) => {
        const params = new URLSearchParams({
          apiKey: env.SCHOOLINFO_API_KEY,
          apiType: type,
          pbanYr: "2025",
          schulKndCode:schulKndCode,
          // schulCode: schoolCode,
          ...(sidoCode ? { sidoCode } : {}),
          ...(sggCode ? { sggCode } : {}),
        });
        const r = await fetch(`${env.SCHOOLINFO_BASE_URL}?${params.toString()}`, { cache: "no-store" });
        return { apiType: type, status: r.status, raw: await r.text() };
      }),
  );

  return NextResponse.json({ schoolCode, year: 2025, results });
}