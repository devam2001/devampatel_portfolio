import { $, $$, prefersReduced, easeInOutCubic } from './utils.js';

export function initNav(){
  const nav = document.querySelector('.nav-ios');
  const btt = $('#btt');
  let NAV_OFFSET = 0;

  function computeNavOffset(){
    NAV_OFFSET = Math.round(nav.getBoundingClientRect().height + 14);
  }
  computeNavOffset();
  window.addEventListener('resize', computeNavOffset, { passive:true });
  if (window.visualViewport){ window.visualViewport.addEventListener('resize', computeNavOffset, { passive:true }); }

  function onScroll(){
    nav.classList.toggle('-scrolled', (window.scrollY||0) > 12);
    btt?.classList.toggle('-show', (window.scrollY||0) > 400);
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

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
    // Close the mobile drawer if open (exposed by ui-drawer)
    window.__closeMobileDrawer?.();
    history.pushState(null,'',hash);
  });

  btt?.addEventListener('click', ()=> window.scrollTo({top:0, behavior: prefersReduced ? 'auto' : 'smooth'}));

  // Footer year
  const year = $('#year'); if(year) year.textContent = new Date().getFullYear();
}
