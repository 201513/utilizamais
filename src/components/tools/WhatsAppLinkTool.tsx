import React, { useState, useMemo } from 'react';
import { MessageSquare, Copy, Check, ExternalLink, QrCode, Smartphone, Download } from 'lucide-react';
import { realtimeAnalytics } from '../../services/analyticsService';

export const WhatsAppLinkTool: React.FC = () => {
  const [countryCode, setCountryCode] = useState('55');
  const [phoneNumber, setPhoneNumber] = useState('11987654321');
  const [message, setMessage] = useState('Olá! Gostaria de receber mais informações sobre os seus serviços.');
  const [copied, setCopied] = useState(false);

  // Sanitized phone digits
  const cleanPhone = useMemo(() => {
    return phoneNumber.replace(/\D/g, '');
  }, [phoneNumber]);

  const generatedLink = useMemo(() => {
    if (!cleanPhone) return '';
    const encodedMsg = encodeURIComponent(message.trim());
    return `https://wa.me/${countryCode}${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
  }, [countryCode, cleanPhone, message]);

  // QR code encoded data uri
  const qrCodeUrl = useMemo(() => {
    if (!generatedLink) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(generatedLink)}&margin=10`;
  }, [generatedLink]);

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    realtimeAnalytics.trackToolUsage('gerador-link-whatsapp', 'Link WhatsApp copiado');
  };

  const handleTestLink = () => {
    if (!generatedLink) return;
    realtimeAnalytics.trackToolUsage('gerador-link-whatsapp', 'Teste de Link WhatsApp disparado');
    window.open(generatedLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="tool-whatsapp-wrapper" className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Gerador de Link Direto com Mensagem
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Código do País e Número com DDD
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-28 py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="55">🇧🇷 +55 (BR)</option>
                  <option value="351">🇵🇹 +351 (PT)</option>
                  <option value="1">🇺🇸 +1 (EUA)</option>
                  <option value="34">🇪🇸 +34 (ES)</option>
                  <option value="54">🇦🇷 +54 (AR)</option>
                </select>

                <div className="relative flex-1">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex: 11987654321"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Insira o DDD e o número completo (9 dígitos)</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mensagem Padrão Pré-preenchida (Opcional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Ex: Olá, vim pelo anúncio do Instagram e gostaria de saber o valor..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Link Pronto Gerado:
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full pr-24 pl-3 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 select-all"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestLink}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-full text-sm transition shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Testar Link no WhatsApp
              </button>
            </div>
          </div>

          {/* QR Code preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center">
            <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-blue-600" />
              QR Code do Link
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Aponte a câmera do celular para abrir a conversa instantaneamente
            </p>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs inline-block">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code WhatsApp"
                  className="w-48 h-48 object-contain rounded"
                  loading="lazy"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
                  Informe o número acima
                </div>
              )}
            </div>

            {qrCodeUrl && (
              <a
                href={qrCodeUrl}
                download="qrcode-whatsapp-utilizamais.png"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Baixar Imagem do QR Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
