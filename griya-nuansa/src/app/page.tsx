import { pageMeta } from '@/lib/seo';
import { HomeView } from '@/views/HomeView';

export const metadata = pageMeta({
  lang: 'id',
  absoluteTitle: 'Griya Nuansa | Arsitek & Desain Interior Serpong, Tangerang Selatan',
  description:
    'Jasa arsitek dan desain interior di Serpong, Tangerang Selatan. Griya Nuansa merancang dan mengerjakan rumah, apartemen, kafe, gym, klinik, kantor, hingga industri di Jabodetabek.',
  path: '/',
});

export default function HomePage() {
  return <HomeView lang={'id'} />;
}
