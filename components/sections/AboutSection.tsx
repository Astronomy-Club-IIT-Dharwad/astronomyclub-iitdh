'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, easeOut, Variants } from 'framer-motion';
import { Telescope, Users, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    {
      icon: Telescope,
      title: "Expert Guidance",
      description: "Learn from experienced astronomers and astrophotographers with decades of combined expertise in celestial observation."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a passionate community of stargazers, from beginners to advanced observers, all united by curiosity about the cosmos."
    },
    {
      icon: Award,
      title: "Premium Equipment",
      description: "Access to high-quality telescopes, cameras, and observation equipment for the best possible viewing experience."
    },
    {
      icon: Target,
      title: "Diverse Programs",
      description: "From weekly stargazing sessions to astrophotography workshops and educational seminars on cutting-edge discoveries."
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
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
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-space-navy via-rich-purple/30 to-space-navy" />
        <motion.div 
          style={{ y }}
          className="absolute top-1/4 -right-1/4 w-96 h-96 bg-aurora-green/5 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 -left-1/4 w-80 h-80 bg-ethereal-cyan/5 rounded-full blur-3xl"
        />
      </div>

      {/* Stardust Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cosmic-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-24">
            <motion.h2 
              className="font-orbitron text-4xl lg:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #00FF7F 0%, #40E0D0 50%, #FFD700 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              About Our Mission
            </motion.h2>
            <motion.p 
              className="text-cosmic-white/80 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Founded in 2018, Astral Explorers has become the premier astronomy club 
              dedicated to fostering curiosity about the universe and providing unforgettable 
              celestial experiences for enthusiasts of all skill levels.
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="font-orbitron text-2xl lg:text-3xl font-bold text-stellar-gold mb-4">
                  Discover the Cosmos Together
                </h3>
                <p className="text-cosmic-white/80 text-lg leading-relaxed mb-6">
                  Our club brings together passionate individuals who share a fascination 
                  with the night sky. Whether you're a complete beginner curious about 
                  constellations or an experienced observer seeking to deepen your knowledge, 
                  we provide the perfect environment for exploration and learning.
                </p>
                <p className="text-cosmic-white/80 text-lg leading-relaxed">
                  From our state-of-the-art observatory to our extensive collection of 
                  telescopes and imaging equipment, we offer resources that make the 
                  wonders of space accessible to everyone.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="font-orbitron text-3xl font-bold text-aurora-green">150+</p>
                  <p className="text-cosmic-white/70 text-sm">Active Members</p>
                </div>
                <div className="text-center">
                  <p className="font-orbitron text-3xl font-bold text-ethereal-cyan">6</p>
                  <p className="text-cosmic-white/70 text-sm">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="font-orbitron text-3xl font-bold text-stellar-gold">500+</p>
                  <p className="text-cosmic-white/70 text-sm">Observations</p>
                </div>
                <div className="text-center">
                  <p className="font-orbitron text-3xl font-bold text-nebula-pink">50+</p>
                  <p className="text-cosmic-white/70 text-sm">Events Yearly</p>
                </div>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10 glass-morphism backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <Telescope className="h-16 w-16 text-stellar-gold mx-auto mb-4 animate-float" />
                  <h4 className="font-orbitron text-xl font-bold text-cosmic-white">
                    Our Observatory
                  </h4>
                </div>
                <p className="text-cosmic-white/80 text-center leading-relaxed">
                  Located in a dark-sky preserve just 30 minutes from the city, 
                  our observatory features advanced equipment including a 16-inch 
                  Cassegrain telescope and professional-grade astrophotography setup.
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-aurora-green/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-ethereal-cyan/20 rounded-full blur-xl" />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 text-aurora-green mx-auto mb-4" />
                    <h4 className="font-orbitron text-lg font-bold text-cosmic-white mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-cosmic-white/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}