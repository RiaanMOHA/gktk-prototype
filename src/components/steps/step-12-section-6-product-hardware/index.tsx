'use client';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function Step12Section6ProductHardware({ isActive, onComplete }: StepProps) {
  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-start p-20 bg-base-bg" onClick={onComplete}>
      <p className="font-body text-base text-neutral-950">
        step-12-section-6-product-hardware
      </p>
    </div>
  );
}
