import type { SchoolInfoListItemApi08 } from "@/entities/school/model/SchoolType";

export const RenderApi08 = (item: SchoolInfoListItemApi08) => {
  return (
    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
      <p>{item.SCHUL_NM}</p>
      <p>{item.PER_STUDAY_DAY}</p>
      <p>{item.WEEK_TOT_ITRT_HR_FGR}</p>
      <p>{item.ITRT_TCR_TOT_FGR}</p>
      <p>{item.COL_1}</p>
      <p>{item.COL_2}</p>
      <p>{item.COL_3}</p>
      <p>{item.COL_4}</p>
      <p>{item.COL_5}</p>
      <p>{item.COL_6}</p>
    </div>
  );
};
