import type { ReportPoi } from "@/entities/report/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {Dispatch, SetStateAction} from "react";
import {SchoolInfoModal} from "@/widgets/school-detail/ui/SchoolinfoModal";

type Props = {
  count: number;
  mappedCount: number;
  unmappedCount: number;
  top10: ReportPoi[];
  setSelectedSchool:Dispatch<SetStateAction<ReportPoi | null>>
  selectedSchool: ReportPoi | null;
};

export function SchoolCard({ count, mappedCount, unmappedCount, top10 , setSelectedSchool , selectedSchool }: Props) {
    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>학교</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
                <p>학교 (1.5km): 총 {count}개</p>
                <p>
                    코드 매핑: {mappedCount}개 / 미매핑: {unmappedCount}개
                </p>
                <ul className="space-y-1">
                    {top10.map((item) => (
                        <li key={item.id} className="rounded border p-2">
                            <button
                                type="button"
                                // disabled={!item.schoolCode}
                                onClick={() => setSelectedSchool(item)}
                                className="w-full text-left  disabled:opacity-60"
                            >
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.roadAddress || item.address}</div>
                                <div className="text-xs">schoolCode: {item.schoolCode ?? "N/A"}</div>
                                {!item.schoolCode ? (
                                    <div className="text-xs text-amber-600">코드 미매핑으로 상세 조회 불가</div>
                                ) : null}
                            </button>
                        </li>
                    ))}
                    {!top10.length ? <li>데이터 없음</li> : null}
                </ul>
            </CardContent>
        </Card>

    <SchoolInfoModal
        open={!!selectedSchool}
        schoolName={selectedSchool?.name ?? ""}
        schoolCode={selectedSchool?.schoolCode ?? ""}
        onClose={() => setSelectedSchool(null)}
    />
        </>
    );
}
