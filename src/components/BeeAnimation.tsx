import React, { useEffect, useState, useRef, useCallback } from 'react';
import beeLogo from '@/assets/bee-logo.png';

interface Bee {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  speed: number;
  isLanded: boolean;
  landingTarget: string | null;
  lastMoveTime: number;
}

interface BeeAnimationProps {
  soundEnabled?: boolean;
}

const BeeAnimation: React.FC<BeeAnimationProps> = ({ soundEnabled = false }) => {
  const [bees, setBees] = useState<Bee[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const buzzSoundRef = useRef<AudioBuffer | null>(null);

  // Initialize audio context and buzz sound
  useEffect(() => {
    if (soundEnabled) {
      const initializeAudio = async () => {
        try {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          
          // Create a simple buzz sound using Web Audio API
          const sampleRate = audioContextRef.current.sampleRate;
          const duration = 0.3;
          const frameCount = sampleRate * duration;
          const buffer = audioContextRef.current.createBuffer(1, frameCount, sampleRate);
          const data = buffer.getChannelData(0);
          
          for (let i = 0; i < frameCount; i++) {
            // Create a buzzing sound with multiple frequencies
            const t = i / sampleRate;
            data[i] = Math.sin(2 * Math.PI * 200 * t) * 0.1 * Math.exp(-t * 3) +
                     Math.sin(2 * Math.PI * 400 * t) * 0.05 * Math.exp(-t * 2);
          }
          
          buzzSoundRef.current = buffer;
        } catch (error) {
          console.warn('Audio initialization failed:', error);
        }
      };
      
      initializeAudio();
    }
  }, [soundEnabled]);

  // Play buzz sound
  const playBuzzSound = useCallback(() => {
    if (soundEnabled && audioContextRef.current && buzzSoundRef.current) {
      try {
        const source = audioContextRef.current.createBufferSource();
        const gainNode = audioContextRef.current.createGain();
        
        source.buffer = buzzSoundRef.current;
        gainNode.gain.value = 0.1; // Low volume
        
        source.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        source.start();
      } catch (error) {
        console.warn('Sound play failed:', error);
      }
    }
  }, [soundEnabled]);

  // Initialize bees
  useEffect(() => {
    const initialBees: Bee[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      rotation: 0,
      speed: 0.5 + Math.random() * 0.5,
      isLanded: false,
      landingTarget: null,
      lastMoveTime: Date.now(),
    }));
    
    setBees(initialBees);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Get landing targets (flowers and letters)
  const getLandingTargets = useCallback(() => {
    const targets: { element: Element; rect: DOMRect }[] = [];
    
    // Find flower emojis and text elements
    const flowers = document.querySelectorAll('[class*=\\\"animate-float\\\"]');
    const textElements = document.querySelectorAll('h1, h2, h3, .font-baloo');
    
    [...flowers, ...textElements].forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targets.push({ element: el, rect });
      }
    });
    
    return targets;
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setBees(prevBees => {
        const now = Date.now();
        const targets = getLandingTargets();
        
        return prevBees.map(bee => {
          const newBee = { ...bee };
          const timeSinceMove = now - bee.lastMoveTime;
          
          // Check if bee should react to mouse
          const distanceToMouse = Math.sqrt(
            Math.pow(bee.x - mousePos.x, 2) + Math.pow(bee.y - mousePos.y, 2)
          );
          
          if (distanceToMouse < 100 && !bee.isLanded) {
            // Buzz away from mouse
            const angle = Math.atan2(bee.y - mousePos.y, bee.x - mousePos.x);
            newBee.targetX = bee.x + Math.cos(angle) * 200;
            newBee.targetY = bee.y + Math.sin(angle) * 200;
            newBee.speed = 2; // Faster when escaping
            
            // Play buzz sound
            if (timeSinceMove > 500) { // Debounce sound
              playBuzzSound();
              newBee.lastMoveTime = now;
            }
          } else if (!bee.isLanded) {
            // Normal flying behavior
            const distanceToTarget = Math.sqrt(
              Math.pow(bee.x - bee.targetX, 2) + Math.pow(bee.y - bee.targetY, 2)
            );
            
            if (distanceToTarget < 50 || timeSinceMove > 3000) {
              // Choose new target - maybe land on something
              if (targets.length > 0 && Math.random() < 0.3) {
                // Land on a target
                const target = targets[Math.floor(Math.random() * targets.length)];
                newBee.targetX = target.rect.left + target.rect.width / 2;
                newBee.targetY = target.rect.top + target.rect.height / 2;
                newBee.isLanded = true;
                newBee.landingTarget = target.element.textContent || 'flower';
              } else {
                // Fly to random position
                newBee.targetX = Math.random() * window.innerWidth;
                newBee.targetY = Math.random() * window.innerHeight;
              }
              newBee.speed = 0.5 + Math.random() * 0.5;
            }
          } else {
            // Landed behavior - take off after a while
            if (timeSinceMove > 2000) {
              newBee.isLanded = false;
              newBee.landingTarget = null;
              newBee.targetX = Math.random() * window.innerWidth;
              newBee.targetY = Math.random() * window.innerHeight;
              newBee.lastMoveTime = now;
            }
          }
          
          // Smooth movement with curves
          if (!newBee.isLanded) {
            const dx = newBee.targetX - newBee.x;
            const dy = newBee.targetY - newBee.y;
            
            // Add some curve to the movement
            const curveOffset = Math.sin(now * 0.005 + bee.id) * 20;
            const moveX = dx * newBee.speed * 0.02;
            const moveY = dy * newBee.speed * 0.02 + Math.sin(now * 0.003 + bee.id) * 0.5;
            
            newBee.x += moveX;
            newBee.y += moveY + curveOffset * 0.1;
            
            // Update rotation based on movement direction
            newBee.rotation = Math.atan2(dy, dx) * (180 / Math.PI);
          }
          
          // Keep bees within bounds
          newBee.x = Math.max(0, Math.min(window.innerWidth - 32, newBee.x));
          newBee.y = Math.max(0, Math.min(window.innerHeight - 32, newBee.y));
          
          return newBee;
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos, playBuzzSound, getLandingTargets]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {bees.map(bee => (
        <div
          key={bee.id}
          className={`absolute transition-transform duration-100 ${
            bee.isLanded ? 'animate-wiggle' : 'animate-bounce-gentle'
          }`}
          style={{
            left: bee.x - 16,
            top: bee.y - 16,
            transform: `rotate(${bee.rotation}deg)`,
          }}
        >
          <img
            src={beeLogo}
            alt="Flying bee"
            className="w-8 h-8 drop-shadow-sm"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.3))',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BeeAnimation;
