"use client";

import React from "react";
import Link from "next/link";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// Standard SVG for TikTok since Lucide doesn't have it built-in or may differ
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.17-.26-.26V15c.02 2.06-.58 4.16-1.87 5.77-1.57 2.01-4.11 3.23-6.65 3.23-2.22-.03-4.43-.99-5.91-2.65-1.78-1.95-2.58-4.73-2.11-7.35.48-2.78 2.38-5.32 4.98-6.4 1.25-.53 2.61-.75 3.96-.69V10.7c-1.31-.08-2.67.28-3.66 1.17-.96.84-1.39 2.19-1.12 3.42.23 1.13.97 2.13 1.95 2.7 1.15.68 2.6.76 3.79.16 1.13-.53 1.87-1.7 1.94-2.94.08-2.52.02-15.17.02-15.17Z" />
  </svg>
);

const footerStyles = `
  .sg-footer-grid {
    position: relative;
    overflow: hidden;
  }
  .sg-footer-grid::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background-size: 60px 60px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
    opacity: 0.85;
  }
`;

export default function Footer() {
  return (
    <>
      <style>{footerStyles}</style>
      <footer className="sg-footer-grid bg-sbg-black text-sbg-white pt-16 pb-8 border-t border-sbg-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand & Tagline */}
            <div className="flex flex-col space-y-4">
              <span className="font-display text-xl font-bold tracking-[0.25em] uppercase text-sbg-white">
                Styled by Gloria
              </span>
              <p className="text-xs tracking-wider leading-relaxed text-sbg-grey max-w-xs">
                {/* CLIENT COPY */}
                Clothing that works for your body, not the other way around. Premium, body-intentional fashion and custom styling services.
              </p>
            </div>

            {/* Column 2: Shop links */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-sbg-white mb-6">
                Shop
              </h3>
              <ul className="space-y-4 text-xs tracking-wider text-sbg-grey">
                <li>
                  <Link
                    href="/shop/one-for-all-dress"
                    className="hover:text-sbg-white transition-colors"
                  >
                    The One for All Dress
                  </Link>
                </li>
                <li className="opacity-50">
                  <span>Coming Soon</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Services links */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-sbg-white mb-6">
                Services
              </h3>
              <ul className="space-y-4 text-xs tracking-wider text-sbg-grey">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-sbg-white transition-colors"
                  >
                    Book a Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-sbg-white transition-colors"
                  >
                    Personal Styling Packages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal & Social */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-sbg-white mb-6">
                Follow & Support
              </h3>
              <ul className="space-y-4 text-xs tracking-wider text-sbg-grey mb-6">
                <li>
                  <Link href="/privacy" className="hover:text-sbg-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-sbg-white transition-colors">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-sbg-white transition-colors">
                    Shipping Policy
                  </Link>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sbg-grey hover:text-sbg-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5 stroke-[1.5]" />
                </a>
                <a
                  href="https://tiktok.com/@styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sbg-grey hover:text-sbg-white transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sbg-grey hover:text-sbg-white transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="h-5 w-5 stroke-[1.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom copyright bar */}
          <div className="border-t border-[#222222] pt-8 text-center">
            <p className="text-[10px] tracking-widest text-sbg-grey uppercase">
              &copy; {new Date().getFullYear()} Styled by Gloria. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
