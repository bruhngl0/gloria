"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    defaultValues: {
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  // Handle URL query parameters for pre-filling inquiries from services page
  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    const serviceParam = searchParams.get("service");

    if (subjectParam) {
      setValue("subject", subjectParam);
    }
    if (serviceParam) {
      setValue(
        "message",
        `Hello Gloria,\n\nI am writing to enquire about the "${serviceParam}" program. Please provide more details regarding booking availability and custom styling timelines.\n\nThank you!`
      );
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactInput) => {
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus("success");
        reset();
      } else {
        setFormStatus("error");
        setErrorMessage(result.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Submit form error:", err);
      setFormStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-12 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Direct Info */}
        <ScrollReveal staggerChildren={0.12} delay={0.1} className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-grey block">
              Get In Touch
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.2em] text-sbg-black uppercase leading-tight">
              Contact Us
            </h1>
            <div className="h-[1px] w-16 bg-sbg-black mt-4 mb-6" />
            <p className="text-xs tracking-wider leading-relaxed text-sbg-grey max-w-md">
              {/* CLIENT COPY */}
              Have a question about sizing, your order, or interested in a custom styling transformation package? Send us a message, and our styling office will assist you.
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-sbg-border/60">
            {/* Email card */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-sbg-offwhite border border-sbg-border/60 rounded-full">
                <Mail className="h-4.5 w-4.5 text-sbg-black stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-sbg-black">
                  Email Us
                </h3>
                <a
                  href="mailto:styling@styledbygloria.com"
                  className="text-xs tracking-wider text-sbg-grey hover:text-sbg-black transition-colors"
                >
                  styling@styledbygloria.com
                </a>
              </div>
            </div>

            {/* Social card */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-sbg-offwhite border border-sbg-border/60 rounded-full">
                <InstagramIcon className="h-4.5 w-4.5 text-sbg-black stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-sbg-black">
                  Direct Message
                </h3>
                <a
                  href="https://instagram.com/styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wider text-sbg-grey hover:text-sbg-black transition-colors"
                >
                  @styledbygloria_g
                </a>
              </div>
            </div>
          </div>

          {/* Response SLA Note */}
          <div className="bg-sbg-offwhite p-6 border border-sbg-border/50 text-[11px] tracking-wider text-sbg-grey leading-relaxed">
            Please allow up to 48 hours for our team to review your details and respond. For size-specific inquiries, sharing your bust, waist, and hip measurements is highly encouraged!
          </div>
        </ScrollReveal>

        {/* Right Column: Interactive Form */}
        <ScrollReveal y={20} delay={0.2} className="lg:col-span-7 bg-sbg-white border border-sbg-border p-8 md:p-10">
          {formStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-700 stroke-[1.5]" />
              <h3 className="font-display text-xl font-bold tracking-wider text-sbg-black uppercase">
                Message Sent
              </h3>
              <p className="text-xs tracking-wider text-sbg-grey max-w-sm leading-relaxed">
                Thank you for reaching out to Styled by Gloria. Your inquiry has been received, and our styling lead will follow up shortly.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="text-xs font-bold tracking-widest text-sbg-black uppercase border-b border-sbg-black hover:opacity-80 pb-0.5 pt-4"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs tracking-wider flex items-start space-x-2">
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-sbg-black block">
                  Your Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  disabled={formStatus === "loading"}
                  {...register("name", {
                    required: "Name is required.",
                    minLength: { value: 2, message: "Name must be at least 2 characters." },
                  })}
                  className={cn(
                    "w-full px-4 py-3 border text-xs tracking-wider transition-colors focus:outline-none focus:border-sbg-black",
                    errors.name ? "border-red-500" : "border-sbg-border"
                  )}
                  placeholder="E.g., Jane Smith"
                />
                {errors.name && (
                  <p className="text-[10px] text-red-500 font-semibold tracking-wider">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-sbg-black block">
                  Email Address <span className="text-red-700">*</span>
                </label>
                <input
                  type="email"
                  disabled={formStatus === "loading"}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address format.",
                    },
                  })}
                  className={cn(
                    "w-full px-4 py-3 border text-xs tracking-wider transition-colors focus:outline-none focus:border-sbg-black",
                    errors.email ? "border-red-500" : "border-sbg-border"
                  )}
                  placeholder="E.g., jane@example.com"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-semibold tracking-wider">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-sbg-black block">
                  Subject <span className="text-red-700">*</span>
                </label>
                <select
                  disabled={formStatus === "loading"}
                  {...register("subject", { required: "Subject selection is required." })}
                  className="w-full px-4 py-3 border border-sbg-border bg-sbg-white text-xs tracking-wider transition-colors focus:outline-none focus:border-sbg-black"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Styling Services">Styling Services Inquiry</option>
                  <option value="Order Question">Order Question</option>
                  <option value="Press">Press Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-sbg-black block">
                  Message <span className="text-red-700">*</span>
                </label>
                <textarea
                  rows={6}
                  disabled={formStatus === "loading"}
                  {...register("message", {
                    required: "Message content is required.",
                    minLength: { value: 10, message: "Please enter at least 10 characters." },
                  })}
                  className={cn(
                    "w-full px-4 py-3 border text-xs tracking-wider transition-colors focus:outline-none focus:border-sbg-black resize-y",
                    errors.message ? "border-red-500" : "border-sbg-border"
                  )}
                  placeholder="Write your message here... Include your measurements if looking for fit advice."
                />
                {errors.message && (
                  <p className="text-[10px] text-red-500 font-semibold tracking-wider">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={formStatus === "loading"}
                className="w-full py-4 text-xs font-bold uppercase tracking-widest border-sbg-black bg-sbg-black text-sbg-white hover:bg-sbg-white hover:text-sbg-black transition-colors"
              >
                Send Message
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}

