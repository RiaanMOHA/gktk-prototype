'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function Step16Section8Financials({ isActive, onComplete }: StepProps) {
  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-start p-20 bg-base-bg" onClick={onComplete}>
      <p className="font-body text-base text-neutral-950">
        step-16-section-8-financials
      </p>
    </div>
  );
}
