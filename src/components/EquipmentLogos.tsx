import React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface EquipmentLogosProps {
  logoUrls: string[];
}

const EquipmentLogos: React.FC<EquipmentLogosProps> = ({ logoUrls }) => {
  if (logoUrls.length === 0) return null;

  // Configuração do plugin Autoplay - Removido 'loop' que não existe no plugin
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="mt-20 py-8 border border-border rounded-xl bg-secondary/50 overflow-hidden">
      <h3 className={cn("font-bold text-center font-display text-xl text-muted-foreground mb-8 px-4")}>
        Equipamentos das Melhores Marcas
      </h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {logoUrls.map((src, index) => (
            <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 pl-4">
              <div className="p-1 flex justify-center items-center h-full">
                <img
                  src={src}
                  alt={`Logo de Equipamento ${index + 1}`}
                  className={cn(
                    "w-full max-w-[100px] h-auto object-contain opacity-50",
                    "transition-opacity duration-300 hover:opacity-100"
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default EquipmentLogos;