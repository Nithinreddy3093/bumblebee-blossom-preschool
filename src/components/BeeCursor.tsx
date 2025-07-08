import React, { useEffect, useState } from 'react';
import beeCursorNew from '@/assets/bee-cursor-new.png';

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
      {/* Enhanced trail effect with varying sizes */}
      {trail.map((point, index) => {
        const intensity = (trail.length - index) / trail.length;
        const size = 3 + intensity * 2;
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-50 rounded-full transition-all duration-300"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: 'hsl(var(--primary))',
              opacity: intensity * 0.7,
              transform: `scale(${intensity})`,
              boxShadow: `0 0 ${6 + intensity * 4}px hsl(var(--primary) / ${0.3 + intensity * 0.3})`,
            }}
          />
        );
      })}
      
      {/* Enhanced main cursor */}
      <div
        className={`bee-cursor ${isVisible ? 'opacity-90' : 'opacity-0'} transition-all duration-300`}
        style={{
          left: position.x - 15,
          top: position.y - 15,
          background: `url(${beeCursorNew}) no-repeat center`,
          backgroundSize: '30px 30px',
          width: '30px',
          height: '30px',
          filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 4px rgba(255, 165, 0, 0.6))',
          transform: 'rotate(-15deg)',
        }}
      />
    </>
  );
};

export default BeeCursor;