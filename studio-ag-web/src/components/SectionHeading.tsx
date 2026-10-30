type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  id?: string;
};

// Judul section: label kecil + judul serif besar
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  id,
}: Props) {
  const center = align === 'center' ? 'mx-auto text-center' : '';
  return (
    // Label, judul, dan deskripsi muncul bergiliran saat di-scroll
    <div data-stagger className={`max-w-2xl ${center}`}>
      <p className="reveal reveal-blur flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-accent-ink uppercase">
        <span className="rule-motif" aria-hidden="true" />
        {eyebrow}
      </p>
      <Tag
        id={id}
        className="reveal mt-3 font-serif text-4xl leading-tight font-medium sm:text-5xl"
      >
        {title}
      </Tag>
      {description && <p className="reveal mt-4 leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
