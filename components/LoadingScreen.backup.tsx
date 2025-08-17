'use client';

// Original loading screen code preserved for later
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if device is mobile (width < 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();

    // Listen for window resize
    window.addEventListener('resize', checkMobile);

    // Skip animation for mobile
    if (isMobile) {
      onLoadingComplete();
      return;
    }

    // For desktop: Progress from 0 to 100 in 2.5s
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        onLoadingComplete();
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [onLoadingComplete, isMobile]);

  const planets = [
    { name: 'mercury', size: 8, color: '#FFA500', orbitRadius: 120, speed: 4, trail: '#FFA500' },
    { name: 'venus', size: 12, color: '#FFC649', orbitRadius: 160, speed: 3.2, trail: '#FFC649' },
    { name: 'earth', size: 14, color: '#6B93D6', orbitRadius: 200, speed: 2.8, trail: '#6B93D6' },
    { name: 'mars', size: 10, color: '#CD5C5C', orbitRadius: 240, speed: 2.4, trail: '#CD5C5C' },
    { name: 'jupiter', size: 28, color: '#D2691E', orbitRadius: 320, speed: 1.8, trail: '#D2691E' },
    { name: 'saturn', size: 24, color: '#FAD5A5', orbitRadius: 380, speed: 1.4, trail: '#FAD5A5' },
  ];

  // Don't render anything on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Rest of the component JSX */}
    </div>
  );
}
