import { $ } from '../utils/dom.js';
import { prefersReduced } from '../utils/env.js';

export function initBackToTop(){
  const btt = $('#btt');
  if(!btt) return;
  const onScrollBtt = ()=> btt.classList.toggle('-show', (window.scrollY||0) > 400);
  window.addEventListener('scroll', onScrollBtt, {passive:true});
  onScrollBtt();

  btt.addEventListener('click', ()=>{
    if (prefersReduced) { window.scrollTo(0,0); }
    else { window.scrollTo({top:0, behavior:'smooth'}); }
  });
}
