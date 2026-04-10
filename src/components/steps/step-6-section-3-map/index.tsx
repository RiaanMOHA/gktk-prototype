'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function Step6Section3Map({ isActive, onComplete }: StepProps) {
  if (!isActive) return null;

  return (
    <div className="w-screen h-screen flex items-center justify-start p-20 bg-base-bg" onClick={onComplete}>
      <p className="font-body text-base text-neutral-950">
        step-6-section-3-map
      </p>
    </div>
  );
}
