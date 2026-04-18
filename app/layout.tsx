import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cologne Hunters · Licht und Ton Service GmbH",
    template: "%s · Cologne Hunters",
  },
  description:
    "Cologne Hunters ist ein Full-Service-Dienstleister für Veranstaltungstechnik: Licht, Ton, Video, Rigging und Konferenztechnik auf Broadcast-Niveau.",
  metadataBase: new URL("https://website-ch.vercel.app"),
  openGraph: {
    title: "Cologne Hunters · Licht und Ton Service GmbH",
    description:
      "Premium Veranstaltungstechnik aus Köln — Licht, Ton, Video und Rigging für Events, Broadcast und Corporate.",
    type: "website",
    locale: "de_DE",
    url: "https://website-ch.vercel.app",
    siteName: "Cologne Hunters",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body
        style={{
          fontFamily: '"Inter Tight", system-ui, sans-serif',
          background: "#0A0A0A",
          color: "#F2EEE8",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <main style={{ position: "relative" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
