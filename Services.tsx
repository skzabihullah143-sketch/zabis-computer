import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";
import { SERVICES } from "@/lib/services-data";

export function Services() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return SERVICES;
    const q = query.toLowerCase();
    return SERVICES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.subServices.some((sub) => sub.name.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="section-pad container-max">
      <div className="mb-10 text-center">
        <span className="chip">All Services</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
          Government &amp; Online Services
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-navy-500 dark:text-navy-300">
          Choose a service below, check the required documents and charges, and apply directly —
          no login or OTP needed.
        </p>
      </div>

      <div className="mx-auto mb-10 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a service..."
            className="pl-11"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-navy-500 dark:text-navy-300">
            No services match your search.
          </p>
        )}
      </div>
    </div>
  );
}
