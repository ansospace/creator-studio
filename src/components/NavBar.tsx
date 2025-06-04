"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui";

import { useAppSelector } from "../redux/store";

const navItems = [
  { link: "/", name: "Home" },
  { link: "/about", name: "About" },
  { link: "/courses", name: "Courses", badge: "New" },
  { link: "/blog", name: "Blog" },
  { link: "/quizzes", name: "Quizzes" },
];

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

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
            <Image src="/images/ansopedia_logo.svg" alt="ansopedia" width={40} height={40} priority />
            <span className="text-xl font-bold">Ansopedia</span>
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
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-[180px] pl-8 transition-all duration-300 focus:w-[280px] lg:w-[240px]"
            />
          </div>

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

          {/* Auth Buttons or User Menu */}
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/avatar.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" onClick={() => router.push("/login")} className="font-medium">
                Sign in
              </Button>
              <Button onClick={() => router.push("/signup")} className="font-medium">
                Create account
              </Button>
            </div>
          )}

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
                {!isAuthenticated && (
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
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
