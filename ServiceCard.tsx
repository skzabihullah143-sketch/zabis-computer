import { useState } from "react";
import { FileCheck2, IndianRupee } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApplicationFormDialog } from "@/components/ApplicationFormDialog";
import type { ServiceInfo } from "@/types";

export function ServiceCard({ service }: { service: ServiceInfo }) {
  const [open, setOpen] = useState(false);
  const [subService, setSubService] = useState<string>(service.subServices[0]?.name ?? "");

  return (
    <Card id={service.slug} className="group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-4 border-b border-navy-100 bg-navy-50/60 p-6 dark:border-navy-800 dark:bg-navy-800/40">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-gold-400">
          <DynamicIcon name={service.icon} className="h-7 w-7" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">{service.name}</h3>
          <p className="text-sm text-navy-500 dark:text-navy-300">{service.description}</p>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-400">
            <IndianRupee className="h-3.5 w-3.5" /> Service Charges
          </p>
          <ul className="space-y-1.5">
            {service.subServices.map((sub) => (
              <li
                key={sub.name}
                className="flex items-center justify-between rounded-lg bg-navy-50 px-3 py-2 text-sm dark:bg-navy-800/60"
              >
                <span className="text-navy-700 dark:text-navy-100">{sub.name}</span>
                <span className="font-semibold text-navy-900 dark:text-white">{sub.charge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-400">
            <FileCheck2 className="h-3.5 w-3.5" /> Required Documents
          </p>
          <div className="flex flex-wrap gap-2">
            {service.documents.map((doc) => (
              <span key={doc} className="chip">{doc}</span>
            ))}
          </div>
        </div>

        <Button className="mt-auto w-full" onClick={() => setOpen(true)}>
          Apply Now
        </Button>
      </CardContent>

      <ApplicationFormDialog
        open={open}
        onClose={() => setOpen(false)}
        service={service}
        subService={subService}
        onSubServiceChange={setSubService}
      />
    </Card>
  );
}
