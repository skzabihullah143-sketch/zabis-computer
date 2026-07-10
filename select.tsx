import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-navy-200 bg-white px-4 pr-10 text-sm text-navy-900 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200 dark:bg-navy-900 dark:border-navy-700 dark:text-white",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
    </div>
  )
);
Select.displayName = "Select";
