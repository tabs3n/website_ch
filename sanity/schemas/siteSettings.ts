import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Firmenname",
      type: "string",
      initialValue: "Cologne Hunters",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Licht und Ton Service GmbH",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      initialValue: "Licht. Ton. Video. Auf Broadcast-Niveau.",
    }),
    defineField({
      name: "heroSubline",
      title: "Hero Subline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      initialValue: "kontakt@cologne-hunters.de",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      initialValue: "+49 221 1234 5678",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
      initialValue: "Deutz-Mülheimer Straße 129\n51063 Köln",
    }),
    defineField({
      name: "clients",
      title: "Referenzkunden (Logo-Strip)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["RTL", "ZDF", "Ford", "Lanxess", "Koelnmesse"],
    }),
  ],
});
