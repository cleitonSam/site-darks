import React from "react";
import { MapPin, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToggleGeolocation } from "@/hooks/useToggleGeolocation";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const GeolocationStatusIndicator: React.FC = () => {
  const { coordinates, loading, error, isEnabled, toggle, refetch } = useToggleGeolocation();

  let icon;
  let className;

  if (!isEnabled) {
    icon = <MapPin className="h-5 w-5" />;
    className = "text-muted-foreground/50";
  } else if (loading) {
    icon = <Loader2 className="h-5 w-5 animate-spin" />;
    className = "text-muted-foreground";
  } else if (error) {
    icon = <XCircle className="h-5 w-5" />;
    className = "text-destructive";
  } else if (coordinates) {
    icon = <MapPin className="h-5 w-5" />;
    className = "text-primary";
  }

  // Se houver erro e a geolocalização estiver ativada, mostramos um botão de tentar novamente.
  const showRefetchButton = isEnabled && error;

  return (
    <div className="flex items-center space-x-3">
      {/* Switch para Ativar/Desativar */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground hidden sm:inline">Localização</span>
        <Switch
          checked={isEnabled}
          onCheckedChange={toggle}
          aria-label="Ativar geolocalização"
        />
      </div>
      
      {/* Ícone de Status */}
      <div
        className={cn(
          "p-2 rounded-full transition-colors duration-300",
          className
        )}
        aria-label="Status da Geolocalização"
      >
        {icon}
      </div>
      
      {/* Botão de Tentar Novamente (se houver erro) */}
      {showRefetchButton && (
        <Button onClick={refetch} size="sm" variant="outline" className="h-8">
          Tentar Novamente
        </Button>
      )}
    </div>
  );
};

export default GeolocationStatusIndicator;