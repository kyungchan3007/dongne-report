import { KakaoPlace, KakaoPoint } from "@/entities/kakao/model/types";

export type ReportPoi = {
  id: string;
  name: string;
  address: string;
  roadAddress: string;
  x: string;
  y: string;
  schoolCode?: string | null;
};

export type Xy = {
  x: number;
  y: number;
};

export interface WayPoint extends Xy {
  name: string;
}

export interface Academy {
  count: number;
  academy: KakaoPlace[];
}

export type ReportDurationSec = {
  now: number | null;
  morning8: number | null;
  noon12: number | null;
  evening19: number | null;
};

export type ReportCarDistance = {
  routeCount: number;
  destination: KakaoPoint | null;
  origin: KakaoPoint | null;
  distance: string | null;
  durationSec: ReportDurationSec;
  waypoints: WayPoint[];
  taxi: number | null;
  toll: number | null;
};

export interface ReportPlace {
  placeId: string;
  name: string;
  address: string;
  x: string;
  y: string;
  sido: string;
  sigungu: string;
}

export type ReportTransport = {
  subwayTop3: ReportPoi[];
  busCount: number;
  busTop5: ReportPoi[];
};

export type ReportChildcare = {
  count: number;
  top5: ReportPoi[];
};

export type ReportSchools = {
  count: number;
  top10: ReportPoi[];
  mappedCount: number;
  unmappedCount: number;
};

export type ReportSafety = {
  fullName: string;
  crimePer100k: number | null;
  grade: string;
};

export type NeighborhoodReport = {
  place: ReportPlace;
  safety: ReportSafety;
  transport: ReportTransport;
  childcare: ReportChildcare;
  schools: ReportSchools;
  academy: Academy;
  carDistance: ReportCarDistance;
};
