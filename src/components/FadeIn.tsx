"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, className, direction = 'up', delay = '' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animar apenas uma vez
    threshold: 0.1,    // Disparar quando 10% do elemento estiver visível
  });

  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: '-translate-x-8',
    right: 'translate-x-8',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-out',
        delay,
        inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default FadeIn;