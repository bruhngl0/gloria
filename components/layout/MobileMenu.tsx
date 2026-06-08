"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  isActive: (href: string) => boolean;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  isActive,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-sbg-black md:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-sbg-white p-6 shadow-xl flex flex-col justify-between md:hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <span className="font-display text-lg font-bold tracking-[0.2em] text-sbg-black uppercase">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-sbg-black hover:text-sbg-grey transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col space-y-6">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`text-xl tracking-widest uppercase font-display block py-2 ${
                        isActive(link.href)
                          ? "font-semibold text-sbg-black pl-2 border-l-2 border-sbg-black"
                          : "text-sbg-grey"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer / Socials inside menu */}
            <div className="border-t border-sbg-border pt-6 text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-sbg-grey mb-4">
                Styled by Gloria
              </p>
              <div className="flex justify-center space-x-6 text-sm text-sbg-grey">
                <a
                  href="https://instagram.com/styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sbg-black transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sbg-black transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
