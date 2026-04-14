import { useState, useEffect, useCallback } from "react";
import { Coordinates } from "@/lib/geolocation";

interface GeolocationState {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGeolocation(enabled: boolean = true): GeolocationState {
  const [state, setState] = useState<Omit<GeolocationState, 'refetch'>>({
    coordinates: null,
    loading: enabled,
    error: null,
  });
  
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => {
    setFetchKey(prev => prev + 1);
    setState(s => ({ ...s, loading: true, error: null }));
  }, []);

  useEffect(() => {
    if (!enabled) {
      setState({ coordinates: null, loading: false, error: null });
      return;
    }
    
    if (!("geolocation" in navigator)) {
      setState({
        coordinates: null,
        loading: false,
        error: "Geolocation is not supported by your browser.",
      });
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        loading: false,
        error: null,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      let errorMessage = "Geolocation error.";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Permissão de localização negada pelo usuário.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Informação de localização indisponível.";
          break;
        case error.TIMEOUT:
          errorMessage = "Tempo limite excedido ao tentar obter a localização.";
          break;
      }
      setState({
        coordinates: null,
        loading: false,
        error: errorMessage,
      });
    };

    // Request location with high accuracy
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    
  }, [enabled, fetchKey]);

  return {
    ...state,
    refetch,
  };
}