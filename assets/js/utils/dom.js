export const $ = (s, r=document)=>r.querySelector(s);
export const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
export const clamp = (n,min,max)=>Math.max(min,Math.min(n,max));
export const lerp = (a,b,t)=>a+(b-a)*t;
