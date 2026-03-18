import { SchoolInfoListItemApi63 } from "@/entities/school/model/SchoolType";

export const RenderAp63 = (item: SchoolInfoListItemApi63) => {
  return (
    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
      <p>{item.COL_M1}</p>
      <p>{item.COL_W1}</p>
      <p>{item.COL_M2}</p>
      <p>{item.COL_W2}</p>
      <p>{item.COL_M3}</p>
      <p>{item.COL_W3}</p>
      <p>{item.COL_M4}</p>
      <p>{item.COL_W4}</p>
      <p>{item.COL_M5}</p>
      <p>{item.COL_W5}</p>
      <p>{item.COL_M6}</p>
      <p>{item.COL_W6}</p>
      <p>{item.COL_MSUM}</p>
      <p>{item.COL_WSUM}</p>
      <p>{item.SUM}</p>
    </div>
  );
};
