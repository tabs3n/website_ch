import { redirect } from "next/navigation";

// Das Sanity Studio läuft auf Sanity's eigenem CDN-Hosting.
// Aufruf /studio → direkte Weiterleitung zum gehosteten Studio.
export default function StudioRedirect() {
  redirect("https://6vse62qu.sanity.studio");
}
