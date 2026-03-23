import { Building } from "lucide-react";

import type { SchoolInfoListItemApi0 } from "@/entities/school/model/SchoolType";
import { KakaoMiniMap } from "@/widgets/kakao-map/ui/KakaoMiniMap";

export const RenderApi0 = (item: SchoolInfoListItemApi0) => {
  return (
    <div className="mt-4 flex max-h-[50rem] flex-col overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f6]">
          <Building size={16} className="text-[#4e5968]" />
        </div>
        <h3 className="text-sm font-bold text-[#191f28]">학교 기본 정보</h3>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
        <DataItem label="학교명" value={item.SCHUL_NM} />
        <DataItem label="시도교육청" value={item.ATPT_OFCDC_ORG_NM} />
        <DataItem label="교육지원청" value={item.JU_ORG_NM} />
        <DataItem label="남녀공학 구분" value={item.COEDU_SC_CODE} />
        <DataItem label="주야구분" value={item.DGHT_SC_CODE} />
        <DataItem label="전화번호" value={item.USER_TELNO} />
        <DataItem label="팩스번호" value={item.PERC_FAXNO} />
        <DataItem label="폐교여부" value={item.ABSCH_YN} />
      </div>

      <div className="mb-4 mt-5 h-px w-full bg-[#e5e8eb]" />

      <div className="space-y-4">
        <DataItem label="도로명 주소 (우편번호)" value={`${item.SCHUL_RDNMA} (${item.ZIP_CODE})`} />
        {item.HMPG_ADRES && (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#8b95a1]">홈페이지 주소</span>
            <a
              href={
                item.HMPG_ADRES.startsWith("http") ? item.HMPG_ADRES : `http://${item.HMPG_ADRES}`
              }
              target="_blank"
              rel="noreferrer"
              className="truncate text-sm font-semibold text-[#3182f6] hover:underline"
            >
              {item.HMPG_ADRES}
            </a>
          </div>
        )}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-[#e5e8eb]">
        <KakaoMiniMap x={String(item.LGTUD)} y={String(item.LTTUD)} />
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
