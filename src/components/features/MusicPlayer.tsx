import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, MusicIcon } from 'lucide-react';
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/cancion-no-miente/audio.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log('Audio play failed', e));
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: 1
      }}
      className="fixed top-4 right-4 z-30 glass-panel rounded-full px-4 py-2 flex items-center gap-3">

      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full glass-button flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors">

        {isPlaying ?
        <PauseIcon size={14} fill="currentColor" /> :

        <PlayIcon size={14} fill="currentColor" className="ml-0.5" />
        }
      </button>

      <div className="flex flex-col">
        <span className="text-xs font-medium text-white/90">No Miente</span>
        <span className="text-[10px] text-white/50">Blessd</span>
      </div>

      <div className="flex items-end gap-0.5 h-3 ml-1">
        {[1, 2, 3].map((bar) =>
        <motion.div
          key={bar}
          className="w-0.5 bg-cyan-400 rounded-full"
          animate={
          isPlaying ?
          {
            height: [4, 12, 4]
          } :
          {
            height: 4
          }
          }
          transition={{
            duration: 0.5 + bar * 0.1,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />

        )}
      </div>
    </motion.div>);

}