import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ soundEnabled, onToggle }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(!soundEnabled)}
      className="fixed top-20 right-4 z-50 bg-card/90 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-all duration-300"
      title={soundEnabled ? 'Disable bee sounds' : 'Enable bee sounds'}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 text-primary" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      )}
    </Button>
  );
};

export default SoundToggle;