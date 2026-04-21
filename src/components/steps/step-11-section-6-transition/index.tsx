'use client';

import { useEffect } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function Step11Section6Transition({ isActive, onComplete }: StepProps) {
  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-center bg-base-black">
      <p className="font-body text-base text-neutral-200 tracking-wide">
        step-11-section-6-transition
      </p>
    </div>
  );
}
