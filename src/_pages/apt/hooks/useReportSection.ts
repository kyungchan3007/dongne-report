import { useMemo, useState } from "react";
import {NeighborhoodReport, SelectedSectionType, SummarySectionMap, SummaryTagKey} from "@/entities/report/model/types";

export function useReportSectionSelection(report: NeighborhoodReport) {
    const [activeTag, setActiveTag] = useState<SummaryTagKey | null>(null);

    const selectedSection : SelectedSectionType | null = useMemo(() => {
        if (!activeTag) return null;

        const sectionMap = {
            childcare: report.childcare,
            transport: report.transport,
            hospital: report.hospital,
            academy: report.academy,
            schools: report.schools,
        };

        return sectionMap[activeTag];
    }, [activeTag, report]);

    const handleTagClick = (key: SummaryTagKey) => {
        setActiveTag(key);
    };

    return {
        activeTag,
        selectedSection,
        handleTagClick,
    };
}