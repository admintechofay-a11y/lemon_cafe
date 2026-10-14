import React from 'react';

export default function LemonSliceSvg({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Rind */}
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Inner Pith */}
      <circle
        cx="24"
        cy="24"
        r="17"
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="2 2"
        opacity="0.65"
      />
      {/* Center hub */}
      <circle cx="24" cy="24" r="2.5" fill={color} />
      {/* Segments */}
      <path
        d="M24 7 C27 12 27 16 25.5 21.5 C24.5 21.5 23.5 21.5 22.5 21.5 C21 16 21 12 24 7Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M36 12 C34 16.5 31.5 19.5 26.5 22.5 C26 21.5 25.2 20.8 24.5 20.2 C28.5 16.5 31.5 14 36 12Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M41 24 C36 27 32 27 26.5 25.5 C26.5 24.5 26.5 23.5 26.5 22.5 C32 21 36 21 41 24Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M36 36 C31.5 34 28.5 31.5 25.5 26.5 C26.5 26 27.2 25.2 27.8 24.5 C31.5 28.5 34 31.5 36 36Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M24 41 C21 36 21 32 22.5 26.5 C23.5 26.5 24.5 26.5 25.5 26.5 C27 32 27 36 24 41Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M12 36 C14 31.5 16.5 28.5 21.5 25.5 C22 26.5 22.8 27.2 23.5 27.8 C19.5 31.5 16.5 34 12 36Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M7 24 C12 21 16 21 21.5 22.5 C21.5 23.5 21.5 24.5 21.5 25.5 C16 27 12 27 7 24Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M12 12 C16.5 14 19.5 16.5 22.5 21.5 C21.5 22 20.8 22.8 20.2 23.5 C16.5 19.5 14 16.5 12 12Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}
