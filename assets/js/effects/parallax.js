import { $$ } from '../utils/dom.js';
import { hasFinePointer } from '../utils/env.js';

export function initParallax(){
  if(!hasFinePointer) return;
  const parallaxRoot = document.querySelector('.parallax');
  if(!parallaxRoot) return;
  function parallaxMove(e){
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    const dx = (e.clientX - cx)/cx, dy = (e.clientY - cy)/cy;
    $$('.layer', parallaxRoot).forEach(l=>{
      const depth = parseFloat(l.dataset.depth || '0.05');
      l.style.transform = `translate3d(${dx*depth*60}px, ${dy*depth*40}px, 0)`;
    });
  }
  window.addEventListener('pointermove', parallaxMove);
}
