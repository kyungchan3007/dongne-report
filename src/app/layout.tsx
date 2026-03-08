import type { Metadata } from "next";

import { Providers } from "@/app/providers";
import "@/app/globals.css";
import { Header } from "@/widgets/header/ui/Header";

export const metadata: Metadata = {
  title: "dongne-report",
  description: "Neighborhood report for apartment/officetel search",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
