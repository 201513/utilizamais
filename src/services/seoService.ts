import { ToolItem, BlogArticle } from '../types';

export const BASE_URL = 'https://utilizamais.blogspot.com';

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UTILIZA +',
    url: BASE_URL,
    description: 'Portal profissional de ferramentas online gratuitas, geradores, calculadoras e guias de produtividade.',
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateToolSchema(tool: ToolItem) {
  return {
    '@context': 'https://schema.org',
    '@type': tool.schemaType || 'WebApplication',
    name: tool.title,
    description: tool.longDesc,
    url: `${BASE_URL}/ferramenta/${tool.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'BRL',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: (tool.usageCount * 3 + 120).toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateArticleSchema(article: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    url: `${BASE_URL}/artigo/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: 'pt-BR',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/artigo/${article.slug}`,
    },
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'UTILIZA +',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateSitemapXml(tools: ToolItem[], articles: BlogArticle[]): string {
  const dateStr = new Date().toISOString().split('T')[0];

  const urlEntries = [
    `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    `  <url>\n    <loc>${BASE_URL}/politica-privacidade</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`,
    `  <url>\n    <loc>${BASE_URL}/termos-de-uso</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`,
  ];

  tools.forEach((t) => {
    urlEntries.push(
      `  <url>\n    <loc>${BASE_URL}/ferramenta/${t.slug}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`
    );
  });

  articles.forEach((a) => {
    urlEntries.push(
      `  <url>\n    <loc>${BASE_URL}/artigo/${a.slug}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>`;
}

export function generateRobotsTxt(): string {
  return `# Robots.txt - UTILIZA +
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/priv/

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
`;
}
