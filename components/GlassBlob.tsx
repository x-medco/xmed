'use client';

import { motion } from 'framer-motion';

interface GlassBlobProps {
  color?: string;
  size?: string;
  top?: string;
  left?: string;
  delay?: number;
  duration?: number;
}

export default function GlassBlob({
  color = 'bg-blue-500',
  size = 'w-72 h-72',
  top = '10%',
  left = '10%',
  delay = 0,
  duration = 15,
}: GlassBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full filter blur-[120px] opacity-20 pointer-events-none ${color} ${size}`}
      style={{ top, left }}
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -50, 30, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

export function GridOverlay() {
  return (
    <div className="absolute inset-0 bg-lab-grid bg-grid pointer-events-none opacity-[0.4]" />
  );
}

export function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full animate-ping opacity-60" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[45%] left-[75%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDuration: '6s' }} />
      <div className="absolute top-[70%] left-[40%] w-1 h-1 bg-sky-300 rounded-full animate-ping opacity-50" style={{ animationDuration: '5s' }} />
      <div className="absolute top-[30%] left-[85%] w-1 h-1 bg-white rounded-full animate-pulse opacity-40" />
      <div className="absolute top-[80%] left-[15%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-30" />
    </div>
  );
}
