import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "DARK'SGYM | Elite Fitness & Treinamento 24h",
  description = "Domine seu corpo na DARK'SGYM. Equipamentos de ponta, ambiente de elite e funcionamento 24 horas. Encontre a unidade mais próxima e comece seu legado.",
  imageUrl = "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/main/DSC01359.jpg",
  url = "https://www.darksgym.com.br", // IMPORTANTE: Atualize com seu domínio final
}) => {
  const fullTitle = `${title}`;
  const siteName = "DARK'SGYM";

  // Schema.org para dados estruturados (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsClub',
    name: "DARK'SGYM",
    description: description,
    image: imageUrl,
    url: url,
    telephone: '+5511999999999',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Martim Francisco, 786',
      addressLocality: 'Santo André',
      addressRegion: 'SP',
      postalCode: '09230-700',
      addressCountry: 'BR',
    },
    openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    sameAs: ['https://www.instagram.com/darks.gym/'],
  };

  return (
    <Helmet>
      {/* Tags Padrão */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Dados Estruturados */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;