import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import type { ServiceInfo } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  service: ServiceInfo;
  subService: string;
  onSubServiceChange: (value: string) => void;
}

export function ApplicationFormDialog({ open, onClose, service, subService, onSubServiceChange }: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function resetAndClose() {
    setName("");
    setMobile("");
    setAddress("");
    setNotes("");
    setDone(false);
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (name.trim().length < 2 || address.trim().length < 5) {
      toast.error("Please fill in your full name and address.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("applications").insert({
      name: name.trim(),
      mobile: mobile.trim(),
      address: address.trim(),
      service: service.name,
      sub_service: subService || null,
      notes: notes.trim() || null,
      status: "Pending",
    });
    setSubmitting(false);

    if (error) {
      toast.error("Something went wrong. Please try again or contact us directly.");
      return;
    }

    toast.success("Application submitted successfully!");
    setDone(true);
  }

  return (
    <Dialog open={open} onClose={resetAndClose}>
      {done ? (
        <div className="py-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Send className="h-8 w-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">Application Received</h3>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
            Thank you, {name}. Our team will contact you on {mobile} shortly. You can track your status anytime
            using your mobile number on the Track Application page.
          </p>
          <Button className="mt-6 w-full" onClick={resetAndClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">Apply — {service.name}</h3>
            <p className="text-sm text-navy-500 dark:text-navy-300">
              No login, no OTP, no document upload needed. Just fill in your details below.
            </p>
          </div>

          {service.subServices.length > 1 && (
            <div>
              <Label htmlFor="sub-service">Select Service Type</Label>
              <Select
                id="sub-service"
                value={subService}
                onChange={(e) => onSubServiceChange(e.target.value)}
              >
                {service.subServices.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} — {s.charge}
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              required
              inputMode="numeric"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <Label htmlFor="address">Full Address</Label>
            <Textarea id="address" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no., street, village/town, district, PIN code" />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (optional)</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else we should know?" />
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      )}
    </Dialog>
  );
}
