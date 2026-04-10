'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function Step4Section2Bridge({ isActive, onComplete }: StepProps) {
  if (!isActive) return null;

  return (
    <div className="w-screen h-screen flex items-center justify-start p-20 bg-base-bg" onClick={onComplete}>
      <p className="font-body text-base text-neutral-950">
        step-4-section-2-bridge
      </p>
    </div>
  );
}
