"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, Building2, FileDown } from "lucide-react";

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
    icon: Building2,
    color: "#e8f3ff",
    iconColor: "#3182f6",
    title: "단지 상세 분석",
    description: "세대수, 연식, 용적률, 건폐율 등 단지의 핵심 정보를 확인합니다.",
  },
  {
    icon: BarChart3,
    color: "#e5f9f0",
    iconColor: "#00b493",
    title: "실거래가 추이",
    description: "최근 실거래 데이터와 기준년 대비 흐름을 빠르게 파악할 수 있습니다.",
  },
  {
    icon: BookOpen,
    color: "#fff0e8",
    iconColor: "#f06000",
    title: "주변 인프라",
    description: "학교, 교통, 보육, 편의시설, 공원 등 생활 편의 지표를 종합 분석합니다.",
  },
  {
    icon: FileDown,
    color: "#f5f0ff",
    iconColor: "#7248d9",
    title: "리포트 다운로드",
    description: "분석 결과를 PDF로 저장하고 공유할 수 있어 상담 및 비교가 쉽습니다.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function MapSearchPage() {
  return (
    <section className="relative left-1/2 my-[-24px] h-[calc(100dvh-56px)] w-screen -translate-x-1/2 overflow-y-auto overflow-x-hidden sm:my-[-32px]">
      {/* 배경 */}
      <div className="pointer-events-none absolute inset-0 bg-[#f8fafb]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:40px_40px]" />

      <motion.div
        className="relative mx-auto flex h-full max-w-4xl flex-col justify-evenly gap-5 px-4 py-6 sm:gap-6 sm:px-8 sm:py-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* 히어로 섹션 */}
        <motion.div variants={itemVariants} className="space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e8eb] bg-white px-3 py-1 text-xs font-semibold text-[#4e5968] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00b493]" />
            실시간 데이터 업데이트 중
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#191f28] sm:text-5xl">
            내 아파트의
            <br />
            <span className="text-[#3182f6]">모든 것</span>을 꺼내보세요
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-6 text-[#6b7684]">
            아파트명이나 오피스텔명을 검색하면 실거래가, 단지 정보, 입지 환경까지 한 번에
            보여줍니다.
          </p>
        </motion.div>

        {/* 검색 박스 */}
        <motion.div
          variants={itemVariants}
          className="mx-auto w-full max-w-3xl space-y-3 rounded-2xl border border-[#e5e8eb] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        >
          <AptSearchBox />
          <div className="flex flex-wrap gap-2">
            {quickKeywords.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#e5e8eb] bg-[#f8fafb] px-3 py-1 text-xs font-medium text-[#6b7684]"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#e5e8eb] bg-white p-3 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            >
              <p className="text-xl font-extrabold tracking-tight text-[#191f28] sm:text-2xl">
                {item.value}
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#8b95a1]">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid gap-3 sm:grid-cols-2">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-[#e5e8eb] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <span
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={17} style={{ color: item.iconColor }} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#191f28]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#6b7684]">{item.description}</p>
                </div>
              </article>
            );
          })}
        </motion.div>

        {/* CTA 배너 */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-[#191f28] px-6 py-6 text-center text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7684]">
            동네 리포트
          </p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            지금 바로 검색해보세요
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
}

