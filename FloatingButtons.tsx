import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-4">
      <a
        href={BUSINESS.callLink}
        aria-label="Call us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-white shadow-xl transition-transform hover:scale-110"
      >
        <Phone className="h-6 w-6" />
      </a>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
