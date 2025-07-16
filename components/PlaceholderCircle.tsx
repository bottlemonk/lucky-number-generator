
import React from 'react';

interface PlaceholderCircleProps {
  index: number;
}

// Tailwind doesn't support animation-delay classes by default for `animate-pulse` in a way that works without JIT style generation.
// We will have them pulse in sync, which is visually clean.
export const PlaceholderCircle: React.FC<PlaceholderCircleProps> = () => {
  return (
    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-700/50 rounded-full animate-pulse"></div>
  );
};
