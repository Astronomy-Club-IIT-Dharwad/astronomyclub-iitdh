import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          setTimeout(() => onLoadingComplete(), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const planets = [
    { name: 'mercury', size: 8, color: '#FFA500', orbitRadius: 120, speed: 4, trail: '#FFA500' },
    { name: 'venus', size: 12, color: '#FFC649', orbitRadius: 160, speed: 3.2, trail: '#FFC649' },
    { name: 'earth', size: 14, color: '#6B93D6', orbitRadius: 200, speed: 2.8, trail: '#6B93D6' },
    { name: 'mars', size: 10, color: '#CD5C5C', orbitRadius: 240, speed: 2.4, trail: '#CD5C5C' },
    { name: 'jupiter', size: 28, color: '#D2691E', orbitRadius: 320, speed: 1.8, trail: '#D2691E' },
    { name: 'saturn', size: 24, color: '#FAD5A5', orbitRadius: 380, speed: 1.4, trail: '#FAD5A5' },
  ];

  return (
    <div className={`fixed inset-0 z-50 bg-black overflow-hidden transition-opacity duration-1000 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      {/* Deep Space Background */}
      <div className="absolute inset-0">
        {/* Starfield */}
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 3}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Distant galaxies/nebulae */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20 bg-gradient-radial from-purple-400 to-transparent" />
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-15 bg-gradient-radial from-blue-400 to-transparent" />
        <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full opacity-10 bg-gradient-radial from-pink-400 to-transparent" />
      </div>

      {/* Solar System Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Central Sun/Logo */}
          <div className="relative z-10 flex items-center justify-center">
            <div 
              className="w-20 h-20 rounded-full bg-gradient-radial from-yellow-300 via-orange-400 to-red-500 shadow-2xl"
              style={{
                boxShadow: `
                  0 0 40px rgba(255, 215, 0, 0.8),
                  0 0 80px rgba(255, 140, 0, 0.6),
                  0 0 120px rgba(255, 69, 0, 0.4),
                  inset 0 0 20px rgba(255, 255, 0, 0.3)
                `,
                animation: 'sunPulse 3s ease-in-out infinite'
              }}
            />
            
            {/* Club Name */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 
                className="text-2xl md:text-3xl font-bold text-white text-center leading-tight"
                style={{
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 140, 0, 0.6)',
                  animation: 'textGlow 2s ease-in-out infinite alternate'
                }}
              >
                ASTRAL<br/>EXPLORERS
              </h1>
            </div>
          </div>

          {/* Orbital Paths */}
          {planets.map((planet, index) => (
            <div
              key={planet.name}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-full opacity-20"
              style={{
                width: `${planet.orbitRadius * 2}px`,
                height: `${planet.orbitRadius * 2}px`,
              }}
            />
          ))}

          {/* Planets with Trails */}
          {planets.map((planet, index) => (
            <div key={planet.name}>
              {/* Light Trail */}
              <div
                className="absolute top-1/2 left-1/2 origin-center"
                style={{
                  width: `${planet.orbitRadius * 2}px`,
                  height: `${planet.orbitRadius * 2}px`,
                  transform: 'translate(-50%, -50%)',
                  animation: `orbit ${30 / planet.speed}s linear infinite`
                }}
              >
                <div
                  className="absolute rounded-full opacity-30"
                  style={{
                    width: `${planet.size + 20}px`,
                    height: `${planet.size + 20}px`,
                    background: `radial-gradient(circle, ${planet.trail}40 0%, transparent 70%)`,
                    top: `${-planet.size / 2 - 10}px`,
                    left: `${planet.orbitRadius - planet.size / 2 - 10}px`,
                  }}
                />
              </div>

              {/* Planet */}
              <div
                className="absolute top-1/2 left-1/2 origin-center"
                style={{
                  width: `${planet.orbitRadius * 2}px`,
                  height: `${planet.orbitRadius * 2}px`,
                  transform: 'translate(-50%, -50%)',
                  animation: `orbit ${30 / planet.speed}s linear infinite`
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                    backgroundColor: planet.color,
                    top: `${-planet.size / 2}px`,
                    left: `${planet.orbitRadius - planet.size / 2}px`,
                    boxShadow: `
                      0 0 ${planet.size}px ${planet.color}40,
                      0 0 ${planet.size * 2}px ${planet.color}20,
                      inset -${planet.size / 4}px 0 ${planet.size / 2}px rgba(0,0,0,0.3)
                    `,
                    animation: `planetRotate ${10 + index * 2}s linear infinite`
                  }}
                />
                
                {/* Saturn's Rings */}
                {planet.name === 'saturn' && (
                  <div
                    className="absolute border-2 rounded-full opacity-70"
                    style={{
                      width: `${planet.size * 1.8}px`,
                      height: `${planet.size * 0.3}px`,
                      borderColor: planet.color,
                      top: `${-planet.size * 0.15}px`,
                      left: `${planet.orbitRadius - planet.size * 0.9}px`,
                      transform: 'rotateX(75deg)',
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="mb-4">
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-gray-300 text-sm font-light tracking-wider">
          INITIALIZING STELLAR NAVIGATION... {progress}%
        </p>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes planetRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sunPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 
              0 0 40px rgba(255, 215, 0, 0.8),
              0 0 80px rgba(255, 140, 0, 0.6),
              0 0 120px rgba(255, 69, 0, 0.4),
              inset 0 0 20px rgba(255, 255, 0, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 
              0 0 50px rgba(255, 215, 0, 1),
              0 0 100px rgba(255, 140, 0, 0.8),
              0 0 150px rgba(255, 69, 0, 0.6),
              inset 0 0 25px rgba(255, 255, 0, 0.4);
          }
        }

        @keyframes textGlow {
          0% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 140, 0, 0.6);
          }
          100% {
            text-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 140, 0, 0.8);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}