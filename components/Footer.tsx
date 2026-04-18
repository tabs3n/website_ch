import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-ink-950">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-white">
              <Logo className="h-8 w-8" />
              <div>
                <div className="font-display text-base font-semibold tracking-tight">
                  Cologne Hunters
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-steel-400">
                  Licht und Ton Service GmbH
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel-400">
              Veranstaltungstechnik auf Broadcast-Niveau — von der Konzeption
              bis zur schlüsselfertigen Umsetzung. Licht, Ton, Video, Rigging
              und Konferenztechnik.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4 text-xs uppercase tracking-[0.22em] text-steel-400">
              Leistungen
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/leistungen/licht"
                  className="text-steel-200 transition hover:text-white"
                >
                  Lichttechnik
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen/ton"
                  className="text-steel-200 transition hover:text-white"
                >
                  Tontechnik
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen/video"
                  className="text-steel-200 transition hover:text-white"
                >
                  Videotechnik
                </Link>
              </li>
              <li>
                <Link
                  href="/projekte"
                  className="text-steel-200 transition hover:text-white"
                >
                  Projekte
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="mb-4 text-xs uppercase tracking-[0.22em] text-steel-400">
              Kontakt
            </div>
            <address className="not-italic text-sm leading-relaxed text-steel-200">
              Cologne Hunters
              <br />
              Licht und Ton Service GmbH
              <br />
              Deutz-Mülheimer Straße 129
              <br />
              51063 Köln
            </address>
            <div className="mt-4 space-y-1 text-sm">
              <a
                href="mailto:kontakt@cologne-hunters.de"
                className="block text-steel-200 transition hover:text-white"
              >
                kontakt@cologne-hunters.de
              </a>
              <a
                href="tel:+4922112345678"
                className="block text-steel-200 transition hover:text-white"
              >
                +49 221 1234 5678
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-steel-400 md:flex-row md:items-center">
          <div>© {year} Cologne Hunters Licht und Ton Service GmbH</div>
          <div className="flex gap-6">
            <Link href="/kontakt" className="hover:text-white">
              Kontakt
            </Link>
            <span aria-hidden>·</span>
            <a href="#" className="hover:text-white">
              Impressum
            </a>
            <span aria-hidden>·</span>
            <a href="#" className="hover:text-white">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
