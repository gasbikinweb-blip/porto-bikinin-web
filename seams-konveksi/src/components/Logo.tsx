// Logo teks Seams: "SEAMS" dengan subjudul "CUT · MAKE · TRIM", mengikuti logo di konten Instagram
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="font-serif text-[1.65rem] font-semibold tracking-[0.12em]">SEAMS</span>
      <span className="mt-1 text-[0.55rem] font-medium tracking-[0.3em]">CUT · MAKE · TRIM</span>
    </span>
  );
}
