import { useState } from "react";
import { toast } from "sonner";
import { Search, Loader2, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

export function TrackApplication() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Application[] | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    setResults(null);
    const { data, error } = await supabase.rpc("track_application_by_mobile", { p_mobile: mobile });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setResults((data as Application[]) ?? []);
  }

  return (
    <div className="section-pad container-max max-w-3xl">
      <div className="mb-10 text-center">
        <span className="chip">Track Application</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
          Check Your Application Status
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-navy-500 dark:text-navy-300">
          Enter the mobile number you used while applying — no login or OTP required.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mx-auto mb-10 flex max-w-md gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <Input
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            className="pl-11"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </form>

      <div className="space-y-4">
        {results !== null && results.length === 0 && (
          <div className="rounded-2xl border border-navy-100 bg-white p-10 text-center dark:border-navy-800 dark:bg-navy-900">
            <ClipboardList className="mx-auto mb-3 h-10 w-10 text-navy-300" />
            <p className="text-navy-500 dark:text-navy-300">
              No applications found for this mobile number.
            </p>
          </div>
        )}

        {results?.map((app) => (
          <Card key={app.id}>
            <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-semibold text-navy-900 dark:text-white">{app.name}</p>
                <p className="text-sm text-navy-500 dark:text-navy-300">
                  {app.service}
                  {app.sub_service ? ` — ${app.sub_service}` : ""}
                </p>
                <p className="mt-1 text-xs text-navy-400">
                  Applied on {formatDate(app.created_at)} · Last updated {formatDate(app.updated_at)}
                </p>
              </div>
              <Badge status={app.status}>{app.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
