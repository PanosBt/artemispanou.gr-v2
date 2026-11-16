// Reveal on scroll: marks each .reveal element visible the first time it enters the
// viewport. The hidden start state and the transition live in global.scss.
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  },
  // Trigger a little above the bottom edge, so the motion is seen rather than missed.
  { rootMargin: '0px 0px -8% 0px' },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
