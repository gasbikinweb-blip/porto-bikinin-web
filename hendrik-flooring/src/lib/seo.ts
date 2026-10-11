import { siteConfig } from './config';

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).href;
