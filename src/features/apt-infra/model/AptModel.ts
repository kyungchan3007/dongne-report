import {SummaryTagKey} from "@/entities/report/model/types";
import {Baby, GraduationCap, Hospital, Train, University} from "lucide-react";

export const summaryTags: {
    label: string;
    key: SummaryTagKey;
    icon: typeof Baby;
    className: string;
}[] = [
    {
        label: "보육",
        key: "childcare",
        icon: Baby,
        className:
            "bg-[#fff0f0] text-[#f04452] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] hover:bg-[#ffe4e6] hover:shadow-[0_2px_10px_rgba(240,68,82,0.16)]",
    },
    {
        label: "교통",
        icon: Train,
        key: "transport",
        className:
            "bg-[#e8f3ff] text-[#3182f6] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#dbeafe] hover:shadow-[0_2px_10px_rgba(49,130,246,0.16)]",
    },
    {
        label: "병원",
        icon: Hospital,
        key: "hospital",
        className:
            "bg-[#f3eeff] text-[#8b5cf6] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#ede9fe] hover:shadow-[0_2px_10px_rgba(139,92,246,0.16)]",
    },
    {
        label: "학원",
        icon: University,
        key: "academy",
        className:
            "bg-[#e0e7ff] text-[#4f46e5] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#dbeafe] hover:shadow-[0_2px_10px_rgba(79,70,229,0.16)]",
    },
    {
        label: "학교",
        icon: GraduationCap,
        key: "schools",
        className:
            "bg-[#fff0e8] text-[#f06000] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#ffedd5] hover:shadow-[0_2px_10px_rgba(240,96,0,0.16)]",
    },
];
