
import React, { useState, useEffect } from 'react';

interface NumberCircleProps {
  number: number;
  index: number;
}

const delayClasses = ['delay-0', 'delay-200', 'delay-[400ms]'];

export const NumberCircle: React.FC<NumberCircleProps> = ({ number, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This triggers the animation shortly after the component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);
  
  const delayClass = delayClasses[index] || 'delay-0';

  return (
    <div
      className={`
        flex items-center justify-center 
        w-24 h-24 sm:w-32 sm:h-32 
        rounded-full 
        bg-gradient-to-br from-blue-500 to-indigo-700
        text-4xl sm:text-5xl font-extrabold text-white 
        shadow-2xl shadow-indigo-500/30
        transform transition-all duration-500 ease-out
        ${delayClass}
        ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
      `}
    >
      {number}
    </div>
  );
};
