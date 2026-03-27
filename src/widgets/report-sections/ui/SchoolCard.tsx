import { ChevronRight, Footprints, GraduationCap, PersonStanding, Timer } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import type { ReportPoi } from "@/entities/report/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { SchoolInfoModal } from "@/widgets/school-detail/ui/SchoolinfoModal";

type Props = {
  count: number;
  mappedCount: number;
  unmappedCount: number;
  top10: ReportPoi[];
  setSelectedSchool: Dispatch<SetStateAction<ReportPoi | null>>;
  selectedSchool: ReportPoi | null;
};

export function SchoolCard({
  count,
  mappedCount,
  unmappedCount,
  top10,
  setSelectedSchool,
  selectedSchool,
}: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff0e8]">
              <GraduationCap size={16} className="text-[#f06000]" />
            </span>
            <CardTitle>학군</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 요약 배지 */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-semibold text-[#f06000]">
              학교 (1.5km) 총 {count}개
            </span>
            {/*<span className="rounded-full bg-[#e8f3ff] px-3 py-1 text-xs font-semibold text-[#3182f6]">*/}
            {/*  코드 매핑 {mappedCount}개*/}
            {/*</span>*/}
            {/*<span className="rounded-full bg-[#f9fafb] px-3 py-1 text-xs font-semibold text-[#8b95a1]">*/}
            {/*   {unmappedCount}개*/}
            {/*</span>*/}
          </div>

          {/* 학교 목록 */}
          <ul className="space-y-2">
            {top10.map((item) => {
              const disabled = !item.schoolCode;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedSchool(item)}
                    disabled={disabled}
                    className={`group w-full rounded-xl border p-3 text-left transition-all duration-150 ${
                      disabled
                        ? "cursor-not-allowed border-[#f2f4f6] bg-[#f9fafb] opacity-60"
                        : "border-[#e5e8eb] bg-white hover:border-[#3182f6] hover:bg-[#f8fbff]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#191f28]">{item.name}</p>
                        <p className="mt-0.5 truncate text-xs text-[#6b7684]">
                          {item.roadAddress || item.address}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-[#6b7684] flex items-center gap-2">
                          <li className="flex items-center justify-between text-sm text-[#191f28]">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 rounded-full bg-[#fff0e8] px-2 py-0.5 text-xs font-bold text-[#f06000]"
                            >
                              <Footprints size={12} />
                              {item.distance} km
                            </button>
                          </li>
                        </p>

                        {disabled && (
                          <p className="mt-1 text-xs font-medium text-[#f04452]">
                            학교 코드 없음 · 상세 조회 불가
                          </p>
                        )}
                      </div>
                      {!disabled && (
                        <ChevronRight
                          size={16}
                          className="flex-shrink-0 text-[#b0b8c1] transition-colors group-hover:text-[#3182f6]"
                        />
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
            {!top10.length && <li className="py-2 text-sm text-[#b0b8c1]">데이터가 없습니다.</li>}
          </ul>
        </CardContent>
      </Card>

      <SchoolInfoModal
        open={!!selectedSchool}
        address={selectedSchool?.address ?? ""}
        schoolName={selectedSchool?.name ?? ""}
        schoolCode={selectedSchool?.schoolCode ?? ""}
        onClose={() => setSelectedSchool(null)}
      />
    </>
  );
}
