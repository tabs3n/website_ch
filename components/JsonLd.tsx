/**
 * JSON-LD Structured Data component.
 * Renders a <script type="application/ld+json"> tag in the <head>.
 * Pass any valid Schema.org object as `data`.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
