import { Shield } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e5f9f0]">
            <Shield size={16} className="text-[#00b493]" />
          </span>
          <CardTitle>치안</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl bg-[#f9fafb] p-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            기준 지역
          </p>
          <p className="text-sm font-medium text-[#191f28]">{fullName || "매칭 실패"}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#191f28]">안전 등급</span>
            <Badge className={gradeTone(grade)}>{grade}</Badge>
          </div>
        </div>

        <div className="rounded-xl bg-[#f9fafb] p-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            인구 10만 명당 범죄
          </p>
          <p className="text-lg font-bold text-[#191f28]">
            {crimePer100k !== null ? crimePer100k.toLocaleString() : "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

