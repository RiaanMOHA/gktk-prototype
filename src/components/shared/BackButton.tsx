'use client';

import { useState } from 'react';

interface BackButtonProps {
  onClick: () => void;
  ariaLabel?: string;
  visible?: boolean;
}

export default function BackButton({
  onClick,
  ariaLabel = 'Go back',
  visible = true,
}: BackButtonProps) {
  const [pressing, setPressing] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(28px + env(safe-area-inset-bottom, 0px))',
        left: 24,
        opacity: visible ? 1 : 0,
        transform: `scale(${visible ? 1 : 0.6})`,
        transition:
          'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        onPointerDown={() => setPressing(true)}
        onPointerUp={() => setPressing(false)}
        onPointerLeave={() => setPressing(false)}
        onPointerCancel={() => setPressing(false)}
        aria-label={ariaLabel}
        style={{
          position: 'relative',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: pressing ? 'var(--button-border-pressed)' : 'transparent',
          border: 'var(--button-border)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'background-color 120ms cubic-bezier(0.4, 0, 0.2, 1)',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M13 4l-6 6 6 6"
            stroke="#1E1F20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
