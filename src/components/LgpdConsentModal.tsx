import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { LgpdPreferences } from '../types';
import { realtimeAnalytics } from '../services/analyticsService';

interface LgpdConsentProps {
  onOpenPrivacyPolicy: () => void;
}

export const LgpdConsentModal: React.FC<LgpdConsentProps> = ({ onOpenPrivacyPolicy }) => {
  const [preferences, setPreferences] = useState<LgpdPreferences>({
    consentGiven: false,
    essential: true,
    analytics: true,
    marketing: true,
    updatedAt: '',
  });

  const [showBanner, setShowBanner] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('utilizamais_lgpd_consent');
      if (stored) {
        setPreferences(JSON.parse(stored));
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (updated: Partial<LgpdPreferences>) => {
    const finalPrefs: LgpdPreferences = {
      ...preferences,
      ...updated,
      consentGiven: true,
      essential: true,
      updatedAt: new Date().toISOString(),
    };
    setPreferences(finalPrefs);
    try {
      localStorage.setItem('utilizamais_lgpd_consent', JSON.stringify(finalPrefs));
    } catch {
      // storage disabled
    }
    setShowBanner(false);
    setShowPreferencesModal(false);
    realtimeAnalytics.trackConsent(finalPrefs.analytics, finalPrefs.marketing);
  };

  const handleAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ analytics: false, marketing: false });
  };

  if (!showBanner && !showPreferencesModal) {
    return null;
  }

  return (
    <>
      {/* Persistent Bottom Banner */}
      {showBanner && (
        <div
          id="lgpd-consent-banner"
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl transition-all animate-fade-in"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 max-w-3xl">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-semibold">Respeitamos a sua privacidade (LGPD - Lei nº 13.709/2018):</strong>{' '}
                  Utilizamos cookies e tecnologias de cache local para oferecer carregamento ultrarrápido, personalizar conteúdo com o Google AdSense e analisar nosso tráfego em tempo real. Suas ferramentas rodam de forma privada e segura no seu dispositivo.
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={onOpenPrivacyPolicy}
                    className="text-blue-600 underline font-medium hover:text-blue-700"
                  >
                    Ler Política de Privacidade
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreferencesModal(true)}
                    className="text-slate-500 hover:text-slate-800 underline"
                  >
                    Personalizar preferências
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
              <button
                id="btn-lgpd-customize"
                type="button"
                onClick={() => setShowPreferencesModal(true)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition"
              >
                Opções
              </button>
              <button
                id="btn-lgpd-reject"
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-semibold transition"
              >
                Recusar Não Essenciais
              </button>
              <button
                id="btn-lgpd-accept"
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full text-xs font-bold transition shadow-xs"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Granular Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Gerenciador de Consentimento e Cookies</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Em total conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD), você tem total autonomia para autorizar ou restringir o uso de identificadores digitais no seu navegador.
            </p>

            <div className="space-y-3">
              {/* Essenciais */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">Cookies & Cache Estritamente Essenciais</h4>
                    <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">Obrigatório</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Garantem o funcionamento básico das ferramentas, a segurança da navegação e o armazenamento em memória para carregamento veloz.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 text-blue-600 rounded opacity-60 mt-1" />
              </div>

              {/* Analíticos */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Métricas & Análise em Tempo Real</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Permitem monitorar páginas acessadas, taxa de rejeição e tempo de interação para aprimoramento contínuo da experiência.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer mt-1 focus:ring-blue-500"
                />
              </div>

              {/* Marketing / AdSense */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Publicidade & Google AdSense</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Habilitam o fornecimento de anúncios relevantes e sustentam a gratuidade das ferramentas e artigos do portal.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer mt-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => saveConsent({ analytics: preferences.analytics, marketing: preferences.marketing })}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full text-xs font-bold shadow-xs"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
