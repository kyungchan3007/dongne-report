import { Baby, Footprints, Timer, University } from "lucide-react";

import type { Academy, ReportPoi } from "@/entities/report/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { KakaoPlace } from "@/entities/kakao/model/types";

type Props = {
  count: number;
  academy: KakaoPlace[];
};

export function AcademyCard({ count, academy }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E0E7FF]">
            <University size={16} className="text-[#4F46E5]" />
          </span>
          <CardTitle>학원</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E0E7FF] px-3 py-1 text-xs font-semibold text-[#4F46E5]">
            학원 (1km) 총 {count}개
          </span>
        </div>

        <div className="rounded-xl bg-[#f9fafb] p-3">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            주변 학원 시설
          </p>
          <ul className="space-y-1.5">
            {academy.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-sm text-[#191f28]"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4F46E5]" />
                  {item.place_name}
                </span>

                <button
                  type="button"
                  className="inline-flex items-center justify-between gap-1 rounded-full bg-[#E0E7FF] px-2 py-0.5 text-xs font-bold text-[#4F46E5] w-16"
                >
                  <Footprints size={12} />
                  <p>{`${item.distance}m`}</p>
                </button>
              </li>
            ))}
            {!academy.length && <li className="text-sm text-[#b0b8c1]">데이터가 없습니다.</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
