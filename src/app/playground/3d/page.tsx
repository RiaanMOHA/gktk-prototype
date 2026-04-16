"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/* ───────────────────────────────────────────────────────
   Playground — 3D viewer
   Loads /playground/3d/persona.glb and renders it in a
   full-viewport three.js canvas with orbit controls.
   If the GLB is missing, shows an empty state with the
   source 2D image and instructions to produce the GLB.
   ─────────────────────────────────────────────────────── */

const GLB_PATH = "/playground/3d/persona.glb";
const SOURCE_IMAGE = "/playground/3d/persona-front-base.png";

type Status = "checking" | "loaded" | "missing";

export default function ThreeDPlayground() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 1.35, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0xe6e6e8, 0.9);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 5, 2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.45);
    fill.position.set(-3, 2, -2);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 1.0, 0);
    controls.minDistance = 1.5;
    controls.maxDistance = 6;
    controls.minPolarAngle = Math.PI * 0.1;
    controls.maxPolarAngle = Math.PI * 0.55;
    controls.update();

    const loader = new GLTFLoader();
    loader.load(
      GLB_PATH,
      (gltf) => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.7 / maxDim;
        obj.scale.setScalar(scale);
        obj.position.x = -center.x * scale;
        obj.position.y = -box.min.y * scale;
        obj.position.z = -center.z * scale;
        scene.add(obj);
        setStatus("loaded");
      },
      undefined,
      () => setStatus("missing")
    );

    let raf = 0;
    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      if (nw === 0 || nh === 0) return;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#EDEEF1",
        fontFamily: "var(--font-noto-sans-jp), system-ui, sans-serif",
        color: "#25272C",
        overflow: "hidden",
      }}
    >
      {/* Canvas fills the viewport */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          touchAction: "none",
        }}
      />

      {/* Top strip */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          pointerEvents: "none",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8E8F8F",
              margin: 0,
            }}
          >
            Playground
          </p>
          <h1
            style={{
              fontFamily: '"REM", sans-serif',
              fontSize: 22,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              fontWeight: 600,
              color: "#25272C",
              margin: "4px 0 0",
            }}
          >
            3D viewer
          </h1>
        </div>

        <StatusPill status={status} />
      </header>

      {/* Bottom strip — hints when loaded */}
      {status === "loaded" && (
        <footer
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 24px",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <GlassHint>Drag to orbit, scroll to zoom</GlassHint>
        </footer>
      )}

      {/* Empty state overlay */}
      {status === "missing" && <EmptyState />}
    </div>
  );
}

/* ───────────────────────── pieces ───────────────────────── */

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, { label: string; dot: string; fg: string; bg: string }> = {
    checking: { label: "Loading", dot: "#8E8F8F", fg: "#5B616E", bg: "rgba(255,255,255,0.70)" },
    loaded: { label: "persona.glb", dot: "#19B64E", fg: "#0D8A3A", bg: "rgba(25,182,78,0.12)" },
    missing: { label: "No GLB found", dot: "#FBB931", fg: "#8C5E00", bg: "rgba(251,185,49,0.16)" },
  };
  const s = map[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        borderRadius: 9999,
        background: s.bg,
        color: s.fg,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.01em",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        pointerEvents: "auto",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: s.dot,
        }}
      />
      {s.label}
    </span>
  );
}

function GlassHint({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 14px",
        borderRadius: 9999,
        background: "rgba(255,255,255,0.70)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        fontSize: 12,
        color: "#40444C",
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </span>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 720,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 220px) 1fr",
          gap: 28,
          alignItems: "stretch",
          padding: 28,
          borderRadius: 20,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          border: "1px solid rgba(255,255,255,0.95)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            background: "#F9F9F9",
            border: "1px solid #EDEEF1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 260,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SOURCE_IMAGE}
            alt="Source 2D persona (front, base)"
            style={{
              maxWidth: "100%",
              maxHeight: 320,
              width: "auto",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#8E8F8F",
                margin: 0,
              }}
            >
              Source image
            </p>
            <h2
              style={{
                fontFamily: '"REM", sans-serif',
                fontSize: 22,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                fontWeight: 600,
                color: "#25272C",
                margin: "4px 0 0",
              }}
            >
              No 3D model loaded yet
            </h2>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#40444C", margin: 0 }}>
            Generate a GLB from <strong>persona-front-base.png</strong> and drop it in
            the project folder below. This viewer will pick it up on refresh.
          </p>

          <ol
            style={{
              margin: 0,
              paddingLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 13,
              lineHeight: 1.55,
              color: "#40444C",
            }}
          >
            <li>
              Open <a
                href="https://www.meshy.ai/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#25272C", fontWeight: 500, textDecoration: "underline" }}
              >meshy.ai</a> or <a
                href="https://www.tripo3d.ai/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#25272C", fontWeight: 500, textDecoration: "underline" }}
              >tripo3d.ai</a> and sign in.
            </li>
            <li>Upload <code style={codeStyle}>persona-front-base.png</code> (image to 3D).</li>
            <li>Wait for the model to finish, then download it as <code style={codeStyle}>.glb</code>.</li>
            <li>
              Save the file as{" "}
              <code style={codeStyle}>public/playground/3d/persona.glb</code>.
            </li>
            <li>Refresh this page.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

const codeStyle: React.CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, "SF Mono", Consolas, "Liberation Mono", monospace',
  fontSize: 12,
  padding: "2px 6px",
  borderRadius: 6,
  background: "#F1F2F5",
  border: "1px solid #E4E6EA",
  color: "#25272C",
};
