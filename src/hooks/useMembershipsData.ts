import { useQuery } from "@tanstack/react-query";

export interface MembershipDifferential {
  title: string;
  order: number;
}

export interface Membership {
  idMembership: number;
  idBranch: number;
  nameMembership: string;
  membershipType: string;
  durationType: string;
  duration: number;
  updateDate: string;
  value: number;
  maxAmountInstallments: number;
  description: string;
  urlSale: string;
  onlineSalesObservations: string | null;
  differentials: MembershipDifferential[];
  accessBranches: any | null;
  additionalService: any | null;
  serviceYearly: any | null;
  typePromotionalPeriod: number;
  valuePromotionalPeriod: number;
  monthsPromotionalPeriod: number;
  daysPromotionalPeriod: number;
  minPeriodStayMembership: any | null;
  installmentsPromotionalPeriod: any | null;
  activitiesGroups: any | null;
  inactive: boolean;
  displayName: string;
  entries: {
    entriesQuantity: number;
    idEntriesType: number;
    entriesTypeDescription: string;
  };
}

interface EvoApiResponse {
  qtde: number;
  lista: any | null;
  list: Membership[];
}

const EVO_API_PROXY_PATH = "/api-evo";

// Adicionando ambas as chaves de API diretamente para garantir que os planos de todas as unidades sejam carregados.
const EVO_API_KEYS = [
  'ZGFya3NneW06NDc4Nzk2MzgtODFBMS00QUM5LUJCRUUtNzdDREMwNENCRUNG', // Chave da API de Santo André
  'ZGFya3NneW06NUQ1RkZBQzAtNjNEQy00NzI3LTk5QjEtMzcyNkYxQjc3MDY3', // Chave da API de Mauá
  'ZGFya3NneW06NzhEODI5QzItMDJDNC00QkVBLUJDNkEtMjBFNUVEOTJEMjFF',
  'ZGFya3NneW06RjJBNkQzRTAtN0U3RS00MUZCLThCRTktQjI4Q0EwRDAyRUFB'  // Chave da API de Jorge
].filter(Boolean); // Filtra chaves que possam ser vazias ou undefined

const fetchMemberships = async (): Promise<Membership[]> => {
  const url = `${EVO_API_PROXY_PATH}/api/v2/membership?take=200&skip=0&active=true&showAccessBranches=false&showOnlineSalesObservation=false&showActivitiesGroups=false&externalSaleAvailable=false`;

  // Cria uma promessa de fetch para cada chave de API
  const promises = EVO_API_KEYS.map(apiKey =>
    fetch(url, {
      headers: {
        "accept": "text/plain",
        "Authorization": `Basic ${apiKey}`,
      },
    }).then(response => {
      if (!response.ok) {
        console.error(`Falha ao buscar planos para uma das chaves: ${response.statusText}`);
        return { list: [] }; // Retorna uma lista vazia em caso de erro para não quebrar a aplicação
      }
      return response.json();
    })
  );

  // Aguarda todas as chamadas terminarem
  const results = await Promise.all(promises);

  // Combina as listas de planos de todas as respostas em um único array
  const allMemberships = results.flatMap(result => (result && result.list ? result.list : []));

  if (allMemberships.length === 0 && EVO_API_KEYS.length > 0) {
    console.warn("Nenhum plano encontrado. Verifique se as chaves da API estão corretas e se há planos cadastrados.");
  }

  return allMemberships;
};

export function useMembershipsData() {
  return useQuery<Membership[], Error>({
    queryKey: ["membershipsData"],
    queryFn: fetchMemberships,
  });
}