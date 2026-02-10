import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { SecretLayer } from './SecretLayer';
import { TimeCounter } from './TimeCounter';
import { MusicPlayer } from './MusicPlayer';
const FULL_MESSAGE = [
'Mi amor, quiero que sepas que eres lo más bonito que me ha pasado en la vida.',
'Cada momento contigo es mágico, tus ojos iluminan hasta mis días más oscuros. 🌹',
'Eres mi paz, mi felicidad, mi todo. No cambiaría ni un segundo de lo que hemos vivido juntos.',
'Gracias por ser tú, por quererme como lo haces, por hacerme sentir el hombre más afortunado. 💗',
'Prometo seguir cuidándote, haciéndote reír, y amándote cada día más fuerte.',
'Este 14 de febrero es especial porque lo celebro contigo, my monita. 🌸',
'Con todo mi amor, para siempre tuyo 💕',
'Feliz San Valentín, mi vida'].
join('\n\n');
export function NarrativeStage() {
  const [step, setStep] = useState<'sphere' | 'content'>('sphere');
  const [showSecret, setShowSecret] = useState(false);
  // Typing state
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Mystery Button state
  const [showMysteryButton, setShowMysteryButton] = useState(false);
  const handleSphereClick = () => {
    if (navigator.vibrate) navigator.vibrate(200);
    setStep('content');
  };
  // Start typing when entering content step
  useEffect(() => {
    if (step === 'content') {
      // Wait for title to appear first (title has 0.5s delay + 1s duration)
      const startDelay = setTimeout(() => {
        let currentIndex = 0;
        typingIntervalRef.current = setInterval(() => {
          if (currentIndex < FULL_MESSAGE.length) {
            setDisplayedText(FULL_MESSAGE.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            setIsTypingComplete(true);
            setTimeout(() => setShowMysteryButton(true), 2000);
            if (typingIntervalRef.current)
            clearInterval(typingIntervalRef.current);
          }
        }, 30);
      }, 1800); // Wait for title animation to finish
      return () => {
        clearTimeout(startDelay);
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      };
    }
  }, [step]);
  return (
    <div className="relative z-10 w-full h-full flex flex-col">
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {step === 'sphere' ?
        <motion.div
          key="sphere"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0,
            scale: 1.5,
            filter: 'blur(10px)'
          }}
          transition={{
            duration: 0.8
          }}
          className="flex-1 flex flex-col items-center justify-center p-6 cursor-pointer"
          onClick={handleSphereClick}>

            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 animate-pulse-glow flex items-center justify-center">
                <HeartIcon
                className="w-16 h-16 text-white animate-pulse"
                fill="currentColor" />

              </div>
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
              <p className="absolute -bottom-16 w-64 left-1/2 -translate-x-1/2 text-center text-cyan-200 text-lg font-luxury italic animate-pulse">
                Presiona para ver cómo florece nuestro amor
              </p>
            </div>
          </motion.div> :

        <motion.div
          key="content"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 1
          }}
          className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-20 pb-12 scrollbar-hide">

            <div className="max-w-sm mx-auto flex flex-col items-center space-y-8 pb-32">
              {/* Title */}
              <motion.h2
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.5,
                duration: 1
              }}
              className="text-3xl font-luxury text-white text-center">

                Para mi{' '}
                <span className="underline decoration-violet-500 decoration-2 underline-offset-4">
                  monita hermosa
                </span>
              </motion.h2>

              {/* Typing Message */}
              <div className="w-full text-left space-y-4 font-luxury text-lg text-white/90 leading-relaxed min-h-[300px]">
                {displayedText.split('\n\n').map((paragraph, index) =>
              <p key={index} className="mb-4">
                    {paragraph}
                    {/* Show cursor only on the last paragraph being typed */}
                    {index === displayedText.split('\n\n').length - 1 &&
                !isTypingComplete &&
                <span className="inline-block w-0.5 h-5 ml-1 bg-cyan-400 animate-pulse align-middle" />
                }
                  </p>
              )}
              </div>

              {/* Counter Section - Appears after typing */}
              {isTypingComplete &&
            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 1,
                ease: 'easeOut'
              }}
              className="w-full pt-8 flex flex-col items-center gap-12">

                  <TimeCounter />

                  {/* Mystery Button */}
                  {showMysteryButton &&
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 1,
                  delay: 0.5
                }}
                className="flex flex-col items-center gap-3">

                      <button
                  className="w-16 h-16 rounded-full glass-panel flex items-center justify-center animate-pulse-glow active:scale-95 transition-transform"
                  onClick={() => setShowSecret(true)}>

                        <span className="text-2xl">✨</span>
                      </button>
                      <p className="text-xs text-white/40 font-luxury italic animate-pulse">
                        Toca para ver mi secreto...
                      </p>
                    </motion.div>
              }
                </motion.div>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <SecretLayer
        isVisible={showSecret}
        onClose={() => setShowSecret(false)} />

    </div>);

}