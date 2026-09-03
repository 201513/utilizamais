import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench,
  Search,
  Sparkles,
  ChevronRight,
  HelpCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Lock,
  Share2,
  CheckCircle2,
  Activity,
  FileText,
  DollarSign,
  Code2,
  MessageSquare,
  KeyRound,
  ArrowLeftRight,
  Globe,
} from 'lucide-react';

import { ToolItem, BlogArticle, ToolCategory } from './types';
import { TOOLS_DATA } from './data/toolsData';
import { BLOG_ARTICLES } from './data/articlesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CacheControlBar } from './components/CacheControlBar';
import { AdSenseSlot } from './components/AdSenseSlot';
import { LgpdConsentModal } from './components/LgpdConsentModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';
import { RealtimeAnalyticsDrawer } from './components/RealtimeAnalyticsDrawer';
import { TechnicalSeoDrawer } from './components/TechnicalSeoDrawer';
import { BloggerIntegrationModal } from './components/BloggerIntegrationModal';

// Tool Components
import { CpfCnpjTool } from './components/tools/CpfCnpjTool';
import { TextCounterTool } from './components/tools/TextCounterTool';
import { CompoundInterestTool } from './components/tools/CompoundInterestTool';
import { WhatsAppLinkTool } from './components/tools/WhatsAppLinkTool';
import { PasswordGeneratorTool } from './components/tools/PasswordGeneratorTool';
import { JsonFormatterTool } from './components/tools/JsonFormatterTool';
import { SeoTagsGeneratorTool } from './components/tools/SeoTagsGeneratorTool';
import { UnitConverterTool } from './components/tools/UnitConverterTool';

