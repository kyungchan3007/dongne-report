"use client";

import { useEffect, useState } from "react";
import {
  ParsedSchoolInfoResult,
  SchoolInfoApiPayload,
  SchoolInfoApiType,
  SchoolInfoData,
  SchoolInfoResponse,
  SchoolItem,
} from "@/entities/school/model/SchoolType";

type Params = {
  open: boolean;
  schoolCode: string;
  schoolName: string;
  address: string;
};

type ParsedByType<T extends SchoolInfoApiType> = Extract<ParsedSchoolInfoResult, { apiType: T }>;
type ParsedRawByType<T extends SchoolInfoApiType> = {
  resultCode?: string;
  resultMsg?: string;
  items: ParsedByType<T>["items"];
  selectedItem: ParsedByType<T>["selectedItem"];
};

function normalizeText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, "").trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readSchoolCode(item: unknown): string {
  if (!isRecord(item)) return "";
  const value = item.SCHUL_CODE;
  return typeof value === "string" ? value : "";
}

function selectBySchoolCode<T>(items: T[], schoolCode: string): T | null {
  return (
    items.find((item) => normalizeText(readSchoolCode(item)) === normalizeText(schoolCode)) ?? null
  );
}

function parseRawResult<T extends SchoolInfoApiType>(
  raw: string,
  schoolCode: string
): ParsedRawByType<T> {
  try {
    const parsed = JSON.parse(raw) as SchoolInfoApiPayload;
    const rawItems = Array.isArray(parsed.list) ? parsed.list : [];
    const items = rawItems as ParsedByType<T>["items"];
    const selectedItem = (selectBySchoolCode<SchoolItem["item"]>(items, schoolCode) ??
      (items.length === 1 ? items[0] : null)) as ParsedByType<T>["selectedItem"];

    return {
      resultCode: parsed.resultCode,
      resultMsg: parsed.resultMsg,
      items,
      selectedItem,
    };
  } catch {
    return {
      resultCode: undefined,
      resultMsg: undefined,
      items: [] as ParsedByType<T>["items"],
      selectedItem: null,
    };
  }
}

function normalizeResult(
  result: SchoolInfoResponse["results"][number],
  schoolCode: string
): ParsedSchoolInfoResult {
  if (result.apiType === "0") {
    return {
      apiType: "0",
      status: result.status,
      raw: result.raw,
      ...parseRawResult<"0">(result.raw, schoolCode),
    };
  }
  if (result.apiType === "08") {
    return {
      apiType: "08",
      status: result.status,
      raw: result.raw,
      ...parseRawResult<"08">(result.raw, schoolCode),
    };
  }
  if (result.apiType === "62") {
    return {
      apiType: "62",
      status: result.status,
      raw: result.raw,
      ...parseRawResult<"62">(result.raw, schoolCode),
    };
  }
  if (result.apiType === "63") {
    return {
      apiType: "63",
      status: result.status,
      raw: result.raw,
      ...parseRawResult<"63">(result.raw, schoolCode),
    };
  }
  if (result.apiType === "09") {
    return {
      apiType: "09",
      status: result.status,
      raw: result.raw,
      ...parseRawResult<"09">(result.raw, schoolCode),
    };
  }
  if (result.apiType === "94") {
    return {
      apiType: "94",
      status: result.status,
      raw: result.raw,
      ...parseRawResult<"94">(result.raw, schoolCode),
    };
  }
  if (result.apiType === "73") {
    return {
      apiType: "73",
      status: result.status,
      raw: result.raw,
      ...parseRawResult<"73">(result.raw, schoolCode),
    };
  }
  return {
    apiType: "51",
    status: result.status,
    raw: result.raw,
    ...parseRawResult<"51">(result.raw, schoolCode),
  };
}

function normalizeResponse(json: SchoolInfoResponse, schoolCode: string): SchoolInfoData {
  return {
    schoolCode: json.schoolCode,
    year: json.year,
    results: json.results.map((result) => normalizeResult(result, schoolCode)),
  };
}

export function useSchoolInfo({ open, schoolCode, schoolName, address }: Params) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<SchoolInfoData | null>(null);

  useEffect(() => {
    if (!open) return;

    let mounted = true;
    setLoading(true);
    setError("");
    setData(null);
    // console.log(schoolCode, schoolName, address);
    fetch(
      `/api/schoolinfo?schoolCode=${encodeURIComponent(schoolCode)}&schoolName=${encodeURIComponent(schoolName)}&address=${encodeURIComponent(address)}&all=1`
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("SchoolInfo request failed");
        return (await response.json()) as SchoolInfoResponse;
      })
      .then((json) => {
        if (mounted) {
          setData(normalizeResponse(json, schoolCode));
        }
      })
      .catch((error: unknown) => {
        if (mounted) {
          setError(error instanceof Error ? error.message : "Unknown error");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [address, open, schoolCode, schoolName]);
  // console.log(data);
  return {
    loading,
    error,
    data,
  };
}
