import { projectSchema } from "./project";
import { serviceSchema } from "./service";
import { siteSettingsSchema } from "./siteSettings";
import { homepageSchema } from "./homepage";
import { legalPageSchema } from "./legalPage";
import {
  servicesPageSchema,
  projectsPageSchema,
  mapPageSchema,
  contactPageSchema,
} from "./pages";
import { seoObject } from "./objects/seo";
import { richTextObject } from "./objects/richText";

export const schemaTypes = [
  // Wiederverwendbare Bausteine
  seoObject,
  richTextObject,

  // Seiten (jeweils genau ein Dokument)
  homepageSchema,
  servicesPageSchema,
  projectsPageSchema,
  mapPageSchema,
  contactPageSchema,
  legalPageSchema,

  // Inhaltstypen (beliebig viele Dokumente)
  projectSchema,
  serviceSchema,

  // Globale Einstellungen
  siteSettingsSchema,
];
