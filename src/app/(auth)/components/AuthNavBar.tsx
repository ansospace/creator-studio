"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Badge, Button, Input, Sheet, SheetContent, SheetTrigger, Typography } from "@/components/ui";

const navItems = [
  { link: "/", name: "Home" },
  { link: "/about", name: "About" },
  { link: "/courses", name: "Courses", badge: "New" },
  { link: "/blog", name: "Blog" },
  { link: "/quizzes", name: "Quizzes" },
];

const AuthNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "bg-background/95 border-b shadow-sm" : "bg-background/80"
      }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo - Left */}
        <div className="shrink-0">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="relative h-[40px] w-[40px]">
              <Image src="/images/ansopedia_logo.svg" alt="ansopedia" fill className="object-contain" priority />
            </div>

            <Typography className="text-xl font-bold">Ansopedia</Typography>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden flex-1 items-center justify-center gap-5 md:flex">
          {navItems.map(({ link, name, badge }) => (
            <Link
              key={link}
              href={link}
              className={`relative flex items-center gap-1.5 font-medium transition-colors duration-200 ${
                pathname === link
                  ? "text-primary after:bg-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:content-['']"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {name}
              {badge && (
                <Badge variant="secondary" className="h-5 py-0 text-xs">
                  {badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* Search and CTA - Right */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="flex"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="mt-6 flex flex-col gap-4 p-4">
                {/* Mobile Search */}
                <div className="relative mb-2">
                  <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                  <Input type="search" placeholder="Search..." className="pl-8" />
                </div>

                {/* Mobile Nav Links */}
                {navItems.map(({ link, name, badge }) => (
                  <Link
                    key={link}
                    href={link}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b pb-2 text-lg font-medium ${
                      pathname === link ? "text-primary border-primary" : "text-muted-foreground border-muted"
                    } hover:text-primary transition-colors duration-200`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{name}</span>
                      {badge && (
                        <Badge variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      )}
                    </div>
                    {pathname === link && <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>}
                  </Link>
                ))}

                {/* Mobile Auth Buttons */}
                {/* {!isAuthenticated && (
                  <div className="mt-4 flex flex-col gap-3">
                    <Button
                      className="w-full"
                      onClick={() => {
                        router.push("/login");
                        setOpen(false);
                      }}
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        router.push("/signup");
                        setOpen(false);
                      }}
                    >
                      Create account
                    </Button>
                  </div>
                )} */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default AuthNavBar;
