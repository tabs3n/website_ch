import Link from "next/link";
import PageHeader from "./PageHeader";
import Reveal from "./Reveal";
import ContactCTA from "./ContactCTA";

export type ServiceDetailProps = {
  eyebrow: string;
  title: string;
  intro: string;
  headerImage: string;
  lead: string;
  paragraphs: string[];
  capabilities: { title: string; body: string }[];
  stack: string[];
  gallery: string[];
  next: { href: string; label: string };
};

export default function ServiceDetail({
  eyebrow,
  title,
  intro,
  headerImage,
  lead,
  paragraphs,
  capabilities,
  stack,
  gallery,
  next,
}: ServiceDetailProps) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        image={headerImage}
      />

      <section className="py-16 md:py-24">
        <div className="container grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug text-white md:text-3xl">
                <span className="text-balance">{lead}</span>
              </p>
            </Reveal>
            <div className="mt-8 space-y-5 text-steel-300">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.04}>
                  <p className="leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="md:col-span-5 md:border-l md:border-white/10 md:pl-10">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.28em] text-accent">
                Technologie-Stack
              </div>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {stack.map((s, i) => (
                <Reveal key={s} delay={i * 0.03}>
                  <li className="flex items-center justify-between border-b border-white/5 pb-3 text-sm text-steel-200">
                    <span>{s}</span>
                    <span className="text-steel-400">✓</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal>
            <div className="mb-10 text-[11px] uppercase tracking-[0.3em] text-accent">
              Capabilities
            </div>
          </Reveal>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div>
                  <div className="font-display text-lg font-semibold text-white">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-steel-300">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((src, i) => (
              <Reveal key={src + i} delay={i * 0.04}>
                <div
                  className={`relative overflow-hidden rounded-xl border border-white/5 ${
                    i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <Reveal>
            <Link
              href={next.href}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-ink-800 p-8 transition hover:border-white/20 md:p-12"
            >
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-steel-400">
                  Nächste Leistung
                </div>
                <div className="mt-3 font-display text-3xl font-semibold text-white md:text-5xl">
                  {next.label}
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white transition group-hover:border-accent group-hover:bg-accent">
                →
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
