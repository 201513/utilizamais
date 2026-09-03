import React, { useState } from 'react';
import {
  X,
  Globe,
  Copy,
  Check,
  Code,
  FileText,
  Layout,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

interface BloggerIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl?: string;
}

export const BloggerIntegrationModal: React.FC<BloggerIntegrationModalProps> = ({
  isOpen,
  onClose,
  appUrl = window.location.origin,
}) => {
  const [activeTab, setActiveTab] = useState<'page' | 'template' | 'standalone' | 'adsense'>('page');
  const [selectedToolSnippet, setSelectedToolSnippet] = useState<'cpf' | 'juros' | 'senha' | 'whatsapp' | 'contador'>('cpf');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const bloggerDomain = 'https://utilizamais.blogspot.com/';

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  if (!isOpen) return null;

  // Snippet 1: Iframe code for Blogger Page
  const iframeSnippet = `<!-- INÍCIO: PORTAL UTILIZA+ PARA BLOGGER (PÁGINA DEDICADA) -->
<div style="max-width: 100%; margin: 0 auto; padding: 10px 0;">
  <div style="position: relative; width: 100%; height: 92vh; min-height: 750px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; background: #ffffff;">
    <iframe 
      id="utilizamais-frame"
      src="${appUrl}" 
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
      title="UTILIZA + | Ferramentas Online Gratuitas"
      loading="lazy"
      allow="clipboard-read; clipboard-write"
      allowfullscreen="true">
    </iframe>
  </div>
  <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: 10px; font-family: sans-serif;">
    Ferramentas fornecidas por <a href="${bloggerDomain}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 600;">UTILIZA +</a> &bull; 100% Gratuito e Seguro
  </p>
</div>
<!-- FIM: PORTAL UTILIZA+ -->`;

  // Snippet 2: Full Blogger XML Template strictly conforming to Blogger's strict XML parser
  const bloggerTemplateSnippet = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:responsive='true' b:version='2' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
  <head>
    <meta charset='utf-8'/>
    <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
    <title>UTILIZA + | Ferramentas Online Gratuitas</title>
    <meta content='Portal profissional de ferramentas gratuitas, calculadoras, geradores e artigos para produtividade.' name='description'/>
    <link href='https://utilizamais.blogspot.com/' rel='canonical'/>

    <b:skin><![CDATA[
      /* Reset para tema responsivo */
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 100%; height: 100%; overflow: hidden; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      #utiliza-app-frame { width: 100vw; height: 100vh; border: none; }
    ]]></b:skin>
  </head>
  <body>
    <!-- Iframe em Tela Cheia do Aplicativo -->
    <iframe id="utiliza-app-frame" src="${appUrl}" title="UTILIZA + Portal" allow="clipboard-read; clipboard-write"></iframe>

    <!-- Seção Obrigatória do Blogger para Conformidade XML -->
    <div style="display:none;">
      <b:section id='main' showaddelement='no'>
        <b:widget id='Blog1' locked='true' title='Postagens do Blog' type='Blog' version='2'/>
      </b:section>
    </div>
  </body>
</html>`;

  // Snippet 3: Standalone Tool Snippets
  const getToolSnippet = () => {
    switch (selectedToolSnippet) {
      case 'cpf':
        return `<!-- FERRAMENTA AUTÔNOMA: GERADOR E VALIDADOR DE CPF / CNPJ -->
<div id="utiliza-cpf-box" style="max-width: 580px; margin: 20px auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <div style="display:flex; align-items:center; gap:10px; margin-bottom: 16px;">
    <span style="background:#eff6ff; color:#2563eb; padding:8px 12px; border-radius:10px; font-weight:bold; font-size:14px;">UTILIZA+</span>
    <h3 style="margin:0; font-size: 18px; font-weight:700;">Gerador de CPF Válido</h3>
  </div>
  
  <div style="display:flex; gap:8px; margin-bottom: 16px;">
    <input type="text" id="utiliza-cpf-out" readonly value="Clique em Gerar..." style="flex:1; padding: 12px 16px; font-size: 18px; font-family: monospace; font-weight: bold; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; color: #0f172a;" />
    <button onclick="copiarCpfUtiliza()" style="padding: 12px 18px; background: #0f172a; color: #fff; border:none; border-radius: 10px; font-weight:600; cursor:pointer; font-size: 13px;">Copiar</button>
  </div>

  <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
    <label style="font-size: 13px; color:#475569; display:flex; align-items:center; gap:6px; cursor:pointer;">
      <input type="checkbox" id="utiliza-cpf-mask" checked /> Com pontuação
    </label>
    <button onclick="gerarCpfUtiliza()" style="padding: 12px 24px; background: linear-gradient(135deg, #2563eb, #4338ca); color: #fff; border:none; border-radius: 9999px; font-weight:bold; cursor:pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">Gerar CPF Válido</button>
  </div>
</div>

<script>
function gerarCpfUtiliza() {
  const mask = document.getElementById('utiliza-cpf-mask').checked;
  const n = Array.from({length: 9}, () => Math.floor(Math.random() * 10));
  let d1 = n.reduce((acc, val, i) => acc + val * (10 - i), 0) % 11;
  d1 = d1 < 2 ? 0 : 11 - d1;
  n.push(d1);
  let d2 = n.reduce((acc, val, i) => acc + val * (11 - i), 0) % 11;
  d2 = d2 < 2 ? 0 : 11 - d2;
  n.push(d2);
  const raw = n.join('');
  const final = mask ? raw.replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, '$1.$2.$3-$4') : raw;
  document.getElementById('utiliza-cpf-out').value = final;
}
function copiarCpfUtiliza() {
  const val = document.getElementById('utiliza-cpf-out').value;
  if (!val || val.includes('Clique')) return;
  navigator.clipboard.writeText(val);
  alert('CPF copiado para a área de transferência!');
}
</script>`;

      case 'juros':
        return `<!-- FERRAMENTA AUTÔNOMA: CALCULADORA DE JUROS COMPOSTOS -->
