import { TimberArc } from './TimberArc';

// Judul section: label kecil (titik oranye) + h2 serif + paragraf pembuka
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = 'left',
  arc = true,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  arc?: boolean;
}) {
  const center = align === 'center';
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`reveal eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2
        id={id}
        className="reveal reveal-title mt-4 font-serif text-3xl leading-[1.08] font-medium text-balance sm:text-5xl"
      >
        {title}
      </h2>
      {arc && <TimberArc className={`mt-5 max-w-56 ${center ? 'mx-auto' : ''}`} />}
      {lead && (
        <p className="reveal mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
