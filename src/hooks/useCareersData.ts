"use client";

// Estrutura baseada nos campos da sua tabela NocoDB
export interface NocoDBCareer {
  Nome: string;
  Email: string;
  Telefone: string;
  Cargo: string;
  Mensagem: string;
  Curriculo: string; // URL ou link do currículo
  DataCadastro?: string;
}

const NOCODB_API_BASE_URL = "https://auto-nocodb.fesqdn.easypanel.host/api/v2/tables";
const NOCODB_TABLE_ID = "b4b62cfe-d329-4b29-bdc2-a203234f0e11";
const NOCODB_API_TOKEN = "nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H";

const headers = {
  "Content-Type": "application/json",
  "xc-token": NOCODB_API_TOKEN,
};

export const submitCareerForm = async (formData: NocoDBCareer) => {
  const url = `${NOCODB_API_BASE_URL}/${NOCODB_TABLE_ID}/records`;
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
    throw new Error(`Erro ao enviar formulário: ${errorText}`);
  }

  return response.json();
};