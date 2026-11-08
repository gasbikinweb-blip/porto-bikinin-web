import { WavyLine } from './decor';

export function SectionTitle({
  id,
  eyebrow,
  title,
  text,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium tracking-[0.3em] text-rose uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-serif text-4xl font-medium sm:text-5xl">
        {title}
      </h2>
      <WavyLine className="mx-auto mt-3 w-24 text-sage" />
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );
}
