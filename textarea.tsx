import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[100px] w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200 disabled:opacity-50 dark:bg-navy-900 dark:border-navy-700 dark:text-white",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
