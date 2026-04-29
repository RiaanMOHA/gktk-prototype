'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
  body: '#40444C',
  caption: '#5B616E',
  amber: '#FBB931',
};

const GENTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

const MAP_URL =
  '/playground/prototypes/step-6-section-3-map/map-prototype-v1/index.html?embed=1&hidesheet=1&lang=en&steps=government-support,corporate-investment,transport-access,future-outlook';

const WARP_DURATION_MS = 4000;
const EXIT_DURATION_MS = 350;

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 4L16 10L6 16V4Z" fill="rgba(251,185,49,0.8)" />
    </svg>
  );
}

function ResolvePanel({
  onAdvance,
  exiting,
}: {
  onAdvance: () => void;
  exiting: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const reveal = async () => {
      if (cancelled || !panelRef.current) return;
      await panelRef.current.animate(
        [
          { opacity: 0, transform: 'translateY(30px) scale(0.97)' },
          { opacity: 0.4, transform: 'translateY(15px) scale(0.985)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ],
        { duration: 700, easing: GENTLE, fill: 'forwards' }
      ).finished;
      if (cancelled) return;
      await wait(200);
      if (cancelled || !headingRef.current) return;
      await headingRef.current.animate(
        [
          { opacity: 0, transform: 'translateY(12px) scale(0.94)' },
          { opacity: 0.6, transform: 'translateY(5px) scale(0.98)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ],
        { duration: 600, easing: GENTLE, fill: 'forwards' }
      ).finished;
      if (cancelled) return;
      await wait(150);
      if (cancelled || !bodyRef.current) return;
      await bodyRef.current.animate(
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 450, easing: GENTLE, fill: 'forwards' }
      ).finished;
      if (cancelled) return;
      await wait(300);
      if (cancelled || !tapRef.current) return;
      tapRef.current.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 400, easing: GENTLE, fill: 'forwards' }
      );
    };

    void reveal();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      onClick={onAdvance}
      role="button"
      aria-label="Continue"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onAdvance();
        }
      }}
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        cursor: 'pointer',
        zIndex: 12,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms ${GENTLE}, transform ${EXIT_DURATION_MS}ms ${GENTLE}`,
      }}
    >
      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 24px',
          opacity: 0,
        }}
      >
        <div
          style={{
            background: '#F9F9F9',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 28,
            padding: '28px 24px',
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: C.heading,
              marginBottom: 12,
              opacity: 0,
            }}
          >
            3 to 5 million yen
          </div>
          <div
            ref={bodyRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.6,
              color: C.body,
              maxWidth: '72ch',
              opacity: 0,
            }}
          >
            Estimated replacement cost per engineer who repatriates early due to family maladjustment.
          </div>
        </div>
      </div>

      <div
        ref={tapRef}
        style={{
          position: 'absolute',
          bottom: 'calc(48px + env(safe-area-inset-bottom, 0px))',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: C.caption,
            letterSpacing: '0.01em',
          }}
        >
          Tap to continue
        </div>
      </div>
    </div>
  );
}

export default function Step7Section4Transition({ isActive, onComplete }: StepProps) {
  const [phase, setPhase] = useState<'idle' | 'warping' | 'resolved' | 'exiting'>('idle');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrame = useRef<number | null>(null);
  const completedRef = useRef(false);

  const startWarp = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('warping');

    const canvas = canvasRef.current;
    if (!canvas) {
      setPhase('resolved');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setPhase('resolved');
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H * 0.42;

    const lines = Array.from({ length: 300 }, () => {
      const isAmber = Math.random() > 0.65;
      return {
        angle: Math.random() * Math.PI * 2,
        baseDist: 15 + Math.random() * 60,
        speed: 0.3 + Math.random() * 2.5,
        maxDist: 200 + Math.random() * 400,
        isAmber,
        brightness: 0.2 + Math.random() * 0.6,
        thickness: isAmber
          ? 1.5 + Math.random() * 1.5
          : 0.5 + Math.random() * 1,
      };
    });

    const t0 = performance.now();
    const loop = (now: number) => {
      const t = Math.min((now - t0) / WARP_DURATION_MS, 1);
      ctx.clearRect(0, 0, W, H);

      let accel: number;
      let lineAlpha: number;
      if (t < 0.2) {
        accel = (t / 0.2) * 0.03;
        lineAlpha = (t / 0.2) * 0.15;
      } else if (t < 0.4) {
        const lt = (t - 0.2) / 0.2;
        accel = 0.03 + lt * 0.08;
        lineAlpha = 0.15 + lt * 0.3;
      } else if (t < 0.6) {
        const lt = (t - 0.4) / 0.2;
        accel = 0.11 + lt * 0.2;
        lineAlpha = 0.45 + lt * 0.25;
      } else if (t < 0.78) {
        const lt = (t - 0.6) / 0.18;
        accel = 0.31 + lt * 0.4;
        lineAlpha = 0.7 + lt * 0.2;
      } else if (t < 0.9) {
        const lt = (t - 0.78) / 0.12;
        accel = 0.71 + lt * 0.29;
        lineAlpha = 0.9 + lt * 0.1;
      } else {
        accel = 1.0;
        lineAlpha = 1.0 - (t - 0.9) / 0.1;
      }

      for (const line of lines) {
        const currentDist = line.baseDist + accel * line.maxDist * line.speed;
        const lineLength = 1 + accel * 120 * line.speed;
        const x1 = cx + Math.cos(line.angle) * currentDist;
        const y1 = cy + Math.sin(line.angle) * currentDist;
        const x2 = cx + Math.cos(line.angle) * (currentDist + lineLength);
        const y2 = cy + Math.sin(line.angle) * (currentDist + lineLength);
        const alpha = line.brightness * lineAlpha;
        if (alpha < 0.01) continue;
        ctx.strokeStyle = line.isAmber
          ? `rgba(251,185,49,${alpha * 0.8})`
          : `rgba(140,150,170,${alpha * 0.45})`;
        ctx.lineWidth = line.thickness * dpr * (0.5 + accel * 0.5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      const glowIntensity = accel * accel;
      const glowR = 30 + glowIntensity * 300;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grd.addColorStop(0, `rgba(251,185,49,${glowIntensity * 0.4})`);
      grd.addColorStop(0.3, `rgba(251,185,49,${glowIntensity * 0.15})`);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      if (t > 0.88) {
        const flashT = (t - 0.88) / 0.12;
        const flashAlpha = flashT * flashT * flashT;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) {
        animFrame.current = requestAnimationFrame(loop);
      } else {
        setPhase('resolved');
      }
    };

    animFrame.current = requestAnimationFrame(loop);
  }, [phase]);

  const advance = useCallback(() => {
    if (phase !== 'resolved') return;
    setPhase('exiting');
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const t = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  useEffect(() => {
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      data-step-7
      className="relative w-full h-full"
      style={{ background: C.bg, overflow: 'hidden' }}
    >
      <iframe
        src={MAP_URL}
        title="Kumamoto map"
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; gyroscope"
        style={{ display: 'block', zIndex: 0 }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {phase === 'idle' && (
        <div
          onClick={startWarp}
          role="button"
          aria-label="Continue"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              startWarp();
            }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(251,185,49,0.15)',
              border: '2px solid rgba(251,185,49,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(251,185,49,0.2)',
            }}
          >
            <PlayIcon />
          </div>
        </div>
      )}

      {(phase === 'resolved' || phase === 'exiting') && (
        <ResolvePanel onAdvance={advance} exiting={phase === 'exiting'} />
      )}
    </div>
  );
}
