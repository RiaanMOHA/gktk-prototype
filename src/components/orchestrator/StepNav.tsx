'use client';

import { STEPS } from '@/types/steps';

interface StepNavProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onJumpTo: (n: number) => void;
  onReload: () => void;
}

export function StepNav({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onJumpTo,
  onReload,
}: StepNavProps) {
  return (
    <div
      data-qa
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
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
