import React, { useEffect, useState } from 'react';
import beeLogo from '@/assets/bee-logo.png';

const IntroVideo = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        onComplete();
      }
    }, currentStep === 0 ? 1500 : currentStep === 1 ? 2000 : currentStep === 2 ? 2000 : 1500);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gradient-nature flex items-center justify-center transition-opacity duration-1000 ${
        currentStep >= 3 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Bee flying animation */}
        {currentStep >= 0 && (
          <div 
            className={`mb-8 transition-all duration-1500 ${
              currentStep >= 1 
                ? 'transform translate-x-0 translate-y-0 scale-100 rotate-0' 
                : 'transform translate-x-24 -translate-y-5 scale-75 rotate-12'
            }`}
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
            }}
          >
            <img 
              src={beeLogo} 
              alt="Bumblebee" 
              className="w-32 h-32 mx-auto animate-bounce-gentle"
            />
          </div>
        )}

        {/* Flowers appearing */}
        {currentStep >= 1 && (
          <div 
            className={`absolute inset-0 pointer-events-none transition-all duration-800 delay-500 ${
              currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl animate-float"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {['🌻', '🌸', '🌺', '🌼', '🌷', '🌹'][i]}
              </div>
            ))}
          </div>
        )}

        {/* Tagline appearing */}
        {currentStep >= 2 && (
          <div 
            className={`text-center transition-all duration-1000 ${
              currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-baloo font-bold text-primary mb-4">
              Welcome to Bumblebee Preschool
            </h1>
            <p className="text-xl md:text-2xl font-comic text-foreground">
              where little minds blossom!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroVideo;