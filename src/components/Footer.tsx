import React from 'react';
import { ShieldCheck, Lock, Heart, Wrench, FileText, CheckCircle2, Mail, ExternalLink, Sparkles, Zap } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onOpenSeoInspector: () => void;
  onOpenAnalytics: () => void;
  onOpenBloggerGuide: () => void;
  onSelectTool: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenSeoInspector,
  onOpenAnalytics,
  onOpenBloggerGuide,
  onSelectTool,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold shadow-xs">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                UTILIZA <span className="text-blue-400">+</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Portal profissional brasileiro de utilitários online gratuitos, calculadoras financeiras, ferramentas para criadores de conteúdo e artigos aprofundados sobre SEO técnico e monetização digital.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-blue-400 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                100% Conforme LGPD (Lei 13.709/18)
              </span>
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Carregamento Mobile Ultrarrápido
              </span>
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                Processamento Client-Side Privado
              </span>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Ferramentas Populares
            </h4>
            <ul className="space-y-2">
              {TOOLS_DATA.slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => onSelectTool(tool.slug)}
                    className="hover:text-blue-400 transition text-left cursor-pointer"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Conformidade & Links Úteis
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-blue-400 transition text-left cursor-pointer"
                >
                  Política de Privacidade & Cookies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-blue-400 transition text-left cursor-pointer"
                >
                  Termos de Uso e Isenção Legal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSeoInspector}
                  className="hover:text-blue-400 transition text-left cursor-pointer"
                >
                  Dados Estruturados & Sitemap XML
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAnalytics}
                  className="hover:text-blue-400 transition text-left cursor-pointer"
                >
                  Painel de Telemetria ao Vivo
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Contato com DPO: <span className="text-slate-400">danyedsom05@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Nota de Responsabilidade:</strong> As ferramentas disponibilizadas no portal UTILIZA + são de caráter estritamente educativo, técnico e para auxílio em desenvolvimento de software e planejamento financeiro pessoal. Os geradores e validadores utilizam cálculos matemáticos públicos sem acesso a cadastros de órgãos oficiais. O portal utiliza Google AdSense e tecnologias de cache para manter o serviço gratuito e de alto desempenho.
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 UTILIZA +. Todos os direitos reservados. Desenvolvido para máxima velocidade, SEO e segurança digital.</p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={onOpenPrivacyPolicy} className="hover:text-white">LGPD</button>
            <span>•</span>
            <button type="button" onClick={onOpenTerms} className="hover:text-white">Termos</button>
            <span>•</span>
            <button type="button" onClick={onOpenSeoInspector} className="hover:text-white">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
