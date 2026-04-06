import {Baby, GraduationCap, Hospital, MapPin, Train, University} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { KakaoMiniMap } from "@/widgets/kakao-map/ui/KakaoMiniMap";

type Props = {
  name: string;
  address: string;
  x: string;
  y: string;
};

const summaryTags = [
  {
    label: "보육",
    icon: Baby,
    className:
      "bg-[#fff0f0] text-[#f04452] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] hover:bg-[#ffe4e6] hover:shadow-[0_2px_10px_rgba(240,68,82,0.16)]",
  },
  {
    label: "교통",
    icon: Train,
    className:
      "bg-[#e8f3ff] text-[#3182f6] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#dbeafe] hover:shadow-[0_2px_10px_rgba(49,130,246,0.16)]",
  },
  {
    label: "병원",
    icon: Hospital,
    className:
      "bg-[#f3eeff] text-[#8b5cf6] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#ede9fe] hover:shadow-[0_2px_10px_rgba(139,92,246,0.16)]",
  },
  {
    label: "학원",
    icon: University,
    className:
      "bg-[#e0e7ff] text-[#4f46e5] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#dbeafe] hover:shadow-[0_2px_10px_rgba(79,70,229,0.16)]",
  },
  {
    label: "학교",
    icon: GraduationCap,
    className:
      "bg-[#fff0e8] text-[#f06000] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#ffedd5] hover:shadow-[0_2px_10px_rgba(240,96,0,0.16)]",
  },
] as const;

export function AptSummaryCard({ name, address, x, y }: Props) {
  return (
    <Card className="overflow-hidden border-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
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
        <div className="flex flex-1 flex-wrap gap-2">
          {summaryTags.map(({ label, icon: Icon, className }) => (
            <span
              key={label}
              className={[
                "inline-flex items-center gap-2 rounded-2xl border border-white/70 px-3 py-1.5 text-sm font-medium",
                "transition-all duration-200 hover:cursor-pointer",
                className,
              ].join(" ")}
            >
              <Icon size={16} strokeWidth={2.2} />
              <span>{label}</span>
            </span>
          ))}
        </div>
        <KakaoMiniMap x={x} y={y} />
      </CardContent>
    </Card>
  );
}
