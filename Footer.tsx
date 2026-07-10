import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/services-data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-navy-950 text-navy-100">
      <div className="ashoka-thread" />
      <div className="container-max grid gap-10 px-4 py-14 sm:px-6 lg:px-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <ShieldCheck className="h-5 w-5 text-gold-400" />
            {BUSINESS.name}
          </div>
          <p className="mt-3 text-sm text-navy-300">
            Your trusted neighborhood center for Aadhaar, PAN, Passport, Voter ID and every essential
            government service — done right, done fast.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">Quick Links</h4>
          <ul className="space-y-2 text-sm text-navy-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/track-application" className="hover:text-white">Track Application</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">Popular Services</h4>
          <ul className="space-y-2 text-sm text-navy-300">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">Contact Us</h4>
          <ul className="space-y-3 text-sm text-navy-300">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-400" /> {BUSINESS.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-400" /> {BUSINESS.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="hover:text-white">
                View on Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-800 py-5 text-center text-xs text-navy-400">
        © {year} {BUSINESS.name}. All rights reserved. Built for citizen convenience.
      </div>
    </footer>
  );
}
