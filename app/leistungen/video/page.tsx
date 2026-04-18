import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Videotechnik",
  description:
    "LED-Walls, Broadcast-Kameras, Medienserver und Live-Streaming in 4K.",
};

export default function VideoPage() {
  return (
    <ServiceDetail
      eyebrow="03 · Videotechnik"
      title="Bildsprache, die trägt — live, hybrid und broadcastfähig."
      intro="LED-Walls, Kameraketten, Medienserver und Streaming — als ein aufeinander abgestimmtes System."
      headerImage="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=2400&q=80"
      lead="Vom Pixel Pitch bis zum CDN-Endpoint: wir planen die gesamte Bildkette — kalibriert, redundant, 4K-fähig."
      paragraphs={[
        "Wir entwickeln LED-Designs auf Basis von ROE Visual Black Marble und Carbon-Serien — inklusive Processing auf Brompton Tessera für Broadcast-Qualität.",
        "Unsere Kameraketten reichen von kompakten PTZ-Lösungen bis zu voll ausgestatteten Broadcast-Kameras mit Engineering-Support und Rack Control.",
        "Für Streaming und Hybrid-Produktionen setzen wir auf vMix, Blackmagic ATEM Constellation und redundante Encoder mit Failover-Logik.",
      ]}
      capabilities={[
        {
          title: "LED Walls",
          body: "ROE Visual · INFiLED · Brompton Processing — bis 1.2 mm Pixel Pitch.",
        },
        {
          title: "Bildregie",
          body: "Blackmagic ATEM Constellation 4K · Grass Valley Kayenne.",
        },
        {
          title: "Kameras",
          body: "Sony PXW-FX9, Blackmagic URSA Broadcast, Marshall PTZ — Fiber-Backbone.",
        },
        {
          title: "Medienserver",
          body: "disguise VX4 · Resolume Arena · watchout — synchron über Timecode.",
        },
        {
          title: "Live Streaming",
          body: "Multi-Feed Encoder, RTMP & SRT, CDN-Distribution mit SLA.",
        },
        {
          title: "Show Control",
          body: "Timecode-basiertes Cueing, QLab & Stage Precision — verlässlich im Sekundentakt.",
        },
      ]}
      stack={[
        "ROE Visual Black Marble BM2 · CB5",
        "Brompton Tessera SX40 · XD",
        "disguise VX4 · Resolume Arena 7",
        "Blackmagic ATEM Constellation 4K",
        "Sony PXW-FX9 · Marshall PTZ",
        "vMix · OBS · SRT Streaming",
      ]}
      gallery={[
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1200&q=80",
      ]}
      next={{ href: "/projekte", label: "Projekte ansehen" }}
    />
  );
}
