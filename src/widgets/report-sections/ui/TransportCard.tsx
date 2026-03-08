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
      <CardContent className="space-y-3 text-sm text-slate-700">
        <div>
          <p className="mb-1 font-medium">지하철역 (1km) Top3</p>
          <ul className="list-inside list-disc space-y-1">
            {subwayTop3.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
            {!subwayTop3.length ? <li>데이터 없음</li> : null}
          </ul>
        </div>
        <div>
          <p className="mb-1 font-medium">버스정류장 (1km)</p>
          <p className="mb-1">총 {busCount}개</p>
          <ul className="list-inside list-disc space-y-1">
            {busTop5.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
            {!busTop5.length ? <li>데이터 없음</li> : null}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
