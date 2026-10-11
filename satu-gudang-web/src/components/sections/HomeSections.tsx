import { JsonLd } from '@/components/ui/JsonLd';
import { Marquee } from '@/components/ui/Marquee';
import type { SiteContent } from '@/content/types';
import { businessJsonLd } from '@/lib/seo';
import { About } from './About';
import { BedroomPackages } from './BedroomPackages';
import { Contact } from './Contact';
import { DesignShowcase } from './DesignShowcase';
import { Faq } from './Faq';
import { Hero } from './Hero';
import { Materials } from './Materials';
import { Portfolio } from './Portfolio';
import { Process } from './Process';
import { Services } from './Services';
import { Testimonials } from './Testimonials';

// Urutan section beranda (dipakai halaman EN & ID)
export function HomeSections({ content }: { content: SiteContent }) {
  return (
    <>
      <JsonLd data={businessJsonLd(content)} />
      <Hero content={content} />
      <About content={content} />
      <Marquee items={content.marquee} />
      <Services content={content} />
      <DesignShowcase content={content} />
      <Portfolio content={content} />
      <BedroomPackages content={content} />
      <Materials content={content} />
      <Process content={content} />
      <Testimonials content={content} />
      <Faq content={content} />
      <Contact content={content} />
    </>
  );
}
