import { $, $$ } from '../utils/dom.js';

/** Nav behavior: scrolled class + mobile drawer (with scroll lock & focus trap) **/
let lastFocus = null;
let lockedScrollY = 0;

function lockScroll(){
  lockedScrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}
function unlockScroll(){
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, lockedScrollY || 0);
}

export function closeDrawer(){
  const mobileDrawer = $('#mobileDrawer');
  const drawerPanel = mobileDrawer?.querySelector('.drawer-panel');
  const menuBtn = $('#menuBtn');
  if(!mobileDrawer || !drawerPanel) return;
  mobileDrawer.classList.remove('-open');
  mobileDrawer.setAttribute('aria-hidden','true');
  menuBtn?.setAttribute('aria-expanded','false');
  unlockScroll();
  setTimeout(()=> lastFocus?.focus(), 0);
}

function openDrawer(){
  const mobileDrawer = $('#mobileDrawer');
  const drawerPanel = mobileDrawer?.querySelector('.drawer-panel');
  const menuBtn = $('#menuBtn');
  if(!mobileDrawer || !drawerPanel) return;
  lastFocus = document.activeElement;
  mobileDrawer.classList.add('-open');
  mobileDrawer.setAttribute('aria-hidden','false');
  menuBtn?.setAttribute('aria-expanded','true');
  lockScroll();
  setTimeout(()=> drawerPanel.querySelector('a,button')?.focus(), 50);
}

export function initNav(){
  const nav = $('.nav-ios');
  const mobileDrawer = $('#mobileDrawer');
  const drawerPanel = mobileDrawer?.querySelector('.drawer-panel');
  const menuBtn = $('#menuBtn'), menuClose = $('#menuClose');

  const onScrollNav = ()=> nav?.classList.toggle('-scrolled', (window.scrollY||0) > 12);
  window.addEventListener('scroll', onScrollNav, {passive:true}); onScrollNav();

  menuBtn?.addEventListener('click', (e)=>{ e.stopPropagation(); openDrawer(); });
  menuClose?.addEventListener('click', (e)=>{ e.stopPropagation(); closeDrawer(); });

  // click outside
  mobileDrawer?.addEventListener('pointerdown', (e)=>{
    if(!drawerPanel?.contains(e.target)) closeDrawer();
  });

  // trap focus within drawer
  const focusSel = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  mobileDrawer?.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ e.preventDefault(); closeDrawer(); return; }
    if(e.key !== 'Tab') return;
    const nodes = Array.from(drawerPanel?.querySelectorAll(focusSel) || []).filter(el=> el.offsetParent !== null);
    if(!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });

  // close when a link inside is clicked
  drawerPanel?.addEventListener('click', (e)=>{
    const link = e.target.closest('a[href^="#"]');
    if(link){ closeDrawer(); }
  });
}
