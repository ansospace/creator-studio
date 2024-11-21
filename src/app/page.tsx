import Link from "next/link";

import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="flex items-center gap-2">
        <Link href="/users">Users</Link>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <ThemeToggle />
    </div>
  );
}
