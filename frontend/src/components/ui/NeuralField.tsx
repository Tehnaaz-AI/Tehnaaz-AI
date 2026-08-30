import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();
  const routeRef = useRef(location.pathname);

  useEffect(() => {
    routeRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 200;

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      gridX: number;
      gridY: number;

      constructor(x: number, y: number, gridX: number, gridY: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.gridX = gridX;
        this.gridY = gridY;
        this.vx = (Math.random() - 0.5) * (prefersReducedMotion ? 0.1 : 0.5);
        this.vy = (Math.random() - 0.5) * (prefersReducedMotion ? 0.1 : 0.5);
      }

      update(mode: string, scrollY: number) {
        // Mode specific behavior
        let targetX = this.x;
        let targetY = this.y;
        
        const isGrid = mode.includes('/work');
        const isChaotic = mode.includes('/lab');
        
        if (isGrid) {
          // Lerp to grid positions with parallax
          targetX = this.gridX;
          targetY = this.gridY - (scrollY * 0.2); // slight parallax
          
          this.x += (targetX - this.x) * 0.05;
          this.y += (targetY - this.y) * 0.05;
        } else if (isChaotic) {
          // Increase velocity occasionally
          if (Math.random() < 0.01) {
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
          }
          this.x += this.vx;
          this.y += this.vy;
        } else {
          // Normal float mode
          this.x += this.vx;
          this.y += this.vy;
        }

        // Bounce off edges for normal/chaotic mode
        if (!isGrid) {
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        // Mouse interaction (repel)
        if (!prefersReducedMotion) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseRadius - distance) / mouseRadius;
            
            this.x -= forceDirectionX * force * 2;
            this.y -= forceDirectionY * force * 2;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, mode: string) {
        ctx.beginPath();
        const size = mode.includes('/work') ? 2 : 1.5;
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fillStyle = mode.includes('/work') ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.3)';
        ctx.fill();
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      particles = [];
      const count = prefersReducedMotion ? Math.floor(particleCount / 2) : particleCount;
      
      const cols = Math.ceil(Math.sqrt(count * (width / height)));
      const rows = Math.ceil(count / cols);
      
      const spacingX = width / cols;
      const spacingY = height / rows;

      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const gridX = col * spacingX + spacingX / 2 + (Math.random() * 20 - 10);
        const gridY = row * spacingY + spacingY / 2 + (Math.random() * 20 - 10);
        
        particles.push(new Particle(Math.random() * width, Math.random() * height, gridX, gridY));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const currentMode = routeRef.current;
      const scrollY = window.scrollY;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(currentMode, scrollY);
        particles[i].draw(ctx, currentMode);

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const opacity = 1 - (distance / connectionDistance);
            const isWork = currentMode.includes('/work');
            const isLab = currentMode.includes('/lab');
            
            if (isWork) {
              ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.25})`; 
            } else if (isLab) {
              ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.1})`; // Slightly different color for lab?
            } else {
              ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.15})`;
            }
            
            ctx.lineWidth = isWork ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-canvas"
      aria-hidden="true"
    />
  );
}
