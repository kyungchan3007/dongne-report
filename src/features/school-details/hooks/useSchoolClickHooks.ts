import {useState} from "react";
import {ReportPoi} from "@/entities/report/model/types";

export const useSchoolClickHooks = () => {
    const [selectedSchool, setSelectedSchool] = useState<ReportPoi | null>(null);
    return {
        selectedSchool,
        setSelectedSchool,
    }
}