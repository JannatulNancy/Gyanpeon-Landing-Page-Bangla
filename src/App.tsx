/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LandingProvider } from './context/LandingContext';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import VideoSliderSection from './components/VideoSliderSection';
import PricingSection from './components/PricingSection';
import AdmissionUpdatesSection from './components/AdmissionUpdatesSection';
import FeaturesSection from './components/FeaturesSection';
import WhyChooseSection from './components/WhyChooseSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname;
  });
  const [currentHash, setCurrentHash] = useState(() => {
    return window.location.hash;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
      // Automatically scroll to top on route change
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  const isAdminRoute = currentPath === '/admin' || currentHash === '#/admin' || currentHash === '#admin';

  const fadeInUpProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <LandingProvider>
      {isAdminRoute ? (
        <AdminPanel />
      ) : (
        <div className="min-h-screen bg-white text-[#111111] selection:bg-[#6C4CF5] selection:text-white flex flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            {/* Video Slider Section (video streams) at the very top of the page */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <VideoSliderSection />
            </motion.div>

            {/* Hero section under the video streams */}
            <motion.div {...fadeInUpProps}>
              <Hero />
            </motion.div>

            <motion.div {...fadeInUpProps}>
              <PricingSection />
            </motion.div>

            <motion.div {...fadeInUpProps}>
              <AdmissionUpdatesSection />
            </motion.div>

            <motion.div {...fadeInUpProps}>
              <FeaturesSection />
            </motion.div>

            <motion.div {...fadeInUpProps}>
              <StatsSection />
            </motion.div>

            <motion.div {...fadeInUpProps}>
              <WhyChooseSection />
            </motion.div>

            <motion.div {...fadeInUpProps}>
              <TestimonialsSection />
            </motion.div>

            <motion.div {...fadeInUpProps}>
              <CTASection />
            </motion.div>
          </main>
          <Footer />
          
          {/* Login & Sign Up Modal */}
          <LoginModal />
        </div>
      )}
    </LandingProvider>
  );
}
