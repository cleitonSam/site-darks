import React from 'react';
import { Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingInstagramButton = () => {
  return (
    <a
      href="https://www.instagram.com/darks.gym/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Siga-nos no Instagram"
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50", // Ajustado para mobile
        "h-12 w-12 sm:h-14 sm:w-14 rounded-full", // Tamanho ajustado
        "bg-primary text-primary-foreground",
        "flex items-center justify-center",
        "shadow-lg hover:shadow-primary/50 transition-all duration-300",
        "transform hover:scale-110",
        "hover:animate-button-glow"
      )}
    >
      <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
};

export default FloatingInstagramButton;