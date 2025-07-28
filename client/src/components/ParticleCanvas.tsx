import { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  particleCount?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
  opacity?: number;
  color?: string;
}

export default function ParticleCanvas({ 
  particleCount = 30, 
  direction = 'up', 
  speed = 0.3, 
  opacity = 0.4,
  color = '#ffffff'
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || 1200);
        this.y = Math.random() * (canvas?.height || 800);
        
        // Set velocity based on direction prop
        switch (direction) {
          case 'up':
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = -Math.random() * speed - 0.1;
            break;
          case 'down':
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = Math.random() * speed + 0.1;
            break;
          case 'left':
            this.vx = -Math.random() * speed - 0.1;
            this.vy = (Math.random() - 0.5) * 0.2;
            break;
          case 'right':
            this.vx = Math.random() * speed + 0.1;
            this.vy = (Math.random() - 0.5) * 0.2;
            break;
          default:
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }
        
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * opacity + 0.1;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (!canvas) return;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles with configurable behavior
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount, direction, speed, opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      data-testid="particle-canvas"
    />
  );
}
