'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Linkedin, Award } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Club President & Astrophysicist",
    image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "With over 15 years in astrophysics research, Dr. Chen specializes in exoplanet detection and has discovered 12 confirmed exoplanets.",
    achievements: ["PhD in Astrophysics from MIT", "Published 45+ research papers", "TED Talk speaker"],
    email: "sarah.chen@astralexplorers.org",
    linkedin: "linkedin.com/in/sarahchen-astro"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Vice President & Observatory Director",
    image: "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Amateur astronomer turned professional, Marcus oversees our observatory operations and leads our equipment maintenance programs.",
    achievements: ["20+ years observing experience", "Certified telescope technician", "Astrophotography award winner"],
    email: "marcus.r@astralexplorers.org",
    linkedin: "linkedin.com/in/marcusrodriguez"
  },
  {
    id: 3,
    name: "Elena Vasquez",
    role: "Education Coordinator",
    image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Former planetarium director with a passion for science education. Elena develops our outreach programs for schools and communities.",
    achievements: ["M.Ed in Science Education", "NASA Solar System Ambassador", "15+ educational programs created"],
    email: "elena.v@astralexplorers.org",
    linkedin: "linkedin.com/in/elenavasquez-edu"
  },
  {
    id: 4,
    name: "James Thompson",
    role: "Astrophotography Lead",
    image: "https://images.pexels.com/photos/3785080/pexels-photo-3785080.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Professional photographer specializing in astronomical imaging. James teaches advanced astrophotography techniques and post-processing.",
    achievements: ["Winner of 3 international astrophoto competitions", "Featured in Astronomy Magazine", "10+ years teaching experience"],
    email: "james.t@astralexplorers.org",
    linkedin: "linkedin.com/in/jamesthompson-photo"
  }
];

export default function TeamSection() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rich-purple/20 via-space-navy to-cosmic-black/80" />
      
      {/* Constellation Pattern */}
      <div className="absolute inset-0">
        {/* Connection lines between team members */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF7F" />
              <stop offset="100%" stopColor="#40E0D0" />
            </linearGradient>
          </defs>
          <path
            d="M200,200 L600,150 L1000,200 L800,400 L400,450 L200,200"
            stroke="url(#constellationGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>
        
        {/* Floating constellation stars */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-stellar-gold rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
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
              <span className="bg-gradient-to-r from-stellar-gold via-aurora-green to-ethereal-cyan bg-clip-text text-transparent">
                Our Stellar Team
              </span>
            </h2>
            <p className="text-cosmic-white/80 text-lg lg:text-xl max-w-3xl mx-auto">
              Meet the passionate astronomers, educators, and researchers who guide our 
              mission to explore and share the wonders of the universe.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                custom={index}
                className="group perspective-1000"
              >
                <div 
                  className="relative h-96 preserve-3d cursor-pointer transition-transform duration-700 hover:rotate-y-180"
                  onMouseEnter={() => setFlippedCard(member.id)}
                  onMouseLeave={() => setFlippedCard(null)}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCard === member.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card */}
                  <Card className="absolute inset-0 backface-hidden glass-morphism backdrop-blur-lg border-white/10 hover:border-aurora-green/30 transition-colors duration-300">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative flex-1">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-navy/80 via-transparent to-transparent rounded-t-lg" />
                      </div>
                      
                      <div className="p-6 text-center">
                        <h3 className="font-orbitron text-lg font-bold text-cosmic-white mb-2">
                          {member.name}
                        </h3>
                        <p className="text-aurora-green text-sm font-medium mb-4">
                          {member.role}
                        </p>
                        <p className="text-cosmic-white/70 text-sm">
                          Hover to see details
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Back of card */}
                  <Card 
                    className="absolute inset-0 rotate-y-180 backface-hidden glass-morphism backdrop-blur-lg border-aurora-green/30"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-orbitron text-lg font-bold text-stellar-gold mb-2">
                          {member.name}
                        </h3>
                        <p className="text-aurora-green text-sm font-medium mb-4">
                          {member.role}
                        </p>
                        <p className="text-cosmic-white/80 text-sm leading-relaxed mb-4">
                          {member.bio}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="text-ethereal-cyan text-xs font-semibold mb-2 flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            Achievements
                          </h4>
                          <ul className="text-cosmic-white/70 text-xs space-y-1">
                            {member.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-1 h-1 bg-aurora-green rounded-full mt-2 mr-2 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4 pt-4 border-t border-white/10">
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-cosmic-white/60 hover:text-aurora-green transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <a 
                          href={`https://${member.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cosmic-white/60 hover:text-ethereal-cyan transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-cosmic-white/80 text-lg mb-6">
              Interested in joining our leadership team?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-aurora-green text-space-navy font-orbitron font-bold rounded-full transition-all duration-300 hover:bg-aurora-green/90 hover:shadow-lg hover:shadow-aurora-green/25"
            >
              Get Involved
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}