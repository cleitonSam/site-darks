import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingWhatsAppButton = () => {
  // Substitua este número pelo número de WhatsApp desejado (incluindo código do país)
  // Usando o número padrão do NocoDB para consistência
  const whatsappNumber = "5511999999999"; 
  const message = "Olá, gostaria de mais informações sobre a DARK'SGYM!";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className={cn(
        "fixed bottom-4 right-20 sm:bottom-6 sm:right-24 z-50", // Ajustado para mobile
        "h-12 w-12 sm:h-14 sm:w-14 rounded-full", // Tamanho ajustado
        "bg-primary text-primary-foreground", // Usando a cor primária do tema
        "flex items-center justify-center",
        "shadow-lg hover:shadow-primary/50 transition-all duration-300",
        "transform hover:scale-110",
        "hover:animate-button-glow"
      )}
    >
      <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
};

export default FloatingWhatsAppButton;