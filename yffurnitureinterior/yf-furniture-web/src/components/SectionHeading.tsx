type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  id?: string;
};

// Judul section: label kecil + judul tegas
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
    <div className={`max-w-2xl ${center}`}>
      {eyebrow && (
        <p className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase">{eyebrow}</p>
      )}
      <Tag
        id={id}
        className="mt-2 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl"
      >
        {title}
      </Tag>
      {description && <p className="mt-3 leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
