"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  STEPS,
  STATUS_COLOR,
  STATUS_LABEL,
  type StepDrawer,
  type PrototypeFile,
} from "@/playground/manifest";

/* ───────────────────────────────────────────────────────
   Playground — prototype testing room
   Left rail: 20 steps with status chips.
   Right pane: prototype viewer (iframe to preview route),
   with a chip row above it to switch between prototype
   files within the selected step.
   ─────────────────────────────────────────────────────── */

const FIRST_WITH_PROTOTYPE =
  STEPS.find((s) => s.prototypes.length > 0) ?? STEPS[0];

export default function PrototypePlayground() {
  const [stepId, setStepId] = useState<string>(FIRST_WITH_PROTOTYPE.id);
  const step = useMemo<StepDrawer>(
    () => STEPS.find((s) => s.id === stepId) ?? STEPS[0],
    [stepId]
  );

  const [fileName, setFileName] = useState<string | null>(
    step.prototypes[0]?.filename ?? null
  );

  const activeFile: PrototypeFile | null = useMemo(() => {
    if (!fileName) return step.prototypes[0] ?? null;
    return step.prototypes.find((p) => p.filename === fileName) ?? null;
  }, [step, fileName]);

  function selectStep(id: string) {
    const next = STEPS.find((s) => s.id === id);
    if (!next) return;
    setStepId(id);
    setFileName(next.prototypes[0]?.filename ?? null);
  }

  const previewUrl = activeFile
    ? `/playground/prototypes/preview/${encodeURIComponent(
        step.id
      )}/${encodeURIComponent(activeFile.filename)}`
    : null;

  // iPhone 17 Pro logical viewport + breathing room for the frame bezel.
  const FRAME_W = 440;
  const FRAME_H = 900;

  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [fitScale, setFitScale] = useState(1);
  const [resetNonce, setResetNonce] = useState(0);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === 0 || h === 0) return;
      const s = Math.min(w / FRAME_W, h / FRAME_H, 1);
      setFitScale(s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#EDEEF1",
        fontFamily: "var(--font-noto-sans-jp), system-ui, sans-serif",
        color: "#25272C",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* ━━ Left rail ━━ */}
      <aside
        style={{
          position: "relative",
          zIndex: 2,
          width: 320,
          flexShrink: 0,
          height: "100%",
          borderRight: "1px solid rgba(0,0,0,0.06)",
          background: "#EDEEF1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid rgba(237,238,241,0.8)" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8E8F8F",
              margin: 0,
              fontWeight: 500,
            }}
          >
            Playground
          </p>
          <h1
            style={{
              fontFamily: '"REM", system-ui, sans-serif',
              fontSize: 22,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              fontWeight: 600,
              color: "#25272C",
              margin: "4px 0 0",
            }}
          >
            Prototypes
          </h1>
          <p style={{ fontSize: 12, color: "#5B616E", margin: "6px 0 0", lineHeight: 1.45 }}>
            20 steps. Testing only. Nothing here ships to the main experience.
          </p>
        </div>

        {/* Step list */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px 12px 24px" }}>
          {STEPS.map((s) => {
            const active = s.id === stepId;
            const color = STATUS_COLOR[s.status];
            const hasPrototype = s.prototypes.length > 0;
            return (
              <button
                key={s.id}
                onClick={() => selectStep(s.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 12px",
                  margin: "2px 0",
                  borderRadius: 12,
                  border: "1px solid transparent",
                  background: active ? "rgba(255,255,255,0.9)" : "transparent",
                  boxShadow: active
                    ? "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.85)"
                    : "none",
                  cursor: "pointer",
                  transition: "background 120ms ease, box-shadow 120ms ease",
                  fontFamily: "inherit",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#8E8F8F",
                      fontVariantNumeric: "tabular-nums",
                      minWidth: 18,
                    }}
                  >
                    {String(s.index).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 13,
                      lineHeight: 1.4,
                      color: active ? "#25272C" : "#383A42",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    marginTop: 6,
                    paddingLeft: 26,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 500,
                      color: color.fg,
                      background: color.bg,
                      padding: "3px 8px",
                      borderRadius: 9999,
                      lineHeight: 1.2,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: color.dot,
                      }}
                    />
                    {STATUS_LABEL[s.status]}
                  </span>
                  <span style={{ fontSize: 10, color: "#8E8F8F" }}>
                    {hasPrototype
                      ? `${s.prototypes.length} file${s.prototypes.length > 1 ? "s" : ""}`
                      : "empty"}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ━━ Right pane ━━ */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Step header + file chips */}
        <div
          style={{
            padding: "20px 32px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#EDEEF1",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#8E8F8F",
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Step {String(step.index).padStart(2, "0")}
            </span>
            <h2
              style={{
                fontFamily: '"REM", system-ui, sans-serif',
                fontSize: 22,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                fontWeight: 600,
                color: "#25272C",
                margin: 0,
              }}
            >
              {step.label}
            </h2>
            <code
              style={{
                fontSize: 11,
                color: "#8E8F8F",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              {step.id}
            </code>
          </div>

          {/* Prototype file chips */}
          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {step.prototypes.length === 0 ? (
              <span style={{ fontSize: 12, color: "#8E8F8F" }}>
                No prototypes in this drawer yet. Paste one in chat and say which step it belongs to.
              </span>
            ) : (
              step.prototypes.map((p) => {
                const active = p.filename === activeFile?.filename;
                return (
                  <button
                    key={p.filename}
                    onClick={() => setFileName(p.filename)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 9999,
                      border: `1px solid ${active ? "rgba(251,185,49,0.4)" : "rgba(237,238,241,0.9)"}`,
                      background: active ? "rgba(251,185,49,0.12)" : "rgba(255,255,255,0.8)",
                      color: active ? "#8C5E00" : "#40444C",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                      transition: "background 120ms ease, border-color 120ms ease",
                    }}
                  >
                    {p.filename}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Viewer area */}
        <div
          ref={viewerRef}
          style={{
            flex: 1,
            minHeight: 0,
            position: "relative",
            padding: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#EDEEF1",
          }}
        >
          {previewUrl ? (
            <>
              <iframe
                key={`${previewUrl}#${resetNonce}`}
                src={previewUrl}
                title={activeFile?.filename ?? "prototype"}
                style={{
                  width: FRAME_W,
                  height: FRAME_H,
                  border: "none",
                  borderRadius: 0,
                  background: "#EDEEF1",
                  transform: `scale(${fitScale})`,
                  transformOrigin: "center center",
                  flexShrink: 0,
                }}
              />
              <button
                onClick={() => setResetNonce((n) => n + 1)}
                title="Reset prototype"
                aria-label="Reset prototype"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  boxShadow:
                    "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  color: "#25272C",
                  fontFamily: "inherit",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 120ms ease, transform 120ms ease",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.96)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M13.5 8a5.5 5.5 0 1 1-1.611-3.889"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5 2.5v2.8h-2.8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Reset
              </button>
            </>
          ) : (
            <div
              style={{
                maxWidth: 420,
                textAlign: "center",
                color: "#5B616E",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              Nothing to preview yet. Select a step from the left rail that has
              a prototype in its drawer.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
