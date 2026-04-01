"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapPin, MessageSquare, ShoppingCart, Instagram, Tag, Cpu, Zap, Star, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Membership } from "@/hooks/useMembershipsData";

interface UnitCardProps {
  unit: {
    name: string;
    address: string;
    hours: string;
    imageUrl?: string;
    whatsappNumber?: string;
    instagramLink?: string;
    purchaseLink?: string;
    latitude?: number;
    longitude?: number;
    distanceKm?: number;
    isClosest: boolean;
    isPromotion: boolean;
    idBranch?: number;
    tier?: 'PRO' | 'PRIME' | 'DIAMOND';
  };
  allMemberships: Membership[];
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, allMemberships }) => {
  const [isHovered, setIsHovered] = useState(false);

  const availableMemberships = useMemo(() => {
    const unitMemberships = allMemberships.filter(m => m.idBranch === unit.idBranch);
    
    const promotionalPlanNames = [
      "PLANO DARKS PROMOCIONAL",
      "PLANO RECORRENTE (DARKS)",
      "PLANO DARKS RECORRENTE PRIME (PRÉ VENDA)",
      "PLANO DARKS RECORRENTE PRIME (PRE VENDA)"
    ];

    const promotionalPlan = unitMemberships.find(m => promotionalPlanNames.includes(m.nameMembership.trim().toUpperCase()));

    const planNamesToShow = [
      "PLANO ANUAL",
      "COMBO 3 DIARIA",
    ];

    if (promotionalPlan) {
      planNamesToShow.push(promotionalPlan.nameMembership.trim().toUpperCase());
    } else {
      planNamesToShow.push("PLANO RECORRENTE");
    }

    return unitMemberships
      .filter(membership => planNamesToShow.includes(membership.nameMembership.trim().toUpperCase()))
      .sort((a, b) => {
        const primaryRecurrent = "PLANO DARKS PROMOCIONAL";
        const secondaryRecurrent = "PLANO RECORRENTE (DARKS)";
        const tertiaryRecurrent = "PLANO RECORRENTE";
        const aName = a.nameMembership.trim().toUpperCase();
        const bName = b.nameMembership.trim().toUpperCase();

        const getScore = (name: string) => {
          if (name === primaryRecurrent) return 1;
          if (name === secondaryRecurrent) return 2;
          if (name === tertiaryRecurrent) return 3;
          if (name === "PLANO ANUAL") return 4;
          return 5; // Other plans
        };

        return getScore(aName) - getScore(bName);
      });
  }, [allMemberships, unit.idBranch]);

  const [selectedPlan, setSelectedPlan] = useState<Membership | null>(null);

  useEffect(() => {
    if (availableMemberships.length > 0) {
      setSelectedPlan(availableMemberships[0]);
    } else {
      setSelectedPlan(null);
    }
  }, [availableMemberships]);

  const planDetails = useMemo(() => {
    if (!selectedPlan) {
      return {
        formattedTotalValue: null,
        hasInstallments: false,
        firstInstallmentValue: null,
        modalities: [],
        isPromotionalRecurring: false,
        promotionalFirstMonthValue: null,
      };
    }

    const formattedTotalValue = selectedPlan.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const hasInstallments = selectedPlan.maxAmountInstallments > 1;
    const firstInstallmentValue = hasInstallments 
      ? (selectedPlan.value / selectedPlan.maxAmountInstallments).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : null;
    const modalities = (selectedPlan.differentials || []).map(d => d.title);

    const isPromotionalRecurring = unit.isPromotion && !hasInstallments;
    let promotionalFirstMonthValue = null;
    if (isPromotionalRecurring) {
      promotionalFirstMonthValue = (selectedPlan.value * 0.5).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return { 
      formattedTotalValue, 
      hasInstallments, 
      firstInstallmentValue, 
      modalities,
      isPromotionalRecurring,
      promotionalFirstMonthValue
    };
  }, [selectedPlan, unit.isPromotion]);

  // Gera o link de matrícula:
  // 1. urlSale do plano no EVO (mais específico)
  // 2. Link construído pelo padrão EVO (idBranch + idMembership)
  // 3. Link de compra do NocoDB (fallback geral da unidade)
  const purchaseUrl = useMemo(() => {
    if (selectedPlan?.urlSale) return selectedPlan.urlSale;
    if (selectedPlan && unit.idBranch) {
      return `https://evo-totem.w12app.com.br/darksgym/${unit.idBranch}/site/landing-page/checkout/${selectedPlan.idMembership}/0`;
    }
    if (unit.purchaseLink) return unit.purchaseLink;
    return undefined;
  }, [selectedPlan, unit.idBranch, unit.purchaseLink]);

  const whatsappLink = unit.whatsappNumber
    ? `https://wa.me/${unit.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent("Olá, gostaria de mais informações sobre a unidade " + unit.name + "!")}`
    : undefined;

  const mapsLink = (unit.latitude && unit.longitude)
    ? `https://maps.google.com/?q=${unit.latitude},${unit.longitude}`
    : undefined;

  return (
    <div 
      className={cn(
        "relative overflow-hidden transition-all duration-500 ease-in-out group h-full flex flex-col rounded-xl",
        "bg-zinc-950",
        "border border-white/5",
        unit.isPromotion
          ? "border-promotion shadow-lg shadow-promotion/30 animate-pulse-border-promotion"
          : unit.isClosest
            ? "border-primary shadow-lg shadow-primary/20 animate-pulse-border"
            : "",
        "hover:shadow-xl hover:shadow-white/5 hover:scale-[1.01]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={unit.imageUrl || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"} 
          alt={unit.name}
          className={cn("w-full h-full object-cover transition-all duration-700", isHovered ? "scale-110" : "scale-100")}
        />
        
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          <div>
            {unit.isClosest && <Badge className="inline-flex items-center px-2 py-0.5 bg-white text-black text-[8px] font-black uppercase tracking-tighter mb-1 mr-1"><MapPin size={10} className="mr-1" /> PRÓXIMA</Badge>}
            {unit.isPromotion && <Badge className="inline-flex items-center px-2.5 py-1 bg-promotion text-promotion-foreground text-[11px] font-black uppercase tracking-tighter mb-1 mr-1"><Tag size={12} className="mr-1" /> PROMOÇÃO</Badge>}
            {unit.tier && (
              <Badge className={cn(
                "inline-flex items-center px-2.5 py-1 text-[11px] font-black uppercase tracking-tighter mb-1 mr-1",
                unit.tier === 'PRO' && "bg-amber-500 text-black",
                unit.tier === 'PRIME' && "bg-slate-200 text-black",
                unit.tier === 'DIAMOND' && "bg-cyan-400 text-black",
              )}>
                {unit.tier === 'PRO' && <Zap size={12} className="mr-1" />}
                {unit.tier === 'PRIME' && <Star size={12} className="mr-1" />}
                {unit.tier === 'DIAMOND' && <Gem size={12} className="mr-1" />}
                {unit.tier}
              </Badge>
            )}
          </div>
          {unit.distanceKm !== undefined && (
            <div className="text-right flex-shrink-0 p-1 rounded bg-black/50 border border-white/10">
              <span className="block text-[9px] font-mono text-white/70 uppercase">Distância</span>
              <span className="flex items-center justify-end text-base font-mono font-bold text-white"><MapPin size={12} className="mr-1 text-primary" /> {unit.distanceKm.toFixed(1)}KM</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h3 className="font-black italic uppercase tracking-tighter leading-none text-3xl text-white mb-1">{unit.name}</h3>
          <p className="text-xs text-white/70 font-medium">{unit.address}</p>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow flex flex-col justify-between">
          {selectedPlan ? (
            <div className="bg-zinc-900/70 backdrop-blur-sm border border-white/10 flex flex-col rounded-lg p-3 mb-3 flex-grow">
              <h4 className="text-center text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
                Selecione seu Plano
              </h4>
              <div className="flex justify-center gap-2 mb-3">
                {availableMemberships.map((plan) => (
                  <Button
                    key={plan.idMembership}
                    size="sm"
                    variant="outline"
                    className={cn(
                      "h-auto py-1.5 px-3 rounded-full text-[10px] font-bold transition-all duration-300 flex-1",
                      selectedPlan?.idMembership === plan.idMembership
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30"
                        : "bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {plan.nameMembership}
                  </Button>
                ))}
              </div>

              <div className="text-center space-y-0.5 mb-3">
                {planDetails.isPromotionalRecurring ? (
                  <>
                    <div className="flex items-start justify-center text-white/50 line-through">
                      <span className="text-base font-bold mt-1 mr-1">R$</span>
                      <span className="text-4xl font-black italic tracking-tighter leading-none">{planDetails.formattedTotalValue?.split(',')[0]}</span>
                      <span className="text-base font-bold mt-1 ml-1">,{planDetails.formattedTotalValue?.split(',')[1]}</span>
                    </div>
                    <p className="text-sm font-bold text-promotion uppercase italic tracking-widest pt-1">
                      1ª MENSALIDADE COM DESCONTO
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-center">
                      <span className="text-base font-bold text-white/30 mt-1 mr-1">R$</span>
                      <span className="text-4xl font-black text-white italic tracking-tighter leading-none">{planDetails.formattedTotalValue?.split(',')[0]}</span>
                      <span className="text-base font-bold text-white/30 mt-1 ml-1">,{planDetails.formattedTotalValue?.split(',')[1]}</span>
                    </div>
                    <p className="text-xs font-bold text-white uppercase italic tracking-widest">
                      {planDetails.hasInstallments ? `Ou ${selectedPlan.maxAmountInstallments}x de R$ ${planDetails.firstInstallmentValue}` : "Mensalidade Recorrente"}
                    </p>
                  </>
                )}
              </div>

              {planDetails.modalities.length > 0 && (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Modalidades Incluídas</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {planDetails.modalities.map((modality, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-white/10 text-white/70 text-[8px] font-medium uppercase tracking-wider">
                        {modality}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Acesso por tier e info de cancelamento */}
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                {/* Acesso entre unidades */}
                {unit.tier === 'PRO' && (
                  <p className="text-[9px] text-white/50 text-center uppercase tracking-wider">
                    🏋️ Treina em todas as unidades <span className="text-amber-400 font-black">PRO</span>
                  </p>
                )}
                {unit.tier === 'PRIME' && (
                  <p className="text-[9px] text-white/50 text-center uppercase tracking-wider">
                    🏋️ Treina em todas as unidades <span className="text-slate-300 font-black">PRO</span> e <span className="text-slate-300 font-black">PRIME</span>
                  </p>
                )}
                {unit.tier === 'DIAMOND' && (
                  <p className="text-[9px] text-white/50 text-center uppercase tracking-wider">
                    💎 <span className="text-cyan-400 font-black">Em breve:</span> Treina em todas as unidades da Rede
                  </p>
                )}
                {/* Cancelamento */}
                {planDetails.hasInstallments ? (
                  <p className="text-[9px] text-white/40 text-center uppercase tracking-wider">
                    ⚠️ Cancelamento antecipado sujeito a <span className="text-red-400 font-black">multa</span>
                  </p>
                ) : (
                  <p className="text-[9px] text-white/40 text-center uppercase tracking-wider">
                    ✅ Cancelamento <span className="text-green-400 font-black">sem multa</span>
                  </p>
                )}
              )}
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-center items-center text-center text-white/50 bg-zinc-900/70 backdrop-blur-sm border border-white/10 p-4 rounded-lg mb-4">
              <Cpu className="w-10 h-10 mb-3 animate-pulse text-white/20" />
              <p className="text-sm">Nenhum plano encontrado.</p>
              <p className="text-xs">Verifique o 'ID Filial (EVO API)'.</p>
            </div>
          )}

          <div>
            <Button 
              size="sm" 
              className="h-10 w-full rounded-md bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 mb-2 transition-all duration-300"
              asChild
              disabled={!purchaseUrl}
            >
              <a href={purchaseUrl || '#'} target="_blank" rel="noopener noreferrer">
                <ShoppingCart size={12} className="mr-2" /> MATRICULAR
              </a>
            </Button>

            <div className="grid grid-cols-3 gap-2">
              <Button size="sm" variant="outline" className="h-9 rounded-md border-white/20 text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300" asChild disabled={!mapsLink}>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer"><MapPin size={12} className="mr-1" /> MAPS</a>
              </Button>
              <Button size="sm" variant="outline" className="h-9 rounded-md border-white/20 text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300" asChild disabled={!whatsappLink}>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"><MessageSquare size={12} className="mr-1" /> WHATSAPP</a>
              </Button>
              <Button size="sm" variant="outline" className="h-9 rounded-md border-white/20 text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300" asChild disabled={!unit.instagramLink}>
                <a href={unit.instagramLink} target="_blank" rel="noopener noreferrer"><Instagram size={12} className="mr-1" /> INSTAGRAM</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse-border {
          0% { border-color: hsl(var(--primary)); box-shadow: 0 0 0px hsl(var(--primary)/0.2); }
          50% { border-color: hsl(var(--primary)/0.5); box-shadow: 0 0 10px hsl(var(--primary)/0.4); }
          100% { border-color: hsl(var(--primary)); box-shadow: 0 0 0px hsl(var(--primary)/0.2); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s infinite ease-in-out;
        }
        @keyframes pulse-border-promotion {
          0% { border-color: hsl(var(--promotion)); box-shadow: 0 0 0px hsl(var(--promotion)/0.2); }
          50% { border-color: hsl(var(--promotion)/0.5); box-shadow: 0 0 10px hsl(var(--promotion)/0.4); }
          100% { border-color: hsl(var(--promotion)); box-shadow: 0 0 0px hsl(var(--promotion)/0.2); }
        }
        .animate-pulse-border-promotion {
          animation: pulse-border-promotion 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UnitCard;