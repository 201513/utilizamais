import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

interface TermsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs rounded-t-2xl z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Termos de Uso e Condições Gerais</h2>
              <p className="text-xs text-slate-500">UTILIZA + • Regras de utilização das ferramentas e conteúdos</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">1. Aceitação dos Termos</h3>
            <p>
              Ao acessar e utilizar o portal <strong>UTILIZA +</strong> (https://utilizamais.com.br), você concorda expressamente em cumprir estes Termos de Uso, todas as leis e regulamentos aplicáveis no território brasileiro e internacional, bem como com a nossa Política de Privacidade. Caso não concorde com qualquer termo, solicitamos que interrompa o uso do serviço.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">2. Finalidade Educacional e de Testes</h3>
            <p>
              Nossas ferramentas digitais são disponibilizadas de forma gratuita para auxílio em produtividade, desenvolvimento e testes de software:
            </p>
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Aviso Importante sobre Geradores de Documentos e Calculadoras:
              </div>
              <p>
                Os geradores de CPF e CNPJ utilizam algoritmos matemáticos públicos e destinam-se <strong>exclusivamente para homologação e desenvolvimento de sistemas</strong>. É expressamente proibida a utilização de quaisquer dados simulados para fraudes, falsidade ideológica ou fins ilícitos.
              </p>
              <p>
                As calculadoras financeiras fornecem simulações matemáticas estimadas e não constituem recomendação oficial de investimento ou consultoria financeira regulada.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">3. Propriedade Intelectual e Licença de Uso</h3>
            <p>
              O design da interface, código fonte proprietário, artigos do blog, logotipos e marcas do <strong>UTILIZA +</strong> são protegidos pelas leis de direitos autorais e propriedade industrial. É concedida ao usuário uma licença limitada, não exclusiva e revogável para utilizar as ferramentas para fins pessoais ou profissionais legítimos.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">4. Isenção de Responsabilidade e Garantias</h3>
            <p>
              Os serviços e conteúdos são fornecidos "como estão" (<em>as is</em>). Embora envidemos os melhores esforços técnicos de otimização e testes matemáticos, o UTILIZA + não se responsabiliza por eventuais indisponibilidades transitórias de rede, imprecisões decorrentes de alterações tributárias legais supervenientes ou perdas indiretas.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">5. Legislação Aplicável e Foro</h3>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca do domicílio do usuário para dirimir quaisquer controvérsias decorrentes da interpretação destes termos.
            </p>
          </section>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold shadow-xs transition"
          >
            Concordo com os Termos
          </button>
        </div>
      </div>
    </div>
  );
};
