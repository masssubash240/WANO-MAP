/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wano-dark': '#0a0a0f',
        'wano-navy': '#0d1b2e',
        'wano-deep': '#081422',
        'wano-gold': '#c9a227',
        'wano-gold-light': '#f0c040',
        'wano-red': '#8b1a1a',
        'wano-crimson': '#c0392b',
        'wano-sakura': '#ff6b9d',
        'wano-teal': '#1a5c6b',
        'wano-muted': '#2a1f3d',
      },
      fontFamily: {
        'cinzel': ['Cinzel Decorative', 'serif'],
        'noto': ['Noto Serif JP', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'pirata': ['Pirata One', 'cursive'],
      },
      backgroundImage: {
        'wano-texture': "url('/wano-bg.svg')",
        'gold-gradient': 'linear-gradient(135deg, #c9a227 0%, #f0c040 50%, #c9a227 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.8) 60%, rgba(10,10,15,1) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'sakura-fall': 'sakuraFall 8s linear infinite',
        'flame': 'flame 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,162,39,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(201,162,39,0.8), 0 0 80px rgba(201,162,39,0.3)' },
        },
        sakuraFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        flame: {
          '0%': { transform: 'scaleY(1) scaleX(1)', filter: 'brightness(1)' },
          '100%': { transform: 'scaleY(1.1) scaleX(0.95)', filter: 'brightness(1.3)' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201,162,39,0.5)',
        'gold-lg': '0 0 40px rgba(201,162,39,0.7)',
        'red': '0 0 20px rgba(192,57,43,0.5)',
        'inner-gold': 'inset 0 0 30px rgba(201,162,39,0.2)',
      },
    },
  },
  plugins: [],
}
