export type ReportPoi = {
  id: string;
  name: string;
  address: string;
  roadAddress: string;
  x: string;
  y: string;
  schoolCode?: string | null;
};

export type NeighborhoodReport = {
  place: {
    placeId: string;
    name: string;
    address: string;
    x: string;
    y: string;
    sido: string;
    sigungu: string;
  };
  safety: {
    fullName: string;
    crimePer100k: number | null;
    grade: string;
  };
  transport: {
    subwayTop3: ReportPoi[];
    busCount: number;
    busTop5: ReportPoi[];
  };
  childcare: {
    count: number;
    top5: ReportPoi[];
  };
  schools: {
    count: number;
    top10: ReportPoi[];
    mappedCount: number;
    unmappedCount: number;
  };
};
