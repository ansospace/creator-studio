import ThemeToggle from "@/components/theme/ThemeToggle";

import LandingPage from "./(home)/page";

export default function Home() {
  return (
    <div>
      <ThemeToggle className="absolute right-4 top-4" />
      <LandingPage />
    </div>
  );
}
