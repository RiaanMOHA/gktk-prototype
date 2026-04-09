"use client";

import { forwardRef, useId, type HTMLAttributes } from "react";

type SurfaceLevel = 1 | 2 | 3;

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  level?: SurfaceLevel;
}

const glassConfig = {
  1: {
    bg: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(20px) saturate(1.4)",
    border: "1px solid rgba(255, 255, 255, 0.85)",
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.15), 0 2px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
    borderRadius: 20,
    specularHeight: 1.5,
    noiseOpacity: 0.18,
    innerGlowOpacity: 0.1,
  },
  2: {
    bg: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(24px) saturate(1.6)",
    border: "1px solid rgba(255, 255, 255, 0.95)",
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.20), 0 8px 32px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06)",
    borderRadius: 28,
    specularHeight: 2,
    noiseOpacity: 0.15,
    innerGlowOpacity: 0.12,
  },
} as const;

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface(
    { level = 1, className = "", style, children, ...props },
    ref
  ) {
    const instanceId = useId();
    const filterId = `noise-${instanceId.replace(/:/g, "")}`;

    if (level === 3) {
      return (
        <div
          ref={ref}
          className={className}
          style={{
            position: "relative",
            background: "#FEFEFE",
            border: "1px solid #EDEEF1",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.14), 0 4px 16px rgba(0, 0, 0, 0.08)",
            borderRadius: 20,
            padding: 32,
            zIndex: 40,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    const config = glassConfig[level];
    const radius = config.borderRadius;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          background: config.bg,
          backdropFilter: config.backdropFilter,
          WebkitBackdropFilter: config.backdropFilter,
          border: config.border,
          boxShadow: config.boxShadow,
          borderRadius: radius,
          padding: 32,
          zIndex: level === 1 ? 20 : 30,
          ...style,
        }}
        {...props}
      >
        {/* Layer 2: noise grain (SVG feTurbulence) */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: 1,
            opacity: config.noiseOpacity,
            mixBlendMode: "soft-light",
          }}
        >
          <defs>
            <filter id={filterId}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves={4}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter={`url(#${filterId})`}
          />
        </svg>

        {/* Layer 3: specular top edge highlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 16,
            right: 16,
            height: config.specularHeight,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 80%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Specular glow beneath the edge line for visibility */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 16,
            right: 16,
            height: level === 1 ? 8 : 12,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Layer 4: inner top glow (radial) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,255,255,${config.innerGlowOpacity}) 0%, transparent 100%)`,
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
      </div>
    );
  }
);
