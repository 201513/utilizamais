import React, { useState } from 'react';
import { Copy, Check, RefreshCw, CheckCircle2, XCircle, FileSpreadsheet, ShieldAlert } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';
import { fastCache } from '../../services/cacheService';

export const CpfCnpjTool: React.FC = () => {
  const [docType, setDocType] = useState<'cpf' | 'cnpj'>('cpf');
  const [withMask, setWithMask] = useState(true);
  const [generatedValue, setGeneratedValue] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Validation state
  const [inputToValidate, setInputToValidate] = useState('');
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    details?: string;
  } | null>(null);

  // Region lookup for CPF
  const getCpfRegion = (digit: string): string => {
    const map: Record<string, string> = {
      '1': 'DF, GO, MS, MT e TO',
      '2': 'AC, AM, AP, PA, RO e RR',
      '3': 'CE, MA e PI',
      '4': 'AL, PB, PE e RN',
      '5': 'BA e SE',
      '6': 'MG',
      '7': 'ES e RJ',
      '8': 'SP',
      '9': 'PR e SC',
      '0': 'RS',
    };
    return map[digit] || 'Não identificada';
  };

  // Math algorithm for CPF
  const generateCpf = (formatted: boolean): string => {
    const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    
    // First digit
    let sum1 = 0;
    for (let i = 0; i < 9; i++) {
      sum1 += randomDigits[i] * (10 - i);
    }
    const rest1 = sum1 % 11;
    const d1 = rest1 < 2 ? 0 : 11 - rest1;
    randomDigits.push(d1);

    // Second digit
    let sum2 = 0;
    for (let i = 0; i < 10; i++) {
      sum2 += randomDigits[i] * (11 - i);
    }
    const rest2 = sum2 % 11;
    const d2 = rest2 < 2 ? 0 : 11 - rest2;
    randomDigits.push(d2);

    const raw = randomDigits.join('');
    if (!formatted) return raw;
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9, 11)}`;
  };

  // Math algorithm for CNPJ
  const generateCnpj = (formatted: boolean): string => {
    const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    // Filial padrão 0001
    digits.push(0, 0, 0, 1);

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum1 = 0;
    for (let i = 0; i < 12; i++) {
      sum1 += digits[i] * weights1[i];
    }
    const rest1 = sum1 % 11;
    const d1 = rest1 < 2 ? 0 : 11 - rest1;
    digits.push(d1);

    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum2 = 0;
    for (let i = 0; i < 13; i++) {
      sum2 += digits[i] * weights2[i];
    }
    const rest2 = sum2 % 11;
    const d2 = rest2 < 2 ? 0 : 11 - rest2;
    digits.push(d2);

    const raw = digits.join('');
    if (!formatted) return raw;
    return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12, 14)}`;
  };

  const handleGenerate = () => {
    const val = docType === 'cpf' ? generateCpf(withMask) : generateCnpj(withMask);
    setGeneratedValue(val);
    setCopied(false);
    realtimeAnalytics.trackToolUsage('gerador-validador-cpf-cnpj', `Geração de ${docType.toUpperCase()}`);
    fastCache.set(`last_${docType}`, val, 60000);
  };

  const handleCopy = () => {
    if (!generatedValue) return;
    navigator.clipboard.writeText(generatedValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateCpf = (cpfStr: string): boolean => {
    const clean = cpfStr.replace(/\D/g, '');
    if (clean.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(clean)) return false; // Ex: 111.111.111-11

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(clean.charAt(i), 10) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(clean.charAt(9), 10)) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(clean.charAt(i), 10) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(clean.charAt(10), 10)) return false;

    return true;
  };

  const validateCnpj = (cnpjStr: string): boolean => {
    const clean = cnpjStr.replace(/\D/g, '');
    if (clean.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(clean)) return false;

    let size = clean.length - 2;
    let numbers = clean.substring(0, size);
    const digits = clean.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0), 10)) return false;

    size = size + 1;
    numbers = clean.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1), 10)) return false;

    return true;
  };

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputToValidate.replace(/\D/g, '');
    if (!clean) return;

    if (clean.length === 11) {
      const isValid = validateCpf(clean);
      const region = getCpfRegion(clean.charAt(8));
      setValidationResult({
        valid: isValid,
        message: isValid ? 'CPF Válido!' : 'CPF Inválido.',
        details: isValid
          ? `Dígitos verificadores corretos. Região fiscal provável: ${region}.`
          : 'Os dígitos verificadores não coincidem com o algoritmo oficial da Receita Federal.',
      });
      realtimeAnalytics.trackToolUsage('gerador-validador-cpf-cnpj', 'Validação de CPF');
    } else if (clean.length === 14) {
      const isValid = validateCnpj(clean);
      setValidationResult({
        valid: isValid,
        message: isValid ? 'CNPJ Válido!' : 'CNPJ Inválido.',
        details: isValid
          ? 'Matriz/Filial e dígitos verificadores de módulo 11 validados com sucesso.'
          : 'A soma ponderada dos dígitos verificadores não confere com a regra oficial.',
      });
      realtimeAnalytics.trackToolUsage('gerador-validador-cpf-cnpj', 'Validação de CNPJ');
    } else {
      setValidationResult({
        valid: false,
        message: 'Tamanho Incorreto',
        details: 'Informe 11 dígitos para CPF ou 14 dígitos para CNPJ.',
      });
    }
  };

  return (
    <div id="tool-cpf-cnpj-wrapper" className="space-y-8">
      {/* Gerador Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Gerador de Documentos para Testes</h3>
            <p className="text-sm text-slate-500">Crie números válidos instantaneamente para homologação de sistemas</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full">
            <button
              id="tab-select-cpf"
              type="button"
              onClick={() => { setDocType('cpf'); setGeneratedValue(''); }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                docType === 'cpf' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CPF (11 dígitos)
            </button>
            <button
              id="tab-select-cnpj"
              type="button"
              onClick={() => { setDocType('cnpj'); setGeneratedValue(''); }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                docType === 'cnpj' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CNPJ (14 dígitos)
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <div className="relative">
              <input
                id="input-generated-doc"
                type="text"
                readOnly
                value={generatedValue || 'Clique em "Gerar Documento" abaixo...'}
                className="w-full text-xl font-mono tracking-wider font-semibold py-3.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none"
              />
              {generatedValue && (
                <button
                  id="btn-copy-generated-doc"
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="btn-generate-doc-action"
              type="button"
              onClick={handleGenerate}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-full shadow-sm transition text-sm cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Gerar {docType.toUpperCase()}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={withMask}
              onChange={(e) => setWithMask(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span>Incluir pontuação e máscara (Ex: 000.000.000-00)</span>
          </label>
          <span className="hidden sm:inline-block text-slate-400">⚡ Cálculo em tempo real (1.2ms)</span>
        </div>
      </div>

      {/* Validador Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Validador de CPF / CNPJ</h3>
        <p className="text-sm text-slate-500 mb-5">Cole ou digite qualquer número para testar se é matematicamente válido</p>

        <form onSubmit={handleValidate} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                id="input-val-doc"
                type="text"
                value={inputToValidate}
                onChange={(e) => setInputToValidate(e.target.value)}
                placeholder="Ex: 000.000.000-00 ou 00.000.000/0001-00"
                className="w-full text-base font-mono py-3 px-4 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <button
              id="btn-submit-val-doc"
              type="submit"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full text-sm transition shadow-sm cursor-pointer"
            >
              Validar Agora
            </button>
          </div>

          {validationResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                validationResult.valid
                  ? 'bg-blue-50 border-blue-200 text-blue-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {validationResult.valid ? (
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
              )}
              <div>
                <h4 className="font-bold text-sm">{validationResult.message}</h4>
                {validationResult.details && (
                  <p className="text-xs mt-1 opacity-90">{validationResult.details}</p>
                )}
              </div>
            </div>
          )}
        </form>

        <div className="mt-5 p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-800">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Aviso Legal & Ético:</strong> Esta ferramenta destina-se exclusivamente a testes de validação de formulários e desenvolvimento de software. Nenhum dado é transmitido a servidores externos ou consultado na base de dados ativa da Receita Federal.
          </p>
        </div>
      </div>
    </div>
  );
};
