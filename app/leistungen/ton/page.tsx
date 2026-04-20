import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Tontechnik",
  description:
    "Line-Array-Beschallung, digitale Mischpulte, IEM-Monitoring und Dante-Netzwerke.",
  openGraph: {
    title: "Tontechnik · Cologne Hunters",
    description: "Line-Array-Beschallung, digitale Mischpulte, IEM-Monitoring und Dante-Netzwerke.",
    images: [{ url: "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?auto=format&fit=crop&w=1200&q=80", width: 1200, height: 630 }],
  },
};

export default function TonPage() {
  return (
    <ServiceDetail
      eyebrow="02 · Tontechnik"
      title="Sprachverständlichkeit und Musikalität, in jedem Winkel."
      intro="Beschallung ist Präzisionshandwerk. Wir liefern akustisch vermessene Setups mit Top-Tier-Equipment und erfahrenen FOH-Engineers."
      headerImage="https://images.unsplash.com/photo-1520166012956-add9ba0835cb?auto=format&fit=crop&w=2400&q=80"
      lead="Wir messen, simulieren und optimieren jedes Setup — damit der Sound in Reihe 1 und Reihe 40 identisch trägt."
      paragraphs={[
        "Für jede Venue erstellen wir eine d&b ArrayCalc-Simulation: Beschallungskeule, SPL-Verteilung und Delay-Konzept werden vor dem ersten Flug abgenommen.",
        "Unsere FOH- und Monitor-Engineers arbeiten auf DiGiCo SD-Konsolen oder Yamaha RIVAGE — mit durchgängigen Dante-Netzwerken und MADI-Redundanz bis ins Rack.",
        "Für Konferenz- und Broadcast-Formate liefern wir zusätzlich Dolmetschkabinen, Personenführungsanlagen und IFB-Systeme für Regie-Kommunikation.",
      ]}
      capabilities={[
        {
          title: "Live Sound",
          body: "d&b audiotechnik GSL/KSL/Y-Serie — von Clubshows bis Arena-Tour.",
        },
        {
          title: "Corporate Audio",
          body: "Sprachverständlichkeit-optimierte Beschallung für Keynotes, Townhalls und Kongresse.",
        },
        {
          title: "Broadcast Audio",
          body: "IFB-Routing, Mix-Minus-Workflows und gesicherte Sendesignale.",
        },
        {
          title: "Monitoring",
          body: "IEM-Systeme Shure Axient, Sennheiser 6000 und klassische Wedge-Monitoring.",
        },
        {
          title: "Dolmetschtechnik",
          body: "Bosch Integrus, Williams Digi-Wave — bis zu 16 Simultansprachen.",
        },
        {
          title: "Measurement",
          body: "Rational Acoustics Smaart und d&b ArrayCalc für reproduzierbare Ergebnisse.",
        },
      ]}
      stack={[
        "d&b audiotechnik GSL · KSL · Y-Serie",
        "DiGiCo SD7 · SD12 · Quantum",
        "Yamaha RIVAGE PM10",
        "Shure Axient Digital · Sennheiser 6000",
        "Dante / MADI / Optocore",
        "Rational Acoustics Smaart",
      ]}
      gallery={[
        "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516035054744-d0d52a9dfec5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
      ]}
      next={{ href: "/leistungen/video", label: "Videotechnik" }}
    />
  );
}
