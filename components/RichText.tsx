import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@/sanity/lib/types";

/**
 * Rendert im CMS gepflegten Fliesstext (Portable Text) im Look der Website.
 * Wird für Impressum und Datenschutzerklärung verwendet.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-3 first:mt-0">{children}</p>,
    h2: ({ children }) => (
      <h3 className="mt-6 font-display text-lg font-semibold text-white first:mt-0">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-5 font-medium text-white first:mt-0">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-2 border-accent/60 pl-4 text-steel-200">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-3 space-y-1.5 first:mt-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 first:mt-0">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5">
        <span
          aria-hidden
          className="mt-[0.55em] h-1 w-1 flex-none rounded-full bg-accent"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const newTab = value?.newTab === true;

      // Interne Links über next/link, damit die Navigation nicht neu lädt
      if (href.startsWith("/") && !newTab) {
        return (
          <Link href={href} className="text-accent hover:underline">
            {children}
          </Link>
        );
      }

      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-accent hover:underline"
          {...(newTab || external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ value }: { value?: PortableTextBlock[] | null }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
