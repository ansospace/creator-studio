import ThemeToggle from "@/components/theme/ThemeToggle";

import Home from "./(home)/Home";

export default function Page() {
  return (
    <div>
      <ThemeToggle className="absolute top-4 right-4" />
      <Home />
    </div>
  );
}
