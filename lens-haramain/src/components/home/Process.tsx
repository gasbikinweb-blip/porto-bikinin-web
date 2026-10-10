import type { Content } from '@/content/types';

// Angka Arab-Indik sebagai nomor langkah (١ ٢ ٣ ٤), dipasangkan dengan angka latin kecil
const ARABIC_DIGITS = ['١', '٢', '٣', '٤', '٥', '٦'];

export function Process({ t }: { t: Content }) {
  return (
    <section aria-labelledby="proses-judul" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow reveal text-accent">{t.process.label}</p>
        <h2
          id="proses-judul"
          className="reveal mt-6 font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] font-light"
        >
          {t.process.title}
        </h2>
      </div>

      <ol className="relative mt-20 grid gap-14 md:grid-cols-4 md:gap-8" data-stagger>
        {/* Garis penghubung antar langkah (desktop) */}
        <span
          aria-hidden="true"
          className="reveal reveal-left absolute top-12 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent md:block"
        />
        {t.process.steps.map((step, i) => (
          <li key={step.title} className="reveal relative flex flex-col items-center text-center">
            <span className="relative grid size-24 place-items-center">
              <span aria-hidden="true" className="star8 absolute inset-0 m-auto size-24 text-accent/15" />
              <span lang="ar" aria-hidden="true" className="relative font-arabic text-4xl text-accent">
                {ARABIC_DIGITS[i]}
              </span>
            </span>
            <span className="eyebrow mt-6 text-[0.6rem] text-muted">0{i + 1}</span>
            <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
            <p className="mt-3 max-w-60 text-sm leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
