import { $$ } from '../utils/dom.js';
import { prefersReduced } from '../utils/env.js';

export function initReveal(){
  const nodes = $$('.reveal');
  if(!nodes.length) return;
  if (prefersReduced){
    nodes.forEach(el=> el.classList.add('-in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('-in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.14, rootMargin:'0px 0px -10% 0px'});
  nodes.forEach(el=>io.observe(el));
}
