import { $$, prefersReduced } from './utils.js';

export function initReveal(){
  if(prefersReduced){ return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('-in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.14, rootMargin:'0px 0px -10% 0px'});
  $$('.reveal').forEach(el=>io.observe(el));
}
