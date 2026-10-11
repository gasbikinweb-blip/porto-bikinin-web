// Pita teks berjalan (dekoratif; isi diulang dua kali agar loop mulus). Teks dibaca sekali oleh pembaca layar.
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((w) => (
        <li
          key={w}
          className="flex items-center gap-8 pr-8 font-serif text-3xl whitespace-nowrap sm:text-5xl"
        >
          <span>{w}</span>
          <span aria-hidden="true" className="size-3 rounded-full bg-accent sm:size-4" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-line py-6 sm:py-8">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
