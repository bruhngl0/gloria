"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');

  .sg-root {
    min-height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    background: transparent;
  }

  .sg-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
  }

  /* Monogram */
  .sg-monogram {
    position: relative;
    width: 90px;
    height: 90px;
  }

  .sg-circle-track {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 0.75px solid rgba(0, 0, 0, 0.12);
  }

  .sg-circle-spin {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 0.75px solid transparent;
    border-top-color: #888;
    border-right-color: #888;
    animation: sg-spin 2.4s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  }

  /* Thread bar */
  .sg-thread-container {
    position: relative;
    width: 160px;
    height: 1px;
    overflow: visible;
  }

  .sg-thread-base {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.5px;
    background: rgba(0, 0, 0, 0.1);
  }

  .sg-thread-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 0.5px;
    width: 0%;
    background: #1a1a1a;
    animation: sg-thread 2.4s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  }

  .sg-needle {
    position: absolute;
    top: -4px;
    left: 0%;
    width: 18px;
    height: 9px;
    transform: translateX(-2px);
    animation: sg-needle-move 2.4s cubic-bezier(0.37, 0, 0.63, 1) infinite;
    opacity: 0;
    animation-delay: 0.05s;
  }

  /* Dot indicators */
  .sg-dots {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .sg-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    animation: sg-dot-wave 1.8s ease-in-out infinite;
  }
  .sg-dot:nth-child(2) { animation-delay: 0.2s; }
  .sg-dot:nth-child(3) { animation-delay: 0.4s; }

  /* Wordmark */
  .sg-wordmark {
    text-align: center;
  }

  .sg-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #000000;
    display: block;
    line-height: 1;
    animation: sg-fade-letter 2s ease-in-out infinite alternate;
  }

  .sg-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.35em;
    color: #000000;
    text-transform: uppercase;
    display: block;
    margin-top: 8px;
    animation: sg-fade-letter 2s ease-in-out infinite alternate;
    animation-delay: 0.3s;
  }

  /* Keyframes */
  @keyframes sg-spin {
    0%   { transform: rotate(0deg);   opacity: 0.3; }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: rotate(360deg); opacity: 0.3; }
  }

  @keyframes sg-thread {
    0%   { width: 0%;    }
    60%  { width: 100%;  opacity: 1; }
    80%  { width: 100%;  opacity: 1; }
    100% { width: 100%;  opacity: 0; }
  }

  @keyframes sg-needle-move {
    0%   { left: 0%;                    opacity: 0; }
    5%   { opacity: 1; }
    60%  { left: calc(100% - 18px);     opacity: 1; }
    70%  { left: calc(100% - 18px);     opacity: 0; }
    100% { left: calc(100% - 18px);     opacity: 0; }
  }

  @keyframes sg-dot-wave {
    0%, 100% { background: rgba(0,0,0,0.2); transform: translateY(0);  }
    50%       { background: rgba(0,0,0,0.5); transform: translateY(-3px); }
  }

  @keyframes sg-fade-letter {
    0%   { opacity: 0.5; }
    100% { opacity: 1;   }
  }
`;

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Step 1: Trigger fade-out animation after loading sequence completes
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      if (typeof window !== "undefined") {
        (window as any).__sbg_loading_complete = true;
        window.dispatchEvent(new Event("sbg-loading-complete"));
      }
    }, 2800);

    // Step 2: Fully unmount the splash overlay after transition
    const removeTimeout = setTimeout(() => {
      setShow(false);
    }, 3300);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{styles}</style>

      <div
        className={cn(
          "fixed inset-0 z-[9999] bg-sbg-white flex items-center justify-center select-none transition-opacity duration-500 ease-in-out",
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        {mounted && (
          <div className="sg-root" role="status" aria-label="Loading Styles by Gloria">
            <div className="sg-loader">
              
              {/* Spinning monogram */}
              <div className="sg-monogram">
                <div className="sg-circle-track" />
                <div className="sg-circle-spin" />
              </div>

              {/* Brand wordmark */}
              <div className="sg-wordmark">
                <span className="sg-brand">Styled by Gloria</span>
                <span className="sg-sub">Loading your experience</span>
              </div>

              {/* Animated thread with needle */}
              <div className="sg-thread-container">
                <div className="sg-thread-base" />
                <div className="sg-thread-fill" />
                <svg
                  className="sg-needle"
                  viewBox="0 0 18 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="9" cy="4.5" rx="8.5" ry="3.5"
                    fill="#f5f5f5"
                    stroke="#999"
                    strokeWidth="0.5"
                  />
                  <ellipse cx="9" cy="4.5" rx="3" ry="1.5" fill="#ccc" />
                  <line x1="17.5" y1="4.5" x2="14" y2="4.5" stroke="#1a1a1a" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Dots */}
              <div className="sg-dots" aria-hidden="true">
                <div className="sg-dot" />
                <div className="sg-dot" />
                <div className="sg-dot" />
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
