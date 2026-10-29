// Interaction first; decoration is loaded after the document is usable.
let disposeMotion: (() => void) | undefined;
let motionGeneration = 0;
for (const trigger of document.querySelectorAll<HTMLElement>('[data-project-open]')) {
  const id = trigger.dataset.projectOpen;
  const dialog = document.getElementById(`project-${id}`) as HTMLDialogElement | null;
  const details = trigger.closest('details');
  if (!dialog || !details || typeof dialog.showModal !== 'function') continue;
  const source = details.querySelector('.project-detail-content');
  const target = dialog.querySelector('.dialog-content');
  if (!source || !target) continue;
  target.append(...Array.from(source.children).map(child => child.cloneNode(true)));
  target.querySelectorAll('h4').forEach(heading => { const h3 = document.createElement('h3'); h3.textContent = heading.textContent; heading.replaceWith(h3); });
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', dialog.id);
  trigger.addEventListener('click', event => {
    event.preventDefault(); dialog.scrollTop = 0; dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('.dialog-close')?.focus({ preventScroll: true });
  });
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  let backdropDown = false;
  dialog.addEventListener('pointerdown', event => { backdropDown = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog || !backdropDown) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => trigger.focus({ preventScroll: true }));
}
const copy = document.querySelector<HTMLButtonElement>('[data-copy-email]');
if (copy && navigator.clipboard?.writeText) {
  copy.hidden = false;
  let feedbackTimer: number;
  copy.addEventListener('click', async () => {
    const feedback = document.querySelector<HTMLElement>('.copy-feedback');
    if (!feedback) return;
    try { await navigator.clipboard.writeText(copy.dataset.copyEmail ?? ''); feedback.textContent = 'Email address copied.'; }
    catch { feedback.textContent = 'Select the email address to copy it, or click it to open your email app.'; }
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => { feedback.textContent = ''; }, 5000);
  });
}
async function enhance() {
  const generation = ++motionGeneration;
  try {
    const { initMotion } = await import('./scroll-motion');
    if (generation !== motionGeneration) return;
    const cleanup = await initMotion();
    if (generation === motionGeneration) disposeMotion = cleanup;
    else cleanup();
  } catch { /* Optional decoration: the content and static SVG remain usable. */ }
}
if (document.readyState === 'complete') void enhance();
else window.addEventListener('load', () => void enhance(), { once: true });
window.addEventListener('pagehide', () => { motionGeneration += 1; disposeMotion?.(); disposeMotion = undefined; });
window.addEventListener('pageshow', event => { if (event.persisted) void enhance(); });
