"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

import type { NeighborhoodReport, ReportPoi } from "@/entities/report/model/types";
import { AptSummaryCard } from "@/widgets/apt-summary/ui/AptSummaryCard";
import { ChildcareCard } from "@/widgets/report-sections/ui/ChildcareCard";
import { SafetyCard } from "@/widgets/report-sections/ui/SafetyCard";
import { SchoolCard } from "@/widgets/report-sections/ui/SchoolCard";
import { TransportCard } from "@/widgets/report-sections/ui/TransportCard";
import { AcademyCard } from "@/widgets/report-sections/ui/AcademyCard";
import { InfraCard } from "@/widgets/report-sections/ui/infraCard";
import {useReportSectionSelection} from "@/pages/apt/hooks/useReportSection";
import {usePinHooks} from "@/features/apt-infra/hooks/usePinHooks";

type Props = {
  report: NeighborhoodReport;
  selectedSchool: ReportPoi | null;
  setSelectedSchool: Dispatch<SetStateAction<ReportPoi | null>>;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export function AptDetailContent({ report, selectedSchool, setSelectedSchool }: Props) {
  const { selectedSection,handleTagClick } = useReportSectionSelection(report);
  const { markers } = usePinHooks({ selectedSection });


  return (
    <motion.section
      className="space-y-5 sm:space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <AptSummaryCard
            report={report}
            x={report.place.x}
            y={report.place.y}
            onTagClick={handleTagClick}
            markers={markers}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="rounded-2xl border border-[#e5e8eb] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:px-6 sm:py-5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b95a1]">
          Neighborhood
        </p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight text-[#191f28] sm:text-2xl">
          생활권 상세 리포트
        </h1>
        <p className="mt-2 text-sm text-[#4e5968]">
          각 항목을 눌러 주요 포인트를 빠르게 확인하세요.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-4">
        <SafetyCard
          fullName={report.safety.fullName}
          grade={report.safety.grade}
          crimePer100k={report.safety.crimePer100k}
        />
        <ChildcareCard count={report.childcare.count} top5={report.childcare.top5} />
        <TransportCard
          subwayTop3={report.transport.subwayTop3}
          busCount={report.transport.busCount}
          busTop5={report.transport.busTop5}
          distance={report.carDistance}
        />
        <InfraCard
          count={report.hospital.count}
          pharmacy={report.pharmacy.place}
          hospital={report.hospital.place}
        />
        <AcademyCard count={report.academy.count} academy={report.academy.place} />
        <SchoolCard
          count={report.schools.count}
          mappedCount={report.schools.mappedCount}
          unmappedCount={report.schools.unmappedCount}
          top10={report.schools.top10}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
      </motion.div>
    </motion.section>
  );
}
