import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';

export const UnitConverterTool: React.FC = () => {
  const [category, setCategory] = useState<'storage' | 'length' | 'temp'>('storage');
  const [val, setVal] = useState<number>(1024);
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('GB');
  const [copied, setCopied] = useState(false);

  // Digital storage conversion (base 1024)
  const storageUnits: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  };

  // Length conversion (meters as base)
  const lengthUnits: Record<string, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
  };

  const calculateResult = (): string => {
    if (isNaN(val)) return '0';

    if (category === 'storage') {
      const bytes = val * (storageUnits[fromUnit] || 1);
      const res = bytes / (storageUnits[toUnit] || 1);
      return res < 0.0001 ? res.toExponential(4) : Number(res.toFixed(6)).toString();
    }

    if (category === 'length') {
      const meters = val * (lengthUnits[fromUnit] || 1);
      const res = meters / (lengthUnits[toUnit] || 1);
      return res < 0.0001 ? res.toExponential(4) : Number(res.toFixed(4)).toString();
    }

    if (category === 'temp') {
      // Temp calculations
      let celsius = val;
      if (fromUnit === 'F') celsius = (val - 32) * (5 / 9);
      if (fromUnit === 'K') celsius = val - 273.15;

      let finalTemp = celsius;
      if (toUnit === 'F') finalTemp = celsius * (9 / 5) + 32;
      if (toUnit === 'K') finalTemp = celsius + 273.15;

      return Number(finalTemp.toFixed(2)).toString();
    }

    return '0';
  };

  const result = calculateResult();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${result} ${toUnit}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    realtimeAnalytics.trackToolUsage('conversor-unidades-medidas', `Conversão de ${fromUnit} para ${toUnit}`);
  };

  return (
    <div id="tool-converter-wrapper" className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => { setCategory('storage'); setFromUnit('MB'); setToUnit('GB'); }}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
              category === 'storage' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Armazenamento (Bytes, MB, GB)
          </button>
          <button
            type="button"
            onClick={() => { setCategory('length'); setFromUnit('m'); setToUnit('km'); }}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
              category === 'length' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Comprimento (m, cm, km)
          </button>
          <button
            type="button"
            onClick={() => { setCategory('temp'); setFromUnit('C'); setToUnit('F'); }}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
              category === 'temp' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Temperatura (°C, °F, K)
          </button>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-5 gap-4 items-center">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">De:</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-24 px-2 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
              >
                {category === 'storage' && (
                  <>
                    <option value="B">Bytes</option>
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                    <option value="TB">TB</option>
                  </>
                )}
                {category === 'length' && (
                  <>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">metros</option>
                    <option value="km">km</option>
                    <option value="in">polegadas</option>
                    <option value="ft">pés</option>
                  </>
                )}
                {category === 'temp' && (
                  <>
                    <option value="C">°C (Celsius)</option>
                    <option value="F">°F (Fahrenheit)</option>
                    <option value="K">K (Kelvin)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="flex justify-center sm:col-span-1">
            <button
              type="button"
              onClick={() => {
                const temp = fromUnit;
                setFromUnit(toUnit);
                setToUnit(temp);
              }}
              title="Inverter Unidades"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Para:</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value={result}
                  className="w-full px-3 py-2.5 bg-blue-50/50 border border-blue-200 rounded-xl text-sm font-mono font-bold text-blue-900 focus:outline-none"
                />
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-24 px-2 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
              >
                {category === 'storage' && (
                  <>
                    <option value="B">Bytes</option>
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                    <option value="TB">TB</option>
                  </>
                )}
                {category === 'length' && (
                  <>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">metros</option>
                    <option value="km">km</option>
                    <option value="in">polegadas</option>
                    <option value="ft">pés</option>
                  </>
                )}
                {category === 'temp' && (
                  <>
                    <option value="C">°C (Celsius)</option>
                    <option value="F">°F (Fahrenheit)</option>
                    <option value="K">K (Kelvin)</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Resultado Copiado!' : 'Copiar Resultado'}
          </button>
        </div>
      </div>
    </div>
  );
};
