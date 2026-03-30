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
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3EEFF]">
            <Hospital size={16} className="text-[#8B5CF6]" />
          </span>
          <CardTitle>주변 병원 시설</CardTitle>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            성형외과,일반의원,피부과,한방병원은 제공하지 않습니다.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#F3EEFF] px-3 py-1 text-xs font-semibold text-[#8B5CF6]">
            병원 시설 (1km) 총 {count}개
          </span>
        </div>

        {hospital.map((item) => (
          <div className="rounded-xl bg-[#f9fafb] p-3">
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
      </CardContent>
    </Card>
  );
}