<div id="utiliza-juros-box" style="max-width: 580px; margin: 20px auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <h3 style="margin:0 0 16px; font-size: 18px; font-weight:700; color:#0f172a;">Calculadora de Juros Compostos</h3>
  <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
    <div>
      <label style="font-size:12px; font-weight:600; color:#64748b;">Valor Inicial (R$)</label>
      <input type="number" id="uj-ini" value="1000" style="width:100%; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px;" />
    </div>
    <div>
      <label style="font-size:12px; font-weight:600; color:#64748b;">Aporte Mensal (R$)</label>
      <input type="number" id="uj-mes" value="200" style="width:100%; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px;" />
    </div>
    <div>
      <label style="font-size:12px; font-weight:600; color:#64748b;">Taxa Anual (%)</label>
      <input type="number" id="uj-taxa" value="12" step="0.1" style="width:100%; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px;" />
    </div>
    <div>
      <label style="font-size:12px; font-weight:600; color:#64748b;">Período (Anos)</label>
      <input type="number" id="uj-anos" value="5" style="width:100%; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px;" />
    </div>
  </div>
  <button onclick="calcularJurosUtiliza()" style="width:100%; padding: 12px; background: linear-gradient(135deg, #2563eb, #4338ca); color:#fff; border:none; border-radius:9999px; font-weight:bold; cursor:pointer;">Calcular Patrimônio</button>
  <div id="uj-res" style="margin-top:16px; padding:16px; background:#f8fafc; border-radius:12px; display:none; text-align:center;">
    <span style="font-size:12px; color:#64748b; font-weight:600; text-transform:uppercase;">Montante Final Estimado:</span>
    <h4 id="uj-total" style="font-size:24px; font-weight:800; color:#2563eb; margin:6px 0 0;"></h4>
  </div>
</div>

<script>
function calcularJurosUtiliza() {
  const P = parseFloat(document.getElementById('uj-ini').value) || 0;
  const PMT = parseFloat(document.getElementById('uj-mes').value) || 0;
  const taxaAnual = parseFloat(document.getElementById('uj-taxa').value) || 0;
  const anos = parseFloat(document.getElementById('uj-anos').value) || 0;
  const r = (taxaAnual / 100) / 12;
  const n = anos * 12;
  let total = P;
  for (let i = 0; i < n; i++) {
    total = total * (1 + r) + PMT;
  }
  document.getElementById('uj-res').style.display = 'block';
  document.getElementById('uj-total').innerText = 'R$ ' + total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}
</script>`;

      case 'senha':
        return `<!-- FERRAMENTA AUTÔNOMA: GERADOR DE SENHAS FORTES -->
