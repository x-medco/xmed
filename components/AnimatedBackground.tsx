'use client';

import { motion, useReducedMotion } from 'framer-motion';

const blobs = [
  { color: '#2563eb', size: 600, initialX: '10%', initialY: '15%', duration: 20 },
  { color: '#7c3aed', size: 550, initialX: '70%', initialY: '60%', duration: 25 },
  { color: '#06b6d4', size: 500, initialX: '50%', initialY: '30%', duration: 18 },
  { color: '#4f46e5', size: 650, initialX: '80%', initialY: '10%', duration: 22 },
];

export default function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f8fafc]">
      {/* DNA helix line art layer - very low opacity, slow drift */}
      <motion.div
        className="absolute inset-0 opacity-[0.05] pointer-events-none select-none"
        animate={prefersReducedMotion ? {} : { y: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 100 Q 50 40 80 100 Q 110 160 140 100 Q 170 40 200 100' fill='none' stroke='%232563eb' stroke-width='1' opacity='0.4'/%3E%3Cpath d='M 20 100 Q 50 160 80 100 Q 110 40 140 100 Q 170 160 200 100' fill='none' stroke='%237c3aed' stroke-width='1' opacity='0.3'/%3E%3Ccircle cx='80' cy='100' r='3' fill='%232563eb' opacity='0.2'/%3E%3Ccircle cx='140' cy='100' r='3' fill='%237c3aed' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Animated gradient blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}22 0%, ${blob.color}08 50%, transparent 70%)`,
            filter: 'blur(120px)',
            left: blob.initialX,
            top: blob.initialY,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, (i % 2 === 0 ? 80 : -80), 0],
                  y: [0, (i % 2 === 0 ? -60 : 60), 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.9, 0.6],
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
