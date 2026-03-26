import { Bus, Car, Clock, MapPinned, Timer, Train } from "lucide-react";

import { ReportCarDistance, ReportPoi } from "@/entities/report/model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  subwayTop3: ReportPoi[];
  busCount: number;
  busTop5: ReportPoi[];
  distance: ReportCarDistance;
};

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "-";

  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}분`;
  return `${hours}시간 ${minutes}분`;
}

export function TransportCard({ subwayTop3, busCount, busTop5, distance }: Props) {
  const waypoints = distance.waypoints ?? [];
  const destinationName = distance.destination?.name ?? "강남역";
  const distanceLabel = distance.distance ? `${distance.distance}km` : "-";

  const timeSlots = [
    { label: "지금 출발", value: formatDuration(distance.durationSec.now) },
    { label: "오전 8시 출발", value: formatDuration(distance.durationSec.morning8) },
    { label: "오후 12시 출발", value: formatDuration(distance.durationSec.noon12) },
    { label: "오후 7시 출발", value: formatDuration(distance.durationSec.evening19) },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f3ff]">
            <Train size={16} className="text-[#3182f6]" />
          </span>
          <CardTitle>교통</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl bg-[#f9fafb] p-3">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            지하철 Top 3 (1km)
          </p>
          <ul className="space-y-1.5">
            {subwayTop3.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-sm text-[#191f28]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3182f6]" />
                {item.name}
              </li>
            ))}
            {!subwayTop3.length && <li className="text-sm text-[#b0b8c1]">데이터가 없습니다.</li>}
          </ul>
        </div>

        <div className="rounded-xl bg-[#f9fafb] p-3">
          <div className="mb-2.5 flex items-center gap-2">
            <Bus size={13} className="text-[#4e5968]" />
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
              버스정류장 (1km)
            </p>
            <span className="ml-auto rounded-full bg-[#e8f3ff] px-2 py-0.5 text-xs font-bold text-[#3182f6]">
              총 {busCount}개
            </span>
          </div>
          <ul className="space-y-1.5">
            {busTop5.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-sm text-[#191f28]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4e5968]" />
                {item.name}
              </li>
            ))}
            {!busTop5.length && <li className="text-sm text-[#b0b8c1]">데이터가 없습니다.</li>}
          </ul>
        </div>

        <div className="rounded-xl bg-[#f9fafb] p-3">
          <div className="flex items-center gap-2">
            <Car size={13} className="text-[#4e5968]" />
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
              {`${destinationName} (${distanceLabel})`}
            </p>

            <div className="group relative ml-auto">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full bg-[#e8f3ff] px-2 py-0.5 text-xs font-bold text-[#3182f6]"
              >
                <MapPinned size={12} />
                {`경유지 ${waypoints.length}개`}
              </button>

              <div className="pointer-events-none invisible absolute right-0 top-full z-20 mt-2 w-52 rounded-xl border border-[#e5e8eb] bg-white p-2.5 opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#8b95a1]">
                  경유지 목록
                </p>
                <ul className="space-y-1.5">
                  {waypoints.map((item) => (
                    <li
                      key={`${item.name}-${item.x}-${item.y}`}
                      className="truncate text-xs font-medium text-[#4e5968]"
                    >
                      {item.name}
                    </li>
                  ))}
                  {!waypoints.length && <li className="text-xs text-[#b0b8c1]">경유지 없음</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#f9fafb] p-3">
          <div className="mb-2.5 flex items-center gap-2">
            <Clock size={13} className="text-[#4e5968]" />
            <span className={"flex-col"}>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
                소요시간
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8b95a1]">
                예상시간이오니 정확하지 않을수 있습니다.
              </p>
            </span>
          </div>
          <ul className="space-y-1.5 list-none pl-0 m-0">
            {timeSlots.map((slot) => (
              <li
                key={slot.label}
                className="flex items-center justify-between text-sm text-[#191f28]"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3182f6]" />
                  {slot.label}
                </span>

                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full bg-[#e8f3ff] px-2 py-0.5 text-xs font-bold text-[#3182f6]"
                >
                  <Timer size={12} />
                  {`${slot.value}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
