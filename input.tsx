import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-navy-200 bg-white px-4 text-sm text-navy-900 placeholder:text-navy-400 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200 disabled:opacity-50 dark:bg-navy-900 dark:border-navy-700 dark:text-white",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
