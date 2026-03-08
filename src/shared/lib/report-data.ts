import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { withSixHourCache } from "@/shared/lib/cache";
import { normalizeName, scoreAddressSimilarity } from "@/shared/lib/normalize";

type SafetyItem = {
  fullName: string;
  crimePer100k: number | null;
  grade: string;
};

type SchoolIndexCandidate = {
  schoolCode: string;
  roadAddress?: string;
  schoolName?: string;
  region2depth?: string;
};

function normalizeCandidate(raw: unknown): SchoolIndexCandidate | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const schoolCode = item.schoolCode ?? item.school_code ?? item.code;
  if (typeof schoolCode !== "string" || !schoolCode) return null;
  return {
    schoolCode,
    roadAddress:
      typeof item.roadAddress === "string"
        ? item.roadAddress
        : typeof item.road_address === "string"
          ? item.road_address
          : undefined,
    schoolName:
      typeof item.schoolName === "string"
        ? item.schoolName
        : typeof item.name === "string"
          ? item.name
          : undefined,
    region2depth:
      typeof item.region2depth === "string"
        ? item.region2depth
        : typeof item.sigungu === "string"
          ? item.sigungu
          : undefined,
  };
}

async function readPublicJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(process.cwd(), "public", "data", fileName);
  const fileText = await readFile(filePath, "utf-8");
  return JSON.parse(fileText) as T;
}

async function loadSafetyLookupInternal() {
  const json = await readPublicJson<{ items?: SafetyItem[] } | SafetyItem[]>(
    "safety-sigungu-per100k-250.json",
  );
  const items = Array.isArray(json) ? json : json.items ?? [];
  const map = new Map<string, SafetyItem>();

  items.forEach((item) => {
    if (!item?.fullName) return;
    map.set(item.fullName, {
      fullName: item.fullName,
      crimePer100k: typeof item.crimePer100k === "number" ? item.crimePer100k : null,
      grade: typeof item.grade === "string" ? item.grade : "UNKNOWN",
    });
  });

  return map;
}

export function loadSafetyLookup() {
  return withSixHourCache(["data", "safety", "lookup"], loadSafetyLookupInternal);
}

async function loadSchoolIndexInternal() {
  const json = await readPublicJson<Record<string, unknown> | Array<Record<string, unknown>>>(
    "school-codes-index.json",
  );

  const byNameRegion = new Map<string, SchoolIndexCandidate[]>();
  const fallbackItems: SchoolIndexCandidate[] = [];

  const pushIndexed = (name: string, region: string, candidates: SchoolIndexCandidate[]) => {
    const key = `${normalizeName(name)}|${normalizeName(region)}`;
    byNameRegion.set(key, candidates);
  };

  const pushFallback = (candidate: SchoolIndexCandidate) => {
    fallbackItems.push(candidate);
    if (candidate.schoolName && candidate.region2depth) {
      const key = `${normalizeName(candidate.schoolName)}|${normalizeName(candidate.region2depth)}`;
      const prev = byNameRegion.get(key) ?? [];
      byNameRegion.set(key, [...prev, candidate]);
    }
  };

  if (!Array.isArray(json) && json.byNameRegion && typeof json.byNameRegion === "object") {
    const entries = Object.entries(json.byNameRegion as Record<string, unknown>);
    entries.forEach(([key, value]) => {
      const rawCandidates = Array.isArray(value) ? value : [value];
      const candidates = rawCandidates.map(normalizeCandidate).filter(Boolean) as SchoolIndexCandidate[];
      if (!candidates.length) return;
      const normalizedKey = normalizeName(key);
      if (normalizedKey.includes("|")) {
        const [namePart, regionPart] = normalizedKey.split("|");
        byNameRegion.set(`${namePart}|${regionPart}`, candidates);
      } else {
        byNameRegion.set(normalizedKey, candidates);
      }
      candidates.forEach(pushFallback);
    });
  }

  const itemList =
    Array.isArray(json)
      ? json
      : Array.isArray(json.items)
        ? (json.items as Array<Record<string, unknown>>)
        : [];

  itemList.forEach((raw) => {
    const candidate = normalizeCandidate(raw);
    if (!candidate) return;
    pushFallback(candidate);
  });

  return { byNameRegion, fallbackItems };
}

export function loadSchoolIndex() {
  return withSixHourCache(["data", "school-index"], loadSchoolIndexInternal);
}

export async function mapSchoolCode(params: {
  schoolName: string;
  sigungu: string;
  kakaoRoadAddress: string;
}) {
  const { byNameRegion, fallbackItems } = await loadSchoolIndex();
  const normalizedName = normalizeName(params.schoolName);
  const normalizedSigungu = normalizeName(params.sigungu);

  const keyCandidates = [
    `${normalizedName}|${normalizedSigungu}`,
    `${normalizedName}${normalizedSigungu}`,
    `${normalizedSigungu}|${normalizedName}`,
    normalizedName,
  ];

  let candidates: SchoolIndexCandidate[] = [];
  for (const key of keyCandidates) {
    const found = byNameRegion.get(key);
    if (found?.length) {
      candidates = found;
      break;
    }
  }

  if (!candidates.length) {
    candidates = fallbackItems.filter(
      (item) =>
        normalizeName(item.schoolName ?? "") === normalizedName &&
        normalizeName(item.region2depth ?? "") === normalizedSigungu,
    );
  }

  if (!candidates.length) return null;
  if (candidates.length === 1) return candidates[0].schoolCode;

  const best = [...candidates].sort((a, b) => {
    const aScore = scoreAddressSimilarity(a.roadAddress ?? "", params.kakaoRoadAddress);
    const bScore = scoreAddressSimilarity(b.roadAddress ?? "", params.kakaoRoadAddress);
    return bScore - aScore;
  })[0];

  return best?.schoolCode ?? null;
}
