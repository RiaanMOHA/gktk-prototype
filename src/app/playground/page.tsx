"use client";

import { MeshGradient } from "@/components/MeshGradient";
import { Surface } from "@/components/Surface";

export default function Playground() {
  return (
    <>
      {/* Temporary test gradient - replace with MeshGradient once glass is proven */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 30%, #fdfcfb 50%, #a1c4fd 70%, #c2e9fb 100%)",
          zIndex: 0,
        }}
      />
      {/* <MeshGradient /> */}

      <main
        style={{
          position: "relative",
          zIndex: 10,
          width: "100vw",
          height: "100vh",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontFamily: '"REM", sans-serif',
            fontSize: "1.375rem",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            fontWeight: 600,
            color: "#25272C",
            marginBottom: 8,
          }}
        >
          Phase A: surface system
        </h1>

        {/* Level 1 and Level 2 side by side */}
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          <Surface level={1} style={{ flex: 1, maxWidth: 400 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: "0.8125rem",
                lineHeight: 1.4,
                letterSpacing: "0.01em",
                fontWeight: 500,
                color: "#5B616E",
                marginBottom: 8,
              }}
            >
              Level 1 panel
            </p>
            <p
              style={{
                fontFamily: '"REM", sans-serif',
                fontSize: "2rem",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 600,
                color: "#25272C",
                marginBottom: 16,
              }}
            >
              Standard surface
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "#40444C",
                maxWidth: "72ch",
              }}
            >
              More translucent. The gradient behind bleeds through the frosted
              glass. Lighter shadow, thinner specular edge. Used for all
              standard panels, cards, and overlays.
            </p>
          </Surface>

          <Surface level={2} style={{ flex: 1, maxWidth: 400 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: "0.8125rem",
                lineHeight: 1.4,
                letterSpacing: "0.01em",
                fontWeight: 500,
                color: "#5B616E",
                marginBottom: 8,
              }}
            >
              Level 2 elevated panel
            </p>
            <p
              style={{
                fontFamily: '"REM", sans-serif',
                fontSize: "2rem",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 600,
                color: "#25272C",
                marginBottom: 16,
              }}
            >
              Elevated surface
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "#40444C",
                maxWidth: "72ch",
              }}
            >
              More opaque, heavier blur, deeper shadow, thicker specular
              highlight. Projects forward. Used for the financial simulator
              and verdict box.
            </p>
          </Surface>
        </div>

        {/* Level 3 */}
        <Surface level={3} style={{ maxWidth: 400 }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "0.8125rem",
              lineHeight: 1.4,
              letterSpacing: "0.01em",
              fontWeight: 500,
              color: "#5B616E",
              marginBottom: 8,
            }}
          >
            Level 3 modal surface
          </p>
          <p
            style={{
              fontFamily: '"REM", sans-serif',
              fontSize: "2rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              color: "#25272C",
              marginBottom: 16,
            }}
          >
            Focus surface
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "#40444C",
              maxWidth: "72ch",
            }}
          >
            Solid white. No glass, no blur, no noise grain. The heaviest
            shadow in the system. Used for modals and the final CTA block.
          </p>
        </Surface>
      </main>
    </>
  );
}
