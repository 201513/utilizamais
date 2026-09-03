import React, { useState, useMemo } from 'react';
import { Share2, Copy, Check, Eye, Globe } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';

export const SeoTagsGeneratorTool: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('UTILIZA + | Ferramentas Online e Produtividade');
  const [description, setDescription] = useState('Acesse ferramentas online gratuitas de alta velocidade, calculadoras e artigos técnicos de SEO.');
  const [canonicalUrl, setCanonicalUrl] = useState('https://utilizamais.com.br');
  const [siteName, setSiteName] = useState('UTILIZA +');
  const [imageUrl, setImageUrl] = useState('https://utilizamais.com.br/og-banner.png');
  const [twitterHandle, setTwitterHandle] = useState('@utilizamais');
  const [copied, setCopied] = useState(false);

  const generatedHtml = useMemo(() => {
    return `<!-- Meta Tags Primárias -->
<title>${pageTitle}</title>
<meta name="title" content="${pageTitle}" />
<meta name="description" content="${description}" />
<link rel="canonical" href="${canonicalUrl}" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:title" content="${pageTitle}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${siteName}" />
<meta property="og:locale" content="pt_BR" />

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${canonicalUrl}" />
<meta property="twitter:title" content="${pageTitle}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${imageUrl}" />
<meta property="twitter:site" content="${twitterHandle}" />`;
  }, [pageTitle, description, canonicalUrl, siteName, imageUrl, twitterHandle]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    realtimeAnalytics.trackToolUsage('gerador-meta-tags-seo', 'Meta Tags HTML Copiadas');
  };

  return (
    <div id="tool-seo-generator-wrapper" className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Título da Página (Title Tag)</label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">{pageTitle.length}/60 caracteres</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">URL Canônica (Canonical)</label>
            <input
              type="url"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Description (Resumo para Google)</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">{description.length}/160 caracteres</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">URL da Imagem de Destaque (og:image 1200x630)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Perfil no Twitter / X (Opcional)</label>
            <input
              type="text"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Live Preview of Google SERP snippet */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Eye className="w-4 h-4 text-blue-600" />
            Prévia Visual no Google SERP
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-2xs max-w-xl">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span className="truncate">{canonicalUrl}</span>
            </div>
            <h4 className="text-base text-blue-700 hover:underline font-medium line-clamp-1 cursor-pointer">
              {pageTitle}
            </h4>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Code Output */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Código HTML Pronto para Copiar</label>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium shadow-xs transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Tags HTML'}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 text-blue-200 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
            {generatedHtml}
          </pre>
        </div>
      </div>
    </div>
  );
};
