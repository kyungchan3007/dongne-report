import type { Metadata } from "next";

import { Providers } from "@/app/providers";
import "@/app/globals.css";
import { Header } from "@/widgets/header/ui/Header";

export const metadata: Metadata = {
  title: "동네리포트",
  description: "아파트·오피스텔 생활권 분석 서비스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

