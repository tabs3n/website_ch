import type { PortableTextBlock } from "@/sanity/lib/types";

/**
 * Wandelt eine vereinfachte Textnotation in Portable-Text-Blöcke um.
 *
 * Unterstützt wird bewusst nur, was die Rechtstexte brauchen:
 *   "- Punkt"              → Aufzählungspunkt
 *   "**fett**"             → fetter Text
 *   "[Label](https://…)"   → Link
 *   alles andere           → Absatz
 *
 * Die Schlüssel werden aus dem Index abgeleitet und sind damit stabil: ein
 * erneuter Seed-Lauf erzeugt dieselben Werte und keine Scheinänderungen.
 */

type Span = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type MarkDef = {
  _type: "link";
  _key: string;
  href: string;
  newTab?: boolean;
};

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/;
const BOLD_RE = /\*\*([^*]+)\*\*/;

/** Zerlegt eine Zeile in Text-Abschnitte samt Auszeichnungen und Linkzielen. */
function parseInline(
  line: string,
  keyPrefix: string
): { spans: Span[]; markDefs: MarkDef[] } {
  const spans: Span[] = [];
  const markDefs: MarkDef[] = [];
  let rest = line;
  let i = 0;

  const push = (text: string, marks: string[]) => {
    if (!text) return;
    spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text, marks });
  };

  while (rest.length > 0) {
    const link = LINK_RE.exec(rest);
    const bold = BOLD_RE.exec(rest);

    // Die jeweils frühere Fundstelle zuerst verarbeiten
    const next =
      link && bold
        ? link.index <= bold.index
          ? ("link" as const)
          : ("bold" as const)
        : link
          ? ("link" as const)
          : bold
            ? ("bold" as const)
            : null;

    if (next === null) {
      push(rest, []);
      break;
    }

    if (next === "link" && link) {
      push(rest.slice(0, link.index), []);
      const markKey = `${keyPrefix}l${markDefs.length}`;
      const href = link[2];
      markDefs.push({
        _type: "link",
        _key: markKey,
        href,
        // Externe Ziele in einem neuen Tab öffnen, interne im selben
        ...(href.startsWith("http") ? { newTab: true } : {}),
      });
      push(link[1], [markKey]);
      rest = rest.slice(link.index + link[0].length);
      continue;
    }

    if (next === "bold" && bold) {
      push(rest.slice(0, bold.index), []);
      push(bold[1], ["strong"]);
      rest = rest.slice(bold.index + bold[0].length);
    }
  }

  return { spans, markDefs };
}

/** Baut aus Zeilen die Portable-Text-Blöcke einer Seite auf. */
export function toBlocks(lines: string[], keyPrefix = "b"): PortableTextBlock[] {
  return lines.map((raw, index) => {
    const isBullet = raw.startsWith("- ");
    const line = isBullet ? raw.slice(2) : raw;
    const key = `${keyPrefix}${index}`;
    const { spans, markDefs } = parseInline(line, key);

    return {
      _type: "block",
      _key: key,
      style: "normal",
      markDefs,
      children: spans,
      ...(isBullet ? { listItem: "bullet", level: 1 } : {}),
    } as PortableTextBlock;
  });
}
