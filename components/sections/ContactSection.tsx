'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Rocket, Send, Satellite } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Show success message (you would handle this with your preferred notification system)
    alert('Message launched successfully! We\'ll respond within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Mission Control Email",
      details: "contact@astralexplorers.org",
      subtitle: "Primary communication channel"
    },
    {
      icon: Phone,
      title: "Observatory Hotline",
      details: "+1 (555) STARS-01",
      subtitle: "24/7 for urgent astronomical events"
    },
    {
      icon: MapPin,
      title: "Launch Coordinates",
      details: "Dark Sky Observatory, Sector 7",
      subtitle: "45°N 122°W - GPS coordinates available"
    },
    {
      icon: Clock,
      title: "Mission Hours",
      details: "Tue-Sun: 7:00 PM - 11:00 PM",
      subtitle: "Extended hours during special events"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
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
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-space-navy to-rich-purple/60" />
      
      {/* Mission Control Panel Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-aurora-green/5 via-transparent to-ethereal-cyan/5" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-aurora-green/20 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-ethereal-cyan/20 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating satellites */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Satellite className="h-6 w-6 text-aurora-green/30" />
          </motion.div>
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
              <span className="bg-gradient-to-r from-aurora-green via-stellar-gold to-ethereal-cyan bg-clip-text text-transparent">
                Mission Control
              </span>
            </h2>
            <p className="text-cosmic-white/80 text-lg lg:text-xl max-w-3xl mx-auto">
              Ready to join our cosmic journey? Send us a transmission and our 
              mission control team will guide you to the stars.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div variants={formVariants}>
              <Card className="glass-morphism backdrop-blur-lg border border-aurora-green/30 overflow-hidden">
                <CardContent className="p-0">
                  {/* Form Header */}
                  <div className="bg-aurora-green/10 border-b border-aurora-green/20 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-aurora-green/20 rounded-lg">
                        <Rocket className="h-6 w-6 text-aurora-green" />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-xl font-bold text-cosmic-white">
                          Launch Message
                        </h3>
                        <p className="text-aurora-green/80 text-sm">
                          Initiating communication protocol
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-cosmic-white text-sm font-orbitron font-medium">
                          Commander Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                          className="bg-white/5 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50 focus:border-aurora-green transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-cosmic-white text-sm font-orbitron font-medium">
                          Communication Frequency *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@domain.com"
                          required
                          className="bg-white/5 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50 focus:border-aurora-green transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-cosmic-white text-sm font-orbitron font-medium">
                        Mission Objective
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What brings you to our mission?"
                        className="bg-white/5 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50 focus:border-aurora-green transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-cosmic-white text-sm font-orbitron font-medium">
                        Transmission Content *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Share your message with our mission control team..."
                        rows={5}
                        required
                        className="bg-white/5 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50 focus:border-aurora-green transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-aurora-green hover:bg-aurora-green/90 text-space-navy font-orbitron font-bold py-3 transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="mr-2"
                          >
                            <Rocket className="h-5 w-5" />
                          </motion.div>
                          Launching Message...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Launch Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={infoVariants} className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="glass-morphism backdrop-blur-md border-white/10 hover:border-ethereal-cyan/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-ethereal-cyan/10 rounded-xl border border-ethereal-cyan/20 flex-shrink-0">
                          <info.icon className="h-6 w-6 text-ethereal-cyan" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-orbitron text-lg font-bold text-cosmic-white mb-1">
                            {info.title}
                          </h4>
                          <p className="text-ethereal-cyan font-medium mb-1">
                            {info.details}
                          </p>
                          <p className="text-cosmic-white/60 text-sm">
                            {info.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Mission Status */}
              <Card className="glass-morphism backdrop-blur-md border-stellar-gold/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-stellar-gold/10 rounded-full flex items-center justify-center border-2 border-stellar-gold/30 animate-pulse-glow">
                      <div className="w-3 h-3 bg-stellar-gold rounded-full animate-pulse" />
                    </div>
                    <h4 className="font-orbitron text-lg font-bold text-stellar-gold mb-2">
                      Mission Status: ACTIVE
                    </h4>
                    <p className="text-cosmic-white/70 text-sm">
                      All systems operational. Ready to receive transmissions from new explorers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time Info */}
              <div className="text-center p-6 glass-morphism backdrop-blur-sm rounded-xl border border-white/10">
                <p className="text-cosmic-white/80 text-sm leading-relaxed">
                  <strong className="text-aurora-green">Mission Control Response Time:</strong><br />
                  We typically respond to transmissions within <span className="text-stellar-gold font-bold">24 Earth hours</span>. 
                  For urgent astronomical events, use our observatory hotline.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}