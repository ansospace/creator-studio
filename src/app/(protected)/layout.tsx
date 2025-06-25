export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
    </>
  );
}
