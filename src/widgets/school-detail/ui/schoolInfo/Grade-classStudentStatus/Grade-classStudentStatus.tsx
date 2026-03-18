import { SchoolInfoListItemApi09 } from "@/entities/school/model/SchoolType";

export const RenderAp09 = (item: SchoolInfoListItemApi09) => {
  return (
    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
      <p>{item.SCHUL_NM}</p>
      <p>{item.ADRCD_NM}</p>
      <p>{item.ATPT_OFCDC_ORG_NM}</p>
      <p>{item.JU_ORG_NM}</p>
      <p>{item.COL_C_SUM}</p>
      <p>{item.COL_S_SUM}</p>
      <p>{item.COL_SUM}</p>
      <p>{item.COL_S1}</p>
      <p>{item.COL_C1}</p>
      <p>{item.COL_1}</p>
      <p>{item.COL_S2}</p>
      <p>{item.COL_C2}</p>
      <p>{item.COL_2}</p>
      <p>{item.COL_S3}</p>
      <p>{item.COL_C3}</p>
      <p>{item.COL_3}</p>
      <p>{item.COL_S4}</p>
      <p>{item.COL_C4}</p>
      <p>{item.COL_4}</p>
      <p>{item.COL_S5}</p>
      <p>{item.COL_C5}</p>
      <p>{item.COL_5}</p>
      <p>{item.COL_S6}</p>
      <p>{item.COL_C6}</p>
      <p>{item.COL_6}</p>

      <p>{item.TEACH_CNT}</p>
      <p>{item.TEACH_CAL}</p>
    </div>
  );
};
