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
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-600">{address || "주소 정보 없음"}</p>
        <KakaoMiniMap x={x} y={y} />
      </CardContent>
    </Card>
  );
}
