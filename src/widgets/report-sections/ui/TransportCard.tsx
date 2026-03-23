import { Bus, Train } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f3ff]">
            <Train size={16} className="text-[#3182f6]" />
          </span>
          <CardTitle>교통</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 지하철 */}
        <div className="rounded-xl bg-[#f9fafb] p-3">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            지하철역 Top 3 (1km)
          </p>
          <ul className="space-y-1.5">
            {subwayTop3.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-sm text-[#191f28]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3182f6]" />
                {item.name}
              </li>
            ))}
            {!subwayTop3.length && (
              <li className="text-sm text-[#b0b8c1]">데이터가 없습니다.</li>
            )}
          </ul>
        </div>

        {/* 버스 */}
        <div className="rounded-xl bg-[#f9fafb] p-3">
          <div className="mb-2.5 flex items-center gap-2">
            <Bus size={13} className="text-[#4e5968]" />
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
              버스정류장 (1km)
            </p>
            <span className="ml-auto rounded-full bg-[#e8f3ff] px-2 py-0.5 text-xs font-bold text-[#3182f6]">
              총 {busCount}개
            </span>
          </div>
          <ul className="space-y-1.5">
            {busTop5.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-sm text-[#191f28]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4e5968]" />
                {item.name}
              </li>
            ))}
            {!busTop5.length && (
              <li className="text-sm text-[#b0b8c1]">데이터가 없습니다.</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

