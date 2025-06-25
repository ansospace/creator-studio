import NavBar from "@/components/NavBar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
    </>
  );
}
