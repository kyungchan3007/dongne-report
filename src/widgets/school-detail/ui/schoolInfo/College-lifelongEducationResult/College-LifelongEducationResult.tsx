import { BookOpen } from "lucide-react";

import { SchoolInfoListItemApi94 } from "@/entities/school/model/SchoolType";

export const RenderAp94 = (item: SchoolInfoListItemApi94) => {
  return (
    <div className="mt-4 flex max-h-[30rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <BookOpen size={16} className="text-[#4e5968]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">교육 활동 참여 (기타)</h3>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-4">
        <DataItem label="구분" value={item.SEM_SC_NM} />
        <DataItem label="학생 정규 주간 활동" value={item.FRL_CURR_ITRT_TM ? `${item.FRL_CURR_ITRT_TM}시간` : "-"} />
        <DataItem label="학생 정규 외 활동" value={item.NN_FRL_CURR_ITRT_TM ? `${item.NN_FRL_CURR_ITRT_TM}시간` : "-"} />
        <DataItem label="학생 평균 교육(학급당)" value={item.TOT_AVG_TM ? `${item.TOT_AVG_TM}시간` : "-"} />
      </div>

      <div className="mb-4 rounded-xl border border-[#e5e8eb] bg-[#f8fafb] p-3 shadow-inner">
        <h4 className="mb-3 text-xs font-bold text-[#4e5968]">교원 및 학부모 참여</h4>
        <div className="grid grid-cols-2 gap-3">
          <DataItem label="교원 참여 인원/비율" value={`${item.PTPT_NMPR_FGR1 || "0"}명 (${item.PTPT_NMPR_PER1 || "0"}%)`} />
          <DataItem label="학부모 참여 인원/비율" value={`${item.PTPT_NMPR_FGR2 || "0"}명 (${item.PTPT_NMPR_PER2 || "0"}%)`} />
        </div>
      </div>

      <div className="rounded-xl border border-[#e5e8eb] bg-white text-center">
        <div className="grid grid-cols-3 divide-x divide-[#e5e8eb] border-b border-[#e5e8eb] bg-[#f8fafb]">
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">활동 유형</div>
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">지도교사수</div>
          <div className="py-2 text-[11px] font-semibold text-[#6b7684]">참여학생수</div>
        </div>
        {[
          { label: "교육주관 활동", t: item.ATMY_LEGAL_NMPR_FGR1, s: item.ATMY_LEGAL_NMPR_FGR2 },
          { label: "또래 활동", t: item.SMAGE_CNSL_NMPR_FGR1, s: item.SMAGE_CNSL_NMPR_FGR2 },
          { label: "동아리·학생자치", t: item.SMAGE_MDAT_NMPR_FGR1, s: item.SMAGE_MDAT_NMPR_FGR2 },
        ].map((row, idx) => (
          <div
            key={row.label}
            className={`grid grid-cols-3 divide-x divide-[#e5e8eb] items-center ${
              idx !== 2 ? "border-b border-[#e5e8eb]" : ""
            }`}
          >
            <div className="py-2.5 text-xs font-semibold text-[#191f28]">{row.label}</div>
            <div className="py-2.5 text-xs font-medium text-[#6b7684]">{row.t || "-"}</div>
            <div className="py-2.5 text-xs font-medium text-[#6b7684]">{row.s || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DataItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] font-medium text-[#8b95a1]">{label}</span>
    <span className="text-sm font-semibold text-[#191f28]">{value || "-"}</span>
  </div>
);

