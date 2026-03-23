export type Yn = "Y" | "N";
export type SchoolInfoApiType = "0" | "08" | "62" | "63" | "09" | "94" | "51" | "73";

export type SchoolInfoListItemApi0 = {
  ABSCH_YN: Yn;
  ADRCD_CD: string;
  ADRCD_ID: string;
  ADRCD_NM: string;
  ADRES_BRKDN: string;
  ATPT_OFCDC_ORG_CODE: string;
  ATPT_OFCDC_ORG_NM: string;
  BNHH_YN: Yn;
  CLOSE_YN: Yn;
  COEDU_SC_CODE: string;
  DGHT_SC_CODE: string;
  DTLAD_BRKDN: string;
  FOAS_MEMRD: string;
  FOND_SC_CODE: string;
  FOND_YMD: string;
  HMPG_ADRES: string;
  JU_ORG_CODE: string;
  JU_ORG_NM: string;
  LCTN_SC_CODE: string;
  LGTUD: number;
  LTTUD: number;
  PERC_FAXNO: string;
  SCHUL_CODE: string;
  SCHUL_FOND_TYP_CODE: string;
  SCHUL_KND_SC_CODE: string; // 01 유치원, 02 초등학교 ...
  SCHUL_NM: string;
  SCHUL_RDNDA: string;
  SCHUL_RDNMA: string;
  SCHUL_RDNZC: string;
  SHL_IDF_CD: string;
  USER_TELNO: string;
  USER_TELNO_GA: string;
  USER_TELNO_SW: string;
  ZIP_CODE: string;
  [key: string]: unknown;
};

export interface SchoolInfoListItemApi08 {
  ADRCD_CD: string;
  ADRCD_NM: string;
  ATPT_OFCDC_ORG_CODE: string;
  ATPT_OFCDC_ORG_NM: string;
  BNHH_YN: Yn;
  COL_1: number;
  COL_2: number;
  COL_3: number;
  COL_4: number;
  COL_5: number;
  COL_6: number;
  FOND_SC_CODE: string;
  ITRT_TCR_TOT_FGR: number;
  JU_ORG_CODE: string;
  JU_ORG_NM: string;
  LCTN_SC_CODE: string;
  PBAN_EXCP_YN: Yn;
  PER_STUDAY_DAY: string;
  SCHUL_CODE: string;
  SCHUL_KND_SC_CODE: string;
  SCHUL_NM: string;
  WEEK_TOT_ITRT_HR_FGR: number;
  [key: string]: unknown;
}

export interface SchoolInfoListItemApi62 {
  COL_1: number;
  COL_2: number;
  COL_3: number;
  COL_4: number;
  COL_5: number;
  COL_6: number;
  COL_7: number;
  COL_8: number;
  COL_FGR_SUM: string;
  COL_SUM: string;
  AVG_FGR_SUM: number;
  SP_SUM: number;
  SP_FGR_SUM: number;
  FOND_SC_CODE: string;
  SCHUL_KND_SC_CODE: string;
  ADRCD_NM: string;
  ADRCD_CD: string;
  JU_ORG_NM: string;
  JU_ORG_CODE: string;
  ATPT_OFCDC_ORG_NM: string;
  ATPT_OFCDC_ORG_CODE: string;
  PBAN_EXCP_YN: Yn;
  LCTN_SC_CODE: string;
  BNHH_YN: Yn;
  SCHUL_CODE: string;
  SCHUL_NM: string;
}

