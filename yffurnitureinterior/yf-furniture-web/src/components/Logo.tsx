// Wordmark sementara berbasis teks. TODO: ganti dengan file logo asli (merah & emas) bila sudah ada.
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-lg bg-brand-red text-sm font-extrabold tracking-tight text-white ring-2 ring-brand-gold/60"
      >
        YF
      </span>
      <span className="leading-tight">
        <span className="block text-base font-extrabold tracking-tight">YF Furniture</span>
        <span className="block text-[11px] font-semibold tracking-[0.2em] text-wood uppercase">
          &amp; Interior
        </span>
      </span>
    </span>
  );
}
