'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import GallerySection from '@/components/sections/GallerySection';
import TeamSection from '@/components/sections/TeamSection';
import EventsSection from '@/components/sections/EventsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'gallery', 'team', 'events', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    scrollToSection('about');
  };

  return (
    <div className="min-h-screen bg-space-navy text-cosmic-white">

      {!isLoading && (
        <>
          <Navigation 
            activeSection={activeSection} 
            onSectionChange={scrollToSection}
          />
          
          <main>
            <section id="home">
              <HeroSection onExploreClick={handleExploreClick} />
            </section>

            <section id="about">
              <AboutSection />
            </section>

            <section id="gallery">
              <GallerySection />
            </section>

            <section id="team">
              <TeamSection />
            </section>

            <section id="events">
              <EventsSection />
            </section>

            <section id="contact">
              <ContactSection />
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-cosmic-black border-t border-white/10">
            <div className="container mx-auto px-4 lg:px-8 py-12">
              <div className="text-center">
                <p className="text-cosmic-white/60 font-orbitron">
                  © 2024 Astral Explorers. Exploring the infinite universe together.
                </p>
                <div className="flex justify-center space-x-8 mt-4">
                  <a href="#" className="text-cosmic-white/60 hover:text-aurora-green transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-cosmic-white/60 hover:text-aurora-green transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="text-cosmic-white/60 hover:text-aurora-green transition-colors">
                    Accessibility
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}