// Wordmark Şahane, mengikuti logo resmi: sans tebal, tanpa ".id"
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-sans text-2xl leading-none font-bold tracking-tight ${className}`}>
      Şahane
    </span>
  );
}
