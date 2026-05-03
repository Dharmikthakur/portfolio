'use client';

import { useEffect, useRef } from 'react';

type FallingPatternProps = {
  /** Color of the falling pixels (default: '#a78bfa') */
  color?: string;
  /** How many pixel columns (default: 1) */
  density?: number;
  /** Speed multiplier — higher = faster (default: 1) */
  speed?: number;
  /** Optional extra className on the canvas element */
  className?: string;
  // legacy props kept for compatibility — ignored
  backgroundColor?: string;
  duration?: number;
  blurIntensity?: string;
};

interface Pixel {
  x: number;
  y: number;
  vy: number;
  length: number;
  alpha: number;
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function FallingPattern({
  color = '#a78bfa',
  density = 1,
  speed = 1,
  className,
}: FallingPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let pixels: Pixel[] = [];
    const rgb = hexToRgb(color);

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // One column of pixels per ~12px of width, scaled by density
      const cols = Math.floor((canvas.width / 12) * Math.max(0.1, density));
      pixels = [];

      for (let i = 0; i < cols; i++) {
        const xSpread = canvas.width / cols;
        pixels.push(createPixel(
          xSpread * i + Math.random() * xSpread,
          Math.random() * canvas.height, // start spread across screen
          canvas.height,
          speed,
          rgb,
        ));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of pixels) {
        // Draw a glowing streak
        const grad = ctx.createLinearGradient(p.x, p.y - p.length, p.x, p.y + 2);
        grad.addColorStop(0, `rgba(${p.r},${p.g},${p.b},0)`);
        grad.addColorStop(0.6, `rgba(${p.r},${p.g},${p.b},${p.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${p.r},${p.g},${p.b},${p.alpha})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.length > 30 ? 1.5 : 1;
        ctx.moveTo(p.x, p.y - p.length);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
        ctx.fill();

        // Advance
        p.y += p.vy;

        // Reset when off-screen
        if (p.y - p.length > canvas.height) {
          p.y = -p.length;
          p.x = Math.random() * canvas.width;
          p.vy = (0.4 + Math.random() * 1.2) * speed;
          p.length = 15 + Math.random() * 50;
          p.alpha = 0.25 + Math.random() * 0.75;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => { init(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [color, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}

function createPixel(
  x: number,
  y: number,
  screenH: number,
  speed: number,
  rgb: { r: number; g: number; b: number },
): Pixel {
  return {
    x,
    y,
    vy: (0.4 + Math.random() * 1.2) * speed,
    length: 15 + Math.random() * 50,
    alpha: 0.25 + Math.random() * 0.75,
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
  };
}
