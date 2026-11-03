export {};

function initTriggerDiscovery(dot: HTMLElement, brand: HTMLElement) {
  const sessionKey = 'portfolio:system-xray-discovered';
  try { if (sessionStorage.getItem(sessionKey) === '1') return () => {}; }
  catch { /* Storage is optional; discovery still stops for this page. */ }

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const options = { signal: events.signal };
  let timer: number | undefined;
  let inView = false;
  let firstWaitComplete = false;
  let discovered = false;

  const pause = () => {
    window.clearTimeout(timer);
    timer = undefined;
    dot.classList.remove('is-discovery-pulsing');
  };
  const schedule = () => {
    window.clearTimeout(timer);
    timer = undefined;
    if (discovered || !inView || document.hidden || motion.matches) return;
    timer = window.setTimeout(() => {
      timer = undefined;
      firstWaitComplete = true;
      // Hover/focus already supplies feedback; never layer another pulse over it.
      if (!dot.matches(':hover') && !brand.matches(':focus-visible')) dot.classList.add('is-discovery-pulsing');
      schedule();
    }, firstWaitComplete ? 12000 : 2500);
  };
  const sync = () => { pause(); schedule(); };
  const visibility = new IntersectionObserver(([entry]) => {
    if (inView === entry.isIntersecting) return;
    inView = entry.isIntersecting;
    sync();
  });
  visibility.observe(dot);
  document.addEventListener('visibilitychange', sync, options);
  motion.addEventListener('change', sync, options);
  const finishPulse = (event: AnimationEvent) => {
    if (event.animationName === 'brand-dot-discovery') dot.classList.remove('is-discovery-pulsing');
  };
  dot.addEventListener('animationend', finishPulse, options);
  dot.addEventListener('animationcancel', finishPulse, options);
  window.addEventListener('pagehide', () => {
    pause(); inView = false; visibility.disconnect();
  }, options);
  window.addEventListener('pageshow', event => {
    if (event.persisted) visibility.observe(dot);
  }, options);

  return () => {
    discovered = true;
    pause();
    visibility.disconnect();
    events.abort();
    try { sessionStorage.setItem(sessionKey, '1'); }
    catch { /* The in-memory discovered state is sufficient without storage. */ }
  };
}

const root = document.querySelector<HTMLElement>('#system-xray');
const brand = document.querySelector<HTMLAnchorElement>('.brand');
const dot = brand?.querySelector<HTMLElement>('.brand-dot');
const exit = root?.querySelector<HTMLButtonElement>('.system-xray-exit');
const status = document.querySelector<HTMLElement>('[data-system-xray-status]');
type XRayMode = 'structure' | 'flows' | 'decisions';
const storyDetails = document.querySelector<HTMLTemplateElement>('#system-xray-story-details');

