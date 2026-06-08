import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Styled by Gloria",
  description: "Privacy policy and terms of service guidelines for Styled by Gloria.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-sbg-white min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-[720px] px-4">
        {/* Header */}
        <div className="border-b border-sbg-border pb-8 mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
            Privacy Policy
          </h1>
          <p className="text-[10px] tracking-widest text-sbg-grey uppercase mt-2">
            Last updated: June 2026
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-xs tracking-wider leading-relaxed text-sbg-grey">
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              {/* CLIENT COPY */}
              At Styled by Gloria, we respect your privacy and are committed to protecting your personal details. We collect information you provide directly to us when you make a purchase, create a cart session, subscribe to our newsletter, book a virtual styling consultation, or contact us through our inquiry forms.
            </p>
            <p>
              This information may include your name, email address, mailing address, phone number, billing coordinates, and physical measurements shared during styling preparation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              2. How We Use Your Details
            </h2>
            <p>
              {/* CLIENT COPY */}
              We use the collected information to process orders, manage checkout redirects through our Shopify integration, organize calendars for styling sessions, and tailor styling instructions to your body lines.
            </p>
            <p>
              We will never sell or rent your personal coordinates to third-party advertisers. Your measurements and styling feedback are kept confidential inside our secure client files.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              3. Cookies & Integration Partners
            </h2>
            <p>
              {/* CLIENT COPY */}
              We utilize cookies to optimize website performance, persist your cart items in localStorage, and manage sessions. We work with trusted partners including Shopify (to process payment transactions) and Calendly (to manage consultation bookings).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              4. Contact Our Privacy Lead
            </h2>
            <p>
              {/* CLIENT COPY */}
              If you have any questions regarding our terms or wish to request the deletion of your personal measurements from our database, please contact styling@styledbygloria.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
