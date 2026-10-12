// Komponen tampilan kecil yang dipakai di banyak halaman (server component)

export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`reveal max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'reveal-left'}`}
    >
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-sm font-semibold tracking-wider text-accent uppercase ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span aria-hidden="true" className="heading-line h-0.5 w-8 bg-accent" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-pretty text-muted">{intro}</p>}
    </div>
  );
}
