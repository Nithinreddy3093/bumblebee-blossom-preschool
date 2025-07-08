import React, { useEffect, useState } from 'react';
import beeCursorImg from '@/assets/bee-cursor.png';

const BeeCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Add to trail
      setTrail(prevTrail => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prevTrail.slice(0, 8) // Keep only last 8 positions
        ];
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Clean up old trail positions
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prevTrail => prevTrail.filter(point => Date.now() - point.id < 500));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-50 rounded-full transition-all duration-200"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: '4px',
            height: '4px',
            backgroundColor: 'hsl(var(--primary))',
            opacity: (trail.length - index) / trail.length * 0.6,
            transform: `scale(${(trail.length - index) / trail.length})`,
            boxShadow: '0 0 6px hsl(var(--primary) / 0.4)',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`bee-cursor ${isVisible ? 'opacity-80' : 'opacity-0'} transition-opacity duration-200`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          background: `url(${beeCursorImg}) no-repeat center`,
          backgroundSize: '20px 20px',
          filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))',
        }}
      />
    </>
  );
};

export default BeeCursor;