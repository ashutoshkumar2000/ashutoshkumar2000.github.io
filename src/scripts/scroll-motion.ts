import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Sculpture = { update: (progress: number, pointerX?: number, pointerY?: number) => void; dispose: () => void };
export async function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const monogram = document.querySelector<HTMLElement>('[data-monogram]');
  let sculpture: Sculpture | undefined;
  let disposed = false;
  let progress = 0;
  let pointerX = 0;
  let pointerY = 0;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => sculpture?.update(reducedMotion.matches ? 0 : progress, reducedMotion.matches ? 0 : pointerX, reducedMotion.matches ? 0 : pointerY);
  // Lazy import keeps Three.js out of the initial content / interaction bundle.
  if (monogram) {
    void import('./monogram').then(({ createMonogram }) => {
      if (disposed) return;
      sculpture = createMonogram(monogram) ?? undefined;
      update();
    }).catch(() => { /* The server-rendered SVG remains visible. */ });
  }
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const hero = document.querySelector('.hero');
    // A late enhancement must not hide content the visitor has already scrolled to.
    if (window.scrollY < 80) {
      gsap.from('[data-hero-reveal]', { y: 35, opacity: 0, duration: .9, stagger: .075, ease: 'power3.out', clearProps: 'all' });
    }
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
      if (element.getBoundingClientRect().top < innerHeight * .9) return;
      gsap.from(element, { y: 30, opacity: 0, duration: .75, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
    });
    if (hero && monogram) {
      ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', onUpdate: self => { progress = self.progress; update(); } });
      const pointer = (event: PointerEvent) => { pointerX = (event.clientX / innerWidth - .5) * .18; pointerY = (event.clientY / innerHeight - .5) * .1; update(); };
      const reset = () => { pointerX = 0; pointerY = 0; update(); };
      if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
        hero.addEventListener('pointermove', pointer as EventListener);
        hero.addEventListener('pointerleave', reset);
      }
      gsap.to('[data-turn]', { rotation: 130, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: .6 } });
      document.querySelectorAll<HTMLElement>('[data-story]').forEach(story => {
        story.querySelectorAll<SVGPathElement>('.diagram-flow').forEach(path => {
          const length = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: story, start: 'top 80%', end: 'bottom 65%', scrub: .5 } });
        });
      });
      return () => { hero.removeEventListener('pointermove', pointer as EventListener); hero.removeEventListener('pointerleave', reset); progress = 0; reset(); };
    }
  });
  const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
  // Accordion geometry changes must update later animation start positions.
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', refresh));
  document.fonts.ready.then(refresh);
  return () => {
    disposed = true; media.revert(); sculpture?.dispose();
    document.querySelectorAll('details').forEach(details => details.removeEventListener('toggle', refresh));
  };
}
