"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const NAV = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-ink-950/80 backdrop-blur-lg"
          : "border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3 text-white"
          aria-label="Cologne Hunters — zur Startseite"
        >
          <Logo className="h-7 w-7" />
          <div className="leading-none">
            <div className="font-display text-[15px] font-semibold tracking-tight">
              Cologne Hunters
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-steel-400">
              Licht · Ton · Video
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm transition-colors ${
                  active
                    ? "text-white"
                    : "text-steel-300 hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/kontakt"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
          >
            Projekt anfragen
            <span aria-hidden>→</span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="relative h-10 w-10 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute left-2 right-2 top-3.5 h-px bg-white transition-transform ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-2 right-2 top-6 h-px bg-white transition-transform ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden"
          >
            <div className="container flex flex-col gap-1 border-t border-white/5 bg-ink-950/95 py-4 backdrop-blur">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base text-steel-200 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white"
              >
                Projekt anfragen →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
