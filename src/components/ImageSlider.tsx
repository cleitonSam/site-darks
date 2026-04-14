"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string; 
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [images.length, nextSlide]);

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`${alt} - ${index + 1}`}
          className={cn(
            'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out',
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}
    </div>
  );
};

export default ImageSlider;