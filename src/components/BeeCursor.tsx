import React, { useEffect, useState } from 'react';
import beeCursorImg from '@/assets/bee-cursor.png';

const BeeCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
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

  return (
    <div
      className={`bee-cursor ${isVisible ? 'opacity-60' : 'opacity-0'} transition-opacity duration-200`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
        background: `url(${beeCursorImg}) no-repeat center`,
        backgroundSize: '20px 20px',
      }}
    />
  );
};

export default BeeCursor;