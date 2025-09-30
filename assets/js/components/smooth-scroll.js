import { $, $$ } from '../utils/dom.js';
import { prefersReduced } from '../utils/env.js';
import { closeDrawer } from './nav.js';

/** Smooth Scrolling (offset‑aware) */
export function initSmoothScroll(){
  const nav = $('.nav-ios');
  let NAV_OFFSET = 0;

  function computeNavOffset(){
    NAV_OFFSET = Math.round((nav?.getBoundingClientRect().height || 0) + 14); // safe‑top included
  }
  computeNavOffset();
  window.addEventListener('resize', computeNavOffset);
  if (window.visualViewport){ window.visualViewport.addEventListener('resize', computeNavOffset); }

  function easeInOutCubic(t){ return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }

  function smoothScrollTo(targetEl, duration = 650){
    if(!targetEl) return;
    const startY = window.pageYOffset;
    const endY = Math.round(targetEl.getBoundingClientRect().top + startY - NAV_OFFSET);
    if (prefersReduced){ window.scrollTo(0, endY); return; }
    const diff = endY - startY; let start;
    function step(ts){ if(!start) start = ts; const t = Math.min(1, (ts - start) / duration);
      window.scrollTo(0, Math.round(startY + diff * easeInOutCubic(t))); if(t < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  // Delegate clicks (desktop + mobile menu + CTA buttons with data-scroll)
  document.addEventListener('click', (e)=>{
    const link = e.target.closest('a[href^="#"]');
    const scroller = link || e.target.closest('[data-scroll]');
    if(!scroller) return;
    const hash = link ? link.getAttribute('href') : scroller.getAttribute('data-scroll');
    if(!hash || !hash.startsWith('#')) return;
    const target = document.getElementById(hash.slice(1));
    if(!target) return;
    e.preventDefault();
    smoothScrollTo(target);
    closeDrawer();
    history.pushState(null,'',hash);
  });
}
