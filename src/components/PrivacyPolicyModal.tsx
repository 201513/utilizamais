import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs rounded-t-2xl z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Política de Privacidade & Proteção de Dados</h2>
              <p className="text-xs text-slate-500">Conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</p>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-950">
            <strong>Última atualização:</strong> 03 de Setembro de 2026. O portal <strong>UTILIZA +</strong> preza pela transparência e pelo compromisso inegociável com a segurança da sua navegação e a confidencialidade dos seus dados.
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              1. Visão Geral e Princípio Privacy by Design
            </h3>
            <p>
              O <strong>UTILIZA +</strong> foi desenvolvido com base no princípio de <em>Privacy by Design</em> (Privacidade desde a Concepção). Nossas ferramentas online de produtividade (como calculadoras financeiras, contadores de texto, geradores de senhas e validadores) operam predominantemente de maneira <strong>client-side</strong>, ou seja, são executadas diretamente na memória do navegador do seu dispositivo móvel ou computador. Não realizamos coleta, gravação ou armazenamento em servidores dos textos digitados, senhas criadas ou números simulados.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              2. Coleta de Dados e Finalidades
            </h3>
            <p>Coletamos apenas dados estritamente necessários para viabilizar as seguintes operações:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Dados Técnicos de Navegação:</strong> Endereço IP (anonimizado), tipo de navegador, sistema operacional, resolução de tela e tempo de resposta para monitoramento de estabilidade e segurança.</li>
              <li><strong>Dados Analíticos:</strong> Páginas visitadas, ferramentas mais executadas e profundidade de rolagem através de identificadores anônimos para aprimorar o conteúdo e a usabilidade.</li>
              <li><strong>Preferências Locais:</strong> Estado do cache ultrarrápido e histórico das preferências de consentimento salvas no seu próprio navegador via LocalStorage.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              3. Google AdSense, Cookies de Terceiros e Cookie DoubleClick DART
            </h3>
            <p>
              O <strong>UTILIZA +</strong> utiliza o serviço de monetização <strong>Google AdSense</strong> para manter todos os utilitários 100% gratuitos para o público:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>O Google, como fornecedor terceiro, utiliza cookies para veicular anúncios neste site com base em visitas anteriores feitas a este ou a outros websites.</li>
              <li>Com o uso de cookies de publicidade, o Google e seus parceiros podem veicular anúncios para os usuários com base nas visitas feitas ao UTILIZA + e a outros sites na Internet.</li>
              <li>
                Os usuários podem desativar a publicidade personalizada acessando as{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline font-medium hover:text-blue-700"
                >
                  Configurações de Anúncios do Google
                </a>.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              4. Seus Direitos como Titular de Dados (Artigo 18 da LGPD)
            </h3>
            <p>Em consonância com o artigo 18 da Lei nº 13.709/2018, você pode solicitar a qualquer instante:</p>
            <div className="grid sm:grid-cols-2 gap-2 pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <strong>Confirmação e Acesso:</strong> Saber se tratamos algum dado pessoal e requisitar uma cópia.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <strong>Correção ou Atualização:</strong> Retificar dados incompletos ou desatualizados.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <strong>Anonimização ou Eliminação:</strong> Exclusão definitiva de dados desnecessários ou tratados com consentimento.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <strong>Revogação de Consentimento:</strong> Retirar sua autorização de cookies pelo gerenciador do rodapé.
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              5. Canal de Contato com o DPO (Encarregado de Proteção de Dados)
            </h3>
            <p>
              Para esclarecer dúvidas sobre esta política, exercer seus direitos ou enviar solicitações formais à nossa equipe de conformidade, utilize nosso canal exclusivo:
            </p>
            <div className="p-4 bg-slate-100 rounded-xl flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-slate-900">Encarregado de Dados (DPO): danyedsom05@gmail.com</p>
                <p className="text-xs text-slate-500">Prazo de resposta regulamentar: até 48 horas úteis.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold shadow-xs transition"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
