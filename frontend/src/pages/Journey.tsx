import { PageTransition } from '../components/layout/PageTransition';
import { motion } from 'framer-motion';
import { JOURNEY_DATA } from '../data/journey';
import { JourneyYearBlock } from '../components/journey/JourneyYearBlock';
import { JourneyTimelineTrack } from '../components/journey/JourneyTimelineTrack';

export function Journey() {
  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-white selection:bg-black selection:text-white">
        
        <JourneyTimelineTrack />

        {/* Header Section */}
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-6">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter uppercase text-black text-center">
            The Journey
          </h1>
          <div className="w-24 h-2 bg-black mt-6 mb-12"></div>
          <p className="font-organic-mono text-black/60 max-w-xl text-center">
            Scroll down to explore my timeline.
          </p>
        </div>

        {/* Horizontal Scrolling Year Blocks */}
        <div className="w-full">
          {JOURNEY_DATA.map((yearData) => (
            <JourneyYearBlock key={yearData.id} data={yearData} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="w-full h-screen flex flex-col items-center justify-center px-6 relative bg-white z-20 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-black text-center leading-none"
          >
            The Journey <br/> Continues.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-organic-mono font-bold tracking-widest text-black/50 text-sm md:text-base uppercase mt-8 text-center"
          >
            Still learning. Still building. Still exploring.
          </motion.p>
        </div>

      </div>
    </PageTransition>
  );
}
