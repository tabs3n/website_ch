"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SanityProject } from "@/sanity/lib/types";

type Props = {
  project: SanityProject;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/projekte/${project.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-ink-800"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.hero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/25 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-accent">
            <span>{project.year}</span>
            <span className="h-px w-6 bg-accent/60" />
            <span className="text-steel-400">{project.client}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white md:text-[28px]">
            {project.title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.services.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-steel-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink-950/40 text-white backdrop-blur transition group-hover:border-accent group-hover:bg-accent">
          <span aria-hidden className="translate-y-px">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
