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
      <p className="reveal text-[11px] font-medium tracking-[0.32em] text-muted uppercase">
        {eyebrow}
      </p>
      <Tag
        id={id}
        className="reveal mt-4 font-serif text-4xl leading-[1.05] font-normal sm:text-5xl"
      >
        {title}
      </Tag>
      {description && <p className="reveal mt-4 leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
