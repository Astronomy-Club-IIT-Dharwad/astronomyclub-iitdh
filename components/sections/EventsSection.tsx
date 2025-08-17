'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, easeOut, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Rocket, Star, Camera, BookOpen } from 'lucide-react';

// Create motion components
const MotionButton = motion(Button);

const events = [
  {
    id: 1,
    title: "Perseid Meteor Shower Viewing",
    date: "August 12, 2024",
    time: "11:00 PM - 3:00 AM",
    location: "Dark Sky Observatory",
    attendees: 45,
    maxAttendees: 60,
    type: "Observation",
    icon: Star,
    description: "Join us for the peak of the Perseid meteor shower. We'll provide blankets, hot chocolate, and expert guidance.",
    features: ["Professional telescopes", "Meteor identification guide", "Hot refreshments", "Photography tips"],
    status: "upcoming"
  },
  {
    id: 2,
    title: "Astrophotography Workshop",
    date: "August 20, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "Club Observatory",
    attendees: 18,
    maxAttendees: 20,
    type: "Workshop",
    icon: Camera,
    description: "Learn advanced astrophotography techniques, including long exposure methods and post-processing workflows.",
    features: ["Hands-on camera training", "Post-processing software", "Take home your photos", "Expert instruction"],
    status: "filling-fast"
  },
  {
    id: 3,
    title: "Mars Opposition Celebration",
    date: "September 15, 2024",
    time: "8:00 PM - 12:00 AM",
    location: "Main Observatory Dome",
    attendees: 32,
    maxAttendees: 40,
    type: "Special Event",
    icon: Rocket,
    description: "Mars reaches opposition - the perfect time for detailed observation of the Red Planet's surface features.",
    features: ["16-inch telescope viewing", "Mars surface maps", "Mission updates from NASA", "Planetary science talk"],
    status: "upcoming"
  },
  {
    id: 4,
    title: "Introduction to Astronomy",
    date: "September 28, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Education Center",
    attendees: 12,
    maxAttendees: 25,
    type: "Beginner Course",
    icon: BookOpen,
    description: "Perfect for newcomers! Learn constellation identification, telescope basics, and celestial navigation.",
    features: ["Beginner-friendly content", "Star chart included", "Telescope demonstration", "Q&A session"],
    status: "open"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming': return 'text-aurora-green border-aurora-green/30';
    case 'filling-fast': return 'text-stellar-gold border-stellar-gold/30';
    case 'open': return 'text-ethereal-cyan border-ethereal-cyan/30';
    default: return 'text-cosmic-white border-white/30';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'upcoming': return 'Upcoming Event';
    case 'filling-fast': return 'Filling Fast';
    case 'open': return 'Open Registration';
    default: return 'Event';
  }
};

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  // Countdown Timer Component
  const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="flex space-x-4 text-center">
        <div className="flex flex-col">
          <span className="text-2xl font-orbitron font-bold text-stellar-gold">{timeLeft.days}</span>
          <span className="text-xs text-cosmic-white/60">Days</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-orbitron font-bold text-aurora-green">{timeLeft.hours}</span>
          <span className="text-xs text-cosmic-white/60">Hours</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-orbitron font-bold text-ethereal-cyan">{timeLeft.minutes}</span>
          <span className="text-xs text-cosmic-white/60">Minutes</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy via-rich-purple/40 to-cosmic-black" />
      
      {/* Animated star map background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 800}
              cy={Math.random() * 600}
              r={Math.random() * 2 + 0.5}
              fill="#FFFFFF"
              animate={{
                opacity: [0.3, 1, 0.3],
                r: [0.5, 2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </svg>
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
              <span className="bg-gradient-to-r from-stellar-gold via-nebula-pink to-ethereal-cyan bg-clip-text text-transparent">
                Upcoming Missions
              </span>
            </h2>
            <p className="text-cosmic-white/80 text-lg lg:text-xl max-w-3xl mx-auto">
              Join us for extraordinary celestial events, educational workshops, and 
              unforgettable stargazing experiences throughout the year.
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="glass-morphism backdrop-blur-lg border-white/10 hover:border-aurora-green/30 transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Event Info */}
                      <div className="lg:col-span-2 p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-aurora-green/10 rounded-xl border border-aurora-green/20">
                              <event.icon className="h-8 w-8 text-aurora-green" />
                            </div>
                            <div>
                              <h3 className="font-orbitron text-2xl font-bold text-cosmic-white mb-2">
                                {event.title}
                              </h3>
                              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                                {getStatusText(event.status)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-cosmic-white/80 text-lg leading-relaxed mb-6">
                          {event.description}
                        </p>

                        {/* Event Details */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center space-x-3 text-cosmic-white/70">
                            <Calendar className="h-5 w-5 text-aurora-green flex-shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-cosmic-white/70">
                            <Clock className="h-5 w-5 text-ethereal-cyan flex-shrink-0" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-cosmic-white/70">
                            <MapPin className="h-5 w-5 text-stellar-gold flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-cosmic-white/70">
                            <Users className="h-5 w-5 text-nebula-pink flex-shrink-0" />
                            <span>{event.attendees}/{event.maxAttendees} registered</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-orbitron font-bold text-cosmic-white mb-3">What's Included:</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {event.features.map((feature, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-aurora-green rounded-full" />
                                <span className="text-cosmic-white/80 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                          <MotionButton 
                            className="bg-aurora-green hover:bg-aurora-green/90 text-space-navy font-orbitron font-bold transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, ease: easeOut }}
                          >
                            <Rocket className="mr-2 h-4 w-4" />
                            Register Now
                          </MotionButton>
                          <MotionButton 
                            variant="outline" 
                            className="border-ethereal-cyan text-ethereal-cyan hover:bg-ethereal-cyan/10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, ease: easeOut }}
                          >
                            Learn More
                          </MotionButton>
                        </div>
                      </div>

                      {/* Countdown & Progress */}
                      <div className="lg:border-l border-white/10 p-8 bg-white/5">
                        <div className="text-center mb-8">
                          <h4 className="font-orbitron font-bold text-cosmic-white mb-4">Time Until Launch</h4>
                          <CountdownTimer targetDate={event.date} />
                        </div>

                        {/* Registration Progress */}
                        <div className="mb-8">
                          <div className="flex justify-between text-sm text-cosmic-white/70 mb-2">
                            <span>Registration</span>
                            <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-aurora-green to-ethereal-cyan rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                              transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Mission Patch */}
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-aurora-green/20 to-ethereal-cyan/20 rounded-full flex items-center justify-center border-2 border-aurora-green/30">
                            <event.icon className="h-10 w-10 text-aurora-green" />
                          </div>
                          <p className="text-cosmic-white/60 text-sm font-orbitron">
                            Mission Patch #{event.id.toString().padStart(3, '0')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-cosmic-white/80 text-lg mb-6">
              Don't miss out on our upcoming celestial adventures
            </p>
            <MotionButton 
              size="lg"
              className="bg-stellar-gold hover:bg-stellar-gold/90 text-space-navy font-orbitron font-bold px-8 py-4 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              View Full Calendar
            </MotionButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}