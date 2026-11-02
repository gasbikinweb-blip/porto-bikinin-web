import { SocialCards } from '@/components/SocialCards';
import { Container, Eyebrow, PageHeader } from '@/components/ui';
import { getProject } from '@/data/projects';
import { site } from '@/data/site';
import type { Lang } from '@/i18n';

// Halaman Media Sosial (menu MEDIA SOCIAL di brief): YouTube, Instagram, TikTok, Pinterest
export const socialCopy = {
  id: {
    metaTitle: 'Media Sosial',
    metaDesc:
      'Ikuti Griya Nuansa di YouTube, Instagram, TikTok, dan Pinterest untuk proyek terbaru, proses pengerjaan, dan inspirasi desain arsitektur serta interior.',
    eyebrow: 'Media Sosial',
    title: (
      <>
        Ikuti perjalanan <em>setiap karya</em>
      </>
    ),
    intro:
      'Proyek terbaru, cuplikan proses pengerjaan, dan inspirasi ruang dari tim Griya Nuansa, dibagikan setiap hari.',
    hashtagEyebrow: 'Tagar kami',
    hashtagText: 'Bagikan inspirasi rumah Anda dan temukan karya kami lewat tagar berikut.',
  },
  en: {
    metaTitle: 'Social Media',
    metaDesc:
      'Follow Griya Nuansa on YouTube, Instagram, TikTok, and Pinterest for our latest projects, behind-the-scenes process, and architecture and interior design inspiration.',
    eyebrow: 'Social Media',
    title: (
      <>
        Follow the journey <em>of every project</em>
      </>
    ),
    intro:
      'Latest projects, behind-the-scenes clips, and space inspiration from the Griya Nuansa team, shared every day.',
    hashtagEyebrow: 'Our hashtags',
    hashtagText: 'Share your home inspiration and discover our work through these hashtags.',
  },
};

export function SocialView({ lang }: { lang: Lang }) {
  const c = socialCopy[lang];
  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        image={getProject('im-house', lang)?.cover}
        title={c.title}
        intro={c.intro}
      />
      <Container className="py-16 md:py-24">
        <SocialCards lang={lang} />
        <div className="mt-16 rounded-md bg-surface p-8 text-center md:p-12">
          <Eyebrow>{c.hashtagEyebrow}</Eyebrow>
          <p className="mt-4 font-serif text-3xl md:text-4xl">{site.hashtags.join('  ')}</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">{c.hashtagText}</p>
        </div>
      </Container>
    </>
  );
}
