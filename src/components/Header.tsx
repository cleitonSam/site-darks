"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import GeolocationStatusIndicator from "@/components/GeolocationStatusIndicator";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoUrl = "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/Design%20sem%20nome%20(6).png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Diferenciais", href: "/#diferenciais" },
    { name: "Unidades", href: "/#unidades" },
    { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    { name: "Seja um Investidor", href: "/seja-um-investidor" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b bg-black border-white/10",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container px-6 mx-auto flex items-center justify-between">
        {/* Logo - Image */}
        <a href="#" className="relative group">
          <img src={logoUrl} alt="DARK'SGYM Logo" className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" />
        </a>

        {/* Desktop Nav and Geolocation Indicator */}
        <div className="hidden md:flex items-center space-x-10">
          <nav className="flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-black uppercase tracking-wider text-white hover:text-white/70 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <GeolocationStatusIndicator />
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden">
          <GeolocationStatusIndicator />
          <button 
            className="text-white ml-4" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 md:hidden",
        mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-3xl font-black uppercase italic text-white hover:text-white/50 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;