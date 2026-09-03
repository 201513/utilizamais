import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, Clock, Volume2, Sparkles, BarChart2 } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';

export const TextCounterTool: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Statistics calculation
  const stats = useMemo(() => {
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s+/g, '').length;
    
    // Words
    const trimmed = text.trim();
    const wordsArray = trimmed ? trimmed.split(/\s+/) : [];
    const wordsCount = wordsArray.length;

    // Sentences
    const sentencesCount = trimmed ? (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;

    // Paragraphs
    const paragraphsCount = trimmed ? trimmed.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

    // Read & speech time
    const readingMinutes = Math.ceil(wordsCount / 200);
    const speechMinutes = Math.ceil(wordsCount / 130);

    // Keyword density
    const stopWords = new Set(['a', 'o', 'as', 'os', 'e', 'de', 'do', 'da', 'dos', 'das', 'um', 'uma', 'uns', 'umas', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'que', 'se', 'ao', 'aos', 'seu', 'sua']);
    const frequencyMap: Record<string, number> = {};
    
    wordsArray.forEach((w) => {
      const cleanWord = w.toLowerCase().replace(/[^\wÀ-ú]/g, '');
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        frequencyMap[cleanWord] = (frequencyMap[cleanWord] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: wordsCount > 0 ? ((count / wordsCount) * 100).toFixed(1) : '0',
      }));

    return {
      charsWithSpaces,
      charsWithoutSpaces,
      wordsCount,
      sentencesCount,
      paragraphsCount,
      readingMinutes,
      speechMinutes,
      topKeywords,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    realtimeAnalytics.trackToolUsage('contador-caracteres-seo', 'Texto copiado');
  };

  const handleClear = () => {
    setText('');
  };

  // Case transforms
  const applyTransform = (type: 'upper' | 'lower' | 'title') => {
    if (!text) return;
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(
        text.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
      );
    }
  };

  return (
    <div id="tool-text-counter-wrapper" className="space-y-6">
      {/* Metrics Header Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Caracteres</span>
          <span className="text-3xl font-extrabold text-slate-900 mt-1 block">{stats.charsWithSpaces}</span>
          <span className="text-[11px] text-slate-400">({stats.charsWithoutSpaces} sem espaços)</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Palavras</span>
          <span className="text-3xl font-extrabold text-blue-600 mt-1 block">{stats.wordsCount}</span>
          <span className="text-[11px] text-slate-400">{stats.sentencesCount} frases</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Tempo de Leitura</span>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-2xl font-extrabold text-slate-900">{stats.readingMinutes} min</span>
          </div>
          <span className="text-[11px] text-slate-400">200 palavras/min</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Tempo de Fala</span>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Volume2 className="w-4 h-4 text-indigo-500" />
            <span className="text-2xl font-extrabold text-slate-900">{stats.speechMinutes} min</span>
          </div>
          <span className="text-[11px] text-slate-400">130 palavras/min</span>
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ações Rápidas:</span>
            <button
              type="button"
              onClick={() => applyTransform('upper')}
              className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
            >
              MAIÚSCULAS
            </button>
            <button
              type="button"
              onClick={() => applyTransform('lower')}
              className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
            >
              minúsculas
            </button>
            <button
              type="button"
              onClick={() => applyTransform('title')}
              className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
            >
              Título Capitalizado
            </button>
          </div>

          <div className="flex items-center gap-2">
            {text && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-full transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-full transition disabled:opacity-40 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Texto'}
            </button>
          </div>
        </div>

        <textarea
          id="textarea-text-counter"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder="Cole ou digite seu texto aqui para iniciar a contagem em tempo real e análise SEO completa..."
          className="w-full p-4 text-base text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-y font-sans leading-relaxed"
        />

        {/* SEO Limits Progress Bars */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-slate-700">Título SEO Google (Meta Title)</span>
              <span className={`font-mono ${stats.charsWithSpaces > 60 ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                {stats.charsWithSpaces}/60
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  stats.charsWithSpaces <= 60 ? 'bg-blue-600' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, (stats.charsWithSpaces / 60) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Ideal: 50 a 60 caracteres</span>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-slate-700">Google Meta Description</span>
              <span className={`font-mono ${stats.charsWithSpaces > 160 ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                {stats.charsWithSpaces}/160
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  stats.charsWithSpaces <= 160 ? 'bg-blue-600' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, (stats.charsWithSpaces / 160) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Ideal: 140 a 160 caracteres</span>
          </div>
        </div>
      </div>

      {/* Keyword Density */}
      {stats.topKeywords.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">Densidade de Palavras-Chave Principais</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.topKeywords.map((k) => (
              <div
                key={k.word}
                className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs flex items-center gap-2"
              >
                <span className="font-semibold text-slate-800">{k.word}</span>
                <span className="text-slate-500">({k.count}x)</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-mono font-medium">
                  {k.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