<div id="utiliza-senha-box" style="max-width: 580px; margin: 20px auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <h3 style="margin:0 0 16px; font-size: 18px; font-weight:700;">Gerador de Senhas Criptográficas</h3>
  <div style="display:flex; gap:8px; margin-bottom:16px;">
    <input type="text" id="uj-pass-out" readonly value="Clique em Gerar Senha..." style="flex:1; padding: 12px 16px; font-size: 16px; font-family: monospace; font-weight: bold; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px;" />
    <button onclick="copiarSenhaUtiliza()" style="padding: 12px 18px; background: #0f172a; color:#fff; border:none; border-radius:10px; font-weight:600; cursor:pointer;">Copiar</button>
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <label style="font-size:13px; font-weight:600; color:#475569;">Tamanho: <span id="uj-pass-len">16</span> caracteres</label>
    <button onclick="gerarSenhaUtiliza()" style="padding: 12px 24px; background: linear-gradient(135deg, #2563eb, #4338ca); color:#fff; border:none; border-radius:9999px; font-weight:bold; cursor:pointer;">Gerar Nova Senha</button>
  </div>
</div>

<script>
function gerarSenhaUtiliza() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*+?';
  const array = new Uint32Array(16);
  window.crypto.getRandomValues(array);
  let res = '';
  for (let i = 0; i < 16; i++) {
    res += chars[array[i] % chars.length];
  }
  document.getElementById('uj-pass-out').value = res;
}
function copiarSenhaUtiliza() {
  const val = document.getElementById('uj-pass-out').value;
  if (!val || val.includes('Clique')) return;
  navigator.clipboard.writeText(val);
  alert('Senha copiada com sucesso!');
}
</script>`;

      case 'whatsapp':
        return `<!-- FERRAMENTA AUTÔNOMA: GERADOR DE LINK WHATSAPP -->
<div id="utiliza-wpp-box" style="max-width: 580px; margin: 20px auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <h3 style="margin:0 0 16px; font-size: 18px; font-weight:700;">Gerador de Link para WhatsApp</h3>
  <div style="margin-bottom:12px;">
    <label style="font-size:12px; font-weight:600; color:#64748b;">Número (com DDD, somente dígitos):</label>
    <input type="text" id="uj-wpp-num" placeholder="Ex: 11987654321" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px;" />
  </div>
  <div style="margin-bottom:16px;">
    <label style="font-size:12px; font-weight:600; color:#64748b;">Mensagem Personalizada:</label>
    <textarea id="uj-wpp-msg" rows="3" placeholder="Ex: Olá, gostaria de saber mais informações..." style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px; resize:none;"></textarea>
  </div>
  <button onclick="gerarLinkWppUtiliza()" style="width:100%; padding: 12px; background: #25d366; color:#fff; border:none; border-radius:9999px; font-weight:bold; cursor:pointer; font-size:14px;">Gerar Link Direto</button>
  <div id="uj-wpp-res" style="margin-top:16px; display:none;">
    <input type="text" id="uj-wpp-out" readonly style="width:100%; padding:10px; font-size:12px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; margin-bottom:8px;" />
    <div style="display:flex; gap:8px;">
      <button onclick="copiarWppUtiliza()" style="flex:1; padding:8px; background:#0f172a; color:#fff; border:none; border-radius:6px; font-weight:600; cursor:pointer;">Copiar Link</button>
      <a id="uj-wpp-btn" href="#" target="_blank" style="flex:1; text-align:center; padding:8px; background:#2563eb; color:#fff; border-radius:6px; font-weight:600; text-decoration:none;">Abrir Conversa</a>
    </div>
  </div>
</div>

<script>
function gerarLinkWppUtiliza() {
  const num = document.getElementById('uj-wpp-num').value.replace(/\\D/g, '');
  const msg = encodeURIComponent(document.getElementById('uj-wpp-msg').value);
  if (!num) { alert('Digite o número com DDD'); return; }
  const url = 'https://wa.me/55' + num + (msg ? '?text=' + msg : '');
  document.getElementById('uj-wpp-out').value = url;
  document.getElementById('uj-wpp-btn').href = url;
  document.getElementById('uj-wpp-res').style.display = 'block';
}
function copiarWppUtiliza() {
  navigator.clipboard.writeText(document.getElementById('uj-wpp-out').value);
  alert('Link copiado!');
}
</script>`;

      case 'contador':
        return `<!-- FERRAMENTA AUTÔNOMA: CONTADOR DE CARACTERES E PALAVRAS -->
