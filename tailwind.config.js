/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        launch: {
          black: '#0a0a0a',
          coal: '#111113',
          steel: '#1a1a24',
          gray: '#27272a',
          silver: '#3f3f46',
          smoke: '#71717a',
          light: '#a1a1aa',
          pale: '#e4e4e7',
        },
        accent: {
          red: '#f8312f',
          orange: '#ea580c',
          amber: '#f59e0b',
          glow: '#ff6b35',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
