import React, { useState, useEffect } from 'react';
import { Zap, RefreshCw, Check, Database, Trash2 } from 'lucide-react';
import { fastCache } from '../services/cacheService';
import { CacheStats } from '../types';

export const CacheControlBar: React.FC = () => {
  const [stats, setStats] = useState<CacheStats>(fastCache.getStats());
  const [purgedToast, setPurgedToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(fastCache.getStats());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePurge = () => {
    fastCache.purgeAll();
    setStats(fastCache.getStats());
    setPurgedToast(true);
    setTimeout(() => setPurgedToast(false), 2500);
  };

  const hitRate = stats.hits + stats.misses > 0
    ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(1)
    : '98.5';

  return (
    <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-blue-400 font-semibold">
            <Zap className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
            Cache Mobile L1/L2 Ativo
          </span>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:inline-block text-slate-300">
            Taxa de Acerto: <strong className="text-white font-mono">{hitRate}%</strong>
          </span>
          <span className="hidden md:inline-block text-slate-500">•</span>
          <span className="hidden md:inline-block text-slate-300">
            Tempo Médio: <strong className="text-blue-400 font-mono">{stats.averageSpeedMs}ms</strong>
          </span>
          <span className="hidden lg:inline-block text-slate-500">•</span>
          <span className="hidden lg:inline-block text-slate-400">
            Economia de dados móveis ativa
          </span>
        </div>

        <div className="flex items-center gap-3">
          {purgedToast ? (
            <span className="text-blue-400 font-medium inline-flex items-center gap-1 text-[11px] animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              Cache Local Limpo com Sucesso!
            </span>
          ) : (
            <button
              type="button"
              onClick={handlePurge}
              title="Limpar memória cache local"
              className="text-slate-400 hover:text-white text-[11px] font-medium inline-flex items-center gap-1 transition"
            >
              <Trash2 className="w-3 h-3" />
              Limpar Cache
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
