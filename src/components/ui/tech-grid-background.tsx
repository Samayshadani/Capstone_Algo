"use client";

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

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

export const TechGridBackground = ({
  activeColor = "text-primary",
  blobColors = ["bg-primary/5", "bg-secondary/5"],
  baseOpacity = 0.03
}: {
  activeColor?: string,
  blobColors?: string[],
  baseOpacity?: number
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(circle 400px at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      {/* Layer 1: Subtle background grid (always visible) */}
      <div className="absolute inset-0 z-0" style={{ opacity: baseOpacity }}>
        <GridPattern size={50} id="tech-grid-bg" speed={30} />
      </div>

      {/* Layer 2: Highlighted grid (revealed by mouse mask) */}
      <motion.div
        className={`absolute inset-0 z-0 opacity-20 ${activeColor}`}
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern size={50} id="tech-grid-highlight" speed={30} />
      </motion.div>

      {/* Decorative Elements */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${blobColors[0]} blur-[120px] rounded-full pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] ${blobColors[1] || blobColors[0]} blur-[120px] rounded-full pointer-events-none`} />
    </div>
  );
};
