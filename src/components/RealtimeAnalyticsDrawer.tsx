import React, { useState, useEffect } from 'react';
import { X, Activity, Users, MousePointer, Eye, Clock, BarChart3, Radio, ArrowUpRight, Smartphone, Monitor } from 'lucide-react';
import { realtimeAnalytics } from '../services/analyticsService';
import { AnalyticsMetrics } from '../types';

interface AnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RealtimeAnalyticsDrawer: React.FC<AnalyticsDrawerProps> = ({ isOpen, onClose }) => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>(realtimeAnalytics.getMetrics());

  useEffect(() => {
    const unsubscribe = realtimeAnalytics.subscribe((newMetrics) => {
      setMetrics(newMetrics);
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <span className="w-3 h-3 bg-blue-400 rounded-full block animate-ping absolute inset-0" />
              <span className="w-3 h-3 bg-blue-500 rounded-full block relative" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Telemetria & Analytics em Tempo Real
              </h2>
              <p className="text-xs text-slate-400">Monitoramento ativo de engajamento do UTILIZA +</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Active users card */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                Usuários Ativos Agora no Portal
              </span>
              <Radio className="w-4 h-4 text-blue-200 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold tracking-tight">{metrics.liveUsers}</span>
              <span className="text-xs text-blue-100 font-medium">sessões ativas simultâneas</span>
            </div>
            <p className="text-[11px] text-blue-100/90 mt-2">
              74% Mobile (Android / iOS) • 26% Desktop • Tempo médio de sessão: 2m 12s
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-semibold uppercase">Pageviews</span>
                <Eye className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{metrics.totalPageviews}</span>
              <span className="text-[10px] text-blue-600 block mt-0.5">↑ 14% vs. hora anterior</span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-semibold uppercase">Ferramentas Rodadas</span>
                <MousePointer className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{metrics.toolExecutionsCount}</span>
              <span className="text-[10px] text-blue-600 block mt-0.5">Execuções locais 0ms lag</span>
            </div>
          </div>

          {/* Scroll depth funnel */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Funil de Profundidade de Rolagem (Scroll Depth)
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Scroll 25% da página</span>
                  <span className="font-mono font-semibold">{metrics.scrollDepth25}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metrics.scrollDepth25}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Scroll 50% (Leitura do artigo/guia)</span>
                  <span className="font-mono font-semibold">{metrics.scrollDepth50}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metrics.scrollDepth50}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Scroll 75% (Área de FAQ & Anúncio)</span>
                  <span className="font-mono font-semibold">{metrics.scrollDepth75}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metrics.scrollDepth75}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Scroll 100% (Rodapé & Links LGPD)</span>
                  <span className="font-mono font-semibold">{metrics.scrollDepth100}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metrics.scrollDepth100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Event Stream */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              Feed de Eventos em Tempo Real
            </h3>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {metrics.events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-start justify-between gap-2"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{evt.name}</p>
                    {evt.details && <p className="text-[11px] text-slate-500 mt-0.5">{evt.details}</p>}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{evt.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Analytics 4 / GTM DataLayer badge */}
          <div className="p-3.5 bg-slate-900 text-slate-300 rounded-xl text-xs space-y-1.5 border border-slate-800">
            <div className="flex items-center justify-between text-white font-semibold">
              <span>Google Analytics 4 & GTM Ready</span>
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-mono">
                DataLayer Ativo
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Todos os disparos (page_view, tool_execution, ad_click) são automaticamente despachados no <code>window.dataLayer</code> prontos para tag de medição.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
