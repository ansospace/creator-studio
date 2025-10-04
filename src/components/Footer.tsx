import Image from "next/image";
import Link from "next/link";

import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

import { Separator, Typography } from "./ui";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/ansopedia", label: "GitHub" },
];

export const Footer = () => {
  return (
    <footer className="container mx-auto">
      <Separator />
      <div className="flex flex-col flex-wrap items-start justify-between gap-8 py-8 sm:flex-row">
        {/* Brand Section */}
        <div className="max-w-md">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <Image src="/images/ansopedia_logo.svg" alt="ansopedia" width={40} height={40} className="h-auto w-auto" />
            <Typography variant="h3" className="text-xl font-bold">
              Ansopedia
            </Typography>
          </Link>
          <Typography className="text-muted-foreground mb-6">
            Empowering global education through accessible learning resources and opportunities.
          </Typography>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        {footerLinks.map((section) => (
          <div key={section.title} className="flex flex-col sm:items-start">
            <Typography variant="h3" className="mb-4 text-sm font-semibold tracking-wider uppercase">
              {section.title}
            </Typography>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
