// Sanaréa Moments: booth CFD Beelka Cianjur & Pasar Kaget Vol.20.
// Hanya foto tanpa wajah pengunjung yang jelas. Foto pengunjung/staf (CFD 14, 17, 18, 27; Event 07, 08) tidak dipakai.
import { img } from './images';

export const moments = [
  {
    ...img('moments/cfd-booth', 'Booth SANARÉA di CFD Beelka Cianjur dengan manekin dan rak hijab'),
    label: 'CFD Beelka, Cianjur',
  },
  {
    ...img('moments/event-rack', 'Rak hijab SANARÉA di Pasar Kaget Vol.20'),
    label: 'Pasar Kaget Vol.20',
  },
  {
    ...img('moments/cfd-rack', 'Deretan pashmina warna-warni di booth CFD SANARÉA'),
    label: 'CFD Beelka, Cianjur',
  },
  {
    ...img('moments/event-welcome', 'Papan sambutan SANARÉA dan rangkaian bunga di booth event'),
    label: 'Pasar Kaget Vol.20',
  },
  {
    ...img('moments/event-table', 'Kemasan hijab SANARÉA tersusun di meja booth'),
    label: 'Pasar Kaget Vol.20',
  },
  {
    ...img('moments/cfd-restock', 'Restock Eleera Viscose di booth CFD'),
    label: 'CFD Beelka, Cianjur',
  },
] as const;
