import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface SecretLayerProps {
  isVisible: boolean;
  onClose: () => void;
}
export function SecretLayer({ isVisible, onClose }: SecretLayerProps) {
  useEffect(() => {
    if (isVisible && navigator.vibrate) {
      navigator.vibrate([50, 30, 50, 30, 50]);
    }
  }, [isVisible]);
  return (
    <AnimatePresence>
      {isVisible &&
      <motion.div
        initial={{
          opacity: 0,
          backdropFilter: 'blur(0px)'
        }}
        animate={{
          opacity: 1,
          backdropFilter: 'blur(10px)'
        }}
        exit={{
          opacity: 0,
          backdropFilter: 'blur(0px)'
        }}
        transition={{
          duration: 0.5
        }}
        className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center pointer-events-auto"
        onClick={onClose}
        onTouchEnd={(e) => {
          e.preventDefault();
          onClose();
        }}>

          <div className="p-8 text-center max-w-xs">
            <motion.p
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: 'blur(10px)'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: 'blur(10px)'
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="text-2xl font-luxury italic leading-relaxed text-white">

              "Desde aquel 13 de enero, no hay un solo día en que no me hagas
              sonreír. Sos lo que siempre quise y no sabía cómo pedirlo. Gracias
              por elegirme cada segundo, Monita. 💗"
            </motion.p>

            <motion.div
            initial={{
              width: 0,
              opacity: 0
            }}
            animate={{
              width: 64,
              opacity: 1
            }}
            transition={{
              delay: 0.5,
              duration: 0.8
            }}
            className="h-px bg-amber-400/50 mx-auto mt-8" />


            <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 1.2
            }}
            className="text-xs text-white/30 mt-6">

              Toca para cerrar
            </motion.p>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}