import { AptSearchBox } from "@/features/search-apt/ui/AptSearchBox";

const quickKeywords = ["래미안 퍼스티지", "반포자이", "아크로리버파크", "올림픽파크포레온"];

const stats = [
  { value: "48,200+", label: "등록 단지" },
  { value: "1,200만+", label: "분석 데이터" },
  { value: "32만명", label: "월간 사용자" },
  { value: "실시간", label: "데이터 주기" },
];

const features = [
  {
    icon: <img src={"/images/aptDetail.svg"} alt="map" />,
    title: "단지 상세 분석",
    description: "세대수, 연식, 용적률, 건폐율 등 단지의 핵심 정보를 확인합니다.",
  },
  {
    icon: <img src={"/images/trans.svg"} alt="map" />,
    title: "실거래가 추이",
    description: "최근 실거래 데이터와 기준년 대비 흐름을 빠르게 파악할 수 있습니다.",
  },
  {
    icon: <img src={"/images/infra.svg"} alt="map" />,
    title: "주변 인프라",
    description: "학교, 교통, 보육, 편의시설, 공원 등 생활 편의 지표를 종합 분석합니다.",
  },
  {
    icon: <img src={"/images/InfoButtonImg.svg"} alt="map" />,
    title: "리포트 다운로드",
    description: "분석 결과를 PDF로 저장하고 공유할 수 있어 상담 및 비교가 쉽습니다.",
  },
];

export function MapSearchPage() {
  return (
    <section className="relative left-1/2 my-[-24px] h-[calc(100dvh-65px)] w-screen -translate-x-1/2 overflow-hidden sm:my-[-32px]">
      <div className="pointer-events-none absolute inset-0 bg-[#f7fbff]" />
      <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(to_right,#dce7f5_1px,transparent_1px),linear-gradient(to_bottom,#dce7f5_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative mx-auto flex h-full max-w-4xl flex-col justify-evenly gap-5 px-4 py-4 sm:gap-6 sm:px-8 sm:py-6">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center rounded-full border border-[#dce7f5] bg-white px-3 py-1 text-xs font-semibold text-[#4e5968]">
            실시간 데이터 업데이트 중
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#191f28] sm:text-5xl">
            내 아파트의
            <br />
            모든 것을 꺼내보세요
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-[#4e5968]">
            아파트명이나 오피스텔명을 검색하면 실거래가, 단지 정보, 입지 환경까지 한 번에
            보여줍니다.
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl space-y-3 rounded-3xl border border-[#dce7f5] bg-white/95 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.07)]">
          <AptSearchBox />
          <div className="flex flex-wrap justify-center gap-2">
            {quickKeywords.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#dce7f5] bg-[#f8fbff] px-3 py-1 text-xs font-semibold text-[#4e5968]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#dce7f5] bg-white p-3 text-center shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
            >
              <p className="text-xl font-extrabold tracking-tight text-[#191f28] sm:text-2xl">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#6b7684]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#dce7f5] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
            >
              <div className={"flex items-center gap-2"}>
                <div className={"flex-[0.15]"}>
                  <h3 className="text-sm font-bold text-[#191f28] sm:text-base">{item.icon}</h3>
                </div>

                <h3 className="text-sm font-bold text-[#191f28] sm:text-base">{item.title}</h3>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[#4e5968] sm:text-sm">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl bg-[#191f28] px-6 py-6 text-center text-white shadow-[0_24px_50px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b95a1]">
            동네 리포트
          </p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            지금 바로 검색해보세요
          </h3>
        </div>
      </div>
    </section>
  );
}
