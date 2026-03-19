import type { ReportPoi } from "@/entities/report/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  subwayTop3: ReportPoi[];
  busCount: number;
  busTop5: ReportPoi[];
};

export function TransportCard({ subwayTop3, busCount, busTop5 }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>교통</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-[#4e5968]">
        <div className="rounded-2xl bg-[#f8fbff] p-3">
          <p className="mb-2 text-sm font-semibold text-[#191f28]">지하철역 Top 3 (1km)</p>
          <ul className="space-y-1">
            {subwayTop3.map((item) => (
              <li key={item.id}>• {item.name}</li>
            ))}
            {!subwayTop3.length ? <li>데이터가 없습니다.</li> : null}
          </ul>
        </div>
        <div className="rounded-2xl bg-[#f8fbff] p-3">
          <p className="mb-2 text-sm font-semibold text-[#191f28]">버스정류장 (1km)</p>
          <p className="mb-2">총 {busCount}개</p>
          <ul className="space-y-1">
            {busTop5.map((item) => (
              <li key={item.id}>• {item.name}</li>
            ))}
            {!busTop5.length ? <li>데이터가 없습니다.</li> : null}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
