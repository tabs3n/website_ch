import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cologne Hunters · Licht und Ton Service GmbH",
    template: "%s · Cologne Hunters",
  },
  description:
    "Cologne Hunters ist ein Full-Service-Dienstleister für Veranstaltungstechnik: Licht, Ton, Video, Rigging und Konferenztechnik auf Broadcast-Niveau.",
  metadataBase: new URL("https://cologne-hunters.de"),
  openGraph: {
    title: "Cologne Hunters · Licht und Ton Service GmbH",
    description:
      "Premium Veranstaltungstechnik aus Köln — Licht, Ton, Video und Rigging für Events, Broadcast und Corporate.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${space.variable}`}>
      <body className="min-h-screen bg-ink-950 font-sans text-steel-200 antialiased">
        <Navbar />
        <PageTransition>
          <main className="relative">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
