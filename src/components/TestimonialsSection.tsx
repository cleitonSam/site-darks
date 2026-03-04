"use client";

import React from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const TestimonialCard = ({ name, role, content, index }: { name: string, role: string, content: string, index: number }) => (
  <div className="premium-card p-8 flex flex-col justify-between h-full bg-zinc-950/50 border-white/5 hover:border-white/10 transition-all duration-500">
    <div className="relative">
      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/5 -z-10" />
      <p className="text-white/70 italic leading-relaxed mb-8 text-lg">
        "{content}"
      </p>
    </div>
    
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center border border-white/10">
        <span className="text-white font-black italic">{name.charAt(0)}</span>
      </div>
      <div>
        <h4 className="text-white font-bold uppercase tracking-tighter italic">{name}</h4>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ricardo Silva",
      role: "Atleta de Performance",
      content: "A infraestrutura da DARK'SGYM é incomparável. O ambiente 24h me permite manter a rotina mesmo com horários malucos.",
    },
    {
      name: "Juliana Costa",
      role: "Membro Platinum",
      content: "Equipamentos de ponta e um ambiente que realmente te motiva a ir além. A melhor decisão que tomei para minha saúde.",
    },
    {
      name: "Marcos Oliveira",
      role: "Powerlifter",
      content: "Finalmente uma academia que entende o que é treino pesado. O aço aqui é de verdade, sem frescura.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em]">Social Proof</span>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
            VOZES DA <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>ELITE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} index={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;