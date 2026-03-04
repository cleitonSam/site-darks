"use client";

import React from "react";
import CareersForm from "@/components/CareersForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
              <div className="inline-block px-4 py-1 border border-white/10 rounded-full bg-white/5">
                <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px]">Recrutamento Elite</p>
              </div>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
                FAÇA PARTE DO <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>NOSSO TIME</span>
              </h1>
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Buscamos profissionais que respiram performance e excelência. Se você quer transformar vidas no ambiente mais intenso do mercado, seu lugar é aqui.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <FadeIn className="lg:col-span-1 space-y-8" direction="left">
              <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
                <h3 className="text-xl font-bold text-white uppercase italic mb-4">Por que a DARK'S?</h3>
                <ul className="space-y-4">
                  {[
                    "Ambiente de alta performance",
                    "Equipamentos de padrão mundial",
                    "Crescimento acelerado",
                    "Cultura de excelência"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/50 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 bg-primary text-primary-foreground rounded-2xl">
                <h3 className="text-xl font-black uppercase italic mb-2">Vagas Abertas</h3>
                <p className="text-sm font-medium opacity-80">
                  Estamos sempre em busca de Instrutores, Consultores de Vendas e Gestores de Unidade.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-2" direction="right">
              <CareersForm />
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;