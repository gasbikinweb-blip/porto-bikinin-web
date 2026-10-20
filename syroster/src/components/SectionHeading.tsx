type Props = {
  eyebrow?: string;
  title: string;
  /** Bagian akhir judul yang diberi warna brand */
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
};

// Judul section: label bergaris emas + judul dua warna + paragraf pembuka
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  as: Tag = 'h2',
}: Props) {
  const center = align === 'center';
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`reveal flex items-center gap-3 text-sm font-medium text-ink ${center ? 'justify-center' : ''}`}
        >
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-gold" />
          {eyebrow}
        </p>
      )}
      <Tag className="reveal mt-3 font-display text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
        {title} {highlight && <span className="text-brand">{highlight}</span>}
      </Tag>
      {description && (
        <p className="reveal mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function IlustrasiBadge() {
  return (
    <span className="absolute bottom-2 left-2 rounded bg-ink/80 px-2 py-0.5 text-xs font-semibold text-white">
      Ilustrasi
    </span>
  );
}
