'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function Step8Section4Persona({ isActive, onComplete }: StepProps) {
  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-start p-20 bg-base-bg" onClick={onComplete}>
      <p className="font-body text-base text-neutral-950">
        step-8-section-4-persona
      </p>
    </div>
  );
}
