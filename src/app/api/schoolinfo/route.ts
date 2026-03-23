import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/config/env";

const API_TYPES = ["0", "08", "62", "63", "09", "94", "51", "73"] as const;

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

type SchoolInfoListItem = {
  SCHUL_CODE?: string;
  SCHUL_NM?: string;
  SCHUL_RDNMA?: string;
  ADRES_BRKDN?: string;
  [key: string]: unknown;
};

type SchoolInfoApiPayload = {
  resultCode?: string;
  resultMsg?: string;
  list?: SchoolInfoListItem[];
  [key: string]: unknown;
};

function inferSchulKndCodeFromName(name: string): string {
  if (name.includes("초등")) return "02";
  if (name.includes("중")) return "03";
  if (name.includes("고")) return "04";
  if (name.includes("특")) return "05";
  return "06";
}

let regionCodesPromise: Promise<RegionCodeJson> | null = null;

function loadRegionCodes(): Promise<RegionCodeJson> {
  if (!regionCodesPromise) {
    const filePath = path.join(process.cwd(), "public", "data", "schoolinfo-region-codes.json");
    regionCodesPromise = readFile(filePath, "utf-8").then(
      (text) => JSON.parse(text) as RegionCodeJson
    );
  }

  return regionCodesPromise;
}

function normalizeSidoName(input: string): { first: string; sigg: string } {
  const parts = input.trim().split(/\s+/);

  return {
    first: parts[0] ?? "",
    sigg: parts.slice(0, 3).join(""),
  };
}

async function inferSchulSidoCodeFromName(sidoName: string): Promise<RegionCodeResult> {
  const { sido, sigungu } = await loadRegionCodes();
  const normalized = normalizeSidoName(sidoName);

  if (!normalized.first && !normalized.sigg) {
    return { sidoCode: null, sggCode: null };
  }

  const canonical = SIDO_ALIASES[normalized.first] ?? normalized.first;

  return {
    sidoCode: canonical && sido[canonical] ? sido[canonical] : null,
    sggCode: normalized.sigg && sigungu[normalized.sigg] ? sigungu[normalized.sigg] : null,
  };
}

function normalizeText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, "").trim();
}

function filterSchoolList(
  list: SchoolInfoListItem[],
  schoolCode: string,
  schoolName: string,
  address: string
): SchoolInfoListItem[] {
  const normalizedCode = normalizeText(schoolCode);
  const normalizedName = normalizeText(schoolName);
  const normalizedAddress = normalizeText(address);

  const byCode = list.filter((item) => normalizeText(item.SCHUL_CODE) === normalizedCode);
  if (byCode.length > 0) return byCode;

  const byName = list.filter((item) => normalizeText(item.SCHUL_NM) === normalizedName);
  if (byName.length <= 1) return byName;

  if (!normalizedAddress) return byName;

  const byAddress = byName.filter((item) => {
    const roadAddress = normalizeText(item.SCHUL_RDNMA);
    const extraAddress = normalizeText(item.ADRES_BRKDN);
    return normalizedAddress.includes(roadAddress) || normalizedAddress.includes(extraAddress);
  });

  return byAddress.length > 0 ? byAddress : byName;
}

function maybeFilterRawResponse(
  raw: string,
  schoolCode: string,
  schoolName: string,
  address: string
): string {
  try {
    const parsed = JSON.parse(raw) as SchoolInfoApiPayload;

    if (!Array.isArray(parsed.list)) {
      return raw;
    }

    return JSON.stringify({
      ...parsed,
      list: filterSchoolList(parsed.list, schoolCode, schoolName, address),
    });
  } catch {
    return raw;
  }
}

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
