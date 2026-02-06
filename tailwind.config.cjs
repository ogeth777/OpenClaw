/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bnb: {
          yellow: '#F0B90B',
          black: '#0B0E11',
          dark: '#1E2026'
        },
        cyber: {
          cyan: '#00F0FF',
          pink: '#FF003C',
          purple: '#BC13FE',
          dark: '#050505',
          glass: 'rgba(255, 255, 255, 0.05)'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00F0FF, 0 0 10px #00F0FF' },
          '100%': { boxShadow: '0 0 20px #00F0FF, 0 0 30px #00F0FF' },
        }
      }
    },
  },
  plugins: [],
}
