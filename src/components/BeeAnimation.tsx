import React, { useEffect, useState, useRef, useCallback } from 'react';
import beeMain from '@/assets/bee-main.png';

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
  // New properties for enhanced animation
  baseSpeed: number;
  phaseOffset: number;
  spiralRadius: number;
  isCircling: boolean;
  circleCenter: { x: number; y: number };
  circleAngle: number;
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

  // Initialize bees with enhanced properties
  useEffect(() => {
    const initialBees: Bee[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      rotation: 0,
      speed: 0.8 + Math.random() * 0.4,
      baseSpeed: 0.8 + Math.random() * 0.4,
      isLanded: false,
      landingTarget: null,
      lastMoveTime: Date.now(),
      phaseOffset: i * Math.PI * 0.66, // Distribute bees evenly
      spiralRadius: 30 + Math.random() * 20,
      isCircling: false,
      circleCenter: { x: 0, y: 0 },
      circleAngle: 0,
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

  // Enhanced animation loop with better performance
  useEffect(() => {
    let animationId: number;
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
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
            
            // Enhanced hover interaction with circling behavior
            if (distanceToMouse < 150 && !bee.isLanded) {
              if (distanceToMouse < 80) {
                // Close proximity - start circling around mouse
                if (!bee.isCircling) {
                  newBee.isCircling = true;
                  newBee.circleCenter = { x: mousePos.x, y: mousePos.y };
                  newBee.circleAngle = Math.atan2(bee.y - mousePos.y, bee.x - mousePos.x);
                  newBee.speed = bee.baseSpeed * 1.5;
                  
                  // Play buzz sound
                  if (timeSinceMove > 300) {
                    playBuzzSound();
                    newBee.lastMoveTime = now;
                  }
                }
                
                // Circle around mouse cursor
                newBee.circleAngle += 0.08; // Circling speed
                newBee.targetX = mousePos.x + Math.cos(newBee.circleAngle) * bee.spiralRadius;
                newBee.targetY = mousePos.y + Math.sin(newBee.circleAngle) * bee.spiralRadius;
                
              } else if (distanceToMouse < 120) {
                // Medium proximity - approach cautiously with figure-8 pattern
                const approachAngle = Math.atan2(mousePos.y - bee.y, mousePos.x - bee.x);
                const figureEightOffset = Math.sin(now * 0.01 + bee.phaseOffset) * 40;
                newBee.targetX = mousePos.x - Math.cos(approachAngle) * 60 + figureEightOffset;
                newBee.targetY = mousePos.y - Math.sin(approachAngle) * 60;
                newBee.speed = bee.baseSpeed * 1.2;
                newBee.isCircling = false;
              } else {
                // Far proximity - gentle attraction
                const attractionAngle = Math.atan2(mousePos.y - bee.y, mousePos.x - bee.x);
                newBee.targetX = bee.x + Math.cos(attractionAngle) * 30;
                newBee.targetY = bee.y + Math.sin(attractionAngle) * 30;
                newBee.speed = bee.baseSpeed * 0.8;
                newBee.isCircling = false;
              }
            } else if (distanceToMouse > 200) {
              // Reset circling when far from mouse
              newBee.isCircling = false;
            } else if (!bee.isLanded && !bee.isCircling) {
              // Enhanced natural flying behavior with curved paths
              const distanceToTarget = Math.sqrt(
                Math.pow(bee.x - bee.targetX, 2) + Math.pow(bee.y - bee.targetY, 2)
              );
              
              if (distanceToTarget < 50 || timeSinceMove > 4000) {
                // Choose new target with more interesting destinations
                if (targets.length > 0 && Math.random() < 0.25) {
                  // Land on a target
                  const target = targets[Math.floor(Math.random() * targets.length)];
                  newBee.targetX = target.rect.left + target.rect.width / 2;
                  newBee.targetY = target.rect.top + target.rect.height / 2;
                  newBee.isLanded = true;
                  newBee.landingTarget = target.element.textContent || 'flower';
                } else {
                  // Fly to random position with bias towards interesting areas
                  const margin = 100;
                  newBee.targetX = margin + Math.random() * (window.innerWidth - 2 * margin);
                  newBee.targetY = margin + Math.random() * (window.innerHeight - 2 * margin);
                }
                newBee.speed = bee.baseSpeed;
                newBee.lastMoveTime = now;
              }
            } else {
              // Landed behavior - take off after a while
              if (timeSinceMove > 2500) {
                newBee.isLanded = false;
                newBee.landingTarget = null;
                const margin = 100;
                newBee.targetX = margin + Math.random() * (window.innerWidth - 2 * margin);
                newBee.targetY = margin + Math.random() * (window.innerHeight - 2 * margin);
                newBee.lastMoveTime = now;
                newBee.isCircling = false;
              }
            }
            
            // Enhanced smooth movement with natural curves and waves
            if (!newBee.isLanded) {
              const dx = newBee.targetX - newBee.x;
              const dy = newBee.targetY - newBee.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // Natural wavy movement pattern
              const time = now * 0.001;
              const waveAmplitude = bee.isCircling ? 5 : 15;
              const waveFrequency = bee.isCircling ? 0.1 : 0.05;
              
              // Perpendicular wave motion for natural flight
              const perpX = -dy / (distance + 0.1);
              const perpY = dx / (distance + 0.1);
              const waveOffset = Math.sin(time * waveFrequency + bee.phaseOffset) * waveAmplitude;
              
              // Main movement with easing
              const moveX = dx * newBee.speed * 0.03;
              const moveY = dy * newBee.speed * 0.03;
              
              // Apply movement with wave motion
              newBee.x += moveX + perpX * waveOffset;
              newBee.y += moveY + perpY * waveOffset;
              
              // Smooth rotation with slight bobbing
              const targetRotation = Math.atan2(dy + perpY * waveOffset, dx + perpX * waveOffset) * (180 / Math.PI);
              newBee.rotation = newBee.rotation + (targetRotation - newBee.rotation) * 0.1;
            }
          
            // Keep bees within bounds with gentle bouncing
            const margin = 50;
            if (newBee.x < margin) {
              newBee.x = margin;
              newBee.targetX = Math.max(newBee.targetX, margin + 100);
            } else if (newBee.x > window.innerWidth - margin) {
              newBee.x = window.innerWidth - margin;
              newBee.targetX = Math.min(newBee.targetX, window.innerWidth - margin - 100);
            }
            
            if (newBee.y < margin) {
              newBee.y = margin;
              newBee.targetY = Math.max(newBee.targetY, margin + 100);
            } else if (newBee.y > window.innerHeight - margin) {
              newBee.y = window.innerHeight - margin;
              newBee.targetY = Math.min(newBee.targetY, window.innerHeight - margin - 100);
            }
            
            return newBee;
          });
        });
        
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mousePos, playBuzzSound, getLandingTargets]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {bees.map(bee => (
        <div
          key={bee.id}
          className={`absolute transition-all duration-200 ${
            bee.isLanded ? 'animate-wiggle' : ''
          } ${bee.isCircling ? 'animate-pulse' : ''}`}
          style={{
            left: bee.x - 20,
            top: bee.y - 20,
            transform: `rotate(${bee.rotation}deg) ${bee.isCircling ? 'scale(1.1)' : 'scale(1)'}`,
            willChange: 'transform',
          }}
        >
          <img
            src={beeMain}
            alt="Flying bee"
            className="w-10 h-10 drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 6px rgba(255, 215, 0, ${bee.isCircling ? '0.6' : '0.3'})) ${
                bee.isCircling ? 'brightness(1.2)' : 'brightness(1)'
              }`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BeeAnimation;
