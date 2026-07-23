import { Sidebar } from "@/features/sidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/20">
      <Sidebar />

      <main className="ml-72 min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}
