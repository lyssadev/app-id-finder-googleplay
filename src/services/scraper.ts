import gplay, { IAppItem } from 'google-play-scraper';
import NodeCache from 'node-cache';
import { AppInfo, SearchOptions, SearchResult } from '../types';
import { config } from '../config';
import { logger } from '../utils/logger';

class ScraperService {
  private static instance: ScraperService;
  private cache: NodeCache;

  private constructor() {
    this.cache = new NodeCache({
      stdTTL: config.get('cacheTimeout') / 1000, // Convert ms to seconds
      checkperiod: 120,
    });
  }

  public static getInstance(): ScraperService {
    if (!ScraperService.instance) {
      ScraperService.instance = new ScraperService();
    }
    return ScraperService.instance;
  }

  private getCacheKey(options: SearchOptions): string {
    return `search:${JSON.stringify(options)}`;
  }

  private convertAppToAppInfo(app: IAppItem): AppInfo {
    return {
      id: app.appId,
      title: app.title,
      developer: app.developer,
      score: app.score,
      url: app.url,
      icon: app.icon,
      downloads: app.installs,
      price: app.price?.toString() || 'Free',
      currency: app.currency,
      free: app.free,
      description: app.description,
      genre: app.genre,
      genreId: app.genreId,
      lastUpdated: new Date(app.updated).toISOString(),
      size: app.size,
      minInstalls: app.minInstalls,
      maxInstalls: app.maxInstalls,
      ratings: app.ratings,
      reviews: app.reviews,
      histogram: app.histogram,
      version: app.version,
      androidVersion: app.androidVersion,
      contentRating: app.contentRating,
      released: app.released,
    };
  }

  public async searchApps(options: SearchOptions): Promise<SearchResult> {
    const cacheKey = this.getCacheKey(options);
    const cachedResult = this.cache.get<SearchResult>(cacheKey);

    if (cachedResult) {
      logger.info('Returning cached search results');
      return cachedResult;
    }

    try {
      const apps = await gplay.search({
        term: options.term,
        num: options.num || config.get('maxResults'),
        lang: options.lang || config.get('language'),
        country: options.country || config.get('country'),
        fullDetail: options.fullDetail ?? true,
        price: options.price || 'all',
      });

      const result: SearchResult = {
        apps: apps.map(app => this.convertAppToAppInfo(app)),
        total: apps.length,
        page: 1,
        pageSize: options.num || config.get('maxResults'),
        hasMore: apps.length === (options.num || config.get('maxResults')),
      };

      this.cache.set(cacheKey, result);
      logger.info(`Found ${result.total} apps matching search criteria`);
      return result;
    } catch (error) {
      logger.error('Error fetching apps from Google Play:', error);
      throw new Error(`Failed to fetch apps: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async getAppDetails(appId: string): Promise<AppInfo> {
    const cacheKey = `app:${appId}`;
    const cachedApp = this.cache.get<AppInfo>(cacheKey);

    if (cachedApp) {
      logger.info(`Returning cached details for app ${appId}`);
      return cachedApp;
    }

    try {
      const app = await gplay.app({ appId });
      const appInfo = this.convertAppToAppInfo(app);

      this.cache.set(cacheKey, appInfo);
      logger.info(`Retrieved details for app ${appId}`);
      return appInfo;
    } catch (error) {
      logger.error(`Error fetching details for app ${appId}:`, error);
      throw new Error(`Failed to fetch app details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public clearCache(): void {
    this.cache.flushAll();
    logger.info('Cache cleared');
  }
}

export const scraperService = ScraperService.getInstance(); 