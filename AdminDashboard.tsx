import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  LogOut,
  Search,
  Filter,
  Loader2,
  Trash2,
  Printer,
  Eye,
  X,
  ClipboardList,
  Clock,
  Loader as LoaderIcon,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { SERVICES } from "@/lib/services-data";
import type { Application, ApplicationStatus } from "@/types";

const STATUSES: ApplicationStatus[] = ["Pending", "Processing", "Completed", "Delivered"];

export function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<"name" | "mobile">("name");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ApplicationStatus>("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [toDelete, setToDelete] = useState<Application | null>(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error("Failed to load applications.");
      return;
    }
    setApplications((data as Application[]) ?? []);
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      if (serviceFilter !== "all" && app.service !== serviceFilter) return false;
      if (statusFilter !== "all" && app.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (searchType === "name" && !app.name.toLowerCase().includes(q)) return false;
        if (searchType === "mobile" && !app.mobile.includes(search.trim())) return false;
      }
      return true;
    });
  }, [applications, search, searchType, serviceFilter, statusFilter]);

  const stats = useMemo(
    () => ({
      total: applications.length,
      pending: applications.filter((a) => a.status === "Pending").length,
      processing: applications.filter((a) => a.status === "Processing").length,
      completed: applications.filter((a) => a.status === "Completed").length,
      delivered: applications.filter((a) => a.status === "Delivered").length,
    }),
    [applications]
  );

  async function updateStatus(id: string, status: ApplicationStatus) {
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (error) {
      toast.error("Could not update status.");
      return;
    }
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    toast.success("Status updated.");
  }

  async function handleDelete() {
    if (!toDelete) return;
    const { error } = await supabase.from("applications").delete().eq("id", toDelete.id);
    if (error) {
      toast.error("Could not delete application.");
      return;
    }
    setApplications((prev) => prev.filter((a) => a.id !== toDelete.id));
    toast.success("Application deleted.");
    setToDelete(null);
  }

  function printApplication(app: Application) {
    const win = window.open("", "_blank", "width=700,height=800");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Application - ${app.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #0a1a40; }
            h1 { font-size: 20px; border-bottom: 3px solid #d4a017; padding-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            td { padding: 8px 0; border-bottom: 1px solid #eee; vertical-align: top; }
            td.label { font-weight: bold; width: 180px; }
          </style>
        </head>
        <body>
          <h1>ZABIS COMPUTER — Application Details</h1>
          <table>
            <tr><td class="label">Applicant Name</td><td>${app.name}</td></tr>
            <tr><td class="label">Mobile Number</td><td>${app.mobile}</td></tr>
            <tr><td class="label">Address</td><td>${app.address}</td></tr>
            <tr><td class="label">Service</td><td>${app.service}${app.sub_service ? " — " + app.sub_service : ""}</td></tr>
            <tr><td class="label">Notes</td><td>${app.notes ?? "-"}</td></tr>
            <tr><td class="label">Status</td><td>${app.status}</td></tr>
            <tr><td class="label">Applied On</td><td>${formatDate(app.created_at)}</td></tr>
            <tr><td class="label">Last Updated</td><td>${formatDate(app.updated_at)}</td></tr>
          </table>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  }

  async function handleSignOut() {
    await signOut();
    navigate("/admin-login");
  }

  return (
    <div className="section-pad container-max">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="text-sm text-navy-500 dark:text-navy-300">Manage all incoming applications</p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: "Total", value: stats.total, icon: ClipboardList, color: "bg-navy-800" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "bg-amber-500" },
          { label: "Processing", value: stats.processing, icon: LoaderIcon, color: "bg-blue-500" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "bg-emerald-500" },
          { label: "Delivered", value: stats.delivered, icon: PackageCheck, color: "bg-navy-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 pt-6">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold text-navy-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-navy-500 dark:text-navy-300">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchType === "name" ? "Search by name..." : "Search by mobile..."}
            className="pl-11"
          />
        </div>
        <Select value={searchType} onChange={(e) => setSearchType(e.target.value as "name" | "mobile")} className="w-40">
          <option value="name">By Name</option>
          <option value="mobile">By Mobile</option>
        </Select>
        <Select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className="w-48">
          <option value="all">All Services</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="w-40">
          <option value="all">All Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
        <Button variant="ghost" onClick={fetchApplications}>
          <Filter className="h-4 w-4" /> Refresh
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-navy-700" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-navy-100 dark:border-navy-800">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase tracking-wide text-navy-500 dark:bg-navy-800 dark:text-navy-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} className="border-t border-navy-100 dark:border-navy-800">
                  <td className="px-4 py-3 font-medium text-navy-900 dark:text-white">{app.name}</td>
                  <td className="px-4 py-3 text-navy-600 dark:text-navy-300">{app.mobile}</td>
                  <td className="px-4 py-3 text-navy-600 dark:text-navy-300">
                    {app.service}
                    {app.sub_service && <span className="block text-xs text-navy-400">{app.sub_service}</span>}
                  </td>
                  <td className="px-4 py-3 text-navy-500 dark:text-navy-400">{formatDate(app.created_at)}</td>
                  <td className="px-4 py-3">
                    <Badge status={app.status}>{app.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => setSelected(app)} aria-label="View details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => printApplication(app)} aria-label="Print">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setToDelete(app)} aria-label="Delete">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-navy-400">
                    No applications match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Details dialog */}
      <Dialog open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">{selected.name}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase text-navy-400">Mobile</p>
                <p className="text-navy-800 dark:text-navy-100">{selected.mobile}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-navy-400">Service</p>
                <p className="text-navy-800 dark:text-navy-100">
                  {selected.service}{selected.sub_service ? ` — ${selected.sub_service}` : ""}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold uppercase text-navy-400">Address</p>
                <p className="text-navy-800 dark:text-navy-100">{selected.address}</p>
              </div>
              {selected.notes && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold uppercase text-navy-400">Notes</p>
                  <p className="text-navy-800 dark:text-navy-100">{selected.notes}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase text-navy-400">Applied On</p>
                <p className="text-navy-800 dark:text-navy-100">{formatDate(selected.created_at)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-navy-400">Last Updated</p>
                <p className="text-navy-800 dark:text-navy-100">{formatDate(selected.updated_at)}</p>
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase text-navy-400">Update Status</p>
              <Select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value as ApplicationStatus)}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => printApplication(selected)}>
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => { setToDelete(selected); setSelected(null); }}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        {toDelete && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 className="h-7 w-7" />
            </div>
            <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">Delete this application?</h3>
            <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
              This will permanently delete {toDelete.name}'s application. This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setToDelete(null)}>
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
