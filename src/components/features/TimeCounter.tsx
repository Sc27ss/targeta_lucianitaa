import React, { useEffect, useState } from 'react';
import { useTimeDifference } from '../../hooks/useTimeDifference';
export function TimeCounter() {
  // January 13, 2026
  const startDate = new Date('2026-01-13T00:00:00');
  const { days, hours, minutes, seconds } = useTimeDifference(startDate);
  const TimeUnit = ({ value, label }: {value: number;label: string;}) => {
    const [prevValue, setPrevValue] = useState(value);
    const [animating, setAnimating] = useState(false);
    useEffect(() => {
      if (value !== prevValue) {
        setAnimating(true);
        const timer = setTimeout(() => setAnimating(false), 300);
        setPrevValue(value);
        return () => clearTimeout(timer);
      }
    }, [value, prevValue]);
    return (
      <div className="flex flex-col items-center mx-2">
        <div className="relative h-12 min-w-[3rem] flex items-center justify-center">
          <span
            className={`text-3xl font-bold font-mono text-white/90 drop-shadow-[0_0_6px_rgba(255,215,0,0.3)] transition-opacity duration-300 ${animating ? 'opacity-70' : 'opacity-100'}`}>

            {value.toString().padStart(2, '0')}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
          {label}
        </span>
      </div>);

  };
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center space-y-6">
      <h3 className="font-luxury italic text-lg text-white/90">
        Llevamos escribiendo nuestra historia...
      </h3>

      <div className="flex flex-wrap justify-center items-center">
        <TimeUnit value={days} label="Días" />
        <span className="text-2xl text-white/30 mb-4">:</span>
        <TimeUnit value={hours} label="Horas" />
        <span className="text-2xl text-white/30 mb-4">:</span>
        <TimeUnit value={minutes} label="Min" />
        <span className="text-2xl text-white/30 mb-4">:</span>
        <TimeUnit value={seconds} label="Seg" />
      </div>

      <p className="text-sm text-white/80 font-light leading-relaxed max-w-xs">
        Cada segundo desde el 13 de enero ha sido el mejor regalo de mi vida. 💗
      </p>
    </div>);

}