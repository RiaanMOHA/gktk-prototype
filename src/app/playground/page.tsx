"use client";

import { useState, useEffect } from "react";
import { Surface } from "@/components/Surface";

/* ── Motion box ── */
function MotionBox({ name, curve, color }: { name: string; curve: string; color: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setActive((a) => !a), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#5B616E" }}>
        {name}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#8E8F8F", fontVariantLigatures: "none" }}>
        {curve}
      </p>
      <div style={{ width: 240, height: 48, position: "relative", background: "#EDEEF1", borderRadius: 8, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 4,
            left: active ? 240 - 44 : 4,
            width: 40,
            height: 40,
            borderRadius: 8,
            background: color,
            transition: `left 800ms ${curve}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Playground() {
  return (
    <>
      {/* Base background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#F9F9F9",
          zIndex: 0,
        }}
      />

      <main
        style={{
          position: "relative",
          zIndex: 10,
          width: "100vw",
          height: "100vh",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 64,
          overflowY: "auto",
        }}
      >
        {/* ━━ Surfaces ━━ */}
        <section
          style={{
            background: "linear-gradient(135deg, #FFFBEc 0%, #FBB931 35%, #E79B00 55%, #FEF2C9 75%, #F5A500 100%)",
            borderRadius: 20,
            padding: 32,
            margin: -32,
          }}
        >
          <h2
            style={{
              fontFamily: '"REM", sans-serif',
              fontSize: "1.375rem",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              fontWeight: 600,
              color: "#25272C",
              marginBottom: 24,
            }}
          >
            Surfaces
          </h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Surface level={1} style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#5B616E", marginBottom: 8 }}>
                Level 1 panel
              </p>
              <p style={{ fontFamily: '"REM", sans-serif', fontSize: "2rem", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 600, color: "#25272C", marginBottom: 16 }}>
                Standard surface
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.65, color: "#40444C", maxWidth: "72ch" }}>
                More translucent. The gradient behind bleeds through the frosted glass. Lighter shadow, thinner specular edge.
              </p>
            </Surface>

            <Surface level={2} style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#5B616E", marginBottom: 8 }}>
                Level 2 elevated panel
              </p>
              <p style={{ fontFamily: '"REM", sans-serif', fontSize: "2rem", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 600, color: "#25272C", marginBottom: 16 }}>
                Elevated surface
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.65, color: "#40444C", maxWidth: "72ch" }}>
                More opaque, heavier blur, deeper shadow. Used for the financial simulator and verdict box.
              </p>
            </Surface>

            <Surface level={3} style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#5B616E", marginBottom: 8 }}>
                Level 3 modal surface
              </p>
              <p style={{ fontFamily: '"REM", sans-serif', fontSize: "2rem", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 600, color: "#25272C", marginBottom: 16 }}>
                Focus surface
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.65, color: "#40444C", maxWidth: "72ch" }}>
                Solid white. No glass, no blur. The heaviest shadow. Used for modals and the final CTA block.
              </p>
            </Surface>
          </div>
        </section>

        {/* ━━ Motion easings ━━ */}
        <section style={{ paddingBottom: 64 }}>
          <h2
            style={{
              fontFamily: '"REM", sans-serif',
              fontSize: "1.375rem",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              fontWeight: 600,
              color: "#25272C",
              marginBottom: 24,
            }}
          >
            Motion easings
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <MotionBox name="ease-spring" curve="cubic-bezier(0.34, 1.56, 0.64, 1)" color="#FBB931" />
            <MotionBox name="ease-smooth" curve="cubic-bezier(0.25, 0.46, 0.45, 0.94)" color="#5B616E" />
            <MotionBox name="ease-sharp" curve="cubic-bezier(0.4, 0, 0.2, 1)" color="#1282C0" />
          </div>
        </section>
      </main>
    </>
  );
}
