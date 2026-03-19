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
        "h-12 w-full rounded-2xl border border-[#d4e1f2] bg-white px-4 py-3 text-sm text-[#191f28] outline-none transition",
        "placeholder:text-[#8b95a1] focus-visible:border-[#3182f6] focus-visible:ring-4 focus-visible:ring-[#3182f6]/15",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
