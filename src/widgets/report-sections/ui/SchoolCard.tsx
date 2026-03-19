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
          <CardTitle>학군</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-[#4e5968]">
          <div className="rounded-2xl bg-[#f8fbff] p-3">
            <p>학교 (1.5km): 총 {count}개</p>
            <p className="mt-1">코드 매핑 {mappedCount}개 / 미매핑 {unmappedCount}개</p>
          </div>

          <ul className="space-y-2">
            {top10.map((item) => {
              const disabled = !item.schoolCode;
              return (
                <li key={item.id} className="rounded-2xl border border-[#e6eef9] bg-white p-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSchool(item)}
                    disabled={disabled}
                    className="w-full text-left disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <p className="text-sm font-semibold text-[#191f28]">{item.name}</p>
                    <p className="mt-1 text-xs text-[#6b7684]">{item.roadAddress || item.address}</p>
                    <p className="mt-1 text-xs text-[#4e5968]">schoolCode: {item.schoolCode ?? "N/A"}</p>
                    {disabled ? (
                      <p className="mt-1 text-xs font-semibold text-[#b26a00]">
                        학교 코드가 없어 상세 조회가 불가능합니다.
                      </p>
                    ) : null}
                  </button>
                </li>
              );
            })}
            {!top10.length ? <li>데이터가 없습니다.</li> : null}
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
