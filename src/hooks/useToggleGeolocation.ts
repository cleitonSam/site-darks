import { useState, useEffect } from "react";
import { useGeolocation } from "./useGeolocation";
import { Coordinates } from "@/lib/geolocation";

const GEOLOCATION_STORAGE_KEY = "geolocation_enabled";

interface ToggleGeolocationState {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
  isEnabled: boolean;
  toggle: () => void;
  refetch: () => void;
}

export function useToggleGeolocation(): ToggleGeolocationState {
  // 1. Gerenciar o estado de ativação/desativação (persistido no localStorage)
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(GEOLOCATION_STORAGE_KEY);
      // Por padrão, a geolocalização é ativada na primeira visita
      return storedValue === null ? true : storedValue === 'true';
    }
    return true;
  });

  // 2. Sincronizar o estado de ativação com o hook de geolocalização
  const { coordinates, loading, error, refetch } = useGeolocation(isEnabled);

  // 3. Função para alternar e salvar no localStorage
  const toggle = () => {
    setIsEnabled(prev => {
      const newState = !prev;
      localStorage.setItem(GEOLOCATION_STORAGE_KEY, String(newState));
      return newState;
    });
  };

  return {
    coordinates,
    loading,
    error,
    isEnabled,
    toggle,
    refetch,
  };
}