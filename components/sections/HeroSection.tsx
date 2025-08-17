'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, Variants, easeOut } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Telescope, Users, Calendar, LucideIcon } from 'lucide-react';
import MoonPhase from '@/components/MoonPhase';
import dynamic from 'next/dynamic';

// Dynamically import Three.js components
const CelestialObjects = dynamic(() => import('@/components/3d/CelestialObjects'), { ssr: false });

// Create motion components
const MotionButton = motion(Button);
const MotionIcon = ({
  icon: Icon,
  className,
  ...props
}: {
  icon: LucideIcon;
  className?: string;
  [key: string]: any;
}) => (
  <motion.div {...props}>
    <Icon className={className} />
  </motion.div>
);

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleText = "ASTRAL EXPLORERS";
  const subtitleText = "Journey Beyond the Stars";

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: 90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy via-rich-purple/50 to-space-navy">
        {/* Carina Nebula Effect */}
        <div className="absolute inset-0 bg-carina-nebula opacity-20 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurora-green/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ethereal-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Three.js Celestial Objects */}
      <div className="absolute inset-0">
        <CelestialObjects />
      </div>

      {/* Moon Phase Display */}
      <div className="fixed bottom-2 right-2 sm:absolute sm:top-24 sm:right-4 lg:top-28 lg:right-8 z-20 scale-75 sm:scale-100">
        <MoonPhase />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="font-orbitron font-black text-4xl sm:text-6xl lg:text-8xl xl:text-9xl mb-6"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #00FF7F 50%, #40E0D0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(255, 215, 0, 0.3)'
          }}
        >
          {titleText.split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ perspective: 1000 }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-ethereal-cyan text-xl lg:text-3xl font-light mb-8 tracking-wide"
        >
          {subtitleText}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-cosmic-white/80 text-lg lg:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Discover the wonders of the cosmos with fellow astronomy enthusiasts. 
          From stargazing sessions to astrophotography workshops, embark on an 
          extraordinary journey through the infinite universe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <MotionButton
            onClick={onExploreClick}
            size="lg"
            className="bg-stellar-gold hover:bg-stellar-gold/90 text-space-navy font-orbitron font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-stellar-gold/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Telescope className="mr-2 h-5 w-5" />
            Explore the Universe
          </MotionButton>
          
          <MotionButton
            variant="outline"
            size="lg"
            className="border-aurora-green text-aurora-green hover:bg-aurora-green hover:text-space-navy font-orbitron font-bold px-8 py-4 rounded-full text-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Club
          </MotionButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
        >
          {[
            { icon: Users, label: 'Members', value: '150+' },
            { icon: Telescope, label: 'Observations', value: '500+' },
            { icon: Calendar, label: 'Events/Year', value: '50+' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={statsVariants}
              custom={index}
              className="glass-morphism backdrop-blur-md rounded-xl p-4 text-center hover:bg-white/5 transition-all duration-300"
            >
              <MotionIcon 
                icon={stat.icon} 
                className="h-8 w-8 text-aurora-green mx-auto mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
              />
              <p className="text-2xl font-orbitron font-bold text-stellar-gold">
                {stat.value}
              </p>
              <p className="text-cosmic-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="flex flex-col items-center"
        >
          <p className="text-cosmic-white/60 text-sm mb-2 font-orbitron">
            Scroll to Explore
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-aurora-green"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cosmic-white rounded-full"
            style={{
              top: `${Math.random() * 50}%`,
              left: '-10px',
              boxShadow: '0 0 10px #fff, 2px 0 20px #fff'
            }}
            animate={{
              x: [0, window.innerWidth + 100],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 5,
              repeat: Infinity,
              repeatDelay: 15,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </section>
  );
}