/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class'],
  theme: {
    colors: {
      'bg-default': 'var(--bg-default)',
      'bg-paper': 'var(--bg-paper)',
      'text-primary': 'var(--text-primary)',
      'text-secondary': 'var(--text-secondary)',
      blue: {
        DEFAULT: '#1d86fb', // Основной цвет
      },
      white: {
        DEFAULT: '#fff',
      },
      black: {
        DEFAULT: '#2c2f38',
      },
      blacky: {
        DEFAULT: '#0c2129',
      },
      whity: {
        DEFAULT: '#f3f3f3',
      },
      gray_light: {
        DEFAULT: '#f2f2f2',
      },
      gray_dark: {
        DEFAULT: '#646368',
      },
      transparent: 'transparent',
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      scale: ['group-hover'],
      keyframes: {
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        flip: {
          '0%, 100%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
        },
        pendulum: {
          '0%, 100%': { transform: 'rotate(10deg)' },
          '50%': { transform: 'rotate(-10deg)' },
        },
        unflip: {
          '0%, 100%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
        },
      },
      animation: {
        fadein: 'fadein 0.3s ease-in-out',
        flip: 'flip 0.3s ease-in',
        unflip: 'unflip 0.3s ease-out',
        pendulum: 'pendulum 3s ease-in-out infinite',
      },
      boxShadow: {
        card: '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
      },
    },
  },
};
