// frontend/tailwind.config.js (Tailwind CSS v3.x용)
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-schemes-color-scheme-1-background': 'var(--color-schemes-color-scheme-1-background, #FEFCF3)',
        'color-schemes-color-scheme-1-on-background': 'var(--color-schemes-color-scheme-1-on-background, #2F2F2F)',
        'color-schemes-color-scheme-1-primary': 'var(--color-schemes-color-scheme-1-primary, #4A90E2)',
        'color-schemes-color-scheme-1-on-primary': 'var(--color-schemes-color-scheme-1-on-primary, #FFFFFF)',
        'color-schemes-color-scheme-1-secondary': 'var(--color-schemes-color-scheme-1-secondary, #FFD600)',
        'color-schemes-color-scheme-1-on-secondary': 'var(--color-schemes-color-scheme-1-on-secondary, #2F2F2F)',
        'figma-red': '#FF0000',
        'figma-yellow': '#FFD600',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        'heading-desktop-h2': ['Noto Sans KR', 'sans-serif'],
        'm3-title-medium': ['Noto Sans KR', 'sans-serif'],
        'text-regular-normal': ['Noto Sans KR', 'sans-serif'],
        'text-small-link': ['Noto Sans KR', 'sans-serif'],
        'text-small-semi-bold': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}