import { Clock } from "lucide-react";

import type { SchoolInfoListItemApi08 } from "@/entities/school/model/SchoolType";

export const RenderApi08 = (item: SchoolInfoListItemApi08) => {
  return (
    <div className="mt-4 flex max-h-[22rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <Clock size={16} className="text-[#4e5968]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">수업 시수 및 교원 수</h3>
      </div>

      <div className="mb-4 text-xs font-semibold text-[#8b95a1]">{item.SCHUL_NM}</div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-[#f8fafb] p-3">
          <p className="text-xs font-medium text-[#8b95a1]">주당 평균 수업 (교사 1인당)</p>
          <p className="mt-1 text-lg font-bold text-[#191f28]">{item.PER_STUDAY_DAY || "-"}</p>
        </div>
        <div className="rounded-xl bg-[#f8fafb] p-3">
          <p className="text-xs font-medium text-[#8b95a1]">주당 수업 시수 / 수업 교원수</p>
          <p className="mt-1 text-lg font-bold text-[#191f28]">
            {item.WEEK_TOT_ITRT_HR_FGR || "0"} / {item.ITRT_TCR_TOT_FGR || "0"}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#e5e8eb] bg-white text-center">
        <div className="grid grid-cols-6 divide-x divide-[#e5e8eb] border-b border-[#e5e8eb] bg-[#f8fafb]">
          {[1, 2, 3, 4, 5, 6].map((grade) => (
            <div key={grade} className="px-1 py-1.5 text-[11px] font-semibold text-[#6b7684]">
              {grade}학년
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 divide-x divide-[#e5e8eb]">
          <div className="px-1 py-2 text-xs font-semibold text-[#191f28]">{item.COL_1 || "-"}</div>
          <div className="px-1 py-2 text-xs font-semibold text-[#191f28]">{item.COL_2 || "-"}</div>
          <div className="px-1 py-2 text-xs font-semibold text-[#191f28]">{item.COL_3 || "-"}</div>
          <div className="px-1 py-2 text-xs font-semibold text-[#191f28]">{item.COL_4 || "-"}</div>
          <div className="px-1 py-2 text-xs font-semibold text-[#191f28]">{item.COL_5 || "-"}</div>
          <div className="px-1 py-2 text-xs font-semibold text-[#191f28]">{item.COL_6 || "-"}</div>
        </div>
      </div>
    </div>
  );
};

