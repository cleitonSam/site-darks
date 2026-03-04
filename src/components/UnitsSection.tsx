"use client";

import React, { useState, useMemo } from "react";
import { useUnitsData } from "@/hooks/useUnitsData";
import { useToggleGeolocation } from "@/hooks/useToggleGeolocation";
import { useMembershipsData } from "@/hooks/useMembershipsData";
import UnitCard from "@/components/UnitCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        };
      })
    : [], [unitsData, geoEnabled]);

  const uniqueModalities = useMemo(() => {
    const modalities = new Set<string>();
    allMemberships?.forEach(membership => {
      membership.differentials?.forEach(differential => {
        if (differential.title) {
          modalities.add(differential.title.trim().toUpperCase());
        }
      });
    });
    return Array.from(modalities).sort();
  }, [allMemberships]);

  const filteredUnits = useMemo(() => {
    if (selectedModality === "all") {
      return units;
    }
    return units.filter(unit => {
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
            {uniqueModalities.map(modality => (
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
              filteredUnits.map((unit, index) => (
                <UnitCard 
                  key={index} 
                  unit={unit} 
                  allMemberships={allMemberships || []}
                />
              ))
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