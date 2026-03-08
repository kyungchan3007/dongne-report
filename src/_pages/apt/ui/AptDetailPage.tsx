"use client";

import { useSchoolClickHooks } from "@/features/school-details/hooks/useSchoolClickHooks";
import { useNeighborhoodReport } from "@/pages/apt/model/useNeighborhoodReport";
import { AptDetailContent } from "@/pages/apt/ui/AptDetailContent";
import { AptDetailError } from "@/pages/apt/ui/AptDetailError";
import { AptDetailLoading } from "@/pages/apt/ui/AptDetailLoading";

type Props = {
  placeId: string;
  x?: string;
  y?: string;
  name?: string;
  address?: string;
};

export function AptDetailPage({ placeId, x, y, name, address }: Props) {
  const { selectedSchool, setSelectedSchool } = useSchoolClickHooks();
  const reportQuery = useNeighborhoodReport({ placeId, x, y, name, address });

  if (reportQuery.isLoading) {
    return <AptDetailLoading />;
  }

  if (reportQuery.error || !reportQuery.data) {
    return <AptDetailError message={(reportQuery.error as Error | null)?.message} />;
  }

  return (
    <AptDetailContent
      report={reportQuery.data}
      selectedSchool={selectedSchool}
      setSelectedSchool={setSelectedSchool}
    />
  );
}
