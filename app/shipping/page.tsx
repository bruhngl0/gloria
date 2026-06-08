import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Styled by Gloria",
  description: "Detailed domestic and international shipping policy details for Styled by Gloria.",
};

export default function ShippingPage() {
  return (
    <div className="bg-sbg-white min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-[720px] px-4">
        {/* Header */}
        <div className="border-b border-sbg-border pb-8 mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
            Shipping Policy
          </h1>
          <p className="text-[10px] tracking-widest text-sbg-grey uppercase mt-2">
            Delivery Information
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-xs tracking-wider leading-relaxed text-sbg-grey">
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              Processing Timelines
            </h2>
            <p>
              {/* CLIENT COPY */}
              Every order is processed and packaged with intentional care at our styling studio. Standard orders are processed within 2–3 business days. During collection launches, please allow up to 5 business days for tracking details to update.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              Rates & Delivery Estimates
            </h2>
            <p>
              {/* CLIENT COPY */}
              We offer complimentary standard shipping on all orders over $150 CAD. For orders below this threshold, shipping rates are calculated at checkout based on destination.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Domestic (Canada):</strong> 3–7 business days via Canada Post.</li>
              <li><strong>United States:</strong> 5–10 business days via USPS.</li>
              <li><strong>International:</strong> 7–14 business days. Duties and import taxes are the responsibility of the recipient.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
              Package Tracking
            </h2>
            <p>
              {/* CLIENT COPY */}
              Once your package leaves our studio, you will receive a tracking confirmation link via email. If you experience delays or transit issues, please reach out to our support lead at styling@styledbygloria.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
