"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#destinasi", label: "Destinasi" },
  { href: "/#budaya", label: "Budaya" },
  { href: "/#kuliner", label: "Kuliner" },
  { href: "/chat", label: "Tanya Asisten" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(menuRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(menuRef.current, {
          y: -20,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [isOpen] }
  );

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sectionIds = navLinks.map((link) => link.href.split("#")[1]).filter(Boolean);

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash("/#" + entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section: any) => observer.observe(section));

    return () => {
      sections.forEach((section: any) => observer.unobserve(section));
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setHasScrolled(scrolled);

      if (!scrolled && pathname === "/") {
        setActiveHash("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mx-[3%]`}>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          hasScrolled
            ? "bg-white shadow-md mt-2 rounded-full max-md:mt-5"
            : "w-full bg-transparent mt-5"
        }`}
      >
        <div className="flex justify-between items-center h-20 max-md:h-16">
          <div className="shrink-0">
            <Link
              href="/"
              className="text-3xl font-bold text-green-800 hover:text-green-400 transition-colors max-md:text-2xl flex items-center active:scale-95"
            >
              <Image src="/logo/majago-solid.png" alt="" width={50} height={50} />
              <h1>MajaGo</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => {
              let isActive = false;

              if (link.href.startsWith("/#")) {
                isActive = pathname === "/" && activeHash === link.href;
              } else if (link.href === "/") {
                isActive = pathname === "/" && activeHash === "";
              } else {
                isActive = pathname === link.href;
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-medium transition-colors group ${
                    isActive ? "text-green-800" : "text-gray-800 hover:text-green-700"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full transition-all ease-in-out duration-300 active:bg-green-300 text-green-800 hover:bg-green-200 focus:outline-none"
              aria-label="Open menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={menuRef}
        className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl opacity-0 invisible -translate-y-5"
      >
        <div className="px-2 py-3 space-y-2 sm:px-3">
          {navLinks.map((link) => {
            let isActive = false;
            if (link.href.startsWith("/#")) {
              isActive = pathname === "/" && activeHash === link.href;
            } else if (link.href === "/") {
              isActive = pathname === "/" && activeHash === "";
            } else {
              isActive = pathname === link.href;
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors active:bg-green-300 ${
                  isActive
                    ? "text-green-800 bg-green-300"
                    : "text-gray-800 hover:text-green-800 hover:bg-green-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
