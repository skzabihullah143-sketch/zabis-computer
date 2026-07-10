import * as React from "react";
import { cn } from "@/lib/utils";

type StatusVariant = "Pending" | "Processing" | "Completed" | "Delivered" | "default";

const statusClasses: Record<StatusVariant, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Delivered: "bg-navy-50 text-navy-700 border-navy-200",
  default: "bg-navy-50 text-navy-700 border-navy-200",
};

export function Badge({
  className,
  status = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { status?: StatusVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        statusClasses[status],
        className
      )}
      {...props}
    />
  );
}
