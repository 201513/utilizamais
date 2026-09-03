import React from 'react';
import { ExternalLink, Info, Sparkles } from 'lucide-react';
import { realtimeAnalytics } from '../services/analyticsService';

export interface AdSenseSlotProps {
  slotType: 'header-leaderboard' | 'in-article' | 'sidebar-sticky' | 'multiplex' | 'footer-banner';
  slotId?: string;
  demoMode?: boolean;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotType,
  slotId = '1234567890',
  demoMode = true,
}) => {
  const handleClickAd = () => {
    realtimeAnalytics.trackAdClick(slotType);
  };

  const getDimensions = () => {
    switch (slotType) {
      case 'header-leaderboard':
        return 'min-h-[90px] max-w-[728px]';
      case 'in-article':
        return 'min-h-[250px] max-w-[650px]';
      case 'sidebar-sticky':
        return 'min-h-[300px] w-full max-w-[320px]';
      case 'multiplex':
        return 'min-h-[220px] w-full';
      case 'footer-banner':
        return 'min-h-[90px] max-w-[970px]';
    }
  };

  return (
    <div
      className={`mx-auto my-4 w-full flex flex-col items-center justify-center ${getDimensions()}`}
      role="region"
      aria-label="Espaço Publicitário"
    >
      {/* Label required by AdSense guidelines */}
      <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-medium px-2 py-0.5 tracking-wider uppercase">
        <span>Publicidade</span>
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-slate-400" />
          Anúncios Google
        </span>
      </div>

      {demoMode ? (
        /* Realistic Demo Ad Unit for preview and layout testing */
        <div
          onClick={handleClickAd}
          className="w-full border border-dashed border-slate-300 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-blue-400 hover:shadow-xs transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
              AD
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h5 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition">
                  {slotType === 'header-leaderboard' && 'Hospedagem Cloud Ultrarrápida para Sites & Blogs'}
                  {slotType === 'in-article' && 'Certificado Digital e Segurança Web com 40% OFF'}
                  {slotType === 'sidebar-sticky' && 'Software Financeiro Completo para Empreendedores'}
                  {slotType === 'multiplex' && 'Ferramenta de Automação de Marketing Digital'}
                  {slotType === 'footer-banner' && 'Plataforma de Investimentos e Renda Fixa'}
                </h5>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Carregamento instantâneo, servidores em São Paulo e suporte 24/7. Experimente grátis.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-block px-4 py-1.5 bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 text-white rounded-full text-xs font-semibold shadow-2xs transition">
              Saiba Mais
            </span>
          </div>
        </div>
      ) : (
        /* Real AdSense tag slot */
        <div className="w-full text-center py-2 bg-slate-50 rounded border border-slate-200">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}
    </div>
  );
};
