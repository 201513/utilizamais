import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';

export const PasswordGeneratorTool: React.FC = () => {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(true);
  
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (useUpper) charset += upper;
    if (useLower) charset += lower;
    if (useNumbers) charset += numbers;
    if (useSymbols) charset += symbols;

    if (avoidAmbiguous) {
      // Remove l, 1, I, O, 0
      charset = charset.replace(/[l1IO0]/g, '');
    }

    if (!charset) {
      setPassword('');
      return;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
    realtimeAnalytics.trackToolUsage('gerador-senhas-fortes', 'Nova Senha Criptográfica Gerada');
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols, avoidAmbiguous]);

  // Entropy estimation
  let poolSize = 0;
  if (useUpper) poolSize += 26;
  if (useLower) poolSize += 26;
  if (useNumbers) poolSize += 10;
  if (useSymbols) poolSize += 25;
  if (avoidAmbiguous) poolSize -= 5;
  poolSize = Math.max(2, poolSize);

  const entropyBits = Math.round(length * Math.log2(poolSize));

  let strengthLabel = 'Fraca';
  let strengthColor = 'text-rose-600 bg-rose-50 border-rose-200';
  let crackTime = 'Alguns segundos';

  if (entropyBits >= 80) {
    strengthLabel = 'Extremamente Forte (Militar)';
    strengthColor = 'text-blue-700 bg-blue-50 border-blue-200';
    crackTime = 'Mais de 1 milhão de anos';
  } else if (entropyBits >= 60) {
    strengthLabel = 'Forte';
    strengthColor = 'text-blue-600 bg-blue-50 border-blue-200';
    crackTime = 'Vários séculos';
  } else if (entropyBits >= 40) {
    strengthLabel = 'Moderada';
    strengthColor = 'text-amber-600 bg-amber-50 border-amber-200';
    crackTime = 'Alguns meses';
  }

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="tool-password-wrapper" className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Output field */}
        <div className="relative">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full text-xl sm:text-2xl font-mono tracking-wider font-bold py-4 pl-4 pr-32 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={generatePassword}
              title="Gerar outra senha"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full transition"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full text-xs font-semibold shadow-xs transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>

        {/* Strength indicators */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className={`p-3.5 border rounded-xl flex items-center justify-between ${strengthColor}`}>
            <span className="text-xs font-bold uppercase tracking-wider">Nível de Segurança:</span>
            <span className="text-sm font-extrabold">{strengthLabel}</span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold">Entropia: <strong className="text-slate-900">{entropyBits} bits</strong></span>
            <span>Tempo p/ quebra: <strong className="text-slate-900">{crackTime}</strong></span>
          </div>
        </div>

        {/* Sliders and Options */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-2">
              <span>Tamanho da Senha</span>
              <span className="px-2.5 py-1 bg-slate-100 font-mono rounded-full text-xs font-bold text-slate-900">{length} caracteres</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useUpper}
                onChange={(e) => setUseUpper(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Maiúsculas (A-Z)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useLower}
                onChange={(e) => setUseLower(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Minúsculas (a-z)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Números (0-9)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Símbolos (!@#$)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none sm:col-span-2">
              <input
                type="checkbox"
                checked={avoidAmbiguous}
                onChange={(e) => setAvoidAmbiguous(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Evitar caracteres ambíguos (l, 1, I, O, 0)</span>
            </label>
          </div>
        </div>

        <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Geração Criptograficamente Segura:</strong> Processada 100% via <code>window.crypto.getRandomValues</code> em hardware local.
          </span>
        </div>
      </div>
    </div>
  );
};
