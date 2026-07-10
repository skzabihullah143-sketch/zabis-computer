import { Phone, MessageCircle, Mail, MapPin, Navigation } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <div className="section-pad container-max max-w-4xl">
      <div className="mb-10 text-center">
        <span className="chip">Contact Us</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
          {BUSINESS.name}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-navy-500 dark:text-navy-300">
          Have a question or need help with a service? Reach out to us any way that's convenient.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Phone</p>
              <a href={BUSINESS.callLink} className="font-display font-semibold text-navy-900 dark:text-white">
                {BUSINESS.phone}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white">
              <MessageCircle className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">WhatsApp</p>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="font-display font-semibold text-navy-900 dark:text-white">
                {BUSINESS.phone}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
              <Mail className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Email</p>
              <a href={`mailto:${BUSINESS.email}`} className="font-display font-semibold text-navy-900 dark:text-white">
                {BUSINESS.email}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Location</p>
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="font-display font-semibold text-navy-900 dark:text-white">
                View on Google Maps
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 dark:border-navy-800">
        <iframe
          title="ZABIS COMPUTER location"
          src="https://maps.google.com/maps?q=ZABIS%20COMPUTER&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="h-80 w-full"
          loading="lazy"
        />
      </div>

      <div className="mt-8 text-center">
        <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">
          <Button size="lg" variant="gold">
            <Navigation className="h-4 w-4" /> Get Directions
          </Button>
        </a>
      </div>
    </div>
  );
}
