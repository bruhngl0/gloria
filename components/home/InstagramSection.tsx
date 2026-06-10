"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";

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

interface InstagramItem {
  id: string | number;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  caption: string;
  link: string;
}

const LOCAL_MOCK_FEED: InstagramItem[] = [
  {
    id: 1,
    type: "image",
    src: "/images/dress-black-model.jpg",
    caption: "Signature drape calibrations — Model Atelier Shot",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 2,
    type: "video",
    src: "/images/shortdes.mp4",
    thumbnail: "/images/dress-black-detail.jpg",
    caption: "Atelier motion studies. Adjusting drape speed and natural body flow.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 3,
    type: "image",
    src: "/images/about-hero.jpg",
    caption: "Inside the design headquarters: research logs and pattern drawings.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 4,
    type: "image",
    src: "/images/dress-red-front.jpg",
    caption: "French Crepe swatch study: Crimson Red signature silhouette.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 5,
    type: "image",
    src: "/images/stylist-gloria.jpg",
    caption: "Founder Gloria G. mapping structural silhouette lines.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 6,
    type: "image",
    src: "/images/one.png",
    caption: "Fabric density explorations. 280G stretch crepe memory testing.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 7,
    type: "image",
    src: "/images/dress-blue-front.jpg",
    caption: " французький blue swatch edition — limited run calibration.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 8,
    type: "image",
    src: "/images/two.png",
    caption: "Drape texture details. Double-backed cowl neckline contour.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 9,
    type: "image",
    src: "/images/three.png",
    caption: "Pattern drafting layouts for custom profile contours.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 10,
    type: "image",
    src: "/images/gloria.jpg",
    caption: "Refining the silhouette. Creative direction and shape mapping.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 11,
    type: "image",
    src: "/images/dress-black-detail.jpg",
    caption: "Atelier detail crop: cowl neck alignment and bias cut.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
  {
    id: 12,
    type: "image",
    src: "/images/point.png",
    caption: "Creative direction log. Curation sequence for the storefront.",
    link: "https://www.instagram.com/styledbygloria_g/",
  },
];


interface InstagramCardProps {
  item: InstagramItem;
  index: number;
  onClick: (link: string) => void;
}

function InstagramCard({ item, index, onClick }: InstagramCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized position relative to center of card (-1 to 1)
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max tilt angles: 12 degrees
    const maxTilt = 12;
    const rotateY = ((x - xc) / xc) * maxTilt;
    const rotateX = -((y - yc) / yc) * maxTilt;
    
    setCoords({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setCoords({ rotateX: 0, rotateY: 0 });
  };

  const showVideo = item.type === "video" && hovered;

  return (
    <div
      ref={cardRef}
      className={`relative aspect-square cursor-pointer group ${
        index >= 6 ? "hidden md:block" : ""
      }`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item.link)}
    >
      <div
        className="w-full h-full relative overflow-hidden bg-sbg-offwhite transition-transform duration-300 ease-out border border-sbg-white/5 rounded-sm"
        style={{
          transform: hovered
            ? `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.05, 1.05, 1.05)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 25px 2px rgba(255, 255, 255, 0.08)"
            : "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Media Element - Parallax background layer */}
        <div 
          className="relative w-full h-full select-none"
          style={{ transform: "translateZ(15px)" }}
        >
          {/* Underlay Poster/Image */}
          <Image
            src={item.thumbnail || item.src}
            alt={item.caption}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 17vw"
          />

          {/* Lazy Autoplay video on hover for performance */}
          {showVideo && (
            <video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 object-cover w-full h-full z-10"
            />
          )}
        </div>

        {/* Overlay with Instagram Icon / Caption details - Parallax foreground layer floating forward */}
        <div 
          className="absolute inset-0 bg-sbg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-between p-4 z-20"
          style={{ transform: "translateZ(35px)" }}
        >
          {/* Top Action Icon */}
          <div className="flex justify-between items-start">
            {item.type === "video" ? (
              <span className="bg-sbg-white/10 text-sbg-white p-1 rounded-full backdrop-blur-sm">
                <Play className="h-3 w-3 fill-current text-sbg-white" />
              </span>
            ) : (
              <span />
            )}
            <InstagramIcon className="h-4 w-4 text-sbg-white/85 group-hover:text-sbg-white transition-colors" />
          </div>

          {/* Bottom Caption Details */}
          <div className="space-y-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-350">
            <p className="text-[9px] text-sbg-white/95 uppercase tracking-[0.18em] leading-relaxed line-clamp-3">
              {item.caption || "Atelier details and visual logs."}
            </p>
            <span className="text-[7.5px] text-sbg-white/60 tracking-widest uppercase block pt-1 border-t border-sbg-white/10">
              VIEW POST &gt;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstagramSection() {
  const [feed, setFeed] = useState<InstagramItem[]>(LOCAL_MOCK_FEED);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await fetch("/api/instagram");
        if (response.ok) {
          const json = await response.json();
          if (json.mode === "live" && Array.isArray(json.data) && json.data.length > 0) {
            setFeed(json.data.slice(0, 12)); // Display up to 12 items
            setIsLive(true);
          }
        }
      } catch (err) {
        console.error("Failed to load live Instagram feed, using mock fallback:", err);
      }
    }
    fetchFeed();
  }, []);

  const handleCardClick = (link: string) => {
    if (typeof window !== "undefined") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-sbg-black to-sbg-white selection:bg-sbg-white selection:text-sbg-black text-sbg-white">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-[8px] tracking-[0.3em] font-bold text-sbg-white/50 uppercase block mb-3">
          {isLive ? "LIVE FEED" : "STUDIO STORIES"}
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-normal tracking-wide text-sbg-white uppercase">
          Curated Atelier Flow
        </h2>
        <div className="w-12 h-[1px] bg-sbg-white/20 mx-auto mt-4" />
      </div>

      {/* Grid Container (6 columns on desktop, 3 on tablet, 2 on mobile) */}
      <ScrollReveal staggerChildren={0.05} delay={0.1} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full" style={{ perspective: "1500px" }}>
          {feed.map((item, index) => (
            <InstagramCard
              key={item.id}
              item={item}
              index={index}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </ScrollReveal>

      {/* Bottom Link Handle */}
      <div className="text-center mt-12">
        <a
          href="https://instagram.com/styledbygloria_g/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-sbg-black hover:text-sbg-black/70 transition-colors pb-1 border-b border-sbg-black hover:border-sbg-black/70"
        >
          @styledbygloria_g
        </a>
      </div>
    </section>
  );
}

