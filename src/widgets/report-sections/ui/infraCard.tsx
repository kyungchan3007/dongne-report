import { Car, Hospital, MapPinned, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { KakaoPlace } from "@/entities/kakao/model/types";

type Props = {
  count: number;
  hospital: KakaoPlace[];
  pharmacy: KakaoPlace[];
};

export function InfraCard({ count, hospital, pharmacy }: Props) {
  return (
      <Card className="overflow-hidden border-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3EEFF]">
            <Hospital size={16} className="text-[#8B5CF6]" />
          </span>
          <span className={"flex-col justify-center"}>
            <CardTitle>주변 병원 시설</CardTitle>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
              성형외과,피부과,한방병원은 제공하지 않습니다.
            </p>
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#F3EEFF] px-3 py-1 text-xs font-semibold text-[#8B5CF6]">
            병원 시설 (1km) 총 {count}개
          </span>
        </div>
        <div className={"flex gap-2 w-full"}>
          <div className={"flex flex-1 flex-col gap-2"}>
            {hospital.map((item, _index) => (
              <div key={`${item}-${_index}`} className="rounded-xl bg-[#f9fafb] p-3">
                <div className="flex items-center justify-between gap-2">
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
                      {`${item.place_name}`}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-[#F3EEFF] px-2 py-0.5 text-xs font-bold text-[#8B5CF6]"
                    >
                      {item.category_name.split(">")[2]}
                    </button>
                  </>
                </div>
              </div>
            ))}
          </div>
          <div className={"flex-1 flex flex-col gap-2"}>
            {pharmacy.map((item, _index) => (
              <div key={`${item}-${_index}`} className="rounded-xl bg-[#f9fafb] p-3">
                <div className="flex items-center justify-between gap-2">
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
                      {`${item.place_name}`}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-[#F3EEFF] px-2 py-0.5 text-xs font-bold text-[#8B5CF6]"
                    >
                      {item.category_name.split(">")[1]}
                    </button>
                  </>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
