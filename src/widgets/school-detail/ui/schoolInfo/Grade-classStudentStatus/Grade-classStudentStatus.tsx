import { ListOrdered } from "lucide-react";

import { SchoolInfoListItemApi09 } from "@/entities/school/model/SchoolType";

export const RenderAp09 = (item: SchoolInfoListItemApi09) => {
  return (
    <div className="mt-4 flex max-h-[30rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <ListOrdered size={16} className="text-[#4e5968]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">학년별 학급 및 학생 수</h3>
      </div>

      <div className="mb-2 grid grid-cols-1 sm:grid-cols-2">
        <DataItem label="학교명" value={item.SCHUL_NM} />
        <DataItem label="지역 / 시도" value={`${item.ADRCD_NM || "-"} / ${item.ATPT_OFCDC_ORG_NM || "-"}`} />
      </div>

      <div className="my-4 grid grid-cols-3 gap-2 rounded-xl bg-[#f8fafb] p-3 text-center sm:grid-cols-5">
        <div>
          <p className="text-[11px] font-medium text-[#8b95a1]">학생수계</p>
          <p className="mt-1 text-base font-bold text-[#3182f6]">{item.COL_S_SUM || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb] sm:border-none">
          <p className="text-[11px] font-medium text-[#8b95a1]">학급수계</p>
          <p className="mt-1 text-base font-bold text-[#191f28]">{item.COL_C_SUM || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb] sm:border-l">
          <p className="text-[11px] font-medium text-[#8b95a1]">학급당 학생</p>
          <p className="mt-1 text-base font-bold text-[#191f28]">{item.COL_SUM || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb] sm:border-l">
          <p className="text-[11px] font-medium text-[#8b95a1]">교사 수</p>
          <p className="mt-1 text-base font-bold text-[#191f28]">{item.TEACH_CNT || "-"}</p>
        </div>
        <div className="border-l border-[#e5e8eb] sm:border-l">
          <p className="text-[11px] font-medium text-[#8b95a1]">교사 1인당</p>
          <p className="mt-1 text-base font-bold text-[#191f28]">{item.TEACH_CAL || "-"}</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#e5e8eb] bg-white text-center">
        <div className="grid grid-cols-4 divide-x divide-[#e5e8eb] border-b border-[#e5e8eb] bg-[#f8fafb]">
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">학년</div>
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">학생 수</div>
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">학급 수</div>
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">학급당 학생</div>
        </div>

        {[
          { grade: 1, s: item.COL_S1, c: item.COL_C1, avg: item.COL_1 },
          { grade: 2, s: item.COL_S2, c: item.COL_C2, avg: item.COL_2 },
          { grade: 3, s: item.COL_S3, c: item.COL_C3, avg: item.COL_3 },
          { grade: 4, s: item.COL_S4, c: item.COL_C4, avg: item.COL_4 },
          { grade: 5, s: item.COL_S5, c: item.COL_C5, avg: item.COL_5 },
          { grade: 6, s: item.COL_S6, c: item.COL_C6, avg: item.COL_6 },
        ].map((row, idx) => (
          <div
            key={row.grade}
            className={`grid grid-cols-4 divide-x divide-[#e5e8eb] ${idx !== 5 ? "border-b border-[#e5e8eb]" : ""}`}
          >
            <div className="py-2.5 text-xs font-semibold text-[#191f28]">{row.grade}학년</div>
            <div className="py-2.5 text-xs font-medium text-[#6b7684]">{row.s || "0"}</div>
            <div className="py-2.5 text-xs font-medium text-[#6b7684]">{row.c || "0"}</div>
            <div className="py-2.5 text-xs font-medium text-[#6b7684]">{row.avg || "0"}</div>
          </div>
        ))}
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

