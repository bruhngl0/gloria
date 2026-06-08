"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    isLoading,
    updateQuantity,
    removeFromCart,
    checkoutUrl,
  } = useCart();

  const cartLines = cart?.lines?.edges || [];
  const subtotal = cart?.cost?.totalAmount || { amount: "0.00", currencyCode: "CAD" };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        {/* Backdrop overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-sbg-black/30 backdrop-blur-[2px] transition-opacity data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

        {/* Content panel */}
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-sbg-white shadow-2xl flex flex-col focus:outline-none transition-transform duration-300 data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sbg-border px-6 py-5">
            <Dialog.Title className="font-display text-base font-bold tracking-[0.15em] text-sbg-black uppercase">
              Your Bag
            </Dialog.Title>
            <button
              onClick={closeCart}
              className="p-1 text-sbg-black hover:text-sbg-grey transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Drawer Body - Scrollable Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {isLoading && cartLines.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-sbg-black border-t-transparent" />
              </div>
            ) : cartLines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <p className="text-sm tracking-wider text-sbg-grey uppercase font-display">
                  Your bag is currently empty
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center px-6 py-3 border border-sbg-black text-xs font-semibold uppercase tracking-widest bg-sbg-black text-sbg-white hover:bg-sbg-white hover:text-sbg-black transition-all duration-300"
                >
                  Shop the Collection
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-sbg-border">
                {cartLines.map((edge) => {
                  const line = edge.node;
                  const variant = line.merchandise;
                  const price = variant?.price;
                  const image = variant?.image;
                  const selectedOptions = variant?.selectedOptions || [];
                  const colorOption = selectedOptions.find((o) => o.name === "Color")?.value;
                  const sizeOption = selectedOptions.find((o) => o.name === "Size")?.value;

                  return (
                    <div key={line.id} className="flex py-6 first:pt-0">
                      {/* Image */}
                      <div className="relative h-28 w-20 flex-shrink-0 border border-sbg-border overflow-hidden bg-sbg-offwhite aspect-[3/4]">
                        {image?.url ? (
                          <Image
                            src={image.url}
                            alt={image.altText || variant.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full bg-sbg-hover flex items-center justify-center text-[10px] text-sbg-grey">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Item Info */}
                      <div className="ml-4 flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-sbg-black">
                            <h4 className="line-clamp-1">
                              {variant.product?.title || "SBG Piece"}
                            </h4>
                            <p className="ml-4">
                              {price ? formatPrice(parseFloat(price.amount) * line.quantity, price.currencyCode) : ""}
                            </p>
                          </div>
                          <p className="mt-1 text-[11px] tracking-wider uppercase text-sbg-grey">
                            {colorOption && `Color: ${colorOption}`}
                            {colorOption && sizeOption && "  ·  "}
                            {sizeOption && `Size: ${sizeOption}`}
                          </p>
                        </div>

                        {/* Qty & Remove Actions */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-sbg-border">
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              disabled={isLoading}
                              className="px-2 py-1 text-sbg-black hover:bg-sbg-hover transition-colors disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-sbg-black">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              disabled={isLoading}
                              className="px-2 py-1 text-sbg-black hover:bg-sbg-hover transition-colors disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(line.id)}
                            disabled={isLoading}
                            className="p-1 text-sbg-grey hover:text-sbg-black transition-colors disabled:opacity-50"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer - Summary and Checkout */}
          {cartLines.length > 0 && (
            <div className="border-t border-sbg-border px-6 py-6 bg-sbg-offwhite space-y-6">
              <div className="flex justify-between items-center text-xs tracking-wider uppercase">
                <span className="text-sbg-grey font-medium">Subtotal</span>
                <span className="font-bold text-sbg-black">
                  {formatPrice(subtotal.amount, subtotal.currencyCode)}
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-sbg-grey uppercase leading-normal">
                Shipping, duties, and taxes calculated at checkout.
              </p>

              <div className="space-y-3">
                <a
                  href={checkoutUrl}
                  className="w-full inline-flex items-center justify-center px-6 py-4 border border-sbg-black text-xs font-bold uppercase tracking-widest bg-sbg-black text-sbg-white hover:opacity-90 active:scale-[0.99] transition-all text-center"
                >
                  Proceed to Checkout
                </a>
                <button
                  onClick={closeCart}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-sbg-border text-xs font-semibold uppercase tracking-widest bg-sbg-white text-sbg-black hover:bg-sbg-hover transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
