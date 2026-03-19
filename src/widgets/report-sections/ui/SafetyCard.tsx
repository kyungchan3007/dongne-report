import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  fullName: string;
  grade: string;
  crimePer100k: number | null;
};

function gradeTone(grade: string): string {
  if (grade.includes("1") || grade.toLowerCase().includes("a")) {
    return "border-[#b9dbff] bg-[#e9f2ff] text-[#1b64da]";
  }
  if (grade.includes("2") || grade.toLowerCase().includes("b")) {
    return "border-[#cde8d7] bg-[#eefaf2] text-[#0f8f4f]";
  }
  return "border-[#f1ddba] bg-[#fff7e9] text-[#b26a00]";
}

export function SafetyCard({ fullName, grade, crimePer100k }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>치안</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-[#4e5968]">
        <p>기준 지역: {fullName || "매칭 실패"}</p>
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#191f28]">등급</span>
          <Badge className={gradeTone(grade)}>{grade}</Badge>
        </div>
        <p>인구 10만 명당 범죄: {crimePer100k ?? "N/A"}</p>
      </CardContent>
    </Card>
  );
}
