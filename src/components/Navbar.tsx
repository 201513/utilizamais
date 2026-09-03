import React, { useState, useEffect } from 'react';
import { Search, Activity, Cpu, ShieldCheck, Menu, X, Wrench, BookOpen, Layers, Sparkles, Sliders, Globe } from 'lucide-react';
import { realtimeAnalytics } from '../services/analyticsService';

interface NavbarProps {
  currentView: 'home' | 'tool' | 'article' | 'blog';
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onOpenAnalytics: () => void;
  onOpenSeoInspector: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onOpenBloggerGuide: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  adsDemoMode: boolean;
  setAdsDemoMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateHome,
  onNavigateBlog,
  onOpenAnalytics,
  onOpenSeoInspector,
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenBloggerGuide,
  searchQuery,
  setSearchQuery,
  adsDemoMode,
  setAdsDemoMode,
}) => {
  const [liveCount, setLiveCount] = useState(47);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = realtimeAnalytics.subscribe((m) => {
      setLiveCount(m.liveUsers);
    });
    return unsub;
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xs group-hover:from-blue-700 group-hover:to-indigo-800 transition">
                <Wrench className="w-4 h-4 text-white transition" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    UTILIZA
                  </span>
                  <span className="px-1.5 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black rounded-md tracking-tighter shadow-2xs">
                    +
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase -mt-0.5">
                  Ferramentas & Blog
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 text-sm font-semibold">
              <button
                type="button"
                onClick={onNavigateHome}
                className={`px-4 py-1.5 rounded-full transition ${
                  currentView === 'home' || currentView === 'tool'
                    ? 'text-blue-700 bg-blue-50/90 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Todas as Ferramentas
              </button>
              <button
                type="button"
                onClick={onNavigateBlog}
                className={`px-4 py-1.5 rounded-full transition ${
                  currentView === 'blog' || currentView === 'article'
                    ? 'text-blue-700 bg-blue-50/90 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Artigos & Guias
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ferramenta, validador ou guia (Ex: CPF, Juros, SEO)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-50 border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons on desktop */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Real-time users badge */}
            <button
              type="button"
              onClick={onOpenAnalytics}
              title="Abrir telemetria em tempo real"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-semibold transition cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>{liveCount} online</span>
              <Activity className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* SEO Inspector */}
            <button
              type="button"
              onClick={onOpenSeoInspector}
              title="Inspecionar SEO Técnico e Schemas"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 text-slate-700 rounded-full text-xs font-semibold transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              SEO Técnico
            </button>

            {/* AdSense Mode Toggle */}
            <button
              type="button"
              onClick={() => setAdsDemoMode(!adsDemoMode)}
              title="Alternar modo demonstração de anúncios"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                adsDemoMode
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {adsDemoMode ? 'AdSense Demo' : 'AdSense Real'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenAnalytics}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {liveCount}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search field */}
        <div className="pb-3 sm:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ferramentas ou artigos..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2 bg-white">
            <button
              type="button"
              onClick={() => { onNavigateHome(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              🛠️ Todas as Ferramentas
            </button>
            <button
              type="button"
              onClick={() => { onNavigateBlog(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              📚 Blog e Guias Técnicos
            </button>
            <button
              type="button"
              onClick={() => { onOpenSeoInspector(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              🔍 Inspetor de SEO Técnico
            </button>
            <button
              type="button"
              onClick={() => { onOpenAnalytics(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              📊 Telemetria em Tempo Real ({liveCount} ativos)
            </button>
            <button
              type="button"
              onClick={() => { onOpenPrivacyPolicy(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              🛡️ Política de Privacidade (LGPD)
            </button>
            <button
              type="button"
              onClick={() => { onOpenTerms(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              📄 Termos de Uso
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
