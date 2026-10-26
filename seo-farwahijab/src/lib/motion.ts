// Helper animasi (Web Animations API) yang aman:
// - dilewati bila pengguna memilih gerakan minimal;
// - dipaksa selesai setelah durasinya, karena browser membekukan animasi di tab latar belakang
//   (tanpa ini, panel bisa tertahan kecil/tak terlihat dan callback selesai tidak pernah jalan).

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function safeAnimate(
  el: Element | null | undefined,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions & { duration: number },
  onDone?: () => void,
): void {
  if (!el || prefersReducedMotion()) {
    onDone?.();
    return;
  }
  const anim = el.animate(keyframes, options);
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    onDone?.();
  };
  anim.onfinish = finish;
  // Cadangan bila animasi dibekukan browser
  window.setTimeout(() => {
    if (anim.playState !== 'finished') anim.finish();
    finish();
  }, options.duration + 120);
}
