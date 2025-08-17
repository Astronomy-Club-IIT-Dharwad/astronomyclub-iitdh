'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, easeOut, Transition } from 'framer-motion';
import { Menu, X, Telescope, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'team', label: 'Team' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' }
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const mobileMenuVariants: Variants = {
    hidden: {
      x: '100%',
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-morphism backdrop-blur-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Telescope className="h-8 w-8 text-stellar-gold" />
                <div className="absolute inset-0 h-8 w-8 text-stellar-gold animate-pulse-glow" />
              </div>
              <span className="font-orbitron font-bold text-xl text-cosmic-white">
                Astral Explorers
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <MotionButton
                    variant="ghost"
                    onClick={() => onSectionChange(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-aurora-green ${
                      activeSection === item.id
                        ? 'text-aurora-green'
                        : 'text-cosmic-white/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-aurora-green"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <div className="absolute inset-0 rounded-lg bg-aurora-green/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </MotionButton>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <MotionButton
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-cosmic-white hover:text-aurora-green transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </MotionButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-cosmic-black/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] glass-morphism backdrop-blur-xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <Telescope className="h-6 w-6 text-stellar-gold" />
                    <span className="font-orbitron font-bold text-lg text-cosmic-white">
                      Menu
                    </span>
                  </div>
                  <MotionButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-cosmic-white hover:text-aurora-green"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                  >
                    <X className="h-5 w-5" />
                  </MotionButton>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    >
                      <MotionButton
                        variant="ghost"
                        onClick={() => {
                          onSectionChange(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full justify-start px-6 py-4 text-left text-lg font-medium transition-all duration-300 ${
                          activeSection === item.id
                            ? 'text-aurora-green bg-aurora-green/10'
                            : 'text-cosmic-white/80 hover:text-aurora-green hover:bg-aurora-green/5'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                      >
                        {item.label}
                      </MotionButton>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                  <p className="text-cosmic-white/60 text-sm text-center">
                    Exploring the Infinite Universe
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}