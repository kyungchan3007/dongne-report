import type { ParsedSchoolInfoResult } from "@/entities/school/model/SchoolType";
import { RenderApi0 } from "@/widgets/school-detail/ui/schoolInfo/BasicInfo/BasicInfo-0";
import { RenderApi08 } from "@/widgets/school-detail/ui/schoolInfo/classstatus/RenderApi08";
import { RenderAp62 } from "@/widgets/school-detail/ui/schoolInfo/Schoolstatus/SchoolStatus-62";
import { RenderAp63 } from "@/widgets/school-detail/ui/schoolInfo/StudentStatus/StudentStatus63";
import { RenderAp09 } from "@/widgets/school-detail/ui/schoolInfo/Grade-classStudentStatus/Grade-classStudentStatus";
import { RenderAp94 } from "@/widgets/school-detail/ui/schoolInfo/College-lifelongEducationResult/College-LifelongEducationResult";
import { RenderAp51 } from "@/widgets/school-detail/ui/schoolInfo/AdmissionStatus/AdmissionStatus";
import { RenderAp73 } from "@/widgets/school-detail/ui/schoolInfo/uniformStatus/uniformStatus";

export const SchoolRenderSelected = (result: ParsedSchoolInfoResult) => {
  if (!result.selectedItem) {
    return (
      <pre className="mt-2 max-h-60 overflow-auto rounded bg-slate-50 p-2 text-xs">
        {result.raw}
      </pre>
    );
  }

  if (result.apiType === "0") {
    return <RenderApi0 {...result.selectedItem} />;
  }
  if (result.apiType === "08") {
    return <RenderApi08 {...result.selectedItem} />;
  }
  if (result.apiType === "62") {
    return <RenderAp62 {...result.selectedItem} />;
  }
  if (result.apiType === "63") {
    return <RenderAp63 {...result.selectedItem} />;
  }
  if (result.apiType === "09") {
    return <RenderAp09 {...result.selectedItem} />;
  }
  if (result.apiType === "94") {
    return <RenderAp94 {...result.selectedItem} />;
  }
  if (result.apiType === "51") {
    return <RenderAp51 {...result.selectedItem} />;
  }
  if (result.apiType === "73") {
    return <RenderAp73 {...result.selectedItem} />;
  }
};
