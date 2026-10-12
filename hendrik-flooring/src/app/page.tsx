// Situs satu halaman: Hero → Keunggulan → Produk & ruangan → Katalog vinyl roll → Portofolio → Cara kerja → FAQ → Kontak
import Image from 'next/image';
import { BrandCatalog } from '@/components/BrandCatalog';
import { HeroSlider, type HeroSlide } from '@/components/HeroSlider';
import { FaqList, FeatureGrid, ProcessSteps } from '@/components/cards';
import { MailIcon, PinIcon, WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { ProjectGallery } from '@/components/ProjectGallery';
import { SampleBooks } from '@/components/SampleBooks';
import { Showcase, type ShowcaseItem } from '@/components/Showcase';
import { SocialLinks } from '@/components/SocialLinks';
import { Container, SectionHeading, StatsBar } from '@/components/ui';
import { WhatsAppMessageBuilder } from '@/components/WhatsAppMessageBuilder';
import { faqs } from '@/data/faq';
import { brandCatalogs, processStages } from '@/data/catalog';
import { extraProducts, sampleBooks } from '@/data/more-products';
import { products } from '@/data/products';
import { getProject, projects } from '@/data/projects';
import { solutions } from '@/data/solutions';
import { roomLabels } from '@/data/types';
import { mapsUrl, siteConfig } from '@/lib/config';
import { productMessage } from '@/lib/whatsapp';

// Slide hero: tiap slide punya foto & pesan berbeda
const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Spesialis lantai fasilitas kesehatan',
    title: ['Lantai vinyl higienis', 'untuk rumah sakit'],
    text: 'Pengadaan dan pemasangan vinyl lembaran untuk rumah sakit, klinik, klinik gigi, dan laboratorium.',
    image: getProject('rs-ruang-rawat-biru-luas'),
  },
  {
    eyebrow: 'Rapat tanpa celah',
    title: ['Sambungan dilas,', 'mudah disanitasi'],
    text: 'Lembaran lebar dengan sambungan dilas panas, sehingga kotoran dan cairan tidak tertahan di sela.',
    image: getProject('rs-ruang-tindakan-hijau'),
  },
  {
    eyebrow: 'Plint naik ke dinding',
    title: ['Tanpa sudut mati,', 'cepat dibersihkan'],
    text: 'Pertemuan lantai dan dinding dibuat melengkung agar sudut ruangan mudah dijangkau petugas kebersihan.',
    image: getProject('rs-ruang-rawat-biru-panel'),
  },
  {
    eyebrow: 'Desain pola custom',
    title: ['Lantai vinyl', 'sesuai desain ruangan'],
    text: 'Potongan warna bisa dibentuk mengikuti desain interior, misalnya pola gelombang di area tunggu.',
    image: getProject('vinyl-pola-custom-ruang-terbuka'),
  },
  {
    eyebrow: 'Handrail rumah sakit',
    title: ['Pegangan aman,', 'dinding terlindungi'],
    text: 'Handrail anti benturan di koridor dan ruang tunggu untuk membantu pasien berjalan dengan aman.',
    image: getProject('handrail-koridor-rs'),
  },
  {
    eyebrow: 'Pilihan warna lengkap',
    title: ['Vinyl roll', 'Medipure & Tarkett'],
    text: 'Beragam pilihan warna lembut yang menenangkan, dari abu-abu, krem, biru, sampai hijau.',
    image: brandCatalogs[0]!.photos[2]!,
  },
];

// Data modal produk: "cocok untuk ruangan" memakai foto dari data solusi
const productItems: ShowcaseItem[] = products.map((p) => ({
  id: p.slug,
  eyebrow: p.eyebrow,
  title: p.name,
  summary: p.summary,
  description: p.description,
  image: p.image,
  highlights: p.highlights,
  brands: p.brands,
  relatedTitle: 'Cocok untuk ruangan',
  related: p.areas.flatMap((room) => {
    const s = solutions.find((x) => x.room === room);
    return s ? [{ label: roomLabels[room], image: s.image }] : [];
  }),
  areas: p.areas,
  waMessage: productMessage(p.name),
}));

// Pilihan ruangan di atas kartu produk
const roomOptions = solutions.map((s) => ({ key: s.room, label: s.title, summary: s.summary }));
// Produk pendukung: modal tanpa pilihan ruangan; galeri = gambar merek & hasil pemasangan
const extraItems: ShowcaseItem[] = extraProducts.map((p) => ({
  id: p.id,
  eyebrow: p.eyebrow,
  title: p.name,
  summary: p.summary,
  description: p.description,
  image: p.image,
  highlights: p.highlights,
  brands: p.brands,
  relatedTitle: 'Merek & hasil pemasangan',
  related: p.gallery,
  areas: [],
  waMessage: productMessage(p.name),
}));

