"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";
import { MousePointerClick, Info, Sun, Moon, Settings2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

/**
 * Standard Shadcn utility for merging Tailwind classes safely.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper component for the SVG grid pattern.
 */
const GridPattern = ({ size, id, speed = 20 }: { size: number, id: string, speed?: number }) => {
  return (
    <svg className="w-full h-full pointer-events-none">
      <defs>
        <motion.pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          animate={{ x: [0, size], y: [0, size] }}
          transition={{
            repeat: Infinity,
            duration: speed,
            ease: "linear"
          }}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

/**
 * The Infinite Grid Component
 * Displays a scrolling background grid that reveals an active layer on mouse hover.
 * 
 * Updated for AlgoSensei Midnight Industrial Theme.
 */
const InfiniteGrid = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [gridSize, setGridSize] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position with Motion Values for performance (avoids React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Create a dynamic radial mask for the "flashlight" effect
  // Fixed syntax: "circle 300px" instead of "300px circle"
  const maskImage = useMotionTemplate`radial-gradient(circle 300px at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      )}
    >
      {/* Layer 1: Subtle background grid (always visible) */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <GridPattern size={gridSize} id="grid-pattern-bg" speed={20} />
      </div>

      {/* Layer 2: Highlighted grid (revealed by mouse mask) */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 text-primary pointer-events-none"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern size={gridSize} id="grid-pattern-highlight" speed={20} />
      </motion.div>

      {/* Decorative Blur Spheres - Updated to match Industrial Theme */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {/* Subtle primary glow */}
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      {/* Grid Density Control Panel */}
      <div className="absolute bottom-10 right-10 z-30 pointer-events-auto">
        <div className="glass-panel p-4 rounded-xl shadow-2xl space-y-3 min-w-[200px]">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground tracking-widest uppercase">
            <Settings2 className="w-4 h-4 text-primary" />
            Grid Density
          </div>
          <input 
            type="range" 
            min="20" 
            max="100" 
            value={gridSize} 
            onChange={(e) => setGridSize(Number(e.target.value))}
            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            <span>Dense</span>
            <span>Sparse ({gridSize}px)</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto space-y-8 pointer-events-none">
         <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground font-mono uppercase">
            AlgoSensei
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Master algorithms with AI-driven insights. <br/>
            <span className="text-sm font-mono opacity-70">System Initialized. Grid Active.</span>
          </p>
        </div>
        
        <div className="flex gap-6 pointer-events-auto">
          <motion.button 
              onClick={() => router.push('/dashboard')}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 0 20px var(--primary)" 
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-none border border-primary transition-all uppercase tracking-widest"
          >
              <MousePointerClick className="w-5 h-5" />
              Enter System
          </motion.button>
          
          <motion.button 
              onClick={() => window.open('https://github.com/VENOMRK22/algoSensei', '_blank')}
              whileHover={{ 
                scale: 1.05, 
                y: -2, 
                borderColor: "var(--primary)",
                color: "var(--foreground)"
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center gap-3 px-8 py-4 bg-transparent text-muted-foreground font-bold rounded-none border border-white/10 transition-colors uppercase tracking-widest hover:text-white"
          >
              <Info className="w-5 h-5" />
              Manifesto
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default InfiniteGrid;