export interface SchoolInfoListItemApi63 {
  ADRCD_CD: string;
  ADRCD_NM: string;
  ATPT_OFCDC_ORG_CODE: string;
  ATPT_OFCDC_ORG_NM: string;
  BNHH_YN: Yn;
  COL_M1: number;
  COL_M2: number;
  COL_M3: number;
  COL_M4: number;
  COL_M5: number;
  COL_M6: number;
  COL_M7: number;
  COL_M8: number;
  COL_MSUM: number;
  COL_W1: number;
  COL_W2: number;
  COL_W3: number;
  COL_W4: number;
  COL_W5: number;
  COL_W6: number;
  COL_W7: number;
  COL_W8: number;
  COL_WSUM: number;
  FOND_SC_CODE: string;
  JU_ORG_CODE: string;
  JU_ORG_NM: string;
  LCTN_SC_CODE: string;
  PBAN_EXCP_YN: Yn;
  SCHUL_CODE: string;
  SCHUL_KND_SC_CODE: string;
  SCHUL_NM: string;
  SUM: number;
}
export interface SchoolInfoListItemApi09 {
  FOND_SC_CODE: string;
  COL_S_SUM: number;
  TEACH_CNT: number;
  SCHUL_CODE: string;
  PBAN_EXCP_YN: Yn;
  BNHH_YN: Yn;
  ATPT_OFCDC_ORG_NM: string;
  COL_C_SUM: number;
  TEACH_CAL: number;
  COL_S1: number;
  COL_S2: number;
  COL_S3: number;
  COL_S4: number;
  COL_S5: number;
  COL_S6: number;
  COL_S7: number;
  COL_S8: number;
  COL_C1: number;
  COL_C2: number;
  COL_C3: number;
  COL_C4: number;
  COL_C5: number;
  COL_C6: number;
  COL_C7: number;
  COL_C8: number;
  COL_1: number;
  COL_2: number;
  COL_3: number;
  COL_4: number;
  COL_5: number;
  COL_6: number;
  COL_7: number;
  COL_8: number;
  SCHUL_NM: string;
  ATPT_OFCDC_ORG_CODE: string;
  LCTN_SC_CODE: string;
  ADRCD_CD: string;
  JU_ORG_NM: string;
  ADRCD_NM: string;
  SCHUL_KND_SC_CODE: string;
  JU_ORG_CODE: string;
  COL_SUM: number;
}

export interface SchoolInfoListItemApi94 {
  SEM_SC_CODE: string;
  SEM_SC_NM: string;

  TOT_AVG_TM: number;
  FRL_CURR_ITRT_TM: number;
  NN_FRL_CURR_ITRT_TM: number;
  SMAGE_MDAT_NMPR_FGR1: number;
  SMAGE_MDAT_NMPR_FGR2: number;
  SMAGE_CNSL_NMPR_FGR1: number;
  SMAGE_CNSL_NMPR_FGR2: number;
  ETC_NMPR_FGR1: number;
  ETC_NMPR_FGR2: number;
  PTPT_NTS1: number;
  PTPT_NTS2: number;
  PTPT_NMPR_FGR1: number | "-";
  PTPT_NMPR_FGR2: number | "-";
  PTPT_NMPR_PER1: number | "-";
  PTPT_NMPR_PER2: number | "-";
  ATMY_LEGAL_NMPR_FGR1: number;
  ATMY_LEGAL_NMPR_FGR2: number;
  FOND_SC_CODE: string;
  SCHUL_KND_SC_CODE: string;
  ADRCD_CD: string;
  ADRCD_NM: string;
  ATPT_OFCDC_ORG_CODE: string;
  ATPT_OFCDC_ORG_NM: string;
  JU_ORG_CODE: string;
  JU_ORG_NM: string;
  LCTN_SC_CODE: string;
  PBAN_EXCP_YN: Yn;
  BNHH_YN: Yn;
  SCHUL_CODE: string;
  SCHUL_NM: string;
}

