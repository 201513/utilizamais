import { AnalyticsEvent, AnalyticsMetrics } from '../types';

type AnalyticsListener = (metrics: AnalyticsMetrics) => void;

class RealtimeAnalyticsEngine {
  private metrics: AnalyticsMetrics = {
    liveUsers: 47,
    totalPageviews: 1842,
    toolExecutionsCount: 789,
    avgTimeOnPageSec: 132,
    scrollDepth25: 78,
    scrollDepth50: 64,
    scrollDepth75: 49,
    scrollDepth100: 31,
    popularTools: {
      'gerador-validador-cpf-cnpj': 324,
      'contador-caracteres-seo': 188,
      'calculadora-juros-compostos': 142,
      'gerador-link-whatsapp': 95,
      'gerador-senhas-fortes': 40,
    },
    events: [
      {
        id: 'evt-1',
        type: 'tool_run',
        name: 'Gerador de CPF executado com formatação',
        details: 'Dispositivo Mobile (Android) • Cache Ativo',
        timestamp: 'há 12s',
      },
      {
        id: 'evt-2',
        type: 'pageview',
        name: 'Visualização de Página: Guia SEO Técnico',
        details: 'Origem: Busca Orgânica Google',
        timestamp: 'há 28s',
      },
      {
        id: 'evt-3',
        type: 'ad_impression',
        name: 'Impressão de Anúncio: Header Leaderboard 728x90',
        details: 'Viewability: 100% • Slot: #top-banner',
        timestamp: 'há 45s',
      },
      {
        id: 'evt-4',
        type: 'tool_run',
        name: 'Cálculo de Juros Compostos realizado',
        details: 'Tempo de interação: 4.2s',
        timestamp: 'há 1m',
      },
    ],
  };

  private listeners: Set<AnalyticsListener> = new Set();
  private timer: NodeJS.Timeout | null = null;

  constructor() {
    this.startSimulation();
  }

  private startSimulation() {
    // Micro-fluctuation to give realistic real-time telemetry feel
    if (typeof window !== 'undefined') {
      this.timer = setInterval(() => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        this.metrics.liveUsers = Math.max(28, this.metrics.liveUsers + delta);
        this.notify();
      }, 5000);
    }
  }

  public subscribe(listener: AnalyticsListener): () => void {
    this.listeners.add(listener);
    listener(this.metrics);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn({ ...this.metrics }));
  }

  public trackPageView(path: string, title: string) {
    this.metrics.totalPageviews++;
    this.pushEvent({
      id: `pv-${Date.now()}`,
      type: 'pageview',
      name: `Visualização de Página: ${title}`,
      details: `Rota: ${path}`,
      timestamp: 'agora',
    });

    // Push to standard Google Tag Manager dataLayer if available
    if (typeof window !== 'undefined') {
      const win = window as unknown as { dataLayer?: unknown[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: 'page_view',
        page_title: title,
        page_location: window.location.href,
        page_path: path,
      });
    }
  }

  public trackToolUsage(toolSlug: string, toolName: string, meta?: string) {
    this.metrics.toolExecutionsCount++;
    this.metrics.popularTools[toolSlug] = (this.metrics.popularTools[toolSlug] || 0) + 1;

    this.pushEvent({
      id: `tool-${Date.now()}`,
      type: 'tool_run',
      name: `Ferramenta: ${toolName}`,
      details: meta || 'Execução bem-sucedida pelo visitante',
      timestamp: 'agora',
    });

    if (typeof window !== 'undefined') {
      const win = window as unknown as { dataLayer?: unknown[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: 'tool_execution',
        tool_slug: toolSlug,
        tool_name: toolName,
        meta,
      });
    }
  }

  public trackAdClick(slotName: string) {
    this.pushEvent({
      id: `ad-${Date.now()}`,
      type: 'ad_click',
      name: `Clique no Bloco de Anúncio`,
      details: `Slot: ${slotName}`,
      timestamp: 'agora',
    });

    if (typeof window !== 'undefined') {
      const win = window as unknown as { dataLayer?: unknown[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: 'ad_click',
        ad_slot: slotName,
      });
    }
  }

  public trackScroll(percent: 25 | 50 | 75 | 100) {
    if (percent === 25) this.metrics.scrollDepth25++;
    if (percent === 50) this.metrics.scrollDepth50++;
    if (percent === 75) this.metrics.scrollDepth75++;
    if (percent === 100) this.metrics.scrollDepth100++;

    this.notify();
  }

  public trackConsent(analyticsAccepted: boolean, marketingAccepted: boolean) {
    this.pushEvent({
      id: `consent-${Date.now()}`,
      type: 'consent_update',
      name: 'Preferências LGPD atualizadas',
      details: `Analíticos: ${analyticsAccepted ? 'Sim' : 'Não'} • Marketing: ${marketingAccepted ? 'Sim' : 'Não'}`,
      timestamp: 'agora',
    });
  }

  private pushEvent(event: AnalyticsEvent) {
    this.metrics.events = [event, ...this.metrics.events.slice(0, 15)];
    this.notify();
  }

  public getMetrics(): AnalyticsMetrics {
    return { ...this.metrics };
  }
}

export const realtimeAnalytics = new RealtimeAnalyticsEngine();
