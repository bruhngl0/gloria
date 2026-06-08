import React, { Suspense } from "react";
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Styled by Gloria",
  description: "Send us an enquiry regarding styling consultations, orders, or sizing questions.",
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-sbg-white">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-sbg-black border-t-transparent" />
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  );
}
