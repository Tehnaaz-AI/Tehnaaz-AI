import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { ENV } from '../../config/env';

const FRAME_COUNT = 240;

const currentFrame = (index: number) =>
  `${ENV.CLOUDINARY_URL}/scroll-sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export function ScrollSequence({ isBackgroundMode = false }: { isBackgroundMode?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }

    setImages(imgArray);
  }, []);

  const { scrollYProgress } = useScroll();

  // Yoyo effect: 0 -> 239 -> 0
  const frameIndex = useTransform(scrollYProgress, [0, 0.5, 1], [0, FRAME_COUNT - 1, 0]);

  // Scale animation: Large on mobile hero, scales to land inside orbit at bottom
  const canvasScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 0.85, 1],
    isBackgroundMode 
      ? [0.5, 0.5, 0.5, 0.5, 0.5] 
      : isMobile 
        ? [0.8, 0.85, 0.7, 0.55, 0.5] 
        : [0.65, 0.95, 0.8, 0.6, 0.52]
  );

  // Translate animation: Spaced below hero name on mobile (16vh), lands in center of bottom orbit (-14vh)
  const canvasY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 0.85, 1],
    isBackgroundMode 
      ? ["0vh", "0vh", "0vh", "0vh", "0vh"] 
      : isMobile 
        ? ["16vh", "0vh", "0vh", "-6vh", "-14vh"] 
        : ["0vh", "0vh", "0vh", "0vh", "0vh"]
  );

  // Translate X animation: Starts on the right on desktop, stays centered on mobile
  const canvasX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    isBackgroundMode 
      ? ["0vw", "0vw", "0vw", "0vw"] 
      : isMobile 
        ? ["0vw", "0vw", "0vw", "0vw"] 
        : ["30vw", "0vw", "0vw", "30vw"]
  );

  // Visible across entire scroll on both mobile and laptop
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 1]
  );

  const [isAtTop, setIsAtTop] = useState(true);

  // Render the initial frame when loaded
  useEffect(() => {
    if (loaded && canvasRef.current && images.length > 0) {
      renderFrame(0);
    }
  }, [loaded, images]);

  // Render frame smoothly based on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded && canvasRef.current) {
      renderFrame(Math.floor(latest));
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAtTop(latest <= 0.01);
  });

  const renderFrame = (index: number) => {
    if (index >= images.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];

    // Calculate aspect ratio to cover canvas
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Add white background in case image doesn't perfectly cover due to rounding
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(Math.floor(frameIndex.get()));
      }
    };

    handleResize(); // Initial setup
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded]);

  return (
    <div className="absolute inset-0 z-0 w-full">
      <div className="sticky top-0 w-full h-screen pointer-events-none bg-white overflow-hidden">
        <motion.canvas
          ref={canvasRef}
          animate={isAtTop ? { rotate: 360 } : { rotate: 0 }}
          transition={isAtTop ? { repeat: Infinity, duration: 10, ease: "linear" } : { duration: 0.5, ease: "easeOut" }}
          style={{
            scale: canvasScale,
            y: canvasY,
            x: canvasX,
            opacity: canvasOpacity,
            transformOrigin: "center center"
          }}
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>
    </div>
  );
}
