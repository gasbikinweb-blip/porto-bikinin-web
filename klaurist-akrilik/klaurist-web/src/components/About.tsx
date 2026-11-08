// Section Tentang Klaurist. Isi dari caption & poster IG @klaurist.akrilik.
import Image from 'next/image';
import { FlowerSprig, Sparkle } from './decor';

const points = [
  'Solusi hadiah estetik yang bukan cuma cantik, tapi juga ikonik.',
  'Bukan sekadar bunga, tapi ungkapan rasa yang ingin Kakak sampaikan.',
  'Estetik dan tahan lama, perpaduan sempurna akrilik dan bunga.',
];

export function About() {
  return (
    <section
      id="tentang"
      aria-labelledby="judul-tentang"
      className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24"
    >
      <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
        {/* Kolase foto */}
        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tl-[6rem] border-[6px] border-ivory bg-blush shadow-xl">
            <Image
              src="/images/papan-wave.webp"
              alt="Papan akrilik pink berbingkai gelombang dengan rangkaian lily pink dan biru"
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-6 w-2/5 overflow-hidden rounded-full border-[6px] border-ivory bg-blush shadow-lg sm:-right-8">
            <div className="relative aspect-square">
              <Image
                src="/images/round-daisy.webp"
                alt="Bucket round daisy putih kuning"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
          <FlowerSprig className="absolute -top-6 -left-4 w-16 text-rose/70" />
        </div>

        <div className="reveal">
          <p className="text-xs font-medium tracking-[0.3em] text-rose uppercase">
            Tentang Klaurist
          </p>
          <h2
            id="judul-tentang"
            className="mt-3 flex items-center gap-2 font-serif text-4xl leading-tight font-medium sm:text-5xl"
          >
            Non-Fresh Florist dari Jogja <Sparkle className="size-4 shrink-0 text-rose" />
          </h2>
          <p className="mt-2 font-script text-3xl text-rose">Everlasting Love</p>
          <p className="mt-4 leading-relaxed text-muted">
            Mempersiapkan momen spesial sering kali melelahkan, tapi memilih hadiah dan dekorasi
            tidak harus membingungkan. Klaurist hadir dengan papan ucapan akrilik dan bucket bunga
            non-fresh yang tidak hanya memanjakan mata, tapi juga awet dan ramah di kantong.
          </p>
          <p className="mt-3 font-serif text-xl italic">
            Because your special day deserves to be iconic.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 rounded-2xl bg-blush-soft px-4 py-3 text-sm">
                <Sparkle className="mt-0.5 size-4 shrink-0 text-rose" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
