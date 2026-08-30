import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 0.5;
  }

  update(width: number, height: number, scrollOffset: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    
    // Parallax effect with scroll
    const parallaxY = this.y - scrollOffset * this.radius * 0.5;
    let displayY = parallaxY % height;
    if (displayY < 0) displayY += height;
    
    return { displayX: this.x, displayY };
  }
}

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const particleCount = Math.floor((width * height) / 15000);
      particles = Array.from({ length: particleCount }, () => new Particle(width, height));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const scrollY = window.scrollY;

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i].update(width, height, scrollY);
        
        ctx.beginPath();
        ctx.arc(p1.displayX, p1.displayY, particles[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // accent-cyan
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j].update(width, height, scrollY);
          const dx = p1.displayX - p2.displayX;
          const dy = p1.displayY - p2.displayY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.displayX, p1.displayY);
            ctx.lineTo(p2.displayX, p2.displayY);
            const opacity = 1 - (dist / 120);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.3})`; // accent-violet
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    
    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-charcoal-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal-900/80 pointer-events-none" />
    </div>
  );
}
