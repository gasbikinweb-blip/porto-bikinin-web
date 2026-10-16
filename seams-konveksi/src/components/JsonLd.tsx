// Structured data (JSON-LD) tanpa dangerouslySetInnerHTML.
// JSON dirender sebagai teks anak <script>; karakter "<" di-escape agar tidak bisa menutup tag script.
// Tidak dieksekusi browser (type="application/ld+json"), jadi aman terhadap CSP script-src.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json">{JSON.stringify(data).replace(/</g, '\u003c')}</script>;
}
