/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F8F1E6',
          2: '#F2E9DA',
          50: '#FFFFFF',
          100: '#FFFBF4',
          200: '#F8F1E6',
          300: '#F2E9DA',
        },
        paper: '#FFFBF4',
        ink: {
          DEFAULT: '#1C1713',
          soft: 'rgba(28, 23, 19, 0.72)',
          muted: 'rgba(28, 23, 19, 0.45)',
          hairline: 'rgba(28, 23, 19, 0.10)',
        },
        gold: {
          DEFAULT: '#C8AE5B',
          blob: '#C8AE5B',
        },
        blush: {
          DEFAULT: '#F0C4C6',
          blob: '#F0C4C6',
        },
        copper: {
          DEFAULT: '#D29A5C',
          a: '#D29A5C',
          b: '#B0682F',
        },
        line: 'rgba(28, 23, 19, 0.10)',
      },
      fontFamily: {
        serif: ['"Newsreader"', '"Source Serif 4"', '"Fraunces"', 'Georgia', 'serif'],
        display: ['"Newsreader"', '"Source Serif 4"', '"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
      },
      boxShadow: {
        'collage': '0 16px 36px -10px rgba(26, 26, 26, 0.12), 0 4px 12px -2px rgba(26, 26, 26, 0.05)',
        'collage-lg': '0 24px 48px -12px rgba(26, 26, 26, 0.16), 0 6px 16px -4px rgba(26, 26, 26, 0.06)',
        'gold-pill': '0 8px 24px -4px rgba(232, 185, 35, 0.36)',
        'gold-pill-hover': '0 12px 30px -4px rgba(232, 185, 35, 0.50)',
        'subtle': '0 4px 20px -2px rgba(26, 26, 26, 0.05)',
      },
      animation: {
        'drift-slow-1': 'drift1 16s ease-in-out infinite',
        'drift-slow-2': 'drift2 18s ease-in-out infinite',
        'bob': 'bob 2s ease-in-out infinite',
      },
      keyframes: {
        drift1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(-14px, 12px) scale(1.04) rotate(4deg)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(12px, -15px) scale(1.05) rotate(-5deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
}
