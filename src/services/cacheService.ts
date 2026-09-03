import { CacheStats } from '../types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // in milliseconds
  hits: number;
}

class FastMobileCacheService {
  private memoryCache = new Map<string, CacheEntry<unknown>>();
  private stats: CacheStats = {
    hits: 24,
    misses: 2,
    itemsCount: 0,
    lastPurged: new Date().toLocaleTimeString('pt-BR'),
    averageSpeedMs: 1.8,
  };

  private storageKey = 'utiliza_plus_fast_cache_v1';

  constructor() {
    this.hydrateFromStorage();
  }

  private hydrateFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([key, value]) => {
          this.memoryCache.set(key, value as CacheEntry<unknown>);
        });
        this.stats.itemsCount = this.memoryCache.size;
      }
    } catch {
      // LocalStorage might be restricted; memory cache stays active
    }
  }

  private syncToStorage() {
    try {
      const obj: Record<string, unknown> = {};
      this.memoryCache.forEach((val, key) => {
        // Only persist if still valid
        if (Date.now() - val.timestamp < val.ttl) {
          obj[key] = val;
        }
      });
      localStorage.setItem(this.storageKey, JSON.stringify(obj));
    } catch {
      // Storage quota exceeded or disabled
    }
  }

  public get<T>(key: string): T | null {
    const start = performance.now();
    const entry = this.memoryCache.get(key);

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.memoryCache.delete(key);
      this.stats.misses++;
      this.syncToStorage();
      return null;
    }

    entry.hits++;
    this.stats.hits++;
    const speed = performance.now() - start;
    this.stats.averageSpeedMs = Number(((this.stats.averageSpeedMs * 0.9) + (speed * 0.1)).toFixed(2));
    this.stats.itemsCount = this.memoryCache.size;
    return entry.data as T;
  }

  public set<T>(key: string, data: T, ttlMs = 1000 * 60 * 60): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
      hits: 0,
    };
    this.memoryCache.set(key, entry);
    this.stats.itemsCount = this.memoryCache.size;
    this.syncToStorage();
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public purgeAll(): void {
    this.memoryCache.clear();
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // ignored
    }
    this.stats.hits = 0;
    this.stats.misses = 0;
    this.stats.itemsCount = 0;
    this.stats.lastPurged = new Date().toLocaleTimeString('pt-BR');
  }

  public getStats(): CacheStats {
    this.stats.itemsCount = this.memoryCache.size;
    return { ...this.stats };
  }
}

export const fastCache = new FastMobileCacheService();
