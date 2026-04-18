import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
};

export default function PageHeader({ eyebrow, title, intro, image }: Props) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-48">
      {image && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/60 via-ink-950/80 to-ink-950"
          />
        </>
      )}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <div className="container">
        {eyebrow && (
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {eyebrow}
            </div>
          </Reveal>
        )}
        <Reveal delay={0.06}>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white md:text-6xl lg:text-7xl">
            <span className="text-balance">{title}</span>
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 md:text-lg">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
