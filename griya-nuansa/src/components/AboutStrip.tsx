import Image from 'next/image';
import type { ReactNode } from 'react';
import { Eyebrow } from './ui';
import { categories } from '@/data/categories';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import type { ProjectImage } from '@/data/types';

/**
 * Section "Siapa Kami": foto | teks | kolom angka.
 * Angka dihitung dari data; tahun pengalaman belum ditampilkan sampai dikonfirmasi.
 */
export function AboutStrip({
  image,
  action,
  headingLevel = 'h2',
}: {
  image?: ProjectImage;
  action?: ReactNode;
  headingLevel?: 'h1' | 'h2';
}) {
  const H = headingLevel;
  const stats: [string, string][] = [
    [String(projects.length), 'Proyek dalam portofolio'],
    [
      String(categories.filter((c) => projects.some((p) => p.category === c.slug)).length),
      'Kategori ruang',
    ],
    // TODO: verifikasi angka pengikut saat rilis; tambahkan "tahun pengalaman" setelah tahun berdiri dikonfirmasi
    [site.instagramFollowers, 'Pengikut Instagram'],
  ];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface lg:col-span-5">
          <Image
            src={image.thumb}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="lg:col-span-4">
        <Eyebrow>Siapa Kami</Eyebrow>
        <H className="mt-4 font-serif text-4xl leading-[1.1] md:text-[2.75rem]">
          Dirancang dengan tujuan.
          <br />
          Dibangun untuk Anda.
        </H>
        <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Di {site.name}, kami percaya desain yang baik lebih dari sekadar indah: ia harus bekerja
            untuk keseharian penghuninya.
          </p>
          <p>
            Kami merancang dan mengerjakan ruang yang mencerminkan gaya hidup Anda, dari rumah
            tinggal hingga ruang usaha di Jabodetabek.
          </p>
        </div>
        {action && <div className="mt-8">{action}</div>}
      </div>
      <dl className="grid grid-cols-3 gap-6 lg:col-span-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-line lg:border-l lg:border-line lg:pl-10">
        {stats.map(([n, label]) => (
          // flex-col-reverse: angka tampil di atas, tapi urutan baca tetap label → angka
          <div key={label} className="flex flex-col-reverse lg:py-6">
            <dt className="mt-2 text-[10px] tracking-[0.2em] text-muted uppercase">{label}</dt>
            <dd className="font-serif text-4xl md:text-5xl">{n}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
