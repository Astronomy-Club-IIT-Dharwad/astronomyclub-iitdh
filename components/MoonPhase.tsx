'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MoonPhaseProps {
  className?: string;
}

export default function MoonPhase({ className = '' }: MoonPhaseProps) {
  const [moonPhase, setMoonPhase] = useState({ phase: 0, name: 'New Moon' });

  useEffect(() => {
    const calculateMoonPhase = () => {
      const now = new Date();
      const knownNewMoon = new Date('2024-01-11T11:57:00Z'); // Known new moon date
      const lunarCycle = 29.53058867; // Average lunar cycle in days
      
      const timeDiff = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
      const phase = (timeDiff % lunarCycle) / lunarCycle;
      
      let phaseName = '';
      if (phase < 0.0625 || phase > 0.9375) phaseName = 'New Moon';
      else if (phase < 0.1875) phaseName = 'Waxing Crescent';
      else if (phase < 0.3125) phaseName = 'First Quarter';
      else if (phase < 0.4375) phaseName = 'Waxing Gibbous';
      else if (phase < 0.5625) phaseName = 'Full Moon';
      else if (phase < 0.6875) phaseName = 'Waning Gibbous';
      else if (phase < 0.8125) phaseName = 'Third Quarter';
      else phaseName = 'Waning Crescent';
      
      return { phase, name: phaseName };
    };

    setMoonPhase(calculateMoonPhase());
    
    // Update every hour
    const interval = setInterval(() => {
      setMoonPhase(calculateMoonPhase());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const getMoonVisual = (phase: number) => {
    const angle = phase * 360;
    const illumination = Math.abs(Math.cos((angle * Math.PI) / 180));
    
    return (
      <div className="relative w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2">
        {/* Moon base */}
        <div className="absolute inset-0 rounded-full bg-cosmic-white/20 border border-cosmic-white/30" />
        
        {/* Illuminated portion */}
        <div
          className="absolute inset-0 rounded-full bg-cosmic-white"
          style={{
            clipPath: phase < 0.5 
              ? `polygon(50% 0%, ${50 + illumination * 50}% 0%, ${50 + illumination * 50}% 100%, 50% 100%)`
              : `polygon(50% 0%, ${50 - illumination * 50}% 0%, ${50 - illumination * 50}% 100%, 50% 100%)`
          }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-cosmic-white/30 blur-sm animate-pulse" />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className={`glass-morphism backdrop-blur-md rounded-xl p-4 text-center ${className}`}
    >
      {getMoonVisual(moonPhase.phase)}
      <p className="text-cosmic-white font-orbitron text-xs font-medium">
        {moonPhase.name}
      </p>
      <p className="text-cosmic-white/60 text-xs mt-1">
        {new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })}
      </p>
    </motion.div>
  );
}