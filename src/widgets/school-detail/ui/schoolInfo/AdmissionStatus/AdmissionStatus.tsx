import { Baby } from "lucide-react";

import { SchoolInfoListItemApi51 } from "@/entities/school/model/SchoolType";

export const RenderAp51 = (item: SchoolInfoListItemApi51) => {
  return (
    <div className="mt-4 flex max-h-[22rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <Baby size={16} className="text-[#f04452]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">취학/적령 아동 현황</h3>
      </div>

      <div className="mb-4 rounded-xl bg-[#f8fafb] p-4 text-center">
        <p className="text-xs font-medium text-[#8b95a1]">적령 아동 총합계</p>
        <p className="mt-1 text-2xl font-bold text-[#191f28]">
          {item.SUBEAGE_BOY_FGR || "0"}{" "}
          <span className="text-sm font-medium text-[#6b7684]">명</span>
        </p>
        <p className="mt-1 text-xs text-[#8b95a1]">(비율: {item.SUBEAGE_BOY_FGR_R || "0"}%)</p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 border-t border-[#e5e8eb] pt-4">
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-[#8b95a1]">남아</span>
          <span className="mt-1 text-base font-bold text-[#3182f6]">{item.BEAGE_BOY_FGR || "-"}</span>
        </div>
        <div className="flex flex-col items-center border-l border-[#e5e8eb]">
          <span className="text-xs font-medium text-[#8b95a1]">여아</span>
          <span className="mt-1 text-base font-bold text-[#f04452]">{item.BEAGE_GIR_FGR || "-"}</span>
        </div>
      </div>
    </div>
  );
};

