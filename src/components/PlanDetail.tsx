"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Membership } from "@/hooks/useMembershipsData";

interface PlanDetailProps {
  membership: Membership;
}

const PlanDetail: React.FC<PlanDetailProps> = ({ membership }) => {
  const formattedTotalValue = membership.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const hasInstallments = membership.maxAmountInstallments > 1;
  const firstInstallmentValue = hasInstallments 
    ? (membership.value / membership.maxAmountInstallments).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : null;
  const modalities = membership.differentials.map(d => d.title);
  const location = "S. André // Matriz";
  const systemStatus = "Online / No Limits";

  return (
    <div className="bg-zinc-950/50 border border-white/10 p-8 flex flex-col space-y-8 h-full">
      {/* Status and Location */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-white/40">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-[0.4em]">{systemStatus}</span>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Localização</p>
          <p className="text-xs font-bold text-white uppercase italic">{location}</p>
        </div>
      </div>

      <div className="flex-grow space-y-8">
        {/* Plan Name and Duration */}
        <div>
          <p className="text-xs font-black text-white/30 uppercase tracking-[0.3em]">
            {membership.durationType === "Months" && membership.duration > 0 ? `${membership.duration} MESES` : "PLANO"}
          </p>
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            {membership.nameMembership}
          </h3>
        </div>

        {/* Price */}
        <div className="text-center py-8 bg-white/[0.02] border-y border-white/10">
          <div className="flex items-start justify-center">
            <span className="text-xl font-bold text-white/30 mt-2 mr-2">R$</span>
            <span className="text-7xl font-black text-white italic tracking-tighter leading-none">
              {formattedTotalValue.split(',')[0]}
            </span>
            <span className="text-xl font-bold text-white/30 mt-2 ml-1">
              ,{formattedTotalValue.split(',')[1]}
            </span>
          </div>
          <p className="text-sm font-bold text-white uppercase italic tracking-widest mt-2">
            {hasInstallments 
              ? `Ou ${membership.maxAmountInstallments}x de R$ ${firstInstallmentValue}` 
              : "Pagamento Único"}
          </p>
        </div>

        {/* Modalities */}
        <div>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Modalidades Incluídas</p>
          <div className="flex flex-wrap gap-2">
            {modalities.map((modality, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-white/70"
              >
                {modality}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        className="w-full h-16 rounded-none bg-white text-black font-black text-lg uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all group"
        asChild
      >
        <a href={membership.urlSale} target="_blank" rel="noopener noreferrer">
          ATIVAR ACESSO <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </a>
      </Button>
    </div>
  );
};

export default PlanDetail;