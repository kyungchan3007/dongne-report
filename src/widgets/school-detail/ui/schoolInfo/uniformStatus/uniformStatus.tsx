import { Shirt } from "lucide-react";

import { SchoolInfoListItemApi73 } from "@/entities/school/model/SchoolType";

export const RenderAp73 = (item: SchoolInfoListItemApi73) => {
  return (
    <div className="mt-4 flex max-h-[22rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <Shirt size={16} className="text-[#3182f6]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">교복 가격 및 구매 현황</h3>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="rounded-xl border border-[#e5e8eb] bg-[#f8fafb] p-4 text-center">
          <p className="text-xs font-medium text-[#8b95a1]">동복 (평균) 가격</p>
          <p className="mt-1 text-lg font-bold text-[#191f28]">
            {item.COL_7 ? `${Number(item.COL_7).toLocaleString()}원` : "-"}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-[#6b7684]">
            <span className="rounded bg-[#e5e8eb] px-1.5 py-0.5">구매방식-학교주관구매</span>
            <span>{item.COL_1 || "-"}</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#e5e8eb] bg-[#f8fafb] p-4 text-center">
          <p className="text-xs font-medium text-[#8b95a1]">하복 (평균) 가격</p>
          <p className="mt-1 text-lg font-bold text-[#191f28]">
            {item.COL_14 ? `${Number(item.COL_14).toLocaleString()}원` : "-"}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-[#6b7684]">
            <span className="rounded bg-[#e5e8eb] px-1.5 py-0.5">구매방식-학교주관구매</span>
            <span>{item.COL_8 || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
