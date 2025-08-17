'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, easeOut, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, Filter } from 'lucide-react';

// Create motion components
const MotionButton = motion(Button);

const categories = ['All', 'Nebulae', 'Planets', 'Galaxies', 'Constellations'];

const images = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1200",
    title: "Andromeda Galaxy",
    category: "Galaxies",
    description: "The closest major galaxy to the Milky Way, captured with our 16-inch telescope."
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Orion Nebula",
    category: "Nebulae",
    description: "A stellar nursery located in the constellation Orion, showcasing active star formation."
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Solar Prominence",
    category: "Planets",
    description: "A spectacular solar prominence captured during our solar observation session."
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/39644/jupiter-storm-space-39644.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Jupiter's Great Red Spot",
    category: "Planets",
    description: "The famous storm on Jupiter, larger than Earth itself."
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Milky Way Core",
    category: "Galaxies",
    description: "The brilliant core of our home galaxy photographed from our dark-sky site."
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Big Dipper Constellation",
    category: "Constellations",
    description: "The iconic Big Dipper asterism in the constellation Ursa Major."
  }
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: easeOut
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy via-cosmic-black/80 to-space-navy" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-aurora-green/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="font-orbitron text-4xl lg:text-6xl font-bold mb-6">
              <span 
                className="bg-gradient-to-r from-nebula-pink via-aurora-green to-ethereal-cyan bg-clip-text text-transparent"
              >
                Celestial Gallery
              </span>
            </h2>
            <p className="text-cosmic-white/80 text-lg lg:text-xl max-w-3xl mx-auto">
              Explore our collection of stunning astrophotography captured by club members 
              using state-of-the-art telescopes and imaging equipment.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <MotionButton
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`font-orbitron font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-aurora-green text-space-navy hover:bg-aurora-green/90'
                    : 'border-aurora-green text-aurora-green hover:bg-aurora-green/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                <Filter className="mr-2 h-4 w-4" />
                {category}
              </MotionButton>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-xl glass-morphism backdrop-blur-sm border border-white/10 hover:border-aurora-green/30 transition-all duration-300">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-space-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-orbitron text-lg font-bold text-cosmic-white mb-1">
                          {image.title}
                        </h3>
                        <p className="text-aurora-green text-sm font-medium">
                          {image.category}
                        </p>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <ZoomIn className="h-6 w-6 text-cosmic-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cosmic-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] glass-morphism backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] object-cover"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-orbitron text-2xl font-bold text-cosmic-white mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-aurora-green font-medium">
                      {selectedImage.category}
                    </p>
                  </div>
                  <MotionButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                    className="text-cosmic-white hover:text-aurora-green"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                  >
                    <X className="h-6 w-6" />
                  </MotionButton>
                </div>
                <p className="text-cosmic-white/80 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}