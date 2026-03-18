import { SchoolInfoListItemApi51 } from "@/entities/school/model/SchoolType";

export const RenderAp51 = (item: SchoolInfoListItemApi51) => {
  return (
    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
      <p>{item.SCHUL_NM}</p>
      <p>{item.ADRCD_NM}</p>
      <p>{item.ATPT_OFCDC_ORG_NM}</p>
      <p>{item.JU_ORG_NM}</p>
      <p>{item.BEAGE_BOY_FGR}</p>
      <p>{item.BEAGE_GIR_FGR}</p>
      <p>{item.SUBEAGE_BOY_FGR}</p>
      <p>{item.SUBEAGE_BOY_FGR_R}</p>
    </div>
  );
};
