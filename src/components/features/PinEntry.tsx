import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockIcon, UnlockIcon, ChevronRightIcon } from 'lucide-react';
interface PinEntryProps {
  onSuccess: () => void;
}
export function PinEntry({ onSuccess }: PinEntryProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_PIN = '0411';
  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          // Success
          setTimeout(onSuccess, 300);
        } else {
          // Error
          setTimeout(() => {
            setError(true);
            setPin('');
          }, 300);
        }
      }
    }
  };
  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        scale: 1.5,
        filter: 'blur(20px)'
      }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

      <div className="mb-12 text-center">
        <motion.div
          initial={{
            y: -20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.5
          }}>

          <LockIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-luxury text-white mb-2">Tarjeta Malparidita</h2>
          <p className="text-gray-300 text-sm max-w-xs mx-auto">
            Nuestra amistad empezó un día de noviembre... ¿si sabe cual?
          </p>
        </motion.div>
      </div>

      {/* PIN Display */}
      <div className="flex gap-4 mb-12">
        {[0, 1, 2, 3].map((i) =>
        <motion.div
          key={i}
          className={`w-4 h-4 rounded-full border border-white/50 ${pin.length > i ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.8)]' : 'bg-transparent'} ${error ? 'border-red-500 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : ''}`}
          animate={
          error ?
          {
            x: [-5, 5, -5, 5, 0]
          } :
          {}
          }
          transition={{
            duration: 0.4
          }} />

        )}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) =>
        <button
          key={num}
          onClick={() => handleNumberClick(num.toString())}
          className="glass-button w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light text-white mx-auto focus:outline-none focus:ring-2 focus:ring-cyan-400/50">

            {num}
          </button>
        )}
        <div className="w-16 h-16" /> {/* Empty slot */}
        <button
          onClick={() => handleNumberClick('0')}
          className="glass-button w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light text-white mx-auto focus:outline-none focus:ring-2 focus:ring-cyan-400/50">

          0
        </button>
        <button
          onClick={handleDelete}
          className="w-16 h-16 flex items-center justify-center text-white/70 active:text-white transition-colors">

          <span className="text-sm font-medium">DEL</span>
        </button>
      </div>
    </motion.div>);

}