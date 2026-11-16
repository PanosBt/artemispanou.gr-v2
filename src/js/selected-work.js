// Selected Work carousel behaviour (see SelectedWork.astro).
// Desktop: scrolling the page turns the cards. Elsewhere: native swipe; we only
// keep the dots and the counter in sync and make the dots clickable.
import { formatCount } from '../utils/format';

const STACKED_QUERY = '(min-width: 1100px) and (prefers-reduced-motion: no-preference)';
const HOLD = 0.25; // share of each step (start and end) where a card rests
const MAX_ANGLE = 88; // deg
const MIN_SCALE = 0.92;
const SMOOTHING = 0.15; // per frame, eases the turn towards the scroll position

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

document.querySelectorAll('[data-selected-work]').forEach(initSelectedWork);

function initSelectedWork(section) {
  const scroller = section.querySelector('[data-scroller]');
  const track = section.querySelector('[data-track]');
  const count = section.querySelector('[data-count]');
  const dots = [...section.querySelectorAll('[data-dot]')];
  const cards = [...track.children];
  const last = cards.length - 1;
  if (last < 1) return;

  const stacked = matchMedia(STACKED_QUERY);
  const motionOk = matchMedia('(prefers-reduced-motion: no-preference)');

  let active = -1;
  let shown = 0; // rendered card position, 0 … last
  let frame = 0;

  function setActive(index) {
    if (index === active) return;
    active = index;
    count.textContent = formatCount(index, cards.length);
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    // Only the visible card is interactive while they are stacked.
    if (stacked.matches) cards.forEach((card, i) => (card.inert = i !== index));
  }

  // ── desktop: scroll progress → continuous card position ────────────
  const scrollRange = () => scroller.offsetHeight - innerHeight;

  function targetPosition() {
    const progress = clamp(-scroller.getBoundingClientRect().top / scrollRange(), 0, 1);
    const step = progress * last;
    const from = Math.min(Math.floor(step), last - 1);
    const turn = clamp((step - from - HOLD) / (1 - 2 * HOLD), 0, 1);
    return from + turn;
  }

  function render() {
    const target = targetPosition();
    shown += (target - shown) * SMOOTHING;
    if (Math.abs(target - shown) < 0.001) shown = target;

    cards.forEach((card, i) => {
      const offset = clamp(i - shown, -1, 1); // -1 turned away, 0 facing, 1 waiting
      const scale = 1 - Math.abs(offset) * (1 - MIN_SCALE);
      card.style.transform = `rotateY(${offset * MAX_ANGLE}deg) scale(${scale})`;
      card.style.opacity = String(1 - Math.abs(offset));
    });
    setActive(Math.round(shown));

    frame = shown === target ? 0 : requestAnimationFrame(render);
  }

  function requestRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  // ── tablet / mobile: mirror the snapped card ─────────────────────────
  function syncWithTrack() {
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  function goTo(index) {
    const behavior = motionOk.matches ? 'smooth' : 'auto';
    if (stacked.matches) {
      const start = scroller.getBoundingClientRect().top + scrollY;
      scrollTo({ top: start + (index / last) * scrollRange(), behavior });
    } else {
      track.scrollTo({ left: index * track.clientWidth, behavior });
    }
  }

  function applyMode() {
    section.classList.toggle('is-stacked', stacked.matches);
    cards.forEach((card) => {
      card.style.transform = '';
      card.style.opacity = '';
      card.inert = false;
    });
    active = -1;

    if (stacked.matches) {
      addEventListener('scroll', requestRender, { passive: true });
      addEventListener('resize', requestRender);
      shown = targetPosition();
      render();
    } else {
      removeEventListener('scroll', requestRender);
      removeEventListener('resize', requestRender);
      syncWithTrack();
    }
  }

  track.addEventListener('scroll', syncWithTrack, { passive: true });
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  stacked.addEventListener('change', applyMode);
  applyMode();
}
