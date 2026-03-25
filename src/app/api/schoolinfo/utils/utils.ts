import { RegionCodeJson, RegionCodeResult } from "@/app/api/schoolinfo/type/type";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { SIDO_ALIASES } from "@/app/api/schoolinfo/model/model";

export function normalizeText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, "").trim();
}

export function inferSchulKndCodeFromName(name: string): string {
  if (name.includes("초등")) return "02";
  if (name.includes("중")) return "03";
  if (name.includes("고")) return "04";
  if (name.includes("특")) return "05";
  return "06";
}

let regionCodesPromise: Promise<RegionCodeJson> | null = null;

export function loadRegionCodes(): Promise<RegionCodeJson> {
  if (!regionCodesPromise) {
    const filePath = path.join(process.cwd(), "public", "data", "schoolinfo-region-codes.json");
    regionCodesPromise = readFile(filePath, "utf-8").then(
      (text) => JSON.parse(text) as RegionCodeJson
    );
  }

  return regionCodesPromise;
}

export function normalizeSidoName(input: string): { first: string; sigg: string } {
  const normalized = input.trim().replace(/\s+/g, " ");
  const parts = normalized.split(/\s+/);
  const guIndex = parts.findIndex((p) => p.endsWith("구"));
  const result =
    guIndex >= 0
      ? parts
          .slice(0, guIndex + 1)
          .join(" ")
          .replace(/\s+/g, "")
      : normalized;

  return {
    first: parts[0] ?? "",
    sigg: result,
  };
}

export async function inferSchulSidoCodeFromName(sidoName: string): Promise<RegionCodeResult> {
  const { sido, sigungu } = await loadRegionCodes();
  const normalized = normalizeSidoName(sidoName);
  // console.log(normalized, "시군구");
  if (!normalized.first && !normalized.sigg) {
    return { sidoCode: null, sggCode: null };
  }

  const canonical = SIDO_ALIASES[normalized.first] ?? normalized.first;
  // console.log(canonical, "SIDO_ALIASES");
  // console.log(sido[canonical], "sidoCode");
  // console.log(sigungu, "sggCode");

  return {
    sidoCode: canonical && sido[canonical] ? sido[canonical] : null,
    sggCode: normalized.sigg && sigungu[normalized.sigg] ? sigungu[normalized.sigg] : null,
  };
}
