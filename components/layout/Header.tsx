"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-40 w-full border-b border-sbg-border bg-sbg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="font-display text-lg md:text-xl font-bold tracking-[0.2em] text-sbg-black hover:opacity-85 transition-opacity uppercase"
          >
            Styled by Gloria
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors hover:text-sbg-black nav-link-fancy pb-1 ${
                    active ? "font-semibold text-sbg-black active" : "text-sbg-grey"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center space-x-4">
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

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 md:hidden text-sbg-black hover:text-sbg-grey transition-colors"
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
