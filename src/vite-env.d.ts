/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOCODB_API_TOKEN: string;
  readonly VITE_EVO_API_KEY_SANTO_ANDRE: string;
  readonly VITE_EVO_API_KEY_MAUA: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}