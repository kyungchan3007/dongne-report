export type RegionCodeJson = {
  sido: Record<string, string>;
  sigungu: Record<string, string>;
};

export type RegionCodeResult = {
  sidoCode: string | null;
  sggCode: string | null;
};

export type SchoolInfoListItem = {
  SCHUL_CODE?: string;
  SCHUL_NM?: string;
  SCHUL_RDNMA?: string;
  ADRES_BRKDN?: string;
  [key: string]: unknown;
};

export type SchoolInfoApiPayload = {
  resultCode?: string;
  resultMsg?: string;
  list?: SchoolInfoListItem[];
  [key: string]: unknown;
};
