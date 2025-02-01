declare module 'google-play-scraper' {
  export interface IAppItem {
    appId: string;
    title: string;
    developer: string;
    score: number;
    url: string;
    icon: string;
    free: boolean;
    installs: string;
    price: number;
    currency: string;
    description: string;
    genre: string;
    genreId: string;
    updated: number;
    size: string;
    minInstalls: number;
    maxInstalls: number;
    ratings: number;
    reviews: number;
    histogram: { [key: string]: number };
    version: string;
    androidVersion: string;
    contentRating: string;
    released: string;
  }

  export interface ISearchOptions {
    term: string;
    num?: number;
    lang?: string;
    country?: string;
    fullDetail?: boolean;
    price?: 'all' | 'free' | 'paid';
  }

  export interface IAppOptions {
    appId: string;
    lang?: string;
    country?: string;
  }

  export function search(opts: ISearchOptions): Promise<IAppItem[]>;
  export function app(opts: IAppOptions): Promise<IAppItem>;
} 