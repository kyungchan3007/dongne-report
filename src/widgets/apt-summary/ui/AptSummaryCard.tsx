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
    <Card className="overflow-hidden border-[#dce7f5]">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#e9f2ff] px-3 py-1 text-xs font-semibold text-[#1b64da]">
            선택한 단지
          </span>
          <CardTitle>{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-[#4e5968]">{address || "주소 정보가 없습니다."}</p>
        <KakaoMiniMap x={x} y={y} />
      </CardContent>
    </Card>
  );
}
