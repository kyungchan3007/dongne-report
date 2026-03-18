import { SchoolInfoListItemApi62 } from "@/entities/school/model/SchoolType";

export const RenderAp62 = (item: SchoolInfoListItemApi62) => {
  return (
    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
      <p>{item.SCHUL_NM}</p>
      <p>{item.ADRCD_NM}</p>
      <p>{item.ATPT_OFCDC_ORG_NM}</p>
      <p>{item.COL_FGR_SUM}</p>
      <p>{item.COL_1}</p>
      <p>{item.COL_2}</p>
      <p>{item.COL_3}</p>
      <p>{item.COL_4}</p>
      <p>{item.COL_5}</p>
      <p>{item.COL_6}</p>
      <p>{item.COL_SUM}</p>
      <p>{item.AVG_FGR_SUM}</p>
    </div>
  );
};
