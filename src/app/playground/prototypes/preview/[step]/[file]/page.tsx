"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findPrototype } from "@/playground/manifest";

/* ───────────────────────────────────────────────────────
   Prototype preview (sandboxed)
   URL: /playground/prototypes/preview/<step-id>/<filename>
   Mounts a single prototype full-viewport. Loaded inside
   the playground's iframe.

   JSX prototypes bring their own iPhone 17 Pro frame.
   HTML prototypes are wrapped in the standard frame here
   so every step renders inside an identical 393x852 phone.
   ─────────────────────────────────────────────────────── */

function HtmlPhoneFrame({ src, title }: { src: string; title: string }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#EDEEF1",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 393,
          height: 852,
          borderRadius: 55,
          overflow: "hidden",
          background: "#1A1A1E",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset",
          flexShrink: 0,
        }}
      >
        {/* Metallic edge */}
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 56,
            background:
              "linear-gradient(170deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.08) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3, top: 95, width: 3, height: 18, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "-1px 0 2px rgba(0,0,0,0.3)", zIndex: 2 }} />
        <div style={{ position: "absolute", left: -3, top: 130, width: 3, height: 28, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "-1px 0 2px rgba(0,0,0,0.3)", zIndex: 2 }} />
        <div style={{ position: "absolute", left: -3, top: 170, width: 3, height: 28, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "-1px 0 2px rgba(0,0,0,0.3)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: -3, top: 160, width: 3, height: 38, borderRadius: "0 2px 2px 0", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "1px 0 2px rgba(0,0,0,0.3)", zIndex: 2 }} />
        {/* Screen */}
        <div
          style={{
            position: "absolute",
            inset: 6,
            borderRadius: 49,
            overflow: "hidden",
            background: "#F9F9F9",
          }}
        >
          <iframe
            src={src}
            title={title}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              background: "#F9F9F9",
            }}
          />
          {/* Dynamic Island overlay (above iframe content) */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 126,
              height: 37,
              borderRadius: 20,
              background: "#000",
              zIndex: 300,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "radial-gradient(circle, #1a1a2e 40%, #0d0d1a 100%)",
                boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrototypePreviewPage() {
  const params = useParams<{ step: string; file: string }>();
  const search = useSearchParams();
  const step = decodeURIComponent(params.step);
  const file = decodeURIComponent(params.file);
  const variant = search.get("variant") ?? undefined;

  const proto = findPrototype(step, file);

  if (!proto) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 32,
          fontFamily: "var(--font-noto-sans-jp), system-ui, sans-serif",
          color: "#5B616E",
          fontSize: 14,
          textAlign: "center",
        }}
      >
        Prototype not found: {step} / {file}
      </div>
    );
  }

  if (proto.kind === "jsx" && proto.component) {
    const Proto = proto.component;
    return (
      <>
        <style>{`html, body { background: #EDEEF1 !important; }`}</style>
        <Proto variant={variant} />
      </>
    );
  }

  if (proto.kind === "html" && proto.publicPath) {
    return (
      <>
        <style>{`html, body { background: #EDEEF1 !important; margin: 0; }`}</style>
        <HtmlPhoneFrame src={proto.publicPath} title={file} />
      </>
    );
  }

  return null;
}
