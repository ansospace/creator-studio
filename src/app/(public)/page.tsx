import ThemeToggle from "@/components/theme/ThemeToggle";

import Home from "./(home)/Home";

export default function Page() {
  return (
    <div>
      <ThemeToggle className="absolute right-4 top-4" />
      <Home />
    </div>
  );
}
