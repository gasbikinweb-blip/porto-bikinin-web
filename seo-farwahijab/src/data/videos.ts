import list from './videos.generated.json';

export type Video = {
  name: string;
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Detik */
  duration: number;
  sizeKb: number;
  /** true bila video sumber bersuara (audio ikut disertakan) */
  hasAudio: boolean;
};

// Dibuat oleh `npm run build-videos` dari scripts/videos.manifest.mjs
export const videos: readonly Video[] = list;
