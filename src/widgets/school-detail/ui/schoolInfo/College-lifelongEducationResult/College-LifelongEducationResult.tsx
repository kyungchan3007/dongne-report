import { SchoolInfoListItemApi94 } from "@/entities/school/model/SchoolType";

export const RenderAp94 = (item: SchoolInfoListItemApi94) => {
  return (
    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
      <p>{item.SCHUL_NM}</p>
      <p>{item.ADRCD_NM}</p>
      <p>{item.ATPT_OFCDC_ORG_NM}</p>
      <p>{item.JU_ORG_NM}</p>
      <p>{item.SEM_SC_NM}</p>
      <p>{item.FRL_CURR_ITRT_TM}</p>
      <p>{item.NN_FRL_CURR_ITRT_TM}</p>
      <p>{item.TOT_AVG_TM}</p>
      <p>{item.PTPT_NMPR_FGR1}</p>
      <p>{item.PTPT_NMPR_PER1}</p>
      <p>{item.PTPT_NMPR_FGR2}</p>
      <p>{item.PTPT_NMPR_PER2}</p>
      <p>{item.ATMY_LEGAL_NMPR_FGR1}</p>
      <p>{item.ATMY_LEGAL_NMPR_FGR2}</p>
      <p>{item.SMAGE_CNSL_NMPR_FGR1}</p>
      <p>{item.SMAGE_CNSL_NMPR_FGR2}</p>
      <p>{item.SMAGE_MDAT_NMPR_FGR1}</p>
      <p>{item.SMAGE_MDAT_NMPR_FGR2}</p>
    </div>
  );
};
