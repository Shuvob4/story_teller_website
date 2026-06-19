/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg':           '#080808',
        'bg-card':      '#111111',
        'bg-overlay':   'rgba(0,0,0,0.55)',
        'text-primary': '#F0EDE8',
        'text-muted':   '#8A8580',
        'accent':       '#C9A84C',
        'accent-hover': '#E2C06A',
        'border':       'rgba(240,237,232,0.12)',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'cinematic': '0.14em',
        'wide':      '0.08em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};
