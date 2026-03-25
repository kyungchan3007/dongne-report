"use client";

import { AnimatePresence, motion } from "framer-motion";

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

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" as const } },
};

export function AptDetailPage({ placeId, x, y, name, address }: Props) {
  const { selectedSchool, setSelectedSchool } = useSchoolClickHooks();
  const reportQuery = useNeighborhoodReport({ placeId, x, y, name, address });

  const stateKey = reportQuery.isLoading ? "loading" : reportQuery.error ? "error" : "content";

  return (
    <AnimatePresence mode="wait">
      {reportQuery.isLoading && (
        <motion.div key="loading" {...pageVariants}>
          <AptDetailLoading />
        </motion.div>
      )}

      {!reportQuery.isLoading && (reportQuery.error || !reportQuery.data) && (
        <motion.div key="error" {...pageVariants}>
          <AptDetailError message={(reportQuery.error as Error | null)?.message} />
        </motion.div>
      )}

      {!reportQuery.isLoading && reportQuery.data && (
        <motion.div key={`content-${stateKey}`} {...pageVariants}>
          <AptDetailContent
            report={reportQuery.data}
            selectedSchool={selectedSchool}
            setSelectedSchool={setSelectedSchool}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
