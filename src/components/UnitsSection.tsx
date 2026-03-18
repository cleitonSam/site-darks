"use client";

import React, { useState, useMemo } from "react";
import { useUnitsData } from "@/hooks/useUnitsData";
import { useToggleGeolocation } from "@/hooks/useToggleGeolocation";
import { useMembershipsData } from "@/hooks/useMembershipsData";
import UnitCard from "@/components/UnitCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HardHat, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getTier = (name: string): 'PRO' | 'PRIME' | 'DIAMOND' | undefined => {
  const n = name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (n.includes('MAUA') || n.includes('BERETTA') || n.includes('QUEIROS')) return 'PRO';
  if (n.includes('MARTIM') || n.includes('RIBEIRAO')) return 'PRIME';
  if (n.includes('SAO CAETANO') || n.includes('SOROCABA')) return 'DIAMOND';
  return undefined;
};

const UnitsSection = () => {
  const { coordinates: userCoords, isEnabled: geoEnabled } = useToggleGeolocation();
  const { data: unitsData, isLoading: unitsLoading } = useUnitsData(geoEnabled ? userCoords : null);
  const { data: allMemberships, isLoading: membershipsLoading } = useMembershipsData();

  const [selectedModality, setSelectedModality] = useState<string>("all");

  const units = useMemo(() => unitsData
    ? unitsData.map((unit, index) => {
        // Lógica de promoção mais robusta para aceitar 'true', '1', ou 'sim'
        const promoValue = unit.Promocao ? String(unit.Promocao).trim().toLowerCase() : '';
        const isPromotion = promoValue === 'true' || promoValue === '1' || promoValue === 'sim';

        return {
          name: unit.Unidade,
          address: unit.Endereco,
          hours: unit.Horario || '24 HORAS',
          imageUrl: unit.Foto,
          whatsappNumber: unit.WhatsApp,
          purchaseLink: unit['Link de compra'],
          instagramLink: unit.Instagram,
          latitude: unit.Latitude,
          longitude: unit.Longitude,
          distanceKm: unit.distanceKm,
          isClosest: geoEnabled && index === 0 && unit.distanceKm !== undefined,
          isPromotion: isPromotion,
          idBranch: unit.idBranch ? Number(unit.idBranch) : undefined,
          modalidade: unit.Modalidade,
          tier: getTier(unit.Unidade),
        };
      })
    : [], [unitsData, geoEnabled]);

  const uniqueModalities = useMemo(() => {
    const modalities = new Set<string>();
    
    // Adiciona modalidades do NocoDB
    unitsData?.forEach(unit => {
      if (unit.Modalidade) {
        unit.Modalidade.split(',').forEach(m => modalities.add(m.trim().toUpperCase()));
      }
    });

    allMemberships?.forEach(membership => {
      membership.differentials?.forEach(differential => {
        if (differential.title) {
          modalities.add(differential.title.trim().toUpperCase());
        }
      });
    });

    const dynamicModalities = Array.from(modalities).sort();
    
    // Modalidades obrigatórias solicitadas pelo cliente
    const mandatoryModalities = [
      "JIU JITSU",
      "PILATES",
      "MMA",
      "WORKOUT",
      "YOGA",
      "FLASHBACK"
    ];

    // Remove as obrigatórias da lista dinâmica para não duplicar, depois junta colocando as obrigatórias no início
    const otherModalities = dynamicModalities.filter(m => !mandatoryModalities.includes(m));

    return [...mandatoryModalities, ...otherModalities];
  }, [allMemberships, unitsData]);

  // Filtra para exibir apenas modalidades que realmente têm unidades correspondentes
  // Modalidades obrigatórias sempre aparecem
  const availableModalities = useMemo(() => {
    if (unitsLoading || membershipsLoading || units.length === 0) return uniqueModalities;
    const mandatoryModalities = ["JIU JITSU", "PILATES", "MMA", "WORKOUT", "YOGA", "FLASHBACK"];
    return uniqueModalities.filter(modality => {
      if (mandatoryModalities.includes(modality)) return true;
      return units.some(unit => {
        const nocoModalities = unit.modalidade ? unit.modalidade.split(',').map(m => m.trim().toUpperCase()) : [];
        if (nocoModalities.includes(modality)) return true;
        const unitMemberships = allMemberships?.filter(m => m.idBranch === unit.idBranch);
        return unitMemberships?.some(membership =>
          membership.differentials?.some(d => d.title.trim().toUpperCase() === modality)
        );
      });
    });
  }, [uniqueModalities, units, allMemberships, unitsLoading, membershipsLoading]);

  const filteredUnits = useMemo(() => {
    if (selectedModality === "all") {
      return units;
    }
    return units.filter(unit => {
      // Verifica no NocoDB (campo Modalidade)
      const nocoModalities = unit.modalidade ? unit.modalidade.split(',').map(m => m.trim().toUpperCase()) : [];
      if (nocoModalities.includes(selectedModality)) {
        return true;
      }

      // Verifica no EVO
      const unitMemberships = allMemberships?.filter(m => m.idBranch === unit.idBranch);
      return unitMemberships?.some(membership =>
        membership.differentials?.some(differential =>
          differential.title.trim().toUpperCase() === selectedModality
        )
      );
    });
  }, [units, selectedModality, allMemberships]);

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="unidades">
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[25vw] font-black italic uppercase leading-none -translate-x-10">LOCATIONS</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            NOSSAS <span className="text-transparent transition-all duration-500 [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">UNIDADES</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mt-2">Operação Global 24/7</p>
        </div>

        {/* Filtro de Modalidade com Botões */}
        <div className="mb-16 p-4 rounded-lg bg-zinc-950/50 border border-white/10">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
            Filtre por Modalidade
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Button
              size="sm"
              onClick={() => setSelectedModality("all")}
              className={cn(
                "rounded-full font-bold transition-all duration-300",
                selectedModality === "all"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "bg-zinc-800 text-white/70 hover:bg-zinc-700 hover:text-white"
              )}
            >
              Todas
            </Button>
            {availableModalities.map(modality => (
              <Button
                key={modality}
                size="sm"
                onClick={() => setSelectedModality(modality)}
                className={cn(
                  "rounded-full font-bold transition-all duration-300",
                  selectedModality === modality
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "bg-zinc-800 text-white/70 hover:bg-zinc-700 hover:text-white"
                )}
              >
                {modality}
              </Button>
            ))}
          </div>
        </div>

        {(unitsLoading || membershipsLoading) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[480px] bg-white/5 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.length > 0 ? (
              <>
                {filteredUnits.map((unit, index) => (
                  <UnitCard
                    key={index}
                    unit={unit}
                    allMemberships={allMemberships || []}
                  />
                ))}
                {(selectedModality === "all") && (
                  <>
                    {[
                      { name: "DARKS GYM SÃO CAETANO", address: "São Caetano do Sul, SP" },
                      { name: "DARKS GYM SOROCABA", address: "Sorocaba, SP" },
                    ].map((comingSoonUnit) => (
                      <div
                        key={comingSoonUnit.name}
                        className="relative overflow-hidden rounded-xl bg-zinc-950 border border-cyan-400/30 flex flex-col h-full min-h-[400px]"
                      >
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(34,211,238,0.03)_10px,rgba(34,211,238,0.03)_20px)]" />
                        <div className="relative z-10 flex flex-col flex-grow p-6 items-center justify-between">
                          <div className="w-full flex items-start justify-between">
                            <div className="flex flex-wrap gap-1">
                              <Badge className="inline-flex items-center px-2 py-0.5 bg-cyan-400 text-black text-[8px] font-black uppercase tracking-tighter">
                                <Gem size={10} className="mr-1" /> DIAMOND
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-center text-center flex-grow justify-center py-8">
                            <HardHat size={56} className="text-cyan-400/60 mb-4 animate-bounce" />
                            <Badge className="bg-yellow-500 text-black text-xs font-black uppercase tracking-widest px-4 py-1.5 mb-4">
                              EM OBRA
                            </Badge>
                            <h3 className="font-black italic uppercase tracking-tighter leading-none text-2xl text-white mb-2">
                              {comingSoonUnit.name}
                            </h3>
                            <p className="text-xs text-white/50 font-medium">{comingSoonUnit.address}</p>
                          </div>
                          <p className="text-[10px] text-cyan-400/50 font-bold uppercase tracking-widest text-center">
                            Em breve
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <div className="md:col-span-3 text-center text-white/50 py-10">
                <p className="text-lg">Nenhuma unidade encontrada para a modalidade selecionada.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UnitsSection;