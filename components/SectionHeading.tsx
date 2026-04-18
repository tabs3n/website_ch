import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: Props) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      } ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-8 bg-accent" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-semibold tracking-tightest text-white md:text-5xl">
          <span className="text-balance">{title}</span>
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-steel-300 md:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
