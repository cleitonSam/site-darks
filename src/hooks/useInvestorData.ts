import { useQuery } from "@tanstack/react-query";

export const NOCODB_INVESTOR_TABLE_ID = "mr6apeqfyqput1z";
const NOCODB_API_BASE_URL_CLOUD = "https://app.nocodb.com/api/v2/tables";
const NOCODB_API_TOKEN = "nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H";

export interface NocoDBInvestor {
  Id?: number;
  Nome: string;
  Sobrenome: string;
  Email: string;
  WhatsApp: string;
  Investimento: string;
}

const headers = {
  "Content-Type": "application/json",
  "xc-token": NOCODB_API_TOKEN,
};

export const submitInvestorForm = async (formData: NocoDBInvestor) => {
  const url = `${NOCODB_API_BASE_URL_CLOUD}/${NOCODB_INVESTOR_TABLE_ID}/records`;
  const payload = [formData];
  
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
