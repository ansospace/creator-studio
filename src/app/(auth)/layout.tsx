import AuthNavBar from "./components/AuthNavBar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthNavBar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
    </>
  );
}
