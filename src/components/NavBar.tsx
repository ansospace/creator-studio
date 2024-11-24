"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
];

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center px-4">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <Image src="/images/ansopedia_logo.svg" alt="ansopedia" width={40} height={40} priority />
            <span className="text-xl font-bold">Ansopedia</span>
          </div>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === href}>
                      {label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA - Right */}
        <div className="flex-shrink-0">
          <div className="hidden md:block">
            <Button onClick={() => router.push("login")}>Sign in</Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium ${
                      pathname === href ? "text-primary" : "text-muted-foreground"
                    } hover:text-primary`}
                  >
                    {label}
                  </Link>
                ))}
                <Button
                  className="mt-2"
                  onClick={() => {
                    router.push("login");
                    setOpen(false);
                  }}
                >
                  Sign in
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
