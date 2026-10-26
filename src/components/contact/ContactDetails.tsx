import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import { Icon3D, type Icon3DName } from "@/components/ui/Icon3D";
import { company, mapsEmbedSrc, mapsLink } from "@/lib/site";

export function ContactDetails() {
  const items: { icon: Icon3DName; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: "phone-ringing", label: "Call us", value: company.phoneDisplay, href: company.phoneHref },
    { icon: "chat", label: "WhatsApp", value: "Chat with our team", href: company.whatsappHref, external: true },
    { icon: "mail", label: "Email", value: company.email, href: company.emailHref },
    { icon: "map-pin", label: "Visit", value: company.address.full, href: mapsLink, external: true },
  ];

  return (
    <ul className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.label} className="bg-navy-950">
          <a
            href={it.href}
            {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex h-full flex-col gap-5 p-6 transition-colors duration-300 hover:bg-navy-900 md:p-7"
          >
            <span className="flex items-center justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-white/10">
                <Icon3D
                  name={it.icon}
                  tone="brand"
                  size={42}
                  className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]"
                />
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-steel-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt-400"
                aria-hidden="true"
              />
            </span>
            <span>
              <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400">{it.label}</span>
              <span className="mt-2 block font-medium leading-relaxed text-white">{it.value}</span>
            </span>
          </a>
        </li>
      ))}
      {company.hours && (
        <li className="flex items-center gap-3 bg-navy-950 p-6 text-steel-300 sm:col-span-2">
          <Clock className="h-5 w-5 text-volt-400" aria-hidden="true" /> {company.hours}
        </li>
      )}
    </ul>
  );
}

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`ticks relative overflow-hidden border border-white/10 bg-navy-900 ${className}`}>
      <iframe
        title="Map showing AVIGENT Technologies office at KC Arcade, Kakkanad, Kochi"
        src={mapsEmbedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.4)_invert(0.9)_hue-rotate(185deg)_contrast(0.9)] transition-[filter] duration-700 hover:[filter:none]"
      />
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white"
      >
        <MapPin className="h-4 w-4 text-volt-400" aria-hidden="true" /> Open in Google Maps
      </a>
    </div>
  );
}
