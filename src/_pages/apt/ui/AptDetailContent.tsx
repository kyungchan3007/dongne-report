import { Dispatch, SetStateAction } from "react";

import type { NeighborhoodReport, ReportPoi } from "@/entities/report/model/types";
import { AptSummaryCard } from "@/widgets/apt-summary/ui/AptSummaryCard";
import { ChildcareCard } from "@/widgets/report-sections/ui/ChildcareCard";
import { SafetyCard } from "@/widgets/report-sections/ui/SafetyCard";
import { SchoolCard } from "@/widgets/report-sections/ui/SchoolCard";
import { TransportCard } from "@/widgets/report-sections/ui/TransportCard";

type Props = {
  report: NeighborhoodReport;
  selectedSchool: ReportPoi | null;
  setSelectedSchool: Dispatch<SetStateAction<ReportPoi | null>>;
};

export function AptDetailContent({ report, selectedSchool, setSelectedSchool }: Props) {
  return (
    <section className="space-y-5 sm:space-y-6">
      <AptSummaryCard
        name={report.place.name}
        address={report.place.address}
        x={report.place.x}
        y={report.place.y}
      />
      <div className="rounded-3xl border border-[#dce7f5] bg-white/85 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b7684]">Neighborhood</p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight text-[#191f28] sm:text-2xl">
          생활권 상세 리포트
        </h1>
        <p className="mt-2 text-sm text-[#4e5968]">각 항목을 눌러 주요 포인트를 빠르게 확인하세요.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SafetyCard
          fullName={report.safety.fullName}
          grade={report.safety.grade}
          crimePer100k={report.safety.crimePer100k}
        />
        <TransportCard
          subwayTop3={report.transport.subwayTop3}
          busCount={report.transport.busCount}
          busTop5={report.transport.busTop5}
        />
        <ChildcareCard count={report.childcare.count} top5={report.childcare.top5} />
        <SchoolCard
          count={report.schools.count}
          mappedCount={report.schools.mappedCount}
          unmappedCount={report.schools.unmappedCount}
          top10={report.schools.top10}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
      </div>
    </section>
  );
}
