import { useQuery } from "@tanstack/react-query";

export const NOCODB_CAREERS_TABLE_ID = "mia6haac127vhn6"; 
export const NOCODB_API_BASE_URL_CLOUD = "https://app.nocodb.com/api/v2/tables";
export const NOCODB_STORAGE_UPLOAD_URL = "https://app.nocodb.com/api/v2/storage/upload";
export const NOCODB_API_TOKEN = "nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H";

export interface NocoDBCareer {
  Id?: number;
  Nome: string;
  "E-mail": string;
  Telefone: string;
  "Currículo": any;
  Motivo: string;
  "Vaga de interesse": string; // Novo campo
}

const headers = {
  "xc-token": NOCODB_API_TOKEN,
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(NOCODB_STORAGE_UPLOAD_URL, {
    method: "POST",
    headers: {
      "xc-token": NOCODB_API_TOKEN,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro no upload: ${errorText}`);
  }

  return response.json();
};

export const fetchCareers = async (): Promise<NocoDBCareer[]> => {
  const url = `${NOCODB_API_BASE_URL_CLOUD}/${NOCODB_CAREERS_TABLE_ID}/records?limit=100&sort=-Id`;
  
  const response = await fetch(url, { 
    headers: { ...headers, "Content-Type": "application/json" } 
  });
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
  const url = `${NOCODB_API_BASE_URL_CLOUD}/${NOCODB_CAREERS_TABLE_ID}/records`;
  const payload = [formData];
  
  const response = await fetch(url, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }

  return response.json();
};