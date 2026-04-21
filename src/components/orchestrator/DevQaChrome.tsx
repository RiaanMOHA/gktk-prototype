'use client';

import { useEffect, useState, type ReactNode } from 'react';

type Preset = {
  key: string;
  label: string;
  w: number;
  h: number;
  canRotate: boolean;
};

const PRESETS: Preset[] = [
  { key: '1', label: 'iPhone 17 Pro', w: 393,  h: 852,  canRotate: true  },
  { key: '2', label: 'iPad',          w: 834,  h: 1194, canRotate: true  },
  { key: '3', label: 'Desktop',       w: 1440, h: 900,  canRotate: false },
];

const LS_ACTIVE  = 'gktk-qa-active';
const LS_PRESET  = 'gktk-qa-preset';
const LS_ROTATED = 'gktk-qa-rotated';

interface DevQaChromeProps {
  children: ReactNode;
}

export function DevQaChrome({ children }: DevQaChromeProps) {
  const [hydrated, setHydrated] = useState(false);
  const [active, setActive] = useState(true);
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    const a = localStorage.getItem(LS_ACTIVE);
    const p = localStorage.getItem(LS_PRESET);
    const r = localStorage.getItem(LS_ROTATED);
    if (a !== null) setActive(a === 'true');
    if (p) {
      const found = PRESETS.find((x) => x.key === p);
      if (found) setPreset(found);
    }
    if (r === 'true') setRotated(true);
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(LS_ACTIVE, String(active)); }, [active, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(LS_PRESET, preset.key); }, [preset, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(LS_ROTATED, String(rotated)); }, [rotated, hydrated]);

  const canRotate = preset.canRotate;
  const frameW = rotated && canRotate ? preset.h : preset.w;
  const frameH = rotated && canRotate ? preset.w : preset.h;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (e.ctrlKey && e.shiftKey && (e.key === 'B' || e.key === 'b')) {
        e.preventDefault();
        setActive((a) => !a);
        return;
      }
      if (!active || typing) return;
      if (e.key === '1') { setPreset(PRESETS[0]); setRotated(false); }
      if (e.key === '2') { setPreset(PRESETS[1]); setRotated(false); }
      if (e.key === '3') { setPreset(PRESETS[2]); setRotated(false); }
      if (e.key === 'r' || e.key === 'R') {
        if (canRotate) setRotated((r) => !r);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, canRotate]);

  if (!active) {
    return (
      <>
        {children}
        <Fab onClick={() => setActive(true)} />
      </>
    );
  }

  return (
    <div data-qa className="fixed inset-0 flex flex-col" style={{ background: '#1E1F20', zIndex: 99999 }}>
      <Toolbar
        preset={preset}
        setPreset={(p) => { setPreset(p); setRotated(false); }}
        rotated={rotated}
        setRotated={setRotated}
        canRotate={canRotate}
        onClose={() => setActive(false)}
        frameW={frameW}
        frameH={frameH}
      />

      <div
        className="flex-1 flex items-start justify-center overflow-auto"
        style={{
          background: '#1E1F20',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          padding: 24,
        }}
      >
        <iframe
          key={`${frameW}x${frameH}`}
          src="/?preview=1"
          title="QA preview"
          style={{
            width: frameW,
            height: frameH,
            border: '1px solid #40444C',
            borderRadius: 4,
            background: '#F9F9F9',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            flexShrink: 0,
            transition: 'width 0.25s ease, height 0.25s ease',
          }}
        />
      </div>
    </div>
  );
}

function Fab({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      data-qa=""
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title="Breakpoint preview (Ctrl+Shift+B)"
      aria-label="Open breakpoint preview"
      className="focus:outline-none focus-visible:outline-none"
      style={{
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 99999,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: '#2B2D31',
        color: '#FBB931',
        border: '2px solid #40444C',
        fontSize: 20,
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.15s ease, background 0.15s ease',
        transform: hover ? 'scale(1.1)' : 'scale(1)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      ⚙
    </button>
  );
}

interface ToolbarProps {
  preset: Preset;
  setPreset: (p: Preset) => void;
  rotated: boolean;
  setRotated: (r: boolean | ((r: boolean) => boolean)) => void;
  canRotate: boolean;
  onClose: () => void;
  frameW: number;
  frameH: number;
}

function Toolbar({
  preset,
  setPreset,
  rotated,
  setRotated,
  canRotate,
  onClose,
  frameW,
  frameH,
}: ToolbarProps) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 100001,
        background: '#2B2D31',
        borderBottom: '2px solid #FBB931',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: 13,
        flexWrap: 'wrap',
      }}
    >
      <span style={{ color: '#FBB931', fontWeight: 600, marginRight: 8, fontSize: 13 }}>
        Breakpoints
      </span>

      {PRESETS.map((p) => (
        <PresetButton
          key={p.key}
          active={preset.key === p.key}
          onClick={() => setPreset(p)}
          shortcut={p.key}
          w={p.w}
          h={p.h}
        >
          {p.label}
        </PresetButton>
      ))}

      <Separator />

      <PresetButton
        active={false}
        onClick={() => canRotate && setRotated((r) => !r)}
        disabled={!canRotate}
        shortcut="R"
      >
        Rotate
      </PresetButton>

      <Separator />

      <span
        style={{
          color: '#8E95A2',
          fontSize: 12,
          background: '#25272C',
          padding: '3px 8px',
          borderRadius: 4,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {preset.label} — {frameW} × {frameH}{rotated && canRotate ? ' (landscape)' : ''}
      </span>

      <button
        onClick={onClose}
        aria-label="Close preview"
        title="Close preview (Ctrl+Shift+B)"
        className="focus:outline-none focus-visible:outline-none"
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          color: '#8E95A2',
          fontSize: 18,
          cursor: 'pointer',
          padding: '0 4px',
        }}
      >
        ×
      </button>
    </div>
  );
}

function PresetButton({
  active,
  onClick,
  disabled,
  shortcut,
  w,
  h,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  shortcut?: string;
  w?: number;
  h?: number;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="focus:outline-none focus-visible:outline-none"
      style={{
        background: active ? '#FBB931' : '#383A42',
        color: active ? '#1E1F20' : disabled ? '#5B616E' : '#B6BAC3',
        border: '1px solid ' + (active ? '#FBB931' : '#4A4E5A'),
        borderRadius: 5,
        padding: '4px 12px',
        fontSize: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: active ? 600 : 400,
        transition: 'all 0.15s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span>{children}</span>
      {w !== undefined && h !== undefined && (
        <span style={{ opacity: 0.5, fontSize: 10 }}>
          {w}×{h}
        </span>
      )}
      {shortcut && (
        <span style={{ opacity: 0.3, fontSize: 10 }}>{shortcut}</span>
      )}
    </button>
  );
}

function Separator() {
  return (
    <span
      style={{
        width: 1,
        height: 20,
        background: '#40444C',
        margin: '0 6px',
      }}
    />
  );
}
