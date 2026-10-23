import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@/components/icons';
import { Container, PageHeader } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { getProject, projects } from '@/data/projects';
import { defaultWaMessage, site } from '@/data/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Tentang Kami',
  description:
    'Mengenal Griya Nuansa, studio arsitektur dan desain interior di Serpong, Tangerang Selatan: cerita, filosofi desain, dan prinsip kerja kami.',
  path: '/tentang/',
});

// Akordeon "Mengapa Griya Nuansa". TODO: tinjau ulang isi bersama tim Griya Nuansa.
const reasons = [
  {
    title: 'Satu tim, desain hingga pengerjaan',
    text: 'Arsitektur, desain interior, kitchen set, hingga renovasi ditangani dalam satu alur, sehingga hasil akhir sesuai dengan gambar.',
  },
  {
    title: 'Fungsi lebih dulu, lalu rasa',
    text: 'Ruang yang baik terasa sederhana: alur geraknya jelas, cahaya alaminya cukup, dan materialnya jujur serta mudah dirawat. Dari dasar itu, nuansa dibangun lewat warna, tekstur, dan detail.',
  },
  {
    title: 'Beragam jenis ruang',
    text: `Portofolio kami mencakup ${projects.length} proyek: rumah, apartemen, kost, kafe & bakery, gym, klinik, kantor, hingga industri.`,
  },
  {
    title: 'Dekat dengan Anda',
    text: `Berbasis di ${site.city} dan melayani seluruh Jabodetabek: ${site.serviceArea.join(', ')}.`,
  },
];

const principles = [
  {
    title: 'Detail',
    text: 'Setiap sambungan, material, dan ukuran diperhatikan sejak gambar kerja.',
  },
  { title: 'Transparan', text: 'Lingkup, biaya, dan progres disampaikan terbuka sejak awal.' },
  { title: 'Tepat Waktu', text: 'Jadwal disusun realistis dan dikawal sampai serah terima.' },
];

export default function AboutPage() {
  const img = getProject('al-house')?.cover; // TODO: pilih foto untuk halaman Tentang
  const side = getProject('menteng-park-apartment')?.cover ?? projects[1]?.cover;
  const banner = getProject('paradigm-fitness')?.cover ?? projects[2]?.cover;

  return (
    <>
      <PageHeader
        eyebrow="Tentang"
        image={img}
        title={
          <>
            Ruang yang tenang, <em>dirancang dengan teliti</em>
          </>
        }
      />

      {/* Foto + akordeon "Mengapa Griya Nuansa" */}
      <Container className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2">
        {side && (
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-surface">
            <Image
              src={side.src}
              alt={side.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <p className="absolute right-5 bottom-5 max-w-[16rem] rounded-xl bg-black/35 px-3 py-2 text-right text-[11px] leading-relaxed tracking-wider text-white uppercase backdrop-blur-md">
              Setiap ruang punya suasana yang ingin dirasakan penghuninya
            </p>
          </div>
        )}
        <div className="rounded-[1.75rem] bg-surface p-6 md:p-10">
          <h2 className="text-4xl font-light tracking-tight uppercase md:text-5xl">
            Mengapa {site.name}
          </h2>
          {/* TODO: ganti dengan cerita studio yang asli (tahun berdiri, pendiri, perjalanan) */}
          <p className="mt-4 text-xs leading-relaxed tracking-wider text-muted uppercase">
            {site.name} adalah studio arsitektur, desain interior, dan property management di{' '}
            {site.city}. Nama &ldquo;Nuansa&rdquo; mewakili cara kami bekerja: menerjemahkan suasana
            menjadi tata ruang, material, dan cahaya yang tepat.
          </p>
          <div className="mt-6 divide-y divide-line border-t border-line">
            {reasons.map((r, i) => (
              <details key={r.title} className="group py-4" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium tracking-wide uppercase">
                  {r.title}
                  <span
                    aria-hidden="true"
                    className="text-lg leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      {/* Prinsip kerja: tiga kartu, yang pertama gelap */}
      <Container className="mt-4">
        <h2 className="sr-only">Prinsip kerja</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className={`flex min-h-[240px] flex-col justify-between rounded-[1.75rem] p-6 md:p-8 ${
                i === 0 ? 'bg-ink text-white' : 'bg-surface'
              }`}
            >
              <div>
                <h3 className="text-3xl font-light tracking-tight uppercase">{p.title}</h3>
                <p
                  className={`mt-4 text-xs leading-relaxed tracking-wider uppercase ${i === 0 ? 'text-white/70' : 'text-muted'}`}
                >
                  {p.text}
                </p>
              </div>
              <Link
                href="/layanan/"
                className="mt-8 inline-flex items-center gap-1 self-end text-[11px] tracking-[0.2em] uppercase hover:underline"
              >
                Layanan kami <ArrowUpRight className="h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* Banner lebar dengan judul besar */}
      {banner && (
        <Container className="mt-4">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-surface">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(min-width: 1536px) 1440px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/70 to-bg/10" />
            <div className="relative flex min-h-[420px] flex-col justify-between gap-10 p-6 md:flex-row md:items-center md:p-12">
              <div>
                <p className="text-4xl leading-[1.05] font-light tracking-tight uppercase md:text-6xl">
                  Merancang
                  <span className="mx-3 inline-block h-[0.7em] w-[2.2em] rounded-full border border-current align-middle md:w-[3em]" />
                  <br />
                  ruang yang
                  <br />
                  bernuansa
                </p>
                <p className="mt-6 max-w-sm text-xs leading-relaxed tracking-wider text-muted uppercase">
                  Hunian dan ruang usaha di Jabodetabek, dari konsep hingga serah terima.
                </p>
              </div>
              <Link
                href="/proyek/"
                className="group flex h-28 w-28 shrink-0 items-center justify-center self-end rounded-full border border-current/40 md:h-36 md:w-36 md:self-auto"
              >
                <ArrowUpRight className="h-8 w-8 transition-transform group-hover:rotate-45" />
                <span className="sr-only">Lihat proyek kami</span>
              </Link>
            </div>
          </div>
        </Container>
      )}

      {/* Tim */}
      <Container className="mt-24 text-center">
        <h2 className="font-serif text-4xl font-light md:text-5xl">
          Arsitek, desainer interior, <em>dan tim lapangan</em>
        </h2>
        {/* TODO: tambahkan profil tim (nama & peran). Foto tim hanya jika sudah tersedia. */}
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Profil tim akan segera ditampilkan. Sementara itu, kenali kami lebih dekat lewat WhatsApp.
        </p>
        <div className="mt-8">
          <WhatsAppButton message={defaultWaMessage}>Ngobrol dengan tim</WhatsAppButton>
        </div>
      </Container>
    </>
  );
}
