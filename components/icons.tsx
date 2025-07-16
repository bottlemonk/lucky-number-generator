
import React from 'react';

interface IconProps {
  className?: string;
}

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-1.767-.933-3.417-2.397-4.308a.75.75 0 01.316-1.305zM11.25 3.75a.75.75 0 00-1.5 0v2.25c0 1.767-.933 3.417-2.397 4.308a.75.75 0 00.316 1.305C11.305 13.117 14.25 16.5 14.25 21.75a.75.75 0 001.5 0c0-5.25-2.905-8.633-6.508-10.356V3.75z"
      clipRule="evenodd"
    />
  </svg>
);
