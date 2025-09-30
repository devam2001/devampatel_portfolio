import { $, $$, clamp, prefersReduced, hasFinePointer } from './utils.js';

export function initEffects(){
  /* ---------- Tilt (only for fine pointers) ---------- */
  if(hasFinePointer){
    function tiltify(el, maxRot=10){
      const layers = $$('.tilt-layer', el);
      const glare = $('.glare', el);
      function move(e){
        const rect = el.getBoundingClientRect();
        const px = clamp((e.clientX - rect.left) / rect.width, 0, 1);
        const py = clamp((e.clientY - rect.top) / rect.height, 0, 1);
        const rx = (py - .5) * -2 * maxRot;
        const ry = (px - .5) *  2 * maxRot;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        layers.forEach((ly)=>{
          const z = parseFloat(getComputedStyle(ly).getPropertyValue('--z')) || 0;
          const tx = (px-.5) * (z/15);
          const ty = (py-.5) * (z/15) * -1;
          ly.style.transform = `translateZ(${z}px) translate(${tx}px, ${ty}px)`;
        });
        if(glare){ glare.style.setProperty('--gx', (px*100)+'%'); glare.style.setProperty('--gy', (py*100)+'%'); }
      }
      function leave(){
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        layers.forEach(ly=> ly.style.transform = `translateZ(var(--z,0))`);
      }
      el.addEventListener('pointermove', move, { passive:true });
      el.addEventListener('pointerleave', leave, { passive:true });
    }
    $$('.tilt').forEach(tiltify);

    /* ---------- Parallax hero layers (fine pointer only) ---------- */
    const parallaxRoot = document.querySelector('.parallax');
    function parallaxMove(e){
      const cx = window.innerWidth/2, cy = window.innerHeight/2;
      const dx = (e.clientX - cx)/cx, dy = (e.clientY - cy)/cy;
      $$('.layer', parallaxRoot).forEach(l=>{
        const depth = parseFloat(l.dataset.depth || '0.05');
        l.style.transform = `translate3d(${dx*depth*60}px, ${dy*depth*40}px, 0)`;
      });
    }
    window.addEventListener('pointermove', parallaxMove, { passive:true });
  }

  /* ---------- Magnetic buttons (coarse + fine, lightweight) ---------- */
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
