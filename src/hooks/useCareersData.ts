import { useQuery } from "@tanstack/react-query";

// IMPORTANTE: Verifique o ID correto da tabela 'cadastro-de-curriculos' no seu NocoDB
// O ID 'b4b62cfe...' parece estar incorreto (retornando 404).
export const NOCODB_CAREERS_TABLE_ID = "b4b62cfe-d329-4b29-bdc2-a203234f0e11"; 
const NOCODB_API_BASE_URL = "https://auto-nocodb.fesqdn.easypanel.host/api/v2/tables";
const NOCODB_API_TOKEN = "nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H";

export interface NocoDBCareer {
  Id?: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cargo: string;
  Mensagem: string;
  Curriculo: string;
  DataCadastro?: string;
}

const headers = {
  "Content-Type": "application/json",
  "xc-token": NOCODB_API_TOKEN,
};

export const fetchCareers = async (): Promise<NocoDBCareer[]> => {
  const url = `${NOCODB_API_BASE_URL}/${NOCODB_CAREERS_TABLE_ID}/records?limit=100&sort=-Id`;
  
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Erro ao buscar candidaturas: ${response.statusText}`);
  }

  const data = await response.json();
  return data.list || [];
};

export function useCareersData() {
  return useQuery<NocoDBCareer[], Error>({
    queryKey: ["careersData"],
    queryFn: fetchCareers,
  });
}

export const submitCareerForm = async (formData: NocoDBCareer) => {
  const url = `${NOCODB_API_BASE_URL}/${NOCODB_CAREERS_TABLE_ID}/records`;
  const payload = [{ 
    ...formData, 
    DataCadastro: new Date().toISOString().split('T')[0] 
  }];
  
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }

  return response.json();
};