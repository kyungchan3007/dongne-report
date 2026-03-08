import type { ReportPoi } from "@/entities/report/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  count: number;
  top5: ReportPoi[];
};

export function ChildcareCard({ count, top5 }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>보육</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-slate-700">
        <p>어린이집/유치원 (1km): 총 {count}개</p>
        <ul className="list-inside list-disc space-y-1">
          {top5.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
          {!top5.length ? <li>데이터 없음</li> : null}
        </ul>
      </CardContent>
    </Card>
  );
}
