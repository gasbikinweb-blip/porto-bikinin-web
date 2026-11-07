// Wordmark sementara berbasis teks. TODO: ganti dengan file logo asli bila sudah ada.
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="grid size-9 rotate-[-4deg] place-items-center rounded-lg bg-red font-display text-lg font-extrabold text-white shadow-[3px_3px_0_var(--yellow)]"
      >
        S
      </span>
      <span className="font-display text-lg leading-none font-extrabold tracking-tight">
        Sirait<span className="text-red"> Printing</span>
      </span>
    </span>
  );
}
