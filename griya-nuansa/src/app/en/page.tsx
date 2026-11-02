import { pageMeta } from '@/lib/seo';
import { HomeView } from '@/views/HomeView';

export const metadata = pageMeta({
  lang: 'en',
  absoluteTitle: 'Griya Nuansa | Architect & Interior Design in Serpong, South Tangerang',
  description:
    'Architecture and interior design studio in Serpong, South Tangerang. Griya Nuansa designs and builds homes, apartments, cafés, gyms, clinics, offices, and industrial spaces across Greater Jakarta.',
  path: '/',
});

export default function HomePage() {
  return <HomeView lang={'en'} />;
}
