import { MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { KakaoMiniMap } from "@/widgets/kakao-map/ui/KakaoMiniMap";

type Props = {
  name: string;
  address: string;
  x: string;
  y: string;
};

export function AptSummaryCard({ name, address, x, y }: Props) {
  return (
    <Card className="overflow-hidden ">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f3ff] px-2.5 py-1 text-xs font-semibold text-[#3182f6]">
            <MapPin size={11} strokeWidth={2.5} />
            선택한 단지
          </span>
          <CardTitle className="text-lg">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-[#4e5968]">{address || "주소 정보가 없습니다."}</p>
        <KakaoMiniMap x={x} y={y} />
      </CardContent>
    </Card>
  );
}
