import { $$ } from '../utils/dom.js';

export function initMagnet(){
  function magnetize(container, strength=22){
    const inner = container.querySelector('.btn, a, button');
    if(!inner) return;
    container.addEventListener('pointermove', (e)=>{
      const r = container.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width/2);
      const y = e.clientY - (r.top + r.height/2);
      inner.style.transform = `translate(${x/strength}px, ${y/strength}px)`;
      container.style.setProperty('--mx', ((x/r.width+0.5)*100)+'%');
      container.style.setProperty('--my', ((y/r.height+0.5)*100)+'%');
    }, {passive:true});
    container.addEventListener('pointerleave', ()=>{ inner.style.transform = 'translate(0,0)'; }, {passive:true});
  }
  $$('.magnet').forEach(magnetize);
}