export default function HomePage() {
  return (
    <>
      {/* Hero: slideshow foto + tulisan berganti. h1 tetap satu untuk SEO & pembaca layar */}
      <h1 className="sr-only">
        Lantai Vinyl Higienis untuk Rumah Sakit dan Klinik | {siteConfig.name}
      </h1>
      <HeroSlider slides={heroSlides} />

      <section aria-label="Pencapaian" className="relative z-10 -mt-10">
        <Container>
          <div className="rounded-2xl bg-background shadow-xl shadow-black/5">
            <StatsBar />
          </div>
        </Container>
      </section>

      {/* Keunggulan */}
      <section aria-labelledby="keunggulan" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="keunggulan"
            eyebrow="Kenapa vinyl lembaran"
            title="Lantai yang mendukung kebersihan fasilitas kesehatan"
          />
          <div className="mt-10">
            <FeatureGrid />
          </div>
        </Container>
      </section>

      {/* Produk: kartu membuka modal poster */}
      <section
        id="produk"
        aria-labelledby="produk-judul"
        className="scroll-mt-20 bg-surface py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="produk-judul"
            eyebrow="Jenis lantai"
            title="Pilih lantai sesuai ruangan Anda"
            intro="Pilih ruangan untuk melihat lantai yang cocok, lalu ketuk kartu untuk penjelasan lengkap."
          />
          <div className="mt-10">
            <Showcase items={productItems} rooms={roomOptions} />
          </div>
        </Container>
      </section>

      {/* Produk pendukung: handrail & karpet roll */}
      <section
        id="handrail-karpet"
        aria-labelledby="handrail-karpet-judul"
        className="scroll-mt-20 py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="handrail-karpet-judul"
            eyebrow="Produk pendukung"
            title="Handrail rumah sakit & karpet roll"
            intro="Selain lantai vinyl, kami juga menyediakan dan memasang handrail anti benturan serta karpet roll. Ketuk kartu untuk melihat merek dan hasil pemasangannya."
          />
          <div className="mt-10">
            <Showcase items={extraItems} columns={2} />
          </div>
        </Container>
      </section>

      {/* Katalog merek vinyl roll */}
      <section
        id="katalog"
        aria-labelledby="katalog-judul"
        className="scroll-mt-20 bg-surface py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="katalog-judul"
            eyebrow="Vinyl roll"
            title="Merek dan pilihan warna yang kami pasang"
            intro="Vinyl lembaran (roll) minim sambungan, higienis, tahan air, dan mudah dibersihkan. Pilih merek, lalu ketuk foto untuk melihat contoh warnanya."
          />
          <div className="mt-10">
            <BrandCatalog catalogs={brandCatalogs} />
          </div>
          <div className="mt-16">
            <h3 className="reveal text-2xl font-bold">Merek lain yang tersedia</h3>
            <p className="reveal mt-2 text-muted">
              Ketuk buku sampel untuk melihat lebih jelas, lalu tanyakan pilihan warnanya.
            </p>
            <div className="mt-6">
              <SampleBooks books={sampleBooks} />
            </div>
          </div>
        </Container>
      </section>

      {/* Portofolio */}
      <section
        id="portofolio"
        aria-labelledby="portofolio-judul"
        className="scroll-mt-20 py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="portofolio-judul"
            eyebrow="Portofolio"
            title="Hasil pemasangan kami"
            intro="Ketuk foto untuk memperbesar. Nama klien tidak kami tampilkan untuk menjaga privasi."
          />
          <div className="mt-10">
            <ProjectGallery projects={projects} initialCount={8} />
          </div>
        </Container>
      </section>

      {/* Cara kerja */}
      <section
        id="cara-kerja"
        aria-labelledby="cara-kerja-judul"
        className="scroll-mt-20 bg-mint py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="cara-kerja-judul"
            eyebrow="Cara kerja"
            title="Empat langkah sampai lantai siap dipakai"
            align="center"
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>

          {/* Dokumentasi tahap pemasangan di lokasi proyek */}
          <h3 className="mt-16 text-center text-2xl font-bold">
            Begini tahap pemasangannya di lapangan
          </h3>
          <ol className="mt-8 grid gap-5 md:grid-cols-3" data-stagger>
            {processStages.map((st, i) => (
              <li
                key={st.title}
                className="reveal overflow-hidden rounded-2xl bg-background shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={st.image.thumb}
                    alt={st.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-accent-strong px-3 py-1 text-sm font-bold text-white shadow">
                    Tahap {i + 1}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold">{st.title}</h4>
                  <p className="mt-1 text-muted">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-judul" className="scroll-mt-20 py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading id="faq-judul" eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
          <div className="mt-10">
            <FaqList />
          </div>
        </Container>
      </section>

      {/* Kontak + pembuat pesan WhatsApp */}
      <section
        id="kontak"
        aria-labelledby="kontak-judul"
        className="scroll-mt-20 bg-surface py-16 sm:py-24"
      >
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <SectionHeading
              id="kontak-judul"
              eyebrow="Kontak"
              title="Minta survei dan penawaran"
              intro="Cara tercepat adalah lewat WhatsApp. Atau susun pesan otomatis di samping."
            />
            <ul className="mt-8 space-y-5">
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 size-6 shrink-0 text-wa" />
                <span>
                  <span className="block text-muted">WhatsApp / Telepon</span>
                  <span className="block text-lg font-semibold">{siteConfig.waDisplay}</span>
                  <a
                    href={siteConfig.phone2.href}
                    className="block text-lg font-semibold hover:text-accent"
                  >
                    {siteConfig.phone2.display}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 size-6 shrink-0 text-accent" />
                <span>
                  <span className="block text-muted">Email</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-lg font-semibold hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 size-6 shrink-0 text-accent" />
                <span>
                  <span className="block text-muted">Alamat</span>
                  <address className="text-lg font-semibold not-italic">
                    {siteConfig.address}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline underline-offset-4"
                  >
                    Buka di Google Maps<span className="sr-only"> (tab baru)</span>
                  </a>
                </span>
              </li>
            </ul>
            <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-background">
              {siteConfig.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 px-4 py-3">
                  <dt>{h.day}</dt>
                  <dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-muted">
              <span className="font-semibold text-foreground">Area layanan: </span>
              {siteConfig.serviceAreas.join(', ')}
            </p>
            <p className="mt-8 font-bold">Ikuti & belanja kami</p>
            <div className="mt-3">
              <SocialLinks />
            </div>
          </div>
          <WhatsAppMessageBuilder />
        </Container>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
    </>
  );
}
