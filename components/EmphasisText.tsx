import { Fragment } from "react";

/**
 * Gibt einen Text aus und hebt Abschnitte zwischen Sternchen in der
 * Akzentfarbe hervor:
 *   "Projekt*karte*."  →  Projekt<span (blau)>karte</span>.
 *
 * Damit lässt sich die typografische Hervorhebung in Überschriften aus dem CMS
 * steuern, ohne dort HTML zulassen zu müssen.
 */
export default function EmphasisText({ text }: { text: string }) {
  // Am Sternchen trennen; durch die Klammern im Muster bleiben die
  // ausgezeichneten Abschnitte im Ergebnis erhalten.
  const parts = text.split(/\*([^*]+)\*/g);

  return (
    <>
      {parts.map((part, i) =>
        // Ungerade Positionen sind die Abschnitte zwischen den Sternchen
        i % 2 === 1 ? (
          <span key={i} style={{ color: "var(--accent-text)" }}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
