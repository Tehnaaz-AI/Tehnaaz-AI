import { PageTransition } from '../components/layout/PageTransition';
import { ScrollSequence } from '../components/home/ScrollSequence';
import { HorizontalProjects } from '../components/home/HorizontalProjects';
import { HomeJourneyTeaser } from '../components/home/HomeJourneyTeaser';
import { motion, useScroll, useTransform } from 'framer-motion';


export function Home() {
  const { scrollYProgress } = useScroll();
  // Name fades out smoothly and completely before leaving the hero section
  const nameOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 0.4, 0], { clamp: true });
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9], { clamp: true });

  return (
    <PageTransition>
      <div className="relative w-full bg-white selection:bg-black selection:text-white">

        {/* Main Content Wrapper (Arc Reactor sticks inside here) */}
        <div className="relative w-full z-0">

          <ScrollSequence />

          {/* Top Section: Watermark Name (Sticky only during Hero) */}
          <div className="absolute top-0 left-0 w-full z-10 pointer-events-none h-[120vh]">
            <div className="sticky top-0 h-screen w-full flex items-start md:items-center justify-center md:justify-start overflow-hidden px-4 sm:px-12 md:px-24 pt-28 sm:pt-36 md:pt-0">
              <motion.div
                style={{ opacity: nameOpacity, scale: nameScale, transformOrigin: 'center top' }}
                className="flex flex-col text-center md:text-left items-center md:items-start max-w-[95vw] md:max-w-[50vw]"
              >
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[8vw] leading-[0.9] font-sans font-black tracking-tight text-black uppercase">
                  Tehnaaz <br className="hidden md:inline" /> Fathima
                </h1>
                <p className="mt-3 sm:mt-5 md:mt-8 font-organic-mono text-xs sm:text-sm md:text-xl text-black/70 max-w-lg tracking-widest uppercase leading-relaxed text-center md:text-left">
                  Curious by nature. Building by choice.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Spacer to allow scrolling through the Arc Reactor animation before hitting projects */}
          <div className="w-full h-[100vh] pointer-events-none" />

          {/* Middle Section: Projects Gallery */}
          <div className="relative z-20 pointer-events-auto bg-transparent">
            <HorizontalProjects />
          </div>

          {/* Journey Teaser Section */}
          <div className="relative z-20 pointer-events-auto bg-transparent">
            <HomeJourneyTeaser />
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
