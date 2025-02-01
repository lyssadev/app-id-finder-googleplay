import Conf from 'conf';
import { UserConfig } from '../types';

const defaultConfig: UserConfig = {
  theme: 'auto',
  language: 'en',
  country: 'us',
  maxResults: 10,
  cacheTimeout: 3600000, // 1 hour in milliseconds
  sortPreference: 'relevance',
};

class ConfigManager {
  private static instance: ConfigManager;
  private conf: Conf<UserConfig>;

  private constructor() {
    this.conf = new Conf<UserConfig>({
      projectName: 'app-id-finder-googleplay',
      defaults: defaultConfig,
    });
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public get<K extends keyof UserConfig>(key: K): UserConfig[K] {
    return this.conf.get(key);
  }

  public set<K extends keyof UserConfig>(key: K, value: UserConfig[K]): void {
    this.conf.set(key, value);
  }

  public getAll(): UserConfig {
    return this.conf.store;
  }

  public reset(): void {
    this.conf.clear();
    this.conf.set(defaultConfig);
  }

  public has(key: keyof UserConfig): boolean {
    return this.conf.has(key);
  }
}

export const config = ConfigManager.getInstance();
export { defaultConfig }; 