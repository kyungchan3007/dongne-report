import { Users } from "lucide-react";

import { SchoolInfoListItemApi63 } from "@/entities/school/model/SchoolType";

export const RenderAp63 = (item: SchoolInfoListItemApi63) => {
  return (
    <div className="mt-4 flex max-h-[26rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <Users size={16} className="text-[#4e5968]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">성별 학생 수</h3>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl bg-[#f8fafb] p-3 text-center">
        <div>
          <p className="text-[11px] font-medium text-[#8b95a1]">총계</p>
          <p className="mt-1 text-base font-bold text-[#191f28]">{item.SUM || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb]">
          <p className="text-[11px] font-medium text-[#8b95a1]">계 (남)</p>
          <p className="mt-1 text-base font-bold text-[#3182f6]">{item.COL_MSUM || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb]">
          <p className="text-[11px] font-medium text-[#8b95a1]">계 (여)</p>
          <p className="mt-1 text-base font-bold text-[#f04452]">{item.COL_WSUM || "-"}</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#e5e8eb] bg-white text-center">
        <div className="grid grid-cols-3 divide-x divide-[#e5e8eb] border-b border-[#e5e8eb] bg-[#f8fafb]">
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">학년</div>
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">남학생</div>
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">여학생</div>
        </div>

        {[
          { grade: 1, m: item.COL_M1, w: item.COL_W1 },
          { grade: 2, m: item.COL_M2, w: item.COL_W2 },
          { grade: 3, m: item.COL_M3, w: item.COL_W3 },
          { grade: 4, m: item.COL_M4, w: item.COL_W4 },
          { grade: 5, m: item.COL_M5, w: item.COL_W5 },
          { grade: 6, m: item.COL_M6, w: item.COL_W6 },
        ].map((row, idx) => (
          <div
            key={row.grade}
            className={`grid grid-cols-3 divide-x divide-[#e5e8eb] ${idx !== 5 ? "border-b border-[#e5e8eb]" : ""}`}
          >
            <div className="py-2.5 text-xs font-semibold text-[#191f28]">{row.grade}학년</div>
            <div className="py-2.5 text-xs font-medium text-[#6b7684]">{row.m || "0"}</div>
            <div className="py-2.5 text-xs font-medium text-[#6b7684]">{row.w || "0"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

