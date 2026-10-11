// Sample material: foto detail diambil (crop) dari foto proyek NYATA di assets-src/materials/.
// TODO: ganti dengan foto sample material asli (papan sample di workshop) + konfirmasi nama material.

export const materialIds = [
  'wood-grain',
  'slatted-timber',
  'matte-white',
  'glass-led',
  'curved-ceiling',
  'green-wall',
] as const;
export type MaterialId = (typeof materialIds)[number];

export type Material = {
  id: MaterialId;
  image: string;
};

export const materials: readonly Material[] = materialIds.map((id) => ({
  id,
  image: `/materials/${id}`,
}));
