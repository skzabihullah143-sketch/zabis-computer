import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Users,
  Star,
  ChevronDown,
  Megaphone,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";
import { SERVICES } from "@/lib/services-data";
import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const NOTICES = [
  "Aadhaar Biometric Update slots available this week — book early to avoid rush.",
  "New UDYAM (MSME) registration charges revised — see Services page for latest rates.",
  "Passport appointment slots filling fast for this month — apply now.",
];

const REVIEWS = [
  { name: "Rahul Sarkar", text: "Got my Aadhaar address updated in one visit. Very smooth process and honest pricing.", rating: 5 },
  { name: "Priya Das", text: "Applied for my PAN card here — quick service and the staff explained everything clearly.", rating: 5 },
  { name: "Manoj Roy", text: "Trade license renewal was handled without any hassle. Highly recommend ZABIS COMPUTER.", rating: 4 },
];

const FAQS = [
  {
    q: "Do I need to create an account to apply?",
    a: "No. You can apply for any service directly by filling the form — no login, registration, OTP or email is required.",
  },
  {
    q: "How do I check my application status?",
    a: "Go to the Track Application page and enter your registered mobile number to see the live status.",
  },
  {
    q: "Do I need to upload documents online?",
    a: "No document upload is required online. Please bring the original documents listed on each service card when you visit us.",
  },
  {
    q: "What are your service charges?",
    a: "Each service card lists the exact service charge. Charges cover our assistance and processing — government fees, if any, are separate.",
  },
];

export function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SERVICES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.subServices.some((sub) => sub.name.toLowerCase().includes(q))
    );
  }, [query]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-navy-400/10 blur-3xl" />
        <div className="container-max relative section-pad grid gap-10 md:grid-cols-2 md:items-center">
          <div className="animate-fade-up">
            <span className="chip bg-white/10 text-gold-400 border-white/20">
              Trusted Government &amp; Online Service Center
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Every Government Service.
              <span className="block text-gold-400">One Trusted Counter.</span>
            </h1>
            <p className="mt-5 max-w-lg text-navy-100/90">
              Aadhaar, PAN, Passport, Voter ID, Ration Card and more — apply in minutes, no login or
              OTP needed. We handle the paperwork, you save the trip.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services">
                <Button variant="gold" size="lg">
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/track-application">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900">
                  Track Application
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-navy-100/80">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold-400" /> Verified &amp; Reliable</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold-400" /> Fast Turnaround</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold-400" /> 1000+ Citizens Served</span>
            </div>
          </div>

          <div className="animate-fade-up rounded-3xl glass p-6" style={{ animationDelay: "0.15s" }}>
            <p className="mb-3 text-sm font-semibold text-navy-900">Search Services</p>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Aadhaar, PAN, Passport..."
                className="pl-11 text-navy-900"
              />
            </div>
            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">
              {query.trim() && filtered.length === 0 && (
                <p className="rounded-lg bg-white/60 p-3 text-sm text-navy-600">
                  No matching service. Try "Other Online Services" or contact us directly.
                </p>
              )}
              {filtered.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services#${s.slug}`}
                  className="flex items-center gap-3 rounded-xl bg-white/80 p-3 text-navy-900 shadow-sm transition-colors hover:bg-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-gold-400">
                    <DynamicIcon name={s.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{s.name}</span>
                </Link>
              ))}
              {!query.trim() && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {SERVICES.slice(0, 6).map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services#${s.slug}`}
                      className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-xs font-medium text-navy-800 hover:bg-white"
                    >
                      <DynamicIcon name={s.icon} className="h-3.5 w-3.5" />
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section-pad container-max">
        <div className="mb-10 text-center">
          <span className="chip">Featured Services</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
            What We Help You With
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 8).map((s) => (
            <Link
              key={s.slug}
              to={`/services#${s.slug}`}
              className="group rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-navy-800 dark:bg-navy-900"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-800 transition-colors group-hover:bg-navy-800 group-hover:text-gold-400 dark:bg-navy-800 dark:text-gold-400">
                <DynamicIcon name={s.icon} className="h-7 w-7" />
              </span>
              <p className="font-display text-sm font-semibold text-navy-900 dark:text-white">{s.name}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services">
            <Button variant="outline">View All Services</Button>
          </Link>
        </div>
      </section>

      {/* Notice Board */}
      <section className="container-max px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl border border-gold-500/30 bg-gold-500/10 p-6">
          <div className="mb-3 flex items-center gap-2 font-display font-bold text-navy-900 dark:text-white">
            <Megaphone className="h-5 w-5 text-gold-600" /> Notice Board
          </div>
          <ul className="space-y-2">
            {NOTICES.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-navy-700 dark:text-navy-100">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad container-max">
        <div className="mb-10 text-center">
          <span className="chip">Why Choose Us</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
            Reliable Service, Fair Pricing
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Verified Process", text: "Every application handled with accuracy and care." },
            { icon: Clock, title: "Fast Turnaround", text: "We know your time matters — no unnecessary delays." },
            { icon: BadgeCheck, title: "Transparent Charges", text: "No hidden costs. Charges shown upfront on every service." },
            { icon: Users, title: "Local & Trusted", text: "A neighborhood center serving the community for years." },
          ].map((f) => (
            <Card key={f.title} className="text-center">
              <CardContent className="flex flex-col items-center gap-3 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                  <f.icon className="h-6 w-6" />
                </span>
                <p className="font-display font-semibold text-navy-900 dark:text-white">{f.title}</p>
                <p className="text-sm text-navy-500 dark:text-navy-300">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="section-pad bg-navy-50 dark:bg-navy-900/40">
        <div className="container-max">
          <div className="mb-10 text-center">
            <span className="chip">Customer Reviews</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
              What Citizens Say About Us
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <Card key={r.name}>
                <CardContent className="pt-6">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-gold-500 text-gold-500" : "text-navy-200"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-navy-600 dark:text-navy-200">"{r.text}"</p>
                  <p className="mt-4 font-display text-sm font-semibold text-navy-900 dark:text-white">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad container-max max-w-3xl">
        <div className="mb-10 text-center">
          <span className="chip">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-xl border border-navy-100 dark:border-navy-800">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between bg-white p-4 text-left font-medium text-navy-900 dark:bg-navy-900 dark:text-white"
              >
                {f.q}
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="bg-navy-50 p-4 text-sm text-navy-600 dark:bg-navy-800/60 dark:text-navy-200">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact strip */}
      <section className="container-max px-4 pb-20 sm:px-6 lg:px-10">
        <div className="rounded-3xl bg-navy-900 p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Need help with a service?</h2>
              <p className="mt-2 text-navy-200">Reach out — we're happy to guide you through the process.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <a href={BUSINESS.callLink} className="flex items-center gap-2 rounded-xl bg-white/10 p-4 text-sm hover:bg-white/20">
                <Phone className="h-4 w-4 text-gold-400" /> {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 rounded-xl bg-white/10 p-4 text-sm hover:bg-white/20">
                <Mail className="h-4 w-4 text-gold-400" /> Email Us
              </a>
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-white/10 p-4 text-sm hover:bg-white/20">
                <MapPin className="h-4 w-4 text-gold-400" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
