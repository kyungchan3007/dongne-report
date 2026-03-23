import { Users } from "lucide-react";

import { SchoolInfoListItemApi62 } from "@/entities/school/model/SchoolType";

export const RenderAp62 = (item: SchoolInfoListItemApi62) => {
  return (
    <div className="mt-4 flex max-h-[22rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <Users size={16} className="text-[#4e5968]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">학생 및 학급 요약</h3>
      </div>

      <div className="mb-2 grid grid-cols-1 sm:grid-cols-2">
        <DataItem label="학교명" value={item.SCHUL_NM} />
        <DataItem label="지역 / 시도" value={`${item.ADRCD_NM || "-"} / ${item.ATPT_OFCDC_ORG_NM || "-"}`} />
      </div>

      <div className="my-4 grid grid-cols-3 gap-2 rounded-xl bg-[#f8fafb] p-3 text-center">
        <div>
          <p className="text-[11px] font-medium text-[#8b95a1]">학생수계</p>
          <p className="mt-1 text-base font-bold text-[#3182f6]">{item.COL_FGR_SUM || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb]">
          <p className="text-[11px] font-medium text-[#8b95a1]">학급수계</p>
          <p className="mt-1 text-base font-bold text-[#191f28]">{item.COL_SUM || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb]">
          <p className="text-[11px] font-medium text-[#8b95a1]">학급당 학생</p>
          <p className="mt-1 text-base font-bold text-[#191f28]">{item.AVG_FGR_SUM || "-"}</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#e5e8eb] bg-white text-center">
        <div className="grid grid-cols-6 divide-x divide-[#e5e8eb] border-b border-[#e5e8eb] bg-[#f8fafb]">
          {[1, 2, 3, 4, 5, 6].map((grade) => (
            <div key={grade} className="px-1 py-1.5 text-[10px] font-semibold text-[#6b7684]">
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

const DataItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-medium text-[#8b95a1]">{label}</span>
    <span className="text-sm font-semibold text-[#191f28]">{value || "-"}</span>
  </div>
);

