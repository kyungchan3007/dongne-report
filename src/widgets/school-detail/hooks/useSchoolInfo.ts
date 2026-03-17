"use client";

import { useEffect, useState } from "react";

export type SchoolInfoListItem = {
  SCHUL_CODE?: string;
  SCHUL_NM?: string;
  SCHUL_RDNMA?: string;
  ADRES_BRKDN?: string;
  [key: string]: unknown;
};

export type ParsedSchoolInfoResult = {
  apiType: string;
  status: number;
  raw: string;
  resultCode?: string;
  resultMsg?: string;
  items: SchoolInfoListItem[];
  selectedItem: SchoolInfoListItem | null;
};

export type SchoolInfoData = {
  schoolCode: string;
  year: number;
  results: ParsedSchoolInfoResult[];
};

type SchoolInfoResultResponse = {
  apiType: string;
  status: number;
  raw: string;
};

type SchoolInfoResponse = {
  schoolCode: string;
  year: number;
  results: SchoolInfoResultResponse[];
};

type SchoolInfoApiPayload = {
  resultCode?: string;
  resultMsg?: string;
  list?: SchoolInfoListItem[];
};

type Params = {
  open: boolean;
  schoolCode: string;
  schoolName: string;
  address: string;
};

function normalizeText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, "").trim();
}

function parseRawResult(raw: string, schoolCode: string): Omit<ParsedSchoolInfoResult, "apiType" | "status" | "raw"> {
  try {
    const parsed = JSON.parse(raw) as SchoolInfoApiPayload;
    const items = Array.isArray(parsed.list) ? parsed.list : [];
    const selectedItem =
      items.find((item) => normalizeText(item.SCHUL_CODE) === normalizeText(schoolCode)) ??
      (items.length === 1 ? items[0] : null);

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
      items: [],
      selectedItem: null,
    };
  }
}

function normalizeResponse(json: SchoolInfoResponse, schoolCode: string): SchoolInfoData {
  return {
    schoolCode: json.schoolCode,
    year: json.year,
    results: json.results.map((result) => ({
      apiType: result.apiType,
      status: result.status,
      raw: result.raw,
      ...parseRawResult(result.raw, schoolCode),
    })),
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

    fetch(
      `/api/schoolinfo?schoolCode=${encodeURIComponent(schoolCode)}&schoolName=${encodeURIComponent(schoolName)}&address=${encodeURIComponent(address)}&all=1`,
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("SchoolInfo 조회 실패");
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

  return {
    loading,
    error,
    data,
  };
}
