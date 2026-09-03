export type ToolCategory = 
  | 'todos'
  | 'documentos'
  | 'texto-seo'
  | 'financas'
  | 'desenvolvimento'
  | 'comunicacao'
  | 'utilitarios';

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: ToolCategory;
  iconName: string;
  tags: string[];
  schemaType: 'WebApplication' | 'SoftwareApplication';
  usageCount: number;
  featured?: boolean;
  faq?: Array<{ question: string; answer: string }>;
  seoTips?: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  viewsCount: number;
  coverImage?: string;
  tags: string[];
  contentHtml: string;
  faq?: Array<{ question: string; answer: string }>;
  relatedToolSlugs?: string[];
}

export interface AdSenseConfig {
  publisherId: string;
  demoMode: boolean;
  adsEnabled: boolean;
  slots: {
    headerTop: string;
    inArticleTop: string;
    inArticleBottom: string;
    sidebarSticky: string;
    toolFooter: string;
  };
}

export interface LgpdPreferences {
  consentGiven: boolean;
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'pageview' | 'tool_run' | 'ad_impression' | 'ad_click' | 'search' | 'consent_update' | 'cache_hit';
  name: string;
  details?: string;
  timestamp: string;
}

export interface AnalyticsMetrics {
  liveUsers: number;
  totalPageviews: number;
  toolExecutionsCount: number;
  avgTimeOnPageSec: number;
  scrollDepth25: number;
  scrollDepth50: number;
  scrollDepth75: number;
  scrollDepth100: number;
  popularTools: Record<string, number>;
  events: AnalyticsEvent[];
}

export interface CacheStats {
  hits: number;
  misses: number;
  itemsCount: number;
  lastPurged: string;
  averageSpeedMs: number;
}
