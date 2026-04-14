import { defineConfig, loadEnv } from "vite"; // Importar loadEnv
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => { // Receber 'mode' para loadEnv
  // Carregar variáveis de ambiente com base no modo
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api-evo': { // Quando o frontend requisitar /api-evo
          target: 'https://evo-integracao-api.w12app.com.br', // Redirecionar para a URL real da API
          changeOrigin: true, // Necessário para hosts virtuais
          rewrite: (path) => path.replace(/^\/api-evo/, ''), // Remover o prefixo /api-evo antes de enviar para a API
          secure: false, // Definir como false se o certificado SSL do target for autoassinado ou inválido
        },
      },
    },
    plugins: [dyadComponentTagger(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Expor variáveis de ambiente para o cliente
    define: {
      'process.env': env
    }
  };
});