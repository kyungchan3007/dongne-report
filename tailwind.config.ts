import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(214 32% 91%)",
        input: "hsl(214 32% 91%)",
        ring: "hsl(215 20% 65%)",
        background: "hsl(210 33% 98%)",
        foreground: "hsl(222 47% 11%)",
        card: "hsl(0 0% 100%)",
        primary: "hsl(208 79% 43%)",
        muted: "hsl(210 23% 95%)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      screens: {
        sm: "640px", // 모바일 큰 화면
        md: "768px", // 태블릿
        lg: "1024px", // 작은 데스크탑
        xl: "1280px", // 데스크탑
        "2xl": "1536px", // 큰 데스크탑
      },
    },
  },
  plugins: [],
};

export default config;