if (root && brand && dot && exit && status) {
  const stopDiscovery = initTriggerDiscovery(dot, brand);
  // The labels describe the current sections and WorkDiagram, not a second page.
  const sections = [
    ['#top', 'IDENTITY / ENTRY POINT'],
    ['#about', 'PERSON / CONTEXT'],
    ['#work', 'ENGINEERING STORIES'],
    ['#experience', 'PRODUCTION HISTORY'],
    ['#projects', 'INDEPENDENT BUILDS'],
    ['#toolkit', 'SYSTEM TOOLING'],
    ['.recognition-section', 'RECOGNITION / EDUCATION'],
    ['#contact', 'OUTPUT / CONNECTION'],
  ];
  const flows = [
    // Sync is described as database-driven; no separate broker is implied.
    ['sync', ['REQUEST', 'DB PIPELINE', 'WORKERS', 'BATCH CREATE']],
    ['email', ['EMAIL', 'EDGE VERIFY', 'MONGO QUEUE', 'PARSER', 'DISCUSSION']],
    // A model relationship / move propagation, rather than a message pipeline.
    ['hierarchy', ['HIERARCHY DEF.', 'LEVELS', 'NODES', 'ANCESTOR PATHS']],
  ] as const;
  const additions: HTMLElement[] = [];
  const storySlots: HTMLElement[] = [];
  const modes = root.querySelectorAll<HTMLButtonElement>('[data-xray-mode]');
  let active = false;
  let hits = 0;
  let started = 0;
  let noticeTimer: number | undefined;
  let previousFocus: HTMLElement | null = null;

  function annotate() {
    for (const [selector, label] of sections) {
      const target = document.querySelector<HTMLElement>(selector);
      if (!target) continue;
      const boundary = document.createElement('div');
      boundary.className = 'system-xray-boundary';
      boundary.setAttribute('aria-hidden', 'true');
      const caption = document.createElement('span');
      caption.className = 'system-xray-section-label';
      caption.textContent = `${target.id ? `#${target.id}` : 'MILESTONES'} / ${label}`;
      boundary.append(caption);
      target.classList.add('system-xray-target');
      target.append(boundary);
      additions.push(boundary);
    }
    const ns = 'http://www.w3.org/2000/svg';
    for (const [id, stages] of flows) {
      const target = document.querySelector<HTMLElement>(`#work-${id} .work-diagram`);
      if (!target) continue;
      const frame = document.createElement('div');
      frame.className = 'system-xray-diagram';
      frame.setAttribute('aria-hidden', 'true');
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 560 26');
      svg.setAttribute('focusable', 'false');
      svg.classList.add('system-xray-flow');
      const step = 560 / stages.length;
      stages.forEach((stage, index) => {
        const x = index * step;
        const box = document.createElementNS(ns, 'rect');
        for (const [key, value] of Object.entries({ x: x + 1, y: 2, width: step - 18, height: 22 })) box.setAttribute(key, String(value));
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', String(x + (step - 16) / 2));
        text.setAttribute('y', '16');
        text.textContent = stage;
        svg.append(box, text);
        if (index < stages.length - 1) {
          const path = document.createElementNS(ns, 'path');
          path.setAttribute('d', `M${x + step - 17} 13h16m-4-3 4 3-4 3`);
          path.setAttribute('pathLength', '1');
          svg.append(path);
        }
      });
      frame.append(svg);
      target.classList.add('system-xray-target');
      target.append(frame);
      additions.push(frame);
      // Panels sit beside the aria-hidden original, so disclosures remain accessible.
      // A flow-root keeps the original diagram's margins and page geometry intact.
      const source = storyDetails?.content.querySelector(`[data-xray-story="${id}"]`);
      if (source) {
        const slot = document.createElement('div');
        slot.className = 'system-xray-story-slot';
        target.replaceWith(slot);
        slot.append(target, ...Array.from(source.children).map(child => child.cloneNode(true)));
        storySlots.push(slot);
      }
    }
  }

  function setMode(mode: XRayMode) {
    if (!root || !status || !active) return;
    const focusInStory = storySlots.some(slot => slot.contains(document.activeElement));
    root.dataset.mode = mode;
    modes.forEach(button => {
      const selected = button.dataset.xrayMode === mode;
      button.setAttribute('aria-pressed', String(selected));
      if (selected && focusInStory) button.focus({ preventScroll: true });
    });
    root.querySelector<HTMLElement>('.system-xray-grid')?.toggleAttribute('hidden', mode !== 'structure');
    additions.filter(node => node.classList.contains('system-xray-boundary')).forEach(node => { node.hidden = mode !== 'structure'; });
    for (const slot of storySlots) {
      slot.dataset.layer = mode;
      slot.querySelectorAll<HTMLElement>('[data-xray-panel]').forEach(panel => { panel.hidden = panel.dataset.xrayPanel !== mode; });
    }
    status.textContent = `System X-Ray: ${mode}. ${mode === 'structure' ? 'Page structure.' : 'Engineering work.'} Press Escape to exit.`;
  }

  function close(restoreFocus = true) {
    if (!root || !exit || !status) return;
    const focused = document.activeElement;
    const restore = restoreFocus && (root.contains(focused) || storySlots.some(slot => slot.contains(focused)));
    active = false;
    hits = 0;
    window.clearTimeout(noticeTimer);
    for (const node of additions.splice(0)) {
      node.parentElement?.classList.remove('system-xray-target');
      node.remove();
    }
    for (const slot of storySlots.splice(0)) {
      const diagram = slot.querySelector('.work-diagram');
      if (diagram) slot.replaceWith(diagram);
      else slot.remove();
    }
    root.hidden = true;
    root.removeAttribute('data-notice');
    root.removeAttribute('data-mode');
    root.querySelector<HTMLElement>('.system-xray-grid')?.removeAttribute('hidden');
    modes.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.xrayMode === 'structure')));
    status.textContent = '';
    if (restore) previousFocus?.focus({ preventScroll: true });
    previousFocus = null;
  }

  function activate(mode: XRayMode, keyboard = false) {
    if (!root || !exit || !status) return;
    if (active) {
      setMode(mode);
      if (keyboard) exit.focus({ preventScroll: true });
      return;
    }
    hits = 0;
    active = true;
    stopDiscovery();
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : brand ?? null;
    annotate();
    setMode(mode);
    root.hidden = false;
    root.setAttribute('data-notice', '');
    status.textContent = 'System X-Ray active. Press Escape to exit.';
    noticeTimer = window.setTimeout(() => root.removeAttribute('data-notice'), 3200);
    if (keyboard) exit.focus({ preventScroll: true });
  }

  function tap(keyboard = false) {
    if (active) return;
    const now = performance.now();
    if (!hits || now - started > 900) { hits = 0; started = now; }
    if (++hits < 3) return;
    activate('structure', keyboard);
  }

  const entry = document.querySelector<HTMLElement>('[data-xray-entry]');
  const inspect = entry?.querySelector<HTMLButtonElement>('[data-xray-open]');
  if (entry && inspect) {
    inspect.addEventListener('click', event => activate('flows', event.detail === 0));
    entry.hidden = false;
  }

  dot.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Only the period is reserved. AK and the rest of the home link still navigate.
    event.preventDefault();
    tap();
  });
  brand.setAttribute('aria-describedby', 'system-xray-keyboard');
  brand.setAttribute('aria-keyshortcuts', '.');
  brand.addEventListener('keydown', event => {
    if (event.key === '.' && !event.repeat && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      tap(true);
    }
  });
  exit.addEventListener('click', () => close());
  modes.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.xrayMode;
    if (mode === 'structure' || mode === 'flows' || mode === 'decisions') setMode(mode);
  }));
  document.addEventListener('keydown', event => {
    // Let an existing project dialog consume Escape before exiting inspection.
    if (active && event.key === 'Escape' && !event.defaultPrevented && !document.querySelector('dialog[open]')) close();
  });
  window.addEventListener('pagehide', () => close(false));
}
