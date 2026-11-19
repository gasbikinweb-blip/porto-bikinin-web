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
      <p className="reveal reveal-blur font-script text-3xl text-gold">{eyebrow}</p>
      <Tag
        id={id}
        className="reveal mt-1 font-serif text-4xl leading-tight font-semibold sm:text-5xl"
      >
        {title}
      </Tag>
      <span
        aria-hidden="true"
        className={`reveal mt-4 flex items-center gap-2 text-gold ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-10 bg-gold/60" />✿<span className="h-px w-10 bg-gold/60" />
      </span>
      {description && <p className="reveal mt-4 leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
