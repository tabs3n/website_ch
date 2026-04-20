import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Lichttechnik",
  description:
    "Moving Lights, LED-Systeme, kinetisches Licht und DMX-Netzwerke auf Broadcast-Niveau.",
  openGraph: {
    title: "Lichttechnik · Cologne Hunters",
    description: "Moving Lights, LED-Systeme, kinetisches Licht und DMX-Netzwerke auf Broadcast-Niveau.",
    images: [{ url: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function LichtPage() {
  return (
    <ServiceDetail
      eyebrow="01 · Lichttechnik"
      title="Licht ist die erste Entscheidung jeder Produktion."
      intro="Von der Einzel-Keynote bis zur Arena-Show: Wir entwickeln Lichtdesigns, die Content stützen, Räume definieren und Marken inszenieren."
      headerImage="https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=2400&q=80"
      lead="Wir denken Licht nicht als Ausstattung, sondern als erzählerisches Werkzeug — präzise gesteuert, redundant gesichert, sauber integriert."
      paragraphs={[
        "Unser Licht-Team plant jedes Projekt in CAD: Rigging-Statik, Power-Verteilung, Dimmer-Schemata und DMX-Netzwerke werden vor dem ersten Aufbau geprüft und abgenommen.",
        "Wir arbeiten ausschließlich mit Top-Tier-Equipment — primär grandMA3 als Konsolensystem, ergänzt durch ETC EOS und eine eigene Flotte an Moving Lights, LED-Flächen und kinetischen Elementen.",
        "Für Broadcast-Produktionen liefern wir Lichtdesigns mit kalibrierten Farbtemperaturen, CRI ≥ 92 und flicker-freien Output für 4K-Kameras bei hohen Shutter Speeds.",
      ]}
      capabilities={[
        {
          title: "Show Lighting",
          body: "Event-, Corporate- und Entertainment-Produktionen mit vollständigem Design und Operating.",
        },
        {
          title: "Broadcast Lighting",
          body: "Studio-Grade Lichtdesign mit TV-tauglichem Spektrum und redundanter Stromversorgung.",
        },
        {
          title: "Architectural & Kinetisch",
          body: "LED-Flächen, Lichtvorhänge und kinetische Winch-Systeme — synchronisiert über Timecode.",
        },
        {
          title: "Atmospheric FX",
          body: "MDG Hazer, Low-Fog und CO₂-Jets — sauber integriert mit Brandschutzfreigabe.",
        },
        {
          title: "DMX / Network",
          body: "sACN, Art-Net und redundante Fiber-Backbones für sichere Signalverteilung.",
        },
        {
          title: "Previz",
          body: "Pre-Programming in grandMA onPC und depence² für volle Show-Sicherheit.",
        },
      ]}
      stack={[
        "grandMA3 · grandMA2",
        "ETC EOS Ti · Gio",
        "Ayrton · Robe · Martin Moving Lights",
        "Astera Titan · Quasar Science",
        "MDG Atmosphere",
        "depence² Previsualisierung",
      ]}
      gallery={[
        "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
      ]}
      next={{ href: "/leistungen/ton", label: "Tontechnik" }}
    />
  );
}