export interface SchoolInfoListItemApi51 {
  SUHEST_AWA_LTAGE_BOY_FGR_R: string;
  ELPD_ETRC_GIR_FGR: number;
  SUELPD_ETRC_BOY_FGR_R: string;
  FOND_SC_CODE: string;
  TOT_SUM: number;
  HEST_AWA_LTAGE_GIR_FGR: number;
  SCHUL_KND_SC_CODE: string;
  BEAGE_GIR_FGR: number;
  ADRCD_NM: string;
  SUBEAGE_BOY_FGR_R: string;
  ELPD_ETRC_BOY_FGR: number;
  JU_ORG_NM: string;
  ATPT_OFCDC_ORG_NM: string;
  JU_ORG_CODE: string;
  SUELPD_ETRC_BOY_FGR: number;
  PBAN_EXCP_YN: Yn;
  SUHEST_AWA_LTAGE_BOY_FGR: number;
  HEST_AWA_LTAGE_BOY_FGR: number;
  BEAGE_BOY_FGR: number;
  SCHUL_CODE: string;
  SUBEAGE_BOY_FGR: number;
  ATPT_OFCDC_ORG_CODE: string;
  LCTN_SC_CODE: string;
  ADRCD_CD: string;
  TOTAL_2: number;
  TOTAL_1: number;
  BNHH_YN: Yn;
  SCHUL_NM: string;
}

export type SchoolInfoListItemApi73 = {
  ADRCD_CD: string;
  ADRCD_NM: string;
  ATPT_OFCDC_ORG_CODE: string;
  ATPT_OFCDC_ORG_NM: string;
  BNHH_YN: Yn;
  COL_1: string; // 예: "○"
  COL_2: string; // 예: " "
  COL_3: string;
  COL_4: string;
  COL_6: string;
  COL_7: number; // 예: 232000
  COL_8: string; // 예: "○"
  COL_9: string;
  COL_10: string;
  COL_11: string;
  COL_13: string;
  COL_14: number; // 예: 81000
  FOND_SC_CODE: string;
  HS_KND_SC_NM: string;
  JU_ORG_CODE: string;
  JU_ORG_NM: string;
  LCTN_SC_CODE: string;
  PBAN_EXCP_YN: Yn;
  SCHUL_CODE: string;
  SCHUL_KND_SC_CODE: string;
  SCHUL_NM: string;
};
export type SchoolInfoListItemByApiType = {
  "0": SchoolInfoListItemApi0;
  "08": SchoolInfoListItemApi08;
  "62": SchoolInfoListItemApi62;
  "63": SchoolInfoListItemApi63;
  "09": SchoolInfoListItemApi09;
  "94": SchoolInfoListItemApi94;
  "51": SchoolInfoListItemApi51;
  "73": SchoolInfoListItemApi73;
};

export type SchoolItem = {
  item:
    | SchoolInfoListItemApi0
    | SchoolInfoListItemApi08
    | SchoolInfoListItemApi62
    | SchoolInfoListItemApi63
    | SchoolInfoListItemApi09
    | SchoolInfoListItemApi94
    | SchoolInfoListItemApi51
    | SchoolInfoListItemApi73;
};

type ParsedSchoolInfoResultByType<T extends SchoolInfoApiType> = {
  apiType: T;
  status: number;
  raw: string;
  resultCode?: string;
  resultMsg?: string;
  items: Array<SchoolInfoListItemByApiType[T]>;
  selectedItem: SchoolInfoListItemByApiType[T] | null;
};

export type ParsedSchoolInfoResult = {
  [K in SchoolInfoApiType]: ParsedSchoolInfoResultByType<K>;
}[SchoolInfoApiType];

export type SchoolInfoData = {
  schoolCode: string;
  year: number;
  results: ParsedSchoolInfoResult[];
};

export type SchoolInfoResultResponse = {
  apiType: SchoolInfoApiType;
  status: number;
  raw: string;
};

export type SchoolInfoResponse = {
  schoolCode: string;
  year: number;
  results: SchoolInfoResultResponse[];
};

export type SchoolInfoApiPayload = {
  resultCode?: string;
  resultMsg?: string;
  list?: unknown[];
};

export const TITLE: Record<SchoolInfoApiType, string> = {
  "0": "학교 기본정보",
  "08": "수업일수 및 수업시수 현황",
  "62": "학교 현황",
  "63": "성별 학생수",
  "09": "학년별 학급별 학생수",
  "94": "대상별 학교폭력 예방교육 실적",
  "51": "입학생 현황",
  "73": "교복 구매 유형 및 단가",
};
