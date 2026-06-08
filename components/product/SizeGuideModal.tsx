"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const measurements = [
    { size: "XS", us: "0 - 2", bust: '31" - 32"', waist: '24" - 25"', hips: '34" - 35"' },
    { size: "S", us: "4 - 6", bust: '33" - 34"', waist: '26" - 27"', hips: '36" - 37"' },
    { size: "M", us: "8 - 10", bust: '35" - 36"', waist: '28" - 29"', hips: '38" - 39"' },
    { size: "L", us: "12 - 14", bust: '38" - 39"', waist: '31" - 32"', hips: '41" - 42"' },
    { size: "XL", us: "16 - 18", bust: '41" - 42"', waist: '34" - 35"', hips: '44" - 45"' },
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-sbg-black/30 backdrop-blur-[2px] transition-opacity data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

        {/* Content panel */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-sbg-white p-6 md:p-8 shadow-2xl transition-all duration-300 focus:outline-none border border-sbg-border data-[state=open]:animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sbg-border pb-4 mb-6">
            <Dialog.Title className="font-display text-base font-bold tracking-[0.15em] text-sbg-black uppercase">
              Size Guide
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 text-sbg-black hover:text-sbg-grey transition-colors"
              aria-label="Close size guide"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Description */}
          <Dialog.Description className="text-xs text-sbg-grey tracking-wider leading-relaxed mb-6">
            {/* CLIENT COPY */}
            Our pieces are designed with generous side ruching and multi-way stretch fabrics that adapt to and flatter your curves. Reference our size chart below to find your perfect fit.
          </Dialog.Description>

          {/* Measurements Table */}
          <div className="overflow-x-auto border border-sbg-border mb-6">
            <table className="w-full text-left border-collapse text-xs tracking-wider">
              <thead>
                <tr className="bg-sbg-offwhite border-b border-sbg-border font-bold text-sbg-black uppercase">
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">US Size</th>
                  <th className="py-3 px-4">Bust</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sbg-border text-sbg-grey">
                {measurements.map((row) => (
                  <tr key={row.size} className="hover:bg-sbg-hover/50">
                    <td className="py-3 px-4 font-bold text-sbg-black">{row.size}</td>
                    <td className="py-3 px-4">{row.us}</td>
                    <td className="py-3 px-4">{row.bust}</td>
                    <td className="py-3 px-4">{row.waist}</td>
                    <td className="py-3 px-4">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sizing tip alert */}
          <div className="bg-sbg-offwhite border border-sbg-border/60 p-4">
            <h4 className="text-[11px] font-bold tracking-widest text-sbg-black uppercase mb-1">
              Need Assistance?
            </h4>
            <p className="text-[11px] tracking-wider text-sbg-grey leading-relaxed">
              If your measurements fall between sizes or you are looking for specific body type advice, we recommend booking a virtual <b>Body Type Education Session</b> with our styling team.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
