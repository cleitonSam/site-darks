"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareersForm from "@/components/CareersForm";
import SEO from "@/components/SEO";
import FadeIn from "@/components/FadeIn";

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-white selection:text-black overflow-x-hidden">
      <SEO 
        title="Trabalhe Conosco | DARK'SGYM" 
        description="Faça parte do time de elite da DARK'SGYM. Envie seu currículo e comece seu legado conosco."
      />
      
      <Header />

      <main className="relative z-10 pt-32 pb-24">
        {/* Background Watermark */}
        <div className="absolute top-40 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
          <h2 className="text-[25vw] font-black italic uppercase leading-none -translate-x-10">CAREERS</h2>
        </div>

        <div className="container mx-auto px-6 relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
              <div className="inline-block px-4 py-1 mb-2 border border-white/10 rounded-full bg-white/5">
                <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px]">Recrutamento de Elite</p>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                TRABALHE <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>CONOSCO</span>
              </h1>
              <p className="text-white/30 text-sm md:text-base font-medium uppercase tracking-[0.2em] italic max-w-2xl mx-auto">
                Buscamos profissionais que não aceitam o comum. Se você tem sede de performance e quer construir um legado, seu lugar é aqui.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay="delay-300">
            <div className="max-w-3xl mx-auto">
              <CareersForm />
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;