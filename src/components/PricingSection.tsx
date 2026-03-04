"use client";

import React from "react";
import { useMembershipsData, Membership } from "@/hooks/useMembershipsData";
import { Cpu } from "lucide-react";
import PlanDetail from "@/components/PlanDetail"; // Importa o novo componente

const PricingSection = () => {
  const { data: memberships, isLoading, isError } = useMembershipsData();

  const planoAnual = memberships?.find(m => m.nameMembership.trim().toUpperCase() === "PLANO ANUAL");
  
  let planoDarksPromocional: Membership | undefined;
  if (memberships) {
    const promotionalPlanNames = [
      "PLANO DARKS PROMOCIONAL",
      "PLANO RECORRENTE (DARKS)",
      "PLANO RECORRENTE"
    ];
    for (const name of promotionalPlanNames) {
      planoDarksPromocional = memberships.find(m => m.nameMembership.trim().toUpperCase() === name);
      if (planoDarksPromocional) break;
    }
  }

  if (isLoading) {
    return (
      <section className="relative py-16 md:py-32 bg-black overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center text-white/50">
          <p className="text-lg">Carregando planos...</p>
          <Cpu className="w-12 h-12 mx-auto mt-4 animate-spin text-white/20" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative py-16 md:py-32 bg-black overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center text-destructive">
          <p className="text-lg">Erro ao carregar os planos. Tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }

  const displayMemberships: Membership[] = [];
  if (planoAnual) displayMemberships.push(planoAnual);
  if (planoDarksPromocional) displayMemberships.push(planoDarksPromocional);

  return (
    <section className="relative py-16 md:py-32 bg-black overflow-hidden border-y border-white/5">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Massive Background Price (Watermark) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-[40vw] font-black italic leading-none text-white/[0.02] uppercase tracking-tighter">
          {planoAnual ? Math.floor(planoAnual.value / planoAnual.duration) : "PLAN"}
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-white/40">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Acesso Imediato</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
              CONTRATO <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>DEFINITIVO</span>
            </h2>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayMemberships.map((membership) => (
              <PlanDetail 
                key={membership.idMembership} 
                membership={membership} 
              />
            ))}
          </div>

          {/* Bottom Decals */}
          {/* <div className="mt-8 flex flex-wrap justify-between items-center gap-4 opacity-30">
            <div className="flex gap-8">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em]">CANCELLATION: FREE</span>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em]">SECURITY: ENCRYPTED</span>
            </div>
            <div className="h-px flex-1 bg-white/10 mx-8 hidden sm:block" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em]">DARK'SGYM © 2024</span>
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default PricingSection;