import { useQuery } from "@tanstack/react-query";
import { calculateDistance, Coordinates } from "@/lib/geolocation";

// Define a estrutura baseada nos campos da sua tabela NocoDB
export interface NocoDBUnit {
  Id: number; // NocoDB usa 'Id' para o ID do registro
  Unidade: string;
  Endereco: string; // Mantendo Endereco para a exibição pública
  Horario: string;
  Modalidade?: string;
  Foto?: string; // URL da foto
  WhatsApp?: string;
  Descricao?: string;
  Latitude: number;
  Longitude: number;
  Status?: string;
  DataCadastro?: string;
  Promocao?: boolean; // Assumindo boolean para 'Promocao'
  Instagram?: string; // URL do Instagram
  'Link de compra'?: string; // Link de compra
  'Em Breve'?: boolean; // Assumindo boolean para 'Em Breve'
  idBranch?: number; // NOVO: ID da filial da API EVO
}

export interface UnitWithDistance extends NocoDBUnit {
  distanceKm?: number;
}

// Configurações da API NocoDB (sugiro mover para variáveis de ambiente)
const NOCODB_API_BASE_URL = "https://auto-nocodb.fesqdn.easypanel.host/api/v2/tables";
const NOCODB_TABLE_ID = "m02vprrpto5vac3"; // ID da tabela "cadastro-de-unidades"
const NOCODB_VIEW_ID = "vw97xyuevbzk8sj0"; // ID da visualização
const NOCODB_API_TOKEN = import.meta.env.VITE_NOCODB_API_TOKEN; // Usando variável de ambiente

const fetchUnits = async (): Promise<NocoDBUnit[]> => {
  const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records?viewId=${NOCODB_VIEW_ID}&limit=100&sort=-Id`; // Adicionado sort para consistência
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "xc-token": NOCODB_API_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch units data: ${response.statusText}`);
  }

  const data = await response.json();
  
  // NocoDB retorna um objeto com um array 'list'.
  if (data && Array.isArray(data.list)) {
      return data.list as NocoDBUnit[];
  }
  
  console.error("Unexpected NocoDB API response structure:", data);
  throw new Error("Received unexpected data structure from NocoDB API.");
};

export function useUnitsData(userCoords: Coordinates | null) {
  const queryResult = useQuery<NocoDBUnit[], Error>({
    queryKey: ["unitsData"],
    queryFn: fetchUnits,
  });

  // Process data to calculate distance and sort
  const processedData = queryResult.data
    ? queryResult.data.map((unit) => {
        let distanceKm: number | undefined;
        
        // Ensure Latitude and Longitude are valid numbers before calculating
        const unitLat = parseFloat(String(unit.Latitude));
        const unitLon = parseFloat(String(unit.Longitude));

        if (userCoords && !isNaN(unitLat) && !isNaN(unitLon)) {
          distanceKm = calculateDistance(
            userCoords.latitude,
            userCoords.longitude,
            unitLat,
            unitLon
          );
        }

        return {
          ...unit,
          distanceKm: distanceKm ? parseFloat(distanceKm.toFixed(1)) : undefined,
        } as UnitWithDistance;
      })
    : [];

  // Sort units by distance if user location is available
  if (userCoords && processedData.length > 0) {
    processedData.sort((a, b) => {
      // Prioritize units with calculated distance
      if (a.distanceKm === undefined) return 1;
      if (b.distanceKm === undefined) return -1;
      return a.distanceKm - b.distanceKm;
    });
  }

  return {
    ...queryResult,
    data: processedData,
  };
}