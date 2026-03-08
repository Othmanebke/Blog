/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#080808',
          50: '#0D0D0D',
          100: '#080808',
          200: '#111111',
        },
        ink: {
          DEFAULT: '#F0EFEC',
          light: '#C8C7C4',
          muted: '#888885',
        },
        bronze: {
          DEFAULT: '#B4FF39',
          light: '#CCFF72',
          dark: '#88CC1A',
        },
        stone: {
          DEFAULT: '#2A2A27',
          light: '#191917',
          dark: '#4F4F4C',
        },
        night: '#030303',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Impact"', '"Arial Narrow"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
        'display': ['clamp(3.5rem,8vw,7rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'hero': ['clamp(2.5rem,6vw,5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.75rem,3vw,2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'poster': ['clamp(5rem,15vw,15rem)', { lineHeight: '0.88', letterSpacing: '-0.03em' }],
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
