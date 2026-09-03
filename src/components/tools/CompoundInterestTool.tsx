import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, PiggyBank, Calendar, Calculator, Sparkles } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';
import { fastCache } from '../../services/cacheService';

export const CompoundInterestTool: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(300);
  const [interestRate, setInterestRate] = useState<number>(11.5);
  const [rateType, setRateType] = useState<'yearly' | 'monthly'>('yearly');
  const [period, setPeriod] = useState<number>(5);
  const [periodType, setPeriodType] = useState<'years' | 'months'>('years');

  const simulation = useMemo(() => {
    const totalMonths = periodType === 'years' ? period * 12 : period;
    const monthlyRate = rateType === 'yearly'
      ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
      : interestRate / 100;

    let balance = initialAmount;
    let totalInvested = initialAmount;
    const timeline: Array<{
      month: number;
      year: number;
      invested: number;
      interest: number;
      total: number;
    }> = [];

    for (let m = 1; m <= totalMonths; m++) {
      const interestEarned = balance * monthlyRate;
      balance += interestEarned + monthlyContribution;
      totalInvested += monthlyContribution;

      // Track milestone periods (each 12 months or final month)
      if (m % 12 === 0 || m === totalMonths) {
        timeline.push({
          month: m,
          year: Math.floor(m / 12) || 1,
          invested: Math.round(totalInvested),
          interest: Math.round(balance - totalInvested),
          total: Math.round(balance),
        });
      }
    }

    const totalInterest = Math.max(0, balance - totalInvested);

    // Save calculation to cache
    const cacheKey = `compound_${initialAmount}_${monthlyContribution}_${interestRate}_${period}`;
    fastCache.set(cacheKey, { totalInvested, totalInterest, finalAmount: balance });

    return {
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      finalAmount: Math.round(balance),
      timeline,
    };
  }, [initialAmount, monthlyContribution, interestRate, rateType, period, periodType]);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleSimulateAction = () => {
    realtimeAnalytics.trackToolUsage(
      'calculadora-juros-compostos',
      'Simulação de Juros Compostos',
      `Montante: ${formatBRL(simulation.finalAmount)} em ${period} ${periodType === 'years' ? 'anos' : 'meses'}`
    );
  };

  return (
    <div id="tool-compound-interest-wrapper" className="space-y-6">
      {/* Input Parameters Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Parâmetros do Investimento
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Aporte Inicial (R$)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">R$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Aporte Mensal (R$)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">R$</span>
              <input
                type="number"
                min="0"
                step="50"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-600">Taxa de Juros</label>
              <div className="flex text-[11px] gap-1">
                <button
                  type="button"
                  onClick={() => setRateType('yearly')}
                  className={`px-2 py-0.5 rounded-full ${rateType === 'yearly' ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-500'}`}
                >
                  ao ano
                </button>
                <button
                  type="button"
                  onClick={() => setRateType('monthly')}
                  className={`px-2 py-0.5 rounded-full ${rateType === 'monthly' ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-500'}`}
                >
                  ao mês
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                className="w-full pr-8 pl-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-600">Período de Aplicação</label>
              <div className="flex text-[11px] gap-1">
                <button
                  type="button"
                  onClick={() => setPeriodType('years')}
                  className={`px-2 py-0.5 rounded-full ${periodType === 'years' ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-500'}`}
                >
                  anos
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodType('months')}
                  className={`px-2 py-0.5 rounded-full ${periodType === 'months' ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-500'}`}
                >
                  meses
                </button>
              </div>
            </div>
            <input
              type="number"
              min="1"
              max="50"
              value={period}
              onChange={(e) => setPeriod(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Results Overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Investido</span>
            <PiggyBank className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl font-extrabold text-slate-800 block">
            {formatBRL(simulation.totalInvested)}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Aporte do próprio bolso</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total em Juros</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-extrabold text-blue-600 block">
            {formatBRL(simulation.totalInterest)}
          </span>
          <span className="text-xs text-blue-600 mt-1 block font-medium">
            +{simulation.totalInvested > 0 ? ((simulation.totalInterest / simulation.totalInvested) * 100).toFixed(1) : 0}% de lucro
          </span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between text-slate-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Montante Final</span>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-3xl font-extrabold text-white block tracking-tight">
            {formatBRL(simulation.finalAmount)}
          </span>
          <span className="text-xs text-slate-300 mt-1 block">
            Acumulado em {period} {periodType === 'years' ? 'anos' : 'meses'}
          </span>
        </div>
      </div>

      {/* Visual Proportional Comparison */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Composição do Patrimônio Acumulado
        </h4>
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div
            className="bg-slate-700 h-full transition-all duration-500"
            style={{ width: `${(simulation.totalInvested / simulation.finalAmount) * 100}%` }}
            title={`Investido: ${formatBRL(simulation.totalInvested)}`}
          />
          <div
            className="bg-blue-600 h-full transition-all duration-500"
            style={{ width: `${(simulation.totalInterest / simulation.finalAmount) * 100}%` }}
            title={`Juros: ${formatBRL(simulation.totalInterest)}`}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
            <span>Total Investido: <strong>{((simulation.totalInvested / simulation.finalAmount) * 100).toFixed(1)}%</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
            <span>Rendimento em Juros: <strong>{((simulation.totalInterest / simulation.finalAmount) * 100).toFixed(1)}%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
