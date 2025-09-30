import { $ } from '../utils/dom.js';
import { prefersReduced } from '../utils/env.js';

export function initCarousel(){
  const wrap = document.getElementById('hcWrap');
  const rail = document.getElementById('hcarousel');
  const prev = document.getElementById('hcPrev');
  const next = document.getElementById('hcNext');
  if(!wrap || !rail) return;
  const cards = Array.from(rail.children);
  let index = 0;
  let autoplayId = null;
  const AUTOPLAY_MS = 4500;

  function cardWidth(){
    if(!cards.length) return 0;
    const gap = parseFloat(getComputedStyle(rail).columnGap || 18);
    return cards[0].offsetWidth + gap;
  }
  function clampIndex(i){ return (i + cards.length) % cards.length; }
  function scrollToIndex(i){
    index = clampIndex(i);
    rail.scrollTo({ left: index * cardWidth(), behavior:'smooth' });
  }
  function onNext(){ scrollToIndex(index+1); restartAutoplay(); }
  function onPrev(){ scrollToIndex(index-1); restartAutoplay(); }

  next?.addEventListener('click', onNext);
  prev?.addEventListener('click', onPrev);

  let scrollTimer;
  rail.addEventListener('scroll', ()=>{ clearTimeout(scrollTimer);
    scrollTimer = setTimeout(()=>{ index = Math.round(rail.scrollLeft / cardWidth()); }, 120);
  }, {passive:true});

  // Touch swipe assists
  let startX=0, startY=0, isMoving=false;
  rail.addEventListener('touchstart', (e)=>{ const t=e.touches[0]; startX=t.clientX; startY=t.clientY; isMoving=true; }, {passive:true});
  rail.addEventListener('touchmove', (e)=>{
    if(!isMoving) return;
    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = Math.abs(t.clientY - startY);
    if (Math.abs(dx) > 40 && dy < 40){ (dx < 0 ? onNext() : onPrev()); isMoving=false; }
  }, {passive:true});
  rail.addEventListener('touchend', ()=>{ isMoving=false; }, {passive:true});

  function startAutoplay(){ if(prefersReduced || autoplayId) return; autoplayId = setInterval(()=> scrollToIndex(index+1), AUTOPLAY_MS); }
  function stopAutoplay(){ if(autoplayId){ clearInterval(autoplayId); autoplayId = null; } }
  function restartAutoplay(){ stopAutoplay(); startAutoplay(); }

  wrap.addEventListener('mouseenter', stopAutoplay);
  wrap.addEventListener('mouseleave', startAutoplay);
  rail.addEventListener('focusin', stopAutoplay);
  rail.addEventListener('focusout', startAutoplay);
  document.addEventListener('visibilitychange', ()=>{ document.hidden ? stopAutoplay() : startAutoplay(); });

  window.addEventListener('resize', ()=> scrollToIndex(index));
  startAutoplay();
}
