import { initNav } from './ui-nav.js';
import { initDrawer } from './ui-drawer.js';
import { initReveal } from './reveal.js';
import { initEffects } from './ui-effects.js';
import { initStarfield } from './ui-starfield.js';
import { initCarousel } from './ui-carousel.js';
import { initContactModal } from './ui-contact.js';
import { initResume } from './resume.js';

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-app-ready','ready');
  document.documentElement.classList.remove('reveal-fallback');
  initNav();
  initDrawer();
  initReveal();
  initEffects();
  initStarfield();
  initCarousel();
  initContactModal();
  initResume();
});
