import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import './index.css';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import GalleryPage from './pages/GalleryPage';
import ProjectsPage from './pages/ProjectsPage'; // New Page
import ArticlePage from './pages/ArticlePage'; // New Page

import Header from './components/layout/Header';
import CustomCursor from './components/ui/CustomCursor';
import ScrollToTop from './components/layout/ScrollToTop';
import Loader from './components/ui/Loader';

// The animation wrapper needs to be inside the Router to use useLocation
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Expose globally so Hero (and other components) can pause/resume
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">

        {/* Loader blocks everything until done */}
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" finishLoading={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            {/* UI Elements */}
            <CustomCursor />
            <Header />

            {/* Cinematic Noise Overlay */}
            <div className="noise-overlay" />

            {/* Page Content with Transitions */}
            <AnimatedRoutes />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
