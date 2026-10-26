"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Icon3D } from "@/components/ui/Icon3D";
import { company, navigation, services } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Desktop pill skips "Home" — the logo already links there. */
const desktopNav = navigation.filter((n) => n.href !== "/");

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const pillLink =
  "relative isolate rounded-lg px-3.5 py-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] transition-colors";

export function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  // Compact on scroll; hide when scrolling down, reveal when scrolling up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 40);
      if (y < 240) setHidden(false);
      else if (y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (routes stay mounted under Activity, so be explicit)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setDropdownOpen(false);
    setHidden(false);
  }

  // Lock scroll + Escape handling for the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const onDropdownKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setDropdownOpen(false);
  }, []);

  const isHidden = hidden && !mobileOpen && !dropdownOpen;

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={clsx(
          "pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo",
          isHidden && "-translate-y-[130%]",
        )}
      >
        <nav
          aria-label="Main"
          className={clsx(
            "flex items-center justify-between gap-4 px-4 transition-[padding] duration-500 ease-out-expo md:px-9 xl:px-11",
            compact ? "pt-3 md:pt-4" : "pt-5 md:pt-7",
          )}
        >
          {/* Logo — sits directly on the hero; gains a dark glass backing once scrolled */}
          <div
            className={clsx(
              "pointer-events-auto rounded-xl px-3 py-2 transition-all duration-500 ease-out-expo",
              compact || mobileOpen
                ? "bg-navy-950/75 shadow-[0_10px_30px_-12px_rgba(4,9,21,0.6)] ring-1 ring-white/10 backdrop-blur-xl"
                : "bg-transparent ring-1 ring-transparent",
            )}
          >
            <Logo />
          </div>

          {/* Desktop — frosted segmented pill */}
          <div className="pointer-events-auto hidden items-center gap-1 rounded-xl bg-white/80 p-1.5 shadow-[0_12px_40px_-16px_rgba(4,9,21,0.55)] ring-1 ring-white/60 backdrop-blur-xl backdrop-saturate-150 lg:flex">
            <ul className="flex items-center">
              {desktopNav.map((item) => {
                const active = isActive(pathname, item.href);
                return item.children ? (
                  <li
                    key={item.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    onKeyDown={onDropdownKey}
                    onBlur={(e) => {
                      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) setDropdownOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <PillLink href={item.href} active={active} className="pr-1.5">
                        {item.label}
                      </PillLink>
                      <button
                        type="button"
                        aria-label="Show services submenu"
                        aria-expanded={dropdownOpen}
                        aria-controls="services-submenu"
                        onClick={() => setDropdownOpen((v) => !v)}
                        className="mr-1 rounded-md p-1 text-navy-900/60 transition-colors hover:text-navy-950"
                      >
                        <ChevronDown
                          className={clsx("h-3.5 w-3.5 transition-transform duration-300", dropdownOpen && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          id="services-submenu"
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          className="absolute right-0 top-full w-[460px] origin-top-right pt-3"
                        >
                          <ul className="rounded-xl bg-white/95 p-2 shadow-[0_24px_60px_-20px_rgba(4,9,21,0.6)] ring-1 ring-navy-950/5 backdrop-blur-xl">
                            {services.map((s) => {
                              const sActive = isActive(pathname, `/services/${s.slug}`);
                              return (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    aria-current={sActive ? "page" : undefined}
                                    className={clsx(
                                      "group flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-mist-100",
                                      sActive && "bg-mist-100",
                                    )}
                                  >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mist-100 transition-colors group-hover:bg-white">
                                      <Icon3D
                                        name={s.icon3d}
                                        tone="navy"
                                        size={34}
                                        className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]"
                                      />
                                    </span>
                                    <span className="flex-1">
                                      <span className="flex items-baseline justify-between gap-3">
                                        <span className="text-sm font-semibold text-navy-950">{s.title}</span>
                                        <span className="font-mono text-[0.62rem] text-steel-400">{s.index}.</span>
                                      </span>
                                      <span className="mt-0.5 block text-xs leading-relaxed text-steel-600">{s.short}</span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.href}>
                    <PillLink href={item.href} active={active}>
                      {item.label}
                    </PillLink>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact#enquiry"
              id="nav-quote-cta"
              className="group ml-1 overflow-hidden rounded-lg bg-navy-950 px-5 py-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-navy-800"
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                  Request a quote
                </span>
                <span
                  className="absolute inset-0 block translate-y-full text-volt-300 transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
                  aria-hidden="true"
                >
                  Request a quote
                </span>
              </span>
            </Link>
          </div>

          {/* Mobile — compact pill toggle */}
          <div className="pointer-events-auto flex items-center gap-1 rounded-xl bg-white/85 p-1 shadow-[0_12px_40px_-16px_rgba(4,9,21,0.55)] ring-1 ring-white/60 backdrop-blur-xl lg:hidden">
            <Link
              href="/contact#enquiry"
              className="hidden rounded-lg bg-navy-950 px-4 py-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-white sm:block"
            >
              Get a quote
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-navy-950"
            >
              {mobileOpen ? "Close" : "Menu"}
              <span className="relative block h-2.5 w-4" aria-hidden="true">
                <span
                  className={clsx(
                    "absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300",
                    mobileOpen ? "top-1 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300",
                    mobileOpen ? "top-1 -rotate-45" : "top-2",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — inset rounded sheet, matching the hero card */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-2 z-40 overflow-y-auto rounded-2xl bg-navy-950 pt-24 ring-1 ring-white/10 lg:hidden"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <motion.nav
              aria-label="Mobile"
              className="relative px-5 pb-10"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              <ul className="border-t border-white/10">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.6 } },
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) && item.href !== "/services" ? "page" : undefined}
                      className={clsx(
                        "flex items-baseline gap-4 py-4 font-display text-[2rem] font-medium tracking-tight",
                        isActive(pathname, item.href) ? "text-volt-300" : "text-white",
                      )}
                    >
                      <span className="font-mono text-[0.65rem] text-steel-400">0{i + 1}.</span>
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="-mt-1 grid gap-1 pb-4 pl-9">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className={clsx(
                                "flex items-center gap-3 py-1.5 text-[0.95rem]",
                                isActive(pathname, `/services/${s.slug}`) ? "text-volt-300" : "text-steel-300",
                              )}
                            >
                              <Icon3D name={s.icon3d} tone="white" size={22} />
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.6 } },
                }}
                className="mt-8 grid gap-3"
              >
                <Link
                  href="/contact#enquiry"
                  className="rounded-lg bg-volt-300 px-5 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink"
                >
                  Request a quote
                </Link>
                <a
                  href={company.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-[#05280f]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <div className="mt-4 grid gap-3 text-sm text-steel-300">
                  <a href={company.phoneHref} className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-volt-400" aria-hidden="true" /> {company.phoneDisplay}
                  </a>
                  <a href={company.emailHref} className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-volt-400" aria-hidden="true" /> {company.email}
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PillLink({
  href,
  active,
  className,
  children,
}: {
  href: string;
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(pillLink, active ? "text-navy-950" : "text-navy-900/65 hover:text-navy-950", className)}
    >
      {active && (
        <motion.span
          layoutId="nav-pill-active"
          className="absolute inset-0 -z-10 rounded-lg bg-white shadow-[0_2px_10px_-4px_rgba(4,9,21,0.35)]"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      )}
      <span className="relative">{children}</span>
    </Link>
  );
}
