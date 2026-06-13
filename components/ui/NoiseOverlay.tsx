"use client";

import React, { useEffect, useRef } from "react";

interface NoiseOverlayProps {
  opacity?: number;
  zIndex?: number;
}

export default function NoiseOverlay({ opacity = 0.035, zIndex = 9999 }: NoiseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const { width, height } = canvas;
      if (width === 0 || height === 0) return;

      const imageData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        const val = (Math.random() * 255) | 0;
        buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrame = requestAnimationFrame(drawNoise);
    };

    resize();
    drawNoise();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        opacity,
        zIndex,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
}
