import {MapPin} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { KakaoMiniMap } from "@/widgets/kakao-map/ui/KakaoMiniMap";
import {NeighborhoodReport, SummaryTagKey} from "@/entities/report/model/types";
import {AptInfraTag} from "@/features/apt-infra";

export type MapMarker = {
  x: string;
  y: string;
  title: string;
  marker:string;
};

type Props = {
  x: string;
  y: string;
  report: NeighborhoodReport;
  onTagClick?: (key: SummaryTagKey) => void;
  markers: MapMarker[];
};


export function AptSummaryCard({ report, x, y ,onTagClick,markers}: Props) {
  console.log(markers)
  return (
    <Card className="overflow-hidden border-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f3ff] px-2.5 py-1 text-xs font-semibold text-[#3182f6]">
            <MapPin size={11} strokeWidth={2.5} />
            선택한 단지
          </span>
          <CardTitle className="text-lg">{report.place.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-[#4e5968]">{report.place.address || "주소 정보가 없습니다."}</p>
        <AptInfraTag onTagClick={onTagClick} />
        <KakaoMiniMap x={x} y={y} markers={markers} />
      </CardContent>
    </Card>
  );
}
