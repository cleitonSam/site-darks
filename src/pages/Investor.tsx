"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvestorForm from "@/components/InvestorForm";
import SEO from "@/components/SEO";
import FadeIn from "@/components/FadeIn";

const InvestorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-white selection:text-black overflow-x-hidden">
      <SEO 
        title="Seja um Investidor | DARK'SGYM" 
        description="Invista na rede de academias que mais cresce. Faça parte do legado DARK'SGYM."
      />
      
      <Header />

      <main className="relative z-10 pt-32 pb-24">
        {/* Background Watermark */}
        <div className="absolute top-40 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
          <h2 className="text-[25vw] font-black italic uppercase leading-none -translate-x-10">INVESTOR</h2>
        </div>

        <div className="container mx-auto px-6 relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
              <div className="inline-block px-4 py-1 mb-2 border border-white/10 rounded-full bg-white/5">
                <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px]">Oportunidade de Negócio</p>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                SEJA UM <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>INVESTIDOR</span>
              </h1>
              <p className="text-white/30 text-sm md:text-base font-medium uppercase tracking-[0.2em] italic max-w-2xl mx-auto">
                Expanda seu portfólio com a marca que está redefinindo o padrão de academias de elite no Brasil.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">
            <FadeIn direction="left" className="lg:col-span-1 space-y-8">
              <div className="p-8 border border-white/5 bg-zinc-950/50 rounded-none">
                <h3 className="text-xl font-black uppercase italic text-white mb-6 tracking-tighter">Por que investir?</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Alta Rentabilidade", desc: "Modelo de negócio testado e validado com ROI acelerado." },
                    { title: "Marca Forte", desc: "Posicionamento premium que atrai o público de maior valor." },
                    { title: "Escalabilidade", desc: "Processos padronizados para expansão rápida e eficiente." }
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">{item.title}</h4>
                      <p className="text-[11px] text-white/40 font-medium leading-relaxed">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-white text-black rounded-none">
                <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Captação Aberta</h3>
                <p className="text-xs font-bold uppercase leading-tight opacity-70">
                  Estamos selecionando parceiros estratégicos para as próximas unidades da rede.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" className="lg:col-span-2">
              <InvestorForm />
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InvestorPage;
