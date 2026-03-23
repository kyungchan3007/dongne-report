import { Skeleton } from "@/shared/ui/skeleton";

export function AptDetailLoading() {
  return (
    <div className="space-y-6">
      {/* 상단 로딩 카드 */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#e5e8eb] bg-white py-14 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="toss-spinner" />
        <p className="mt-5 text-sm font-semibold text-[#191f28]">리포트를 분석하는 중...</p>
        <p className="mt-1.5 text-xs text-[#b0b8c1]">
          주변 학교, 교통, 치안 정보를 수집하고 있어요
        </p>

        {/* 진행 단계 표시 */}
        <div className="mt-6 flex items-center gap-2">
          {["단지 정보", "교통", "학군", "치안"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && <span className="h-px w-4 bg-[#e5e8eb]" />}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full bg-[#3182f6]"
                  style={{
                    opacity: 0.3 + i * 0.2,
                    animation: `toss-spin ${0.8 + i * 0.15}s ease-in-out ${i * 0.2}s infinite alternate`,
                  }}
                />
                <span className="text-[10px] text-[#b0b8c1]">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 스켈레톤 카드들 */}
      <Skeleton className="h-52 w-full" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-44 w-full" />
      </div>
    </div>
  );
}