<div id="utiliza-cont-box" style="max-width: 580px; margin: 20px auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <h3 style="margin:0 0 16px; font-size: 18px; font-weight:700;">Contador de Caracteres & Palavras</h3>
  <textarea id="uj-txt-in" rows="5" oninput="contarTextoUtiliza()" placeholder="Digite ou cole seu texto aqui..." style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:10px; resize:vertical; font-family:sans-serif;"></textarea>
  <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:14px; text-align:center;">
    <div style="background:#f8fafc; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
      <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Caracteres</span>
      <h4 id="uj-c-chars" style="font-size:20px; font-weight:800; color:#2563eb; margin:4px 0 0;">0</h4>
    </div>
    <div style="background:#f8fafc; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
      <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Palavras</span>
      <h4 id="uj-c-words" style="font-size:20px; font-weight:800; color:#2563eb; margin:4px 0 0;">0</h4>
    </div>
    <div style="background:#f8fafc; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
      <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Sem Espaços</span>
      <h4 id="uj-c-nospaces" style="font-size:20px; font-weight:800; color:#2563eb; margin:4px 0 0;">0</h4>
    </div>
  </div>
</div>

<script>
function contarTextoUtiliza() {
  const val = document.getElementById('uj-txt-in').value;
  document.getElementById('uj-c-chars').innerText = val.length;
  document.getElementById('uj-c-nospaces').innerText = val.replace(/\\s/g, '').length;
  const words = val.trim() ? val.trim().split(/\\s+/).length : 0;
  document.getElementById('uj-c-words').innerText = words;
}
</script>`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xs">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Guia de Integração com o Blogger</h3>
                <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 text-[11px] font-mono rounded-full border border-blue-400/30">
                  utilizamais.blogspot.com
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Instruções passo a passo e códigos prontos para levar todas as ferramentas ao seu blog.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('page')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'page'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layout className="w-4 h-4 text-blue-600" />
            1. Página no Blogger (Recomendado)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('standalone')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'standalone'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-4 h-4 text-indigo-600" />
            2. Ferramentas Individuais (Para Posts)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('template')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'template'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-600" />
            3. Tema XML (Portal Inteiro no Domínio)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('adsense')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'adsense'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-500" />
            4. Dicas Google AdSense
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {activeTab === 'page' && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 space-y-1">
                  <strong className="block text-sm font-bold">O Método Mais Fácil e Elegante:</strong>
                  Crie uma página estática no seu Blogger chamada <strong>"Ferramentas Online"</strong> (URL: <code>utilizamais.blogspot.com/p/ferramentas.html</code>) e cole o código abaixo. O portal funcionará perfeitamente com todas as ferramentas e artigos sem alterar o tema do seu blog!
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Código HTML para colar na Página do Blogger
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(iframeSnippet, 'page')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-xs transition cursor-pointer"
                  >
                    {copiedSection === 'page' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSection === 'page' ? 'Copiado!' : 'Copiar Código'}
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 text-blue-200 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                  {iframeSnippet}
                </pre>
              </div>

              {/* Step by step instructions */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Passo a Passo no Painel do Blogger:</h4>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>Acesse o painel do Blogger em <strong>blogger.com</strong> no blog <strong>utilizamais.blogspot.com</strong>.</li>
                  <li>No menu lateral esquerdo, clique em <strong>Páginas</strong> e depois no botão <strong>+ Nova Página</strong>.</li>
                  <li>No campo de título da página, digite: <code>Ferramentas Online Gratuitas</code>.</li>
                  <li>No canto superior esquerdo do editor (ao lado do botão Desfazer), clique no ícone de lápis e mude para <strong>Visualização em HTML</strong>.</li>
                  <li>Apague qualquer texto existente e <strong>cole o código copiado acima</strong>.</li>
                  <li>Clique no botão <strong>Publicar</strong> (laranja) no canto superior direito.</li>
                  <li>Vá em <strong>Layout</strong> &gt; <strong>Menu Principal / Lista de Páginas</strong> e marque a nova página para que ela apareça no menu superior do seu blog!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'standalone' && (
            <div className="space-y-5">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
                <Code className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-900 space-y-1">
                  <strong className="block text-sm font-bold">Ideal para SEO e Posts Individuais:</strong>
                  Crie postagens temáticas no Blogger (ex: <em>"Como Calcular Juros Compostos Passo a Passo"</em>) e insira o widget interativo direto no meio do artigo. Isso retém o usuário por mais tempo e atrai cliques orgânicos no Google!
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-600 mr-1">Escolha a Ferramenta:</span>
                {[
                  { id: 'cpf', name: 'CPF / CNPJ' },
                  { id: 'juros', name: 'Juros Compostos' },
                  { id: 'senha', name: 'Gerador de Senhas' },
                  { id: 'whatsapp', name: 'Link WhatsApp' },
                  { id: 'contador', name: 'Contador de Texto' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedToolSnippet(t.id as any)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition cursor-pointer ${
                      selectedToolSnippet === t.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Código HTML + JS Puro (Cole no Post do Blogger em modo HTML)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(getToolSnippet(), 'standalone')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-xs transition cursor-pointer"
                  >
                    {copiedSection === 'standalone' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSection === 'standalone' ? 'Copiado!' : 'Copiar Widget'}
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 text-blue-200 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-64">
                  {getToolSnippet()}
                </pre>
              </div>

              <p className="text-xs text-slate-500 italic">
                * Este código não depende de bibliotecas externas (React, jQuery, etc.). Ele executa JavaScript nativo leve direto no navegador do leitor do seu Blogger.
              </p>
            </div>
          )}

          {activeTab === 'template' && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 space-y-1">
                  <strong className="block text-sm font-bold">Substituição Completa do Tema:</strong>
                  Se você deseja que o endereço <code>utilizamais.blogspot.com</code> abra diretamente o portal completo UTILIZA + (sem a barra lateral e o cabeçalho padrão antigo do Blogger), você pode substituir o tema XML por este template limpo.
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Código do Tema XML do Blogger
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bloggerTemplateSnippet, 'template')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-xs transition cursor-pointer"
                  >
                    {copiedSection === 'template' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSection === 'template' ? 'Copiado!' : 'Copiar Tema XML'}
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 text-blue-200 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-56">
                  {bloggerTemplateSnippet}
                </pre>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 text-xs text-slate-600">
                <h4 className="font-bold text-slate-900 text-sm">Como aplicar o tema no Blogger:</h4>
                <p>1. No Blogger, vá em <strong>Tema</strong>.</p>
                <p>2. Clique na seta ao lado do botão laranja <strong>Personalizar</strong> e selecione <strong>Fazer backup</strong> (para salvar seu tema atual, por segurança).</p>
                <p>3. Depois, clique novamente na seta e selecione <strong>Editar HTML</strong>.</p>
                <p>4. Selecione todo o código existente (Ctrl + A), apague e cole o código acima.</p>
                <p>5. Clique no ícone de <strong>Salvar</strong> (disquete) no canto superior direito.</p>
              </div>
            </div>
          )}

          {activeTab === 'adsense' && (
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-1">
                  <strong className="block text-sm font-bold">Monetização no Blogger (utilizamais.blogspot.com):</strong>
                  O Blogger pertence ao Google e tem integração nativa com o Google AdSense. Siga os passos abaixo para garantir aprovação rápida e máxima receita por clique (CPC).
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-blue-600 uppercase">Requisito 1: Conteúdo Textual</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    O Google AdSense exige artigos textuais além das ferramentas. Mantenha as 3 postagens do blog (publicadas neste portal) no seu Blogger com pelo menos 500 palavras cada.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-blue-600 uppercase">Requisito 2: Páginas Obrigatórias</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Você deve criar as páginas <strong>Política de Privacidade</strong> e <strong>Termos de Uso</strong> no Blogger (você pode copiar o texto exato dos botões no rodapé deste portal!).
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-blue-600 uppercase">Requisito 3: Arquivo ads.txt</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No Blogger, vá em <strong>Configurações &gt; Monetização &gt; Ativar arquivo ads.txt personalizado</strong> e cole a linha fornecida pelo AdSense após sua aprovação.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-blue-600 uppercase">Requisito 4: Conectar Conta</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No menu lateral do Blogger, clique na aba <strong>Ganhos</strong> e conecte diretamente a sua conta Google AdSense para ativar os anúncios automáticos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Destino configurado: <strong>https://utilizamais.blogspot.com/</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold transition cursor-pointer"
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
