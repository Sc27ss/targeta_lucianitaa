import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
interface Heart {
  id: number;
  x: number;
  y: number;
}
export function TouchTrail() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const idCounter = useRef(0);
  useEffect(() => {
    const handleTap = (e: MouseEvent | TouchEvent) => {
      const x =
      'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y =
      'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const newHeart = {
        id: idCounter.current++,
        x,
        y
      };
      setHearts((prev) => [...prev.slice(-9), newHeart]); // Keep last 10
    };
    window.addEventListener('click', handleTap);
    window.addEventListener('touchstart', handleTap);
    return () => {
      window.removeEventListener('click', handleTap);
      window.removeEventListener('touchstart', handleTap);
    };
  }, []);
  // Cleanup old hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      // We can just rely on the animation duration to visually remove them,
      // but cleaning up state is good.
      // Since we slice(-9) on add, the array won't grow indefinitely on interaction,
      // but we should clear if idle.
      if (hearts.length > 0) {




        // Simple cleanup: remove oldest if list is getting full or just let them be replaced
        // Actually, let's just rely on the slice in handleTap for limiting count,
        // and a timeout to clear state if needed, but framer motion handles exit.
        // To keep state clean we can remove after animation duration (e.g. 2s)
      }}, 2000);return () => clearInterval(interval);}, [hearts.length]);return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) =>
        <motion.div
          key={heart.id}
          initial={{
            opacity: 1,
            scale: 0.5,
            y: 0
          }}
          animate={{
            opacity: 0,
            scale: 1.2,
            y: -60
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            left: heart.x,
            top: heart.y,
            fontSize: '24px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}>

            🩷
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

}