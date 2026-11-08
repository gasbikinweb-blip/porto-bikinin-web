// Gabungan papan & bucket untuk modal, deep link, dan form pesanan (whitelist slug)
import { boards } from './boards';
import { bouquets } from './bouquets';
import type { Board, Bouquet } from './types';

export type CatalogItem = ({ kind: 'papan' } & Board) | ({ kind: 'bucket' } & Bouquet);

export const catalog: readonly CatalogItem[] = [
  ...boards.map((b) => ({ kind: 'papan' as const, ...b })),
  ...bouquets.map((b) => ({ kind: 'bucket' as const, ...b })),
];

export const getCatalogItem = (slug: string) => catalog.find((c) => c.slug === slug);

/** Event untuk mengisi form pesanan dari modal */
export const ORDER_EVENT = 'klaurist:pesan';
export type OrderEventDetail = { slug: string; variant?: string };
