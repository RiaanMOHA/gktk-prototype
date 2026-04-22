'use client';

import { useEffect, useRef, useState } from 'react';
import { STEPS } from '@/types/steps';

interface StepNavProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onJumpTo: (n: number) => void;
  onReload: () => void;
}

type Pos = { x: number; y: number } | null;

const STORAGE_KEY = 'gktk-stepnav-pos';

export function StepNav({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onJumpTo,
  onReload,
}: StepNavProps) {
  const [pos, setPos] = useState<Pos>(null);
  const [grabbing, setGrabbing] = useState(false);
  const drag = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPos(JSON.parse(saved));
    } catch {}
  }, []);

  const beginDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    e.preventDefault();
    const rect = barRef.current.getBoundingClientRect();
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: rect.left,
      origY: rect.top,
    };
    setGrabbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    const next = {
      x: drag.current.origX + dx,
      y: drag.current.origY + dy,
    };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = barRef.current?.offsetWidth ?? 0;
    const h = barRef.current?.offsetHeight ?? 0;
    next.x = Math.max(8, Math.min(next.x, vw - w - 8));
    next.y = Math.max(8, Math.min(next.y, vh - h - 8));
    setPos(next);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    setGrabbing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    try {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ x: rect.left, y: rect.top })
        );
      }
    } catch {}
  };

  const resetPos = () => {
    setPos(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const positionStyle: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, transform: 'none' }
    : { left: '50%', bottom: 16, transform: 'translateX(-50%)' };

  return (
    <div
      ref={barRef}
      data-qa
      style={{
        position: 'fixed',
        ...positionStyle,
        zIndex: 99998,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 8px',
        background: '#2B2D31',
        border: '1px solid #40444C',
        borderRadius: 999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: 12,
      }}
    >
      <div
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={resetPos}
        title="Drag to move. Double-click to reset."
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 3px)',
          gridTemplateRows: 'repeat(3, 3px)',
          gap: 3,
          padding: '4px 6px',
          cursor: grabbing ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: '#8E8F8F',
            }}
          />
        ))}
      </div>
      <NavButton
        onClick={onPrev}
        disabled={currentStep === 1}
        label="Previous step"
      >
        ‹
      </NavButton>
      <select
        value={currentStep}
        onChange={(e) => onJumpTo(Number(e.target.value))}
        className="focus:outline-none focus-visible:outline-none"
        style={{
          height: 28,
          background: '#383A42',
          color: '#EDEEF1',
          border: '1px solid #4A4E5A',
          borderRadius: 999,
          padding: '0 10px',
          fontSize: 12,
          minWidth: 200,
          cursor: 'pointer',
        }}
      >
        {STEPS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.id}. {s.label}
          </option>
        ))}
      </select>
      <NavButton
        onClick={onNext}
        disabled={currentStep === totalSteps}
        label="Next step"
      >
        ›
      </NavButton>
      <span
        style={{
          width: 1,
          height: 18,
          background: '#40444C',
          margin: '0 4px',
        }}
      />
      <NavButton onClick={onReload} label="Reload step">
        ↻
      </NavButton>
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="focus:outline-none focus-visible:outline-none"
      style={{
        width: 28,
        height: 28,
        borderRadius: 999,
        background: '#383A42',
        color: disabled ? '#5B616E' : '#EDEEF1',
        border: '1px solid #4A4E5A',
        fontSize: 16,
        lineHeight: 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}
