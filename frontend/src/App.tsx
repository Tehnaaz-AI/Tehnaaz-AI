import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/ui/Preloader';

import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { Journey } from './pages/Journey';

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="skills" element={<Skills />} />
        <Route path="projects" element={<Projects />} />
        <Route path="journey" element={<Journey />} />
      </Route>
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.5 seconds loading simulation for the arc reactor preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CursorProvider>
      <SmoothScroll>
        <BrowserRouter>
          <ScrollToTop />
          <CustomCursor />
          <AnimatePresence mode="wait">
            {loading ? (
              <Preloader key="preloader" />
            ) : (
              <AnimatedRoutes key="routes" />
            )}
          </AnimatePresence>
        </BrowserRouter>
      </SmoothScroll>
    </CursorProvider>
  );
}

export default App;
