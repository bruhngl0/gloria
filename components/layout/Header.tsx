"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setVisible(true);
      } else {
        setVisible(lastScrollY > currentScrollY);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Styling Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b border-sbg-border bg-sbg-white/90 backdrop-blur-md transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}>
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-12 h-16 w-full items-center">
          {/* Logo / Wordmark (Left partition matching left sidebar) */}
          <div className="col-span-3 flex items-center h-full pl-[60px] lg:pl-[65px]">
            <Link
              href="/"
              className="font-display text-lg md:text-xl font-bold tracking-[0.2em] text-sbg-black hover:opacity-85 transition-opacity uppercase"
            >
              Styled by Gloria
            </Link>
          </div>

          {/* Desktop Nav Links (Center partition centering over visual lookbook) */}
          <div className="col-span-6 flex items-center justify-center h-full">
            <nav className="flex space-x-8">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm tracking-wider uppercase transition-colors text-sbg-black hover:opacity-70 nav-link-fancy pb-1 ${
                      active ? "font-semibold active" : "font-normal"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Icons & Actions (Right partition matching right purchasing drawer) */}
          <div className="col-span-3 flex items-center justify-end h-full pr-6 lg:pr-8 space-x-4">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-sbg-black hover:text-sbg-grey transition-colors"
              aria-label="Open cart"
              id="header-cart-btn"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sbg-black text-[9px] font-bold text-sbg-white animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden h-14 w-full items-center justify-between px-4">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-[0.2em] text-sbg-black hover:opacity-85 transition-opacity uppercase"
          >
            Styled by Gloria
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-sbg-black hover:text-sbg-grey transition-colors"
              aria-label="Open cart"
              id="header-cart-btn-mobile"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sbg-black text-[9px] font-bold text-sbg-white animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-sbg-black hover:text-sbg-grey transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        isActive={isActive}
      />
    </>
  );
}
