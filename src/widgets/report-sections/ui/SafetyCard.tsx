import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  fullName: string;
  grade: string;
  crimePer100k: number | null;
};

export function SafetyCard({ fullName, grade, crimePer100k }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>치안</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-slate-700">
        <p>기준 지역: {fullName || "매칭 실패"}</p>
        <div className="flex items-center gap-2">
          <span>등급:</span>
          <Badge className="border-slate-300 bg-slate-50">{grade}</Badge>
        </div>
        <p>인구 10만명당 범죄: {crimePer100k ?? "N/A"}</p>
      </CardContent>
    </Card>
  );
}
