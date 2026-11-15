import { ConsultBuilder } from '@/components/ConsultBuilder';
import { Catalog } from '@/components/Catalog';
import { Posters } from '@/components/Posters';
import { Reels } from '@/components/Reels';
import { JsonLd } from '@/components/JsonLd';
import { Projects } from '@/components/Projects';
import {
  Advantages,
  Contact,
  Faq,
  Hero,
  Process,
  PromoBanner,
  Services,
} from '@/components/Sections';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'GeneralContractor',
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          telephone: `+${siteConfig.waNumber}`,
          image: new URL('/og.jpg', siteConfig.url).href,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Ruko Fresh Market, Jl. Boulevard Kota Wisata, Ciangsana',
            addressLocality: 'Gunung Putri, Kabupaten Bogor',
            postalCode: '16968',
            addressRegion: 'Jawa Barat',
            addressCountry: 'ID',
          },
          email: site.email,
          openingHours: 'Mo-Su 00:00-23:59',
          areaServed: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'],
          sameAs: Object.values(site.social),
        }}
      />
      <Hero />
      <PromoBanner />
      <Services />
      <Catalog />
      <Advantages />
      <Reels />
      <Projects />
      <Process />
      <Posters />
      <ConsultBuilder />
      <Faq />
      <Contact />
    </>
  );
}
