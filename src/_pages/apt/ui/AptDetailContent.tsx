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
    <section className="space-y-4">
      <AptSummaryCard
        name={report.place.name}
        address={report.place.address}
        x={report.place.x}
        y={report.place.y}
      />
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
    </section>
  );
}
