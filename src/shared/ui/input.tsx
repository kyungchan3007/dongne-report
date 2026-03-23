import * as React from "react";

import { cn } from "@/shared/lib/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-14 w-full rounded-2xl border border-[#e5e8eb] bg-white px-5 py-3.5 text-[15px] font-medium text-[#191f28] outline-none transition-all duration-150",
        "placeholder:text-[#b0b8c1] placeholder:font-normal",
        "focus:border-[#3182f6] focus:ring-4 focus:ring-[#3182f6]/10",
        "hover:border-[#c9d3dd]",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

