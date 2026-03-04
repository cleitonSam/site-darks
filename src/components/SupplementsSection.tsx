"use client";

import React from "react";
import { Zap, Activity, Info } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";

const SupplementsSection = () => {
  const supplementImages = [
    "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/2.png",
    "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/3.png",
    "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/4.png",
    "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/5.png",
    "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/6.png",
    "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/7.png",
  ];

  return (
    <section className="relative min-h-[600px] flex flex-col md:flex-row bg-black overflow-hidden border-y border-white/5">
      {/* Background Decor - Massive Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
        <h2 className="text-[20vw] font-black italic uppercase leading-none text-white/[0.03] whitespace-nowrap">
          PERFORMANCE
        </h2>
      </div>

      {/* Content Side */}
      <div className="relative z-10 w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
        <div className="space-y-6 max-w-lg">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">DARKS GYM</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
            NUTRIÇÃO <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>AVANÇADA</span>
          </h2>

          <p className="text-sm md:text-base text-white/50 font-medium leading-relaxed uppercase tracking-wider italic">
            Não é apenas suplementação. É o combustível para a sua reconstrução celular. Desenvolvido para quem exige o máximo.
          </p>

          <div className="grid grid-cols-2 gap-4 py-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/20">
                <Zap size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Energia</span>
              </div>
              <div className="h-1 bg-white/10 overflow-hidden">
                <div className="h-full bg-white w-3/4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/20">
                <Activity size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Recuperação</span>
              </div>
              <div className="h-1 bg-white/10 overflow-hidden">
                <div className="h-full bg-white w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Side - Product Display */}
      <div className="relative w-full md:w-1/2 h-[400px] md:h-auto group">
        <ImageSlider images={supplementImages} alt="Suplementos DARK'SGYM" />
        
        {/* Technical Overlays */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
        
        {/* Floating Detail Card */}
        <div className="absolute bottom-8 right-8 p-6 bg-black/90 backdrop-blur-xl border border-white/10 max-w-[240px] hidden sm:block">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 text-white">
              <Info size={16} />
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-white/40 uppercase">Destaque do Mês</span>
              <p className="text-xs font-bold text-white uppercase italic">Whey Isolate Dark Series - 900g</p>
            </div>
          </div>
        </div>

        {/* Scan Line Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-[1px] bg-white/20 absolute top-0 animate-scan-line" />
        </div>
      </div>

      <style>
        {`
          @keyframes scan-line {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scan-line {
            animation: scan-line 4s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default SupplementsSection;