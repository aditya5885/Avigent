import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { SplitButton } from "@/components/ui/SplitButton";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { BackToTop, FooterMedia } from "@/components/layout/FooterMedia";
import { company, mapsLink, services } from "@/lib/site";

const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const label = "font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/60";
const link = "text-[0.95rem] text-white/90 transition-colors hover:text-volt-300";

export function Footer() {
  return (
    <footer className="p-2 md:p-3">
      <div className="relative isolate overflow-hidden rounded-2xl bg-navy-900 md:rounded-[1.25rem]">
        <FooterMedia />

        <div className="px-5 pt-12 md:px-9 md:pt-14 xl:px-11">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            {/* Statement + CTA */}
            <div>
              <p className="max-w-2xl font-display text-[1.75rem] font-medium leading-[1.12] tracking-[-0.025em] text-white md:text-[2.5rem]">
                Reliable electrical solutions, safer systems and cleaner energy — powering progress since 2012.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <SplitButton href="/contact#enquiry" id="footer-quote-cta">
                  Request a quote
                </SplitButton>
                <a
                  href={company.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-[#25D366]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
                </a>
              </div>
            </div>

            {/* Link columns + back to top */}
            <div className="flex items-start gap-6">
              <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 border-l border-white/20 pl-5 sm:grid-cols-[auto_auto_1fr] md:pl-6">
                <nav aria-label="Footer">
                  <h2 className={label}>Navigate</h2>
                  <ul className="mt-4 space-y-1.5">
                    {pages.map((p) => (
                      <li key={p.href}>
                        <Link href={p.href} className={link}>
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <nav aria-label="Footer services">
                  <h2 className={label}>Services</h2>
                  <ul className="mt-4 space-y-1.5">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className={link}>
                          {s.title.replace("Electrical ", "")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="col-span-2 sm:col-span-1">
                  <h2 className={label}>Connect</h2>
                  <address className="mt-4 space-y-1.5 not-italic">
                    <a href={company.phoneHref} className={`${link} block`}>
                      {company.phoneDisplay}
                    </a>
                    <a href={company.emailHref} className={`${link} block`}>
                      {company.email}
                    </a>
                    <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${link} block`}>
                      WhatsApp
                    </a>
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block pt-2 text-sm leading-relaxed text-white/65 transition-colors hover:text-white"
                    >
                      {company.address.line1}, {company.address.line2}
                      <br />
                      {company.address.locality}, {company.address.region} {company.address.postalCode}
                    </a>
                  </address>
                </div>
              </div>
              <BackToTop />
            </div>
          </div>

          {/* Giant wordmark */}
          <p
            aria-hidden="true"
            className="-ml-[0.05em] mt-16 select-none whitespace-nowrap font-display text-[21.5vw] font-medium leading-[0.8] tracking-[-0.06em] text-white md:mt-24"
          >
            AVIGENT
          </p>

          <div className="flex flex-col gap-2 py-6 pr-12 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/70 sm:flex-row sm:items-center sm:justify-between md:pr-14">
            <p>
              © <CurrentYear /> {company.name}. All rights reserved.
            </p>
            <p>Kakkanad, Kochi · Kerala, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
