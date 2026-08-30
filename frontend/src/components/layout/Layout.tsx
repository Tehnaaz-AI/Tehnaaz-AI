import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { DynamicBackground } from '../ui/DynamicBackground';
import { CurrentStatus } from '../ui/CurrentStatus';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-black selection:text-white">
      <DynamicBackground />
      
      <div className="fixed top-6 left-0 w-full flex justify-center items-start gap-4 z-50 pointer-events-none px-4">
        <div className="pointer-events-auto">
          <CurrentStatus />
        </div>
        <div className="pointer-events-auto">
          <Navigation />
        </div>
      </div>
      
      <main className="flex-grow w-full z-10">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
