export const $ = (s, r=document)=>r.querySelector(s);
export const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
export const clamp = (n,min,max)=>Math.max(min,Math.min(n,max));
export const lerp = (a,b,t)=>a+(b-a)*t;
export const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
export function easeInOutCubic(t){ return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
