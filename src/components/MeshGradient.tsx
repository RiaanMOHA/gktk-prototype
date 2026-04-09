"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MeshGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const orbs =
      containerRef.current.querySelectorAll<HTMLDivElement>(".mesh-orb");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    orbs.forEach((orb, i) => {
      const duration = 20 + i * 4;
      const xRange = 12 + i * 4;
      const yRange = 8 + i * 3;

      gsap.to(orb, {
        x: `+=${xRange}`,
        y: `+=${yRange}`,
        duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb, {
        scale: 1 + 0.06 * (i + 1),
        duration: duration * 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 2,
      });
    });

    return () => {
      orbs.forEach((orb) => gsap.killTweensOf(orb));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{ background: "#F9F9F9" }}
      />

      {/* Orb 1: warm peach, top-left */}
      <div
        className="mesh-orb absolute"
        style={{
          width: "80vw",
          height: "80vh",
          top: "-10%",
          left: "-10%",
          background:
            "radial-gradient(ellipse at center, rgba(255, 180, 140, 0.4) 0%, rgba(255, 200, 170, 0.2) 40%, transparent 70%)",
        }}
      />

      {/* Orb 2: pale gold, center-right */}
      <div
        className="mesh-orb absolute"
        style={{
          width: "70vw",
          height: "70vh",
          top: "15%",
          right: "-5%",
          background:
            "radial-gradient(ellipse at center, rgba(255, 220, 150, 0.4) 0%, rgba(255, 235, 190, 0.2) 40%, transparent 70%)",
        }}
      />

      {/* Orb 3: soft rose, bottom-left */}
      <div
        className="mesh-orb absolute"
        style={{
          width: "75vw",
          height: "65vh",
          bottom: "-5%",
          left: "-5%",
          background:
            "radial-gradient(ellipse at center, rgba(255, 160, 180, 0.3) 0%, rgba(255, 190, 200, 0.15) 40%, transparent 70%)",
        }}
      />

      {/* Orb 4: cream, bottom-right */}
      <div
        className="mesh-orb absolute"
        style={{
          width: "70vw",
          height: "60vh",
          bottom: "0%",
          right: "-10%",
          background:
            "radial-gradient(ellipse at center, rgba(255, 240, 200, 0.35) 0%, rgba(255, 245, 220, 0.18) 40%, transparent 70%)",
        }}
      />

      {/* Noise grain overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.09,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <filter id="meshNoiseInline">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={4}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#meshNoiseInline)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
