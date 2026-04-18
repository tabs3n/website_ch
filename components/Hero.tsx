"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setVideoReady(true);
    const onError = () => setVideoReady(false);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onError);
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onError);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-950">
      {/* Fallback background image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2400&q=80')",
        }}
      />

      {/* Video background (optional: place /public/videos/hero.mp4) */}
      <video
        ref={videoRef}
        className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2400&q=80"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div aria-hidden className="hero-vignette absolute inset-0 -z-[5]" />
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-[4] opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="container relative z-10 pb-20 pt-32 md:pb-28 md:pt-40">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-steel-200 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Veranstaltungstechnik · Köln
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[0.95] tracking-tightest text-white md:text-7xl lg:text-[96px]"
        >
          <span className="text-balance">
            Licht. Ton. Video.
            <br />
            <span className="text-steel-300">Auf Broadcast-Niveau.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-steel-300 md:text-lg"
        >
          Cologne Hunters realisiert Events, Konferenzen und Broadcast-Produktionen
          mit einem integrierten Technik-Setup — von der Planung bis zum
          schlüsselfertigen Aufbau.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition hover:bg-accent-hover"
          >
            Projekt anfragen
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/projekte"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Referenzen ansehen
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid max-w-3xl grid-cols-3 gap-8 border-t border-white/10 pt-8 text-sm"
        >
          <div>
            <div className="font-display text-2xl font-semibold text-white md:text-3xl">
              20+
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-steel-400">
              Jahre Erfahrung
            </div>
          </div>
          <div>
            <div className="font-display text-2xl font-semibold text-white md:text-3xl">
              800+
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-steel-400">
              Produktionen
            </div>
          </div>
          <div>
            <div className="font-display text-2xl font-semibold text-white md:text-3xl">
              24/7
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-steel-400">
              On-Site Support
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-steel-400">
          <span>Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-white/10">
            <motion.span
              animate={{ y: [-32, 32] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-accent to-transparent"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
