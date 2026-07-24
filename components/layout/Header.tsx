"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

type NavItem = {
  category: string;
  href: string;
  type: "scroll" | "route";
};

const navItems: NavItem[] = [
  { category: "Home", href: "#home", type: "scroll" },
  { category: "Products", href: "/products", type: "route" },
  { category: "About", href: "#about", type: "scroll" },
  { category: "Contact", href: "#contact", type: "scroll" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["home", "about", "contact"];

      for (const id of sections) {
        const element = document.getElementById(id);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollLink = (href: string) => {
    setMobileOpen(false);

    const id = href.replace("#", "");

    if (pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const desktopLinks = useMemo(
    () =>
      navItems.map((item) => {
        const isActive =
          item.type === "route"
            ? pathname === item.href
            : pathname === "/" &&
            activeSection === item.href.replace("#", "");

        const baseClasses =
          "relative text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

        const activeClasses = isActive
          ? "text-[#D4AF37]"
          : "text-white hover:text-[#D4AF37]";

        if (item.type === "route") {
          return (
            <Link
              key={item.category}
              href={item.href}
              className={`${baseClasses} ${activeClasses}`}
            >
              {item.category}
            </Link>
          );
        }

        return (
          <button
            key={item.category}
            type="button"
            onClick={() => handleScrollLink(item.href)}
            className={`${baseClasses} ${activeClasses}`}
          >
            {item.category}
          </button>
        );
      }),
    [pathname, activeSection]
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all backdrop-blur-xl duration-500 ${isScrolled
          ? "border-b border-white/10 bg-black/65 shadow-2xl backdrop-blur-xl"
          : "border-b border-white/10 bg-black/65 shadow-2xl backdrop-blur-xl"
        }`}
    >
      <nav
        aria-category="Primary Navigation"
        className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group text-2xl font-bold tracking-[0.25em] transition-colors duration-300 focus-visible:outline-none  "
        >
          <span className="text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
            BOX
          </span>
          <span className="text-[#D4AF37] transition-colors duration-300 group-hover:text-white">
            WALE
          </span>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {desktopLinks}

          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[#F7E7A1] via-[#D4AF37] to-[#B8860B] px-7 py-3 text-sm font-bold text-black shadow-lg shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Get Quote
          </Link>
        </div>

        <button
          type="button"
          aria-category="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-md p-2 text-white transition hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] lg:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${mobileOpen ? "max-h-[420px]" : "max-h-0"
          }`}
      >
        <div className="border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
            {navItems.map((item) => {
              const isActive =
                item.type === "route"
                  ? pathname === item.href
                  : pathname === "/" &&
                  activeSection === item.href.replace("#", "");

              const classes = `rounded-lg px-3 py-3 text-left font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${isActive
                  ? "text-[#D4AF37]"
                  : "text-white hover:text-[#D4AF37]"
                }`;

              if (item.type === "route") {
                return (
                  <Link
                    key={item.category}
                    href={item.href}
                    className={classes}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.category}
                  </Link>
                );
              }

              return (
                <button
                  key={item.category}
                  type="button"
                  className={classes}
                  onClick={() => handleScrollLink(item.href)}
                >
                  {item.category}
                </button>
              );
            })}

            <Link
              href="#contactForm"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-full bg-gradient-to-r from-[#F7E7A1] via-[#D4AF37] to-[#B8860B] px-6 py-3 text-center font-bold text-black shadow-lg transition duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}