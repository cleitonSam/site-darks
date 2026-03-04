import React from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UnitsSection from "@/components/UnitsSection";
import ProgramsSection from "@/components/ProgramsSection";
import SupplementsSection from "@/components/SupplementsSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import FloatingInstagramButton from "@/components/FloatingInstagramButton";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FadeIn from "@/components/FadeIn";

const Index = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-white selection:text-black overflow-x-hidden">
      <SEO
        title="DARK'SGYM | Elite Fitness & Treinamento 24h"
        description="Domine seu corpo na DARK'SGYM. Equipamentos de ponta, ambiente de elite e funcionamento 24 horas. Encontre a unidade mais próxima e comece seu legado."
      />

      {/* Noise Effect Overlay */}
      {/* <div className="noise" /> */}
      
      {/* Background Orbs & Technical Grid */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]" />
      </div>

      <Header />
      
      <main className="relative z-10">
        <HeroSection />
        
        <FadeIn>
          <section id="diferenciais" className="relative border-y border-white/5">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden 2xl:block">
              <span className="text-[10px] font-mono text-white/10 vertical-text tracking-[1em] uppercase">
                SEC_01 // DIFFERENTIATORS
              </span>
            </div>
            <ProgramsSection />
          </section>
        </FadeIn>

        <FadeIn>
          <div id="unidades" className="bg-zinc-950/50">
            <UnitsSection />
          </div>
        </FadeIn>

        <FadeIn>
          <div id="suplementos" className="relative overflow-hidden">
            <SupplementsSection />
          </div>
        </FadeIn>

        {/* A seção de planos foi removida conforme solicitado */}
        {/* <div id="planos" className="bg-black">
          <PricingSection />
        </div> */}

        <FadeIn>
          <div className="relative pt-32 pb-16 bg-black">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="mb-24">
              <div className="text-center mb-16 space-y-4">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em]">Performance</span>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                  Métricas
                </h2>
              </div>
              <StatsSection />
            </div>
          </div>
        </FadeIn>
      </main>
      
      <Footer />
      <FloatingInstagramButton />
      <FloatingWhatsAppButton />

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        /* .noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          content: "";
          opacity: .03;
          z-index: 50;
          pointer-events: none;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        } */
      `}</style>
    </div>
  );
};

export default Index;