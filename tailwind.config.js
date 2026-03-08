/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F4EF',
          50: '#FDFCFA',
          100: '#F7F4EF',
          200: '#EDE7DC',
        },
        ink: {
          DEFAULT: '#111110',
          light: '#2A2927',
          muted: '#6B6760',
        },
        bronze: {
          DEFAULT: '#A8864C',
          light: '#C9A96E',
          dark: '#7D6338',
        },
        stone: {
          DEFAULT: '#D4CFC7',
          light: '#ECEAE6',
          dark: '#A09890',
        },
        night: '#0D0D0C',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
        'display': ['clamp(3.5rem,8vw,7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero': ['clamp(2.5rem,6vw,5.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.75rem,3vw,2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'sm': '2px',
      },
      letterSpacing: {
        'widest2': '0.2em',
        'widest3': '0.3em',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'editorial': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.19,1,0.22,1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'line-left': 'line-left 1.2s cubic-bezier(0.19,1,0.22,1) both',
        'ticker': 'ticker 25s linear infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'line-left': {
          from: { transform: 'scaleX(0)', transformOrigin: 'left' },
          to: { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        'ticker': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
