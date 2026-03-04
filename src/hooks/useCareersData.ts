import { useQuery } from "@tanstack/react-query";

// Define a estrutura baseada nos campos da sua tabela NocoDB
export interface NocoDBCareer {
  Id?: number; // Tornando opcional para permitir criação sem ID prévio
  Nome: string;
  Email: string;
  Telefone: string;
  Cargo: string;
  Mensagem: string;
  Curriculo: string; // URL do currículo
  DataCadastro?: string;
  Status?: string;
}

const NOCODB_API_BASE_URL = "https://auto-nocodb.fesqdn.easypanel.host/api/v2/tables";
const NOCODB_TABLE_ID = "b4b62cfe-d329-4b29-bdc2-a203234f0e11";
const NOCODB_VIEW_ID = "vw97xyuevbzk8sj0";
const NOCODB_API_TOKEN = "nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H"; // Token de API

const headers = {
  "Content-Type": "application/json",
  "xc-token": NOCODB_API_TOKEN,
};

const fetchCareers = async (): Promise<NocoDBCareer[]> => {
  const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records?viewId=${NOCODB_VIEW_ID}&limit=100&sort=-Id`;
  
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch careers data: ${response.statusText}`);
  }

  const data = await response.json();
  
  // NocoDB retorna um objeto com um array 'list'.
  if (data && Array.isArray(data.list)) {
      return data.list as NocoDBCareer[];
  }
  
  console.error("Unexpected NocoDB API response structure:", data);
  throw new Error("Received unexpected data structure from NocoDB API.");
};

export function useCareersData() {
  return useQuery<NocoDBCareer[], Error>({
    queryKey: ["careersData"],
    queryFn: fetchCareers,
  });
}

export const submitCareerForm = async (formData: NocoDBCareer) => {
  const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records`;
  const payload = [{ ...formData, DataCadastro: new Date().toISOString().split('T')[0] }];
  
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao enviar formulário: ${errorText}`);
  }

  return response.json();
};