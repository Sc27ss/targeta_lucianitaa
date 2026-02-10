import React, { useEffect, useState } from 'react';
import { StarField } from './components/ui/StarField';
import { TouchTrail } from './components/ui/TouchTrail';
import { GlitchScreen } from './components/ui/GlitchScreen';
import { PinEntry } from './components/features/PinEntry';
import { NarrativeStage } from './components/features/NarrativeStage';
import { AnimatePresence, motion } from 'framer-motion';
export function App() {
  const [isMobile, setIsMobile] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  if (!isMobile) {
    return <GlitchScreen />;
  }
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050510] text-white">
      {/* Background Layer */}
      <StarField />

      {/* Interactive Layer */}
      <TouchTrail />

      {/* Content Layer */}
      <AnimatePresence mode="wait">
        {!isAuthenticated ?
        <PinEntry key="pin" onSuccess={() => setIsAuthenticated(true)} /> :

        <motion.div
          key="narrative"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 1
          }}
          className="relative z-10 w-full h-full">

            <NarrativeStage />
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}