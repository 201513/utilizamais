import React, { useState } from 'react';
import { Code2, Copy, Check, Trash2, CheckCircle2, AlertCircle, FileCode } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';

export const JsonFormatterTool: React.FC = () => {
  const [inputJson, setInputJson] = useState('{\n  "site": "UTILIZA +",\n  "status": "online",\n  "recursos": ["SEO", "Cache Ultra-rápido", "LGPD"]\n}');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [byteStats, setByteStats] = useState<{ original: number; formatted: number } | null>(null);

  const formatJson = (spaces = 2) => {
    try {
      setErrorMsg(null);
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, spaces);
      setByteStats({
        original: new Blob([inputJson]).size,
        formatted: new Blob([formatted]).size,
      });
      setInputJson(formatted);
      realtimeAnalytics.trackToolUsage('formatador-minificador-json', 'JSON Formatado com Sucesso');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(`Erro de Sintaxe: ${err.message}`);
      } else {
        setErrorMsg('Erro desconhecido ao processar JSON.');
      }
    }
  };

  const minifyJson = () => {
    try {
      setErrorMsg(null);
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setByteStats({
        original: new Blob([inputJson]).size,
        formatted: new Blob([minified]).size,
      });
      setInputJson(minified);
      realtimeAnalytics.trackToolUsage('formatador-minificador-json', 'JSON Minificado com Sucesso');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(`Erro de Sintaxe: ${err.message}`);
      }
    }
  };

  const handleCopy = () => {
    if (!inputJson) return;
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="tool-json-wrapper" className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => formatJson(2)}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              Formatar (2 Espaços)
            </button>
            <button
              type="button"
              onClick={() => formatJson(4)}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-full text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              Formatar (4 Espaços)
            </button>
            <button
              type="button"
              onClick={minifyJson}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-semibold transition cursor-pointer"
            >
              Minificar (1 Linha)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInputJson('')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-full transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium shadow-xs transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        {errorMsg ? (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-mono">{errorMsg}</span>
          </div>
        ) : (
          byteStats && (
            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                JSON Válido e Processado
              </span>
              <span className="font-mono text-[11px]">
                Original: {byteStats.original} bytes | Final: {byteStats.formatted} bytes
              </span>
            </div>
          )
        )}

        <textarea
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          rows={12}
          placeholder="Cole seu JSON aqui..."
          className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-900 text-blue-200 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-y leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
