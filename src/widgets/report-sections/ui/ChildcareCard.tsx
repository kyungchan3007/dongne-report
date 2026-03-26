import { Baby } from "lucide-react";

import type { Academy, ReportPoi } from "@/entities/report/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  count: number;
  top5: ReportPoi[];
};

export function ChildcareCard({ count, top5 }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff0f0]">
            <Baby size={16} className="text-[#f04452]" />
          </span>
          <CardTitle>보육</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-semibold text-[#f04452]">
            어린이집·유치원 (1km) 총 {count}개
          </span>
        </div>

        <div className="rounded-xl bg-[#f9fafb] p-3">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            주변 시설 Top 5
          </p>
          <ul className="space-y-1.5">
            {top5.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-sm text-[#191f28]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f04452]" />
                {item.name}
              </li>
            ))}
            {!top5.length && <li className="text-sm text-[#b0b8c1]">데이터가 없습니다.</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
