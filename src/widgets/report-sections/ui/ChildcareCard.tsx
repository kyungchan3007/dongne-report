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
      <CardContent className="space-y-3 text-sm text-[#4e5968]">
        <p>어린이집/유치원 (1km): 총 {count}개</p>
        <div className="rounded-2xl bg-[#f8fbff] p-3">
          <p className="mb-2 text-sm font-semibold text-[#191f28]">주변 시설 Top 5</p>
          <ul className="space-y-1">
            {top5.map((item) => (
              <li key={item.id}>• {item.name}</li>
            ))}
            {!top5.length ? <li>데이터가 없습니다.</li> : null}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
