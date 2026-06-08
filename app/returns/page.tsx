import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Styled by Gloria",
  description: "Detailed returns, exchanges, and fit-adjustments policy guidelines for Styled by Gloria.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-sbg-white min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-[720px] px-4">
        {/* Header */}
        <div className="border-b border-sbg-border pb-8 mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
            Returns & Exchanges
          </h1>
          <p className="text-[10px] tracking-widest text-sbg-grey uppercase mt-2">
            Our Fit Commitment
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-xs tracking-wider leading-relaxed text-sbg-grey">
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              Our Fit Philosophy
            </h2>
            <p>
              {/* CLIENT COPY */}
              At Styled by Gloria, our goal is to help you find clothing that honors your body shape. If your purchase does not drape or fit your lines as expected, we are committed to making it right through exchanges or returns.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              Return Guidelines
            </h2>
            <p>
              {/* CLIENT COPY */}
              We accept returns and exchanges on unworn, unwashed garments within 14 days of delivery. All original tags must remain attached, and items must be returned in their original packaging.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Returns are refunded to your original payment method.</li>
              <li>Exchanges for different sizes or colorways of equal value are processed free of return shipping fees.</li>
              <li>Sale items and custom-tailored styling bundles are final sale.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              How to Process a Return
            </h2>
            <p>
              {/* CLIENT COPY */}
              To initiate a return or exchange, please email styling@styledbygloria.com with your order number and request. If you are returning due to a fit mismatch, we highly recommend sharing your measurements so our stylist can suggest the correct size or adjustments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
