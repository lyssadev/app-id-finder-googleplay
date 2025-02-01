export interface AppInfo {
  id: string;
  title: string;
  developer: string;
  score: number;
  url: string;
  icon?: string;
  downloads?: string;
  price?: string;
  currency?: string;
  free?: boolean;
  description?: string;
  genre?: string;
  genreId?: string;
  lastUpdated?: string;
  size?: string;
  minInstalls?: number;
  maxInstalls?: number;
  ratings?: number;
  reviews?: number;
  histogram?: { [key: string]: number };
  version?: string;
  androidVersion?: string;
  contentRating?: string;
  released?: string;
}

export interface SearchOptions {
  term: string;
  num?: number;
  lang?: string;
  country?: string;
  fullDetail?: boolean;
  price?: 'all' | 'free' | 'paid';
  sort?: 'relevance' | 'rating' | 'downloads' | 'newest';
}

export interface SearchResult {
  apps: AppInfo[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface AppCache {
  timestamp: number;
  data: AppInfo[];
}

export interface UserConfig {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  country: string;
  maxResults: number;
  cacheTimeout: number;
  sortPreference: 'relevance' | 'rating' | 'downloads' | 'newest';
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: unknown;
} 