import { realtimeAnalytics } from './services/analyticsService';
import { fastCache } from './services/cacheService';
import { generateToolSchema, generateArticleSchema, generateWebSiteSchema } from './services/seoService';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'tool' | 'blog' | 'article'>('home');
  const [selectedToolSlug, setSelectedToolSlug] = useState<string>('gerador-validador-cpf-cnpj');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>('guia-seo-tecnico-ferramentas-web');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [adsDemoMode, setAdsDemoMode] = useState(true);

  // Modals
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
  const [bloggerOpen, setBloggerOpen] = useState(false);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const percent = Math.round(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100);

      if (percent >= 25 && percent < 50) realtimeAnalytics.trackScroll(25);
      else if (percent >= 50 && percent < 75) realtimeAnalytics.trackScroll(50);
      else if (percent >= 75 && percent < 95) realtimeAnalytics.trackScroll(75);
      else if (percent >= 95) realtimeAnalytics.trackScroll(100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track page views on route changes
  useEffect(() => {
    let title = 'UTILIZA + | Ferramentas Gratuitas e Guias de Produtividade';
    let path = '/';

    if (currentView === 'tool') {
      const tool = TOOLS_DATA.find((t) => t.slug === selectedToolSlug);
      if (tool) {
        title = `${tool.title} | UTILIZA +`;
        path = `/ferramenta/${tool.slug}`;
      }
    } else if (currentView === 'article') {
      const art = BLOG_ARTICLES.find((a) => a.slug === selectedArticleSlug);
      if (art) {
        title = `${art.title} | UTILIZA +`;
        path = `/artigo/${art.slug}`;
      }
    } else if (currentView === 'blog') {
      title = 'Blog & Artigos de SEO, AdSense e Performance | UTILIZA +';
      path = '/blog';
    }

    document.title = title;
    realtimeAnalytics.trackPageView(path, title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedToolSlug, selectedArticleSlug]);

  // Current active tool object
  const currentTool = useMemo(() => {
    return TOOLS_DATA.find((t) => t.slug === selectedToolSlug) || TOOLS_DATA[0];
  }, [selectedToolSlug]);

  // Current active article object
  const currentArticle = useMemo(() => {
    return BLOG_ARTICLES.find((a) => a.slug === selectedArticleSlug) || BLOG_ARTICLES[0];
  }, [selectedArticleSlug]);

  // Filtered tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory = activeCategory === 'todos' || tool.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.shortDesc.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return BLOG_ARTICLES;
    return BLOG_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleSelectTool = (slug: string) => {
    setSelectedToolSlug(slug);
    setCurrentView('tool');
  };

  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentView('article');
  };

  // Render Tool Component mapping
  const renderToolComponent = () => {
    switch (currentTool.slug) {
      case 'gerador-validador-cpf-cnpj':
        return <CpfCnpjTool />;
      case 'contador-caracteres-seo':
        return <TextCounterTool />;
      case 'calculadora-juros-compostos':
        return <CompoundInterestTool />;
      case 'gerador-link-whatsapp':
        return <WhatsAppLinkTool />;
      case 'gerador-senhas-fortes':
        return <PasswordGeneratorTool />;
      case 'formatador-minificador-json':
        return <JsonFormatterTool />;
      case 'gerador-meta-tags-seo':
        return <SeoTagsGeneratorTool />;
      case 'conversor-unidades-medidas':
        return <UnitConverterTool />;
      default:
        return <CpfCnpjTool />;
    }
  };

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-blue-600" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-600" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-blue-600" />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight className="w-5 h-5 text-blue-600" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Dynamic Schema.org JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            currentView === 'tool'
              ? generateToolSchema(currentTool)
              : currentView === 'article'
              ? generateArticleSchema(currentArticle)
              : generateWebSiteSchema()
          ),
        }}
      />

      {/* Top Mobile Cache & Speed Monitor Bar */}
      <CacheControlBar />

      {/* Header / Navbar */}
      <Navbar
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        onNavigateBlog={() => setCurrentView('blog')}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        onOpenSeoInspector={() => setSeoOpen(true)}
        onOpenPrivacyPolicy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
        onOpenBloggerGuide={() => setBloggerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        adsDemoMode={adsDemoMode}
        setAdsDemoMode={setAdsDemoMode}
      />

      {/* Top Leaderboard Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <AdSenseSlot slotType="header-leaderboard" demoMode={adsDemoMode} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xs text-center relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-800 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Portal de Produtividade • 100% Gratuito e Conforme LGPD
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
                Ferramentas Online Ágeis para Potencializar seu Dia
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
                Calculadoras financeiras, geradores de documentos para testes de software, formatadores e analisadores SEO com processamento 100% no seu navegador e velocidade instantânea.
              </p>

              {/* Blogger Direct Integration Action Button */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setBloggerOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-white" />
                  <span>Levar para Blogger (utilizamais.blogspot.com)</span>
                </button>
              </div>

              {/* Quick stats badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-xs text-slate-500 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Carregamento &lt; 2ms (Cache L1)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Lock className="w-4 h-4 text-indigo-600" />
                  Sem Coleta de Dados Pessoais
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Segurança Criptográfica Client-Side
                </span>
              </div>
            </section>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {(
                [
                  { id: 'todos', label: 'Todas as Ferramentas' },
                  { id: 'documentos', label: 'Documentos & QA' },
                  { id: 'texto-seo', label: 'Texto & SEO' },
                  { id: 'financas', label: 'Finanças & Investimentos' },
                  { id: 'comunicacao', label: 'Comunicação & Vendas' },
                  { id: 'desenvolvimento', label: 'Desenvolvimento' },
                  { id: 'utilitarios', label: 'Utilitários & Segurança' },
                ] as Array<{ id: ToolCategory; label: string }>
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Tools Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  {searchQuery ? `Resultados para "${searchQuery}"` : 'Catálogo de Ferramentas'}
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {filteredTools.length} {filteredTools.length === 1 ? 'ferramenta' : 'ferramentas'}
                </span>
              </div>

              {filteredTools.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
                  <p className="text-sm">Nenhuma ferramenta encontrada para a busca informada.</p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                    className="mt-3 text-xs font-bold text-blue-600 underline"
                  >
                    Ver todas as ferramentas
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => handleSelectTool(tool.slug)}
                      className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition">
                            {getToolIcon(tool.iconName)}
                          </div>
                          {tool.featured && (
                            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold rounded-full">
                              Popular
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition">
                            {tool.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {tool.shortDesc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">
                          {(tool.usageCount + 240).toLocaleString('pt-BR')} usos
                        </span>
                        <span className="font-bold text-blue-600 group-hover:translate-x-1 transition flex items-center gap-1">
                          Acessar <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* In-Content AdSlot */}
            <AdSenseSlot slotType="in-article" demoMode={adsDemoMode} />

            {/* Blog & Articles Highlight Section */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Conhecimento & Tutoriais
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    Artigos em Destaque no Blog UTILIZA +
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentView('blog')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition"
                >
                  Ver todos os artigos <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {BLOG_ARTICLES.slice(0, 2).map((article) => (
                  <article
                    key={article.id}
                    onClick={() => handleSelectArticle(article.slug)}
                    className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-sm transition cursor-pointer flex flex-col group bg-slate-50/40"
                  >
                    {article.coverImage && (
                      <div className="h-44 w-full overflow-hidden bg-slate-200">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-full font-semibold text-[10px]">
                            {article.category}
                          </span>
                          <span>•</span>
                          <span>{article.readTimeMinutes} min de leitura</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 pt-3 border-t border-slate-200/60 text-xs text-slate-500">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-medium">{article.author.name}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SINGLE TOOL VIEW (High-converting UX + Deep SEO text + AdSense) */}
        {currentView === 'tool' && (
          <div className="space-y-8 animate-fade-in">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
              <button
                type="button"
                onClick={() => setCurrentView('home')}
                className="hover:text-blue-600 transition"
              >
                Início
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button
                type="button"
                onClick={() => { setActiveCategory(currentTool.category); setCurrentView('home'); }}
                className="hover:text-blue-600 transition capitalize"
              >
                {currentTool.category.replace('-', ' ')}
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900 font-semibold truncate max-w-xs">{currentTool.title}</span>
            </nav>

            {/* Tool Header */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl shrink-0 mt-1">
                    {getToolIcon(currentTool.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        {currentTool.category}
                      </span>
                      <span className="text-xs text-blue-600 font-medium">⚡ Execução Instantânea</span>
                    </div>
                    <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {currentTool.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                      {currentTool.longDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Main Interactive Tool Component */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-6">
                {renderToolComponent()}

                {/* Post-Result / In-Tool Ad Slot */}
                <AdSenseSlot slotType="in-article" demoMode={adsDemoMode} />

                {/* Deep Educational / SEO Guide Content */}
                <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Guia Prático e Boas Práticas de Utilização
                  </h2>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      O <strong>UTILIZA +</strong> adota padrões técnicos avançados para assegurar a precisão dos cálculos e a integridade de dados. Ao operar esta utilidade, tenha em mente:
                    </p>
                    <ul className="space-y-2 list-disc pl-5">
                      {currentTool.seoTips?.map((tip, idx) => (
                        <li key={idx} className="leading-relaxed font-normal">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FAQ Section (Accordion) */}
                  {currentTool.faq && currentTool.faq.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        Perguntas Frequentes (FAQ)
                      </h3>
                      <div className="space-y-3">
                        {currentTool.faq.map((item, i) => (
                          <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                            <h4 className="font-bold text-sm text-slate-900">{item.question}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </div>

              {/* Sidebar with Sticky Ad and Quick Links */}
              <aside className="space-y-6 sticky top-20">
                {/* Sticky Ad Slot */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <AdSenseSlot slotType="sidebar-sticky" demoMode={adsDemoMode} />
                </div>

                {/* Related Tools Box */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Outras Ferramentas Recomendadas
                  </h4>
                  <div className="space-y-2">
                    {TOOLS_DATA.filter((t) => t.slug !== currentTool.slug).slice(0, 4).map((tool) => (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => handleSelectTool(tool.slug)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-200 flex items-center justify-between text-xs group"
                      >
                        <span className="font-semibold text-slate-800 group-hover:text-blue-700 truncate pr-2">
                          {tool.title}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* LGPD Safety Notice in Sidebar */}
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Privacidade Garantida (LGPD)
                  </div>
                  <p className="text-[11px] leading-relaxed text-blue-900">
                    Nenhuma informação gerada nesta ferramenta é transmitida ou arquivada em bancos de dados. Sua computação é estritamente local e confidencial.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* VIEW 3: BLOG LISTING */}
        {currentView === 'blog' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-center max-w-3xl mx-auto">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                Artigos Técnicos & Guias
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Blog Oficial UTILIZA +
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Conteúdos completos sobre SEO técnico, estratégias de aprovação e alto RPM no Google AdSense, conformidade com a LGPD e otimização de Core Web Vitals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => handleSelectArticle(art.slug)}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-md transition cursor-pointer flex flex-col group"
                >
                  {art.coverImage && (
                    <div className="h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-full text-[11px]">
                          {art.category}
                        </span>
                        <span>•</span>
                        <span>{art.readTimeMinutes} min</span>
                      </div>
                      <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition leading-snug">
                        {art.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={art.author.avatar}
                          alt={art.author.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-800">{art.author.name}</span>
                      </div>
                      <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                        Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <AdSenseSlot slotType="multiplex" demoMode={adsDemoMode} />
          </div>
        )}

        {/* VIEW 4: SINGLE ARTICLE VIEW */}
        {currentView === 'article' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
              <button
                type="button"
                onClick={() => setCurrentView('home')}
                className="hover:text-blue-600 transition"
              >
                Início
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button
                type="button"
                onClick={() => setCurrentView('blog')}
                className="hover:text-blue-600 transition"
              >
                Blog
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900 font-semibold truncate max-w-xs">{currentArticle.title}</span>
            </nav>

            <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
              {/* Header */}
              <div className="space-y-4 border-b border-slate-100 pb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold">
                  {currentArticle.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {currentArticle.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentArticle.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentArticle.author.avatar}
                      alt={currentArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{currentArticle.author.name}</p>
                      <p className="text-slate-400">{currentArticle.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Publicado em: {new Date(currentArticle.publishedAt).toLocaleDateString('pt-BR')}</span>
                    <span>•</span>
                    <span>{currentArticle.readTimeMinutes} min de leitura</span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {currentArticle.coverImage && (
                <div className="rounded-xl overflow-hidden max-h-96 w-full">
                  <img
                    src={currentArticle.coverImage}
                    alt={currentArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* In-Article Top Ad */}
              <AdSenseSlot slotType="in-article" demoMode={adsDemoMode} />

              {/* Article Content Rendered */}
              <div
                className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: currentArticle.contentHtml }}
              />

              {/* Callout to related tools */}
              {currentArticle.relatedToolSlugs && currentArticle.relatedToolSlugs.length > 0 && (
                <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
                  <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">
                    Experimente as Ferramentas Gratuitas Relacionadas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentArticle.relatedToolSlugs.map((slug) => {
                      const t = TOOLS_DATA.find((x) => x.slug === slug);
                      if (!t) return null;
                      return (
                        <button
                          key={slug}
                          type="button"
                          onClick={() => handleSelectTool(slug)}
                          className="px-4 py-2 bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-full text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <Wrench className="w-3.5 h-3.5 text-blue-400" />
                          {t.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* In-Article Bottom Ad */}
              <AdSenseSlot slotType="in-article" demoMode={adsDemoMode} />

              {/* Article FAQ */}
              {currentArticle.faq && currentArticle.faq.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Perguntas Frequentes sobre este Artigo</h3>
                  <div className="space-y-3">
                    {currentArticle.faq.map((f, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <h4 className="font-bold text-sm text-slate-900">{f.question}</h4>
                        <p className="text-xs text-slate-600">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        )}
      </main>

      {/* Footer Component */}
      <Footer
        onOpenPrivacyPolicy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
        onOpenSeoInspector={() => setSeoOpen(true)}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        onOpenBloggerGuide={() => setBloggerOpen(true)}
        onSelectTool={handleSelectTool}
      />

      {/* LGPD Cookie Consent Banner & Preferences Drawer */}
      <LgpdConsentModal onOpenPrivacyPolicy={() => setPrivacyOpen(true)} />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />

      {/* Terms of Service Modal */}
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

      {/* Real-time Analytics Telemetry Drawer */}
      <RealtimeAnalyticsDrawer isOpen={analyticsOpen} onClose={() => setAnalyticsOpen(false)} />

      {/* Technical SEO Schemas & Sitemap Inspector */}
      <TechnicalSeoDrawer isOpen={seoOpen} onClose={() => setSeoOpen(false)} />

      {/* Blogger Export & Integration Modal */}
      <BloggerIntegrationModal isOpen={bloggerOpen} onClose={() => setBloggerOpen(false)} />
    </div>
  );
}
