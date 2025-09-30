import { prefersReduced } from './utils.js';

export function initStarfield(){
  const canvas = document.getElementById('bg-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d', { alpha:true });
  let w=canvas.width=window.innerWidth, h=canvas.height=window.innerHeight;
  let stars=[]; const COUNT = Math.max(80, Math.min(220, Math.floor(window.innerWidth*0.3)));

  function reset(){
    w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;
    stars = Array.from({length:COUNT}, ()=>({ x: (Math.random()-0.5)*w, y:(Math.random()-0.5)*h, z: Math.random()*w }));
  }
  reset(); window.addEventListener('resize', reset, { passive:true });

  function loop(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#0ea5e9';
    for(const s of stars){
      s.z -= 2; if(s.z <= 1){ s.z = w; }
      const k = 128 / s.z;
      const x = w/2 + s.x * k;
      const y = h/2 + s.y * k;
      const size = (1 - s.z/w) * 2;
      ctx.globalAlpha = 0.35 + (1 - s.z/w) * 0.4;
      ctx.fillRect(x, y, size, size);
    }
    if(!prefersReduced) requestAnimationFrame(loop);
  }
  if(!prefersReduced) loop();
}
