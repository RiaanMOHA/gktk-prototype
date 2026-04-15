"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findPrototype } from "@/playground/manifest";

/* ───────────────────────────────────────────────────────
   Prototype preview (sandboxed)
   URL: /playground/prototypes/preview/<step-id>/<filename>
   Mounts a single prototype full-viewport. Loaded inside
   the playground's iframe. The prototype brings its own
   iPhone frame, so this route adds no chrome.
   ─────────────────────────────────────────────────────── */

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
        <iframe
          src={proto.publicPath}
          style={{
            border: "none",
            width: "100vw",
            height: "100vh",
            display: "block",
            background: "#EDEEF1",
          }}
          title={file}
        />
      </>
    );
  }

  return null;
}
