import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        paper: '#FFFFFF',
        lightBg: '#F8FAFC',
        graphite: '#475569',
        signal: '#2563eb',
        violet: '#7c3aed',
        cyan: '#06b6d4',
        indigo: '#4f46e5',
        emerald: '#10B981',
        amber: '#FBBF24',
        line: '#E2E8F0',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'lab-grid':
          'linear-gradient(rgba(37, 99, 235, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulseGlow 12s ease-in-out infinite',
        'drift-slow': 'drift 15s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.15)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(40px, -45px) scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '10%': { opacity: '0' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.12)',
        'glass-hover': '0 12px 40px rgba(31, 38, 135, 0.18)',
        'glass-strong': '0 16px 48px rgba(31, 38, 135, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
