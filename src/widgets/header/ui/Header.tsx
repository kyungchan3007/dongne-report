"use client";

import { Home, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e8eb] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* 로고 */}
        <Link href="/" className="inline-flex items-center gap-2 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#3182f6] text-white shadow-[0_2px_8px_rgba(49,130,246,0.4)] transition-transform group-hover:scale-105">
            <Home size={15} strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-bold text-[#191f28] tracking-tight">
            동네리포트
          </span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              pathname === "/"
                ? "bg-[#e8f3ff] text-[#3182f6]"
                : "text-[#4e5968] hover:bg-[#f2f4f6] hover:text-[#191f28]"
            }`}
          >
            <MapPin size={14} strokeWidth={2} />
            검색
          </Link>
          <Link
            href="/about"
            className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              pathname === "/about"
                ? "bg-[#e8f3ff] text-[#3182f6]"
                : "text-[#4e5968] hover:bg-[#f2f4f6] hover:text-[#191f28]"
            }`}
          >
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}

