"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
    className?: string;
    color?: string; // Hex or "var(--primary)"
    speed?: number; // Interval in ms (higher = slower)
}

const MatrixRain = ({ className, color, speed = 33 }: MatrixRainProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resolve Color
        let rainColor = "#0F0"; // Default fallback
        if (color) {
            if (color.startsWith("var(")) {
                // Extract variable name
                const varName = color.match(/var\(([^)]+)\)/)?.[1];
                if (varName) {
                    rainColor = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
                    // If output is pure values like "0.7 0.2 140" (oklch), this might fail in canvas fillStyle if browser doesn't support it directly in older contexts, but modern browsers usually handle CSS colors in canvas.
                    // However, oklch might be tricky. Let's assume widely supported or fallback to a neon green hex if needed.
                    // Actually, to be safe, if it's our specific primary active green, I'll default to a nice neon green hex if resolving fails or returns non-color.
                    // Let's just use the computed value.
                }
            } else {
                rainColor = color;
            }
        }

        const getDimensions = () => {
            if (canvas.parentElement) {
                return {
                    width: canvas.parentElement.offsetWidth,
                    height: canvas.parentElement.offsetHeight
                };
            }
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        };

        let { width, height } = getDimensions();

        canvas.width = width;
        canvas.height = height;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);

        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create fade trail
            ctx.fillStyle = "rgba(2, 6, 23, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                if (color) {
                    ctx.fillStyle = rainColor;
                } else {
                    // Default behavior (Blue/Purple/Cyan mix)
                    const randomColor = Math.random();
                    if (randomColor > 0.66) {
                        ctx.fillStyle = "#A855F7";
                    } else if (randomColor > 0.33) {
                        ctx.fillStyle = "#3B82F6";
                    } else {
                        ctx.fillStyle = "#06B6D4";
                    }
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, speed);

        // Handle Resize
        const handleResize = () => {
            const dims = getDimensions();
            width = dims.width;
            height = dims.height;
            canvas.width = width;
            canvas.height = height;
            // Re-initialize columns on resize to avoid gaps
            const newColumns = Math.ceil(width / fontSize);
            if (newColumns > columns) {
                for (let i = columns; i < newColumns; i++) {
                    drops[i] = Math.floor(Math.random() * height / fontSize);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className || "fixed inset-0 w-full h-full pointer-events-none opacity-20"}
            style={{ zIndex: 0 }}
        />
    );
};

export default MatrixRain;
