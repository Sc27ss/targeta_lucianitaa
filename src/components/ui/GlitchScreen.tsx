import React from 'react';
import { motion } from 'framer-motion';
export function GlitchScreen() {
  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      <div className="relative">
        <motion.h1
          className="text-6xl font-bold text-white mb-4 font-tech tracking-tighter"
          animate={{
            x: [-2, 2, -2, 0],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 0.2,
            repeatType: 'mirror'
          }}>

          
        </motion.h1>
        <motion.div
          className="absolute inset-0 bg-red-500 mix-blend-screen opacity-50"
          animate={{
            x: [2, -2, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 0.1
          }} />

      </div>

      <p className="text-xl text-gray-300 max-w-md font-mono mt-8 leading-relaxed">
        Amor, mala mía... todavía no sé hacer pa' que quedara bien en todos los
        dispositivos jajajaa.
        <br />
        <br />
        <span className="text-pink-500 font-bold">
          Solo se puede ver en celular. 💗
        </span>
      </p>

      <div className="mt-12 text-xs text-gray-600 font-mono">
        ERROR_CODE: LOVE_OVERFLOW_EXCEPTION
      </div>
    </div>);

}