import type { Metadata } from 'next';
import { ProjectPortfolio } from '@/components/ProjectPortfolio';
import { SectionHeading } from '@/components/SectionHeading';
import { getAllProjects } from '@/data/projects';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Portofolio & Pengadaan Proyek Furnitur',
  description:
    'Dokumentasi instalasi dan pengadaan furnitur Busr Mebel untuk perkantoran, kafe, hotel, dan residensial di seluruh Indonesia.',
  alternates: { canonical: '/proyek' },
  openGraph: {
    type: 'website',
    url: '/proyek',
    title: `Portofolio Proyek Furnitur | ${siteConfig.name}`,
    description:
      'Dokumentasi pengerjaan furnitur kantor, komersial, dan residensial oleh Busr Mebel.',
    images: [
      {
        url: '/products/meja-resepsionis-atrium/og.jpg',
        width: 600,
        height: 750,
        alt: 'Portofolio Proyek Busr Mebel',
      },
    ],
  },
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Portofolio Kami"
        title="Karya & Pengerjaan Nyata"
        description="Dokumentasi furnitur ready-stock dan custom yang telah kami produksi dan pasang untuk berbagai kebutuhan kantor, bisnis komersial, dan hunian residensial."
        align="center"
      />

      <div className="mt-12">
        <ProjectPortfolio projects={allProjects} />
      </div>
    </div>
  );
}
