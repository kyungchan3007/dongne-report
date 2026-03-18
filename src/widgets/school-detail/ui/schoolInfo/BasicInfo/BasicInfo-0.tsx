import type { SchoolInfoListItemApi0 } from "@/entities/school/model/SchoolType";

export const RenderApi0 = (item: SchoolInfoListItemApi0) => {
  return (
    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
      <p>{item.ABSCH_YN}</p>
      <p>{item.SCHUL_NM}</p>
      <p>{item.ADRES_BRKDN}</p>
      <p>{item.SCHUL_RDNMA}</p>
      <p>{item.ATPT_OFCDC_ORG_NM}</p>
      <p>{item.JU_ORG_NM}</p>
      <p>{item.COEDU_SC_CODE}</p>
      <p>{item.DGHT_SC_CODE}</p>
      <p>{item.HMPG_ADRES}</p>
      <p>{item.USER_TELNO}</p>
      <p>{item.ZIP_CODE}</p>
      <p>{item.PERC_FAXNO}</p>
    </div>
  );
};
