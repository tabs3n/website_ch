// The Studio route gets its own minimal layout — no Navbar, no Footer.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
