import { $ } from './utils.js';

export function initDrawer(){
  const mobileDrawer = $('#mobileDrawer');
  if(!mobileDrawer) return;
  const drawerPanel = mobileDrawer.querySelector('.drawer-panel');
  const menuBtn = $('#menuBtn');
  const menuClose = $('#menuClose');

  let lastFocus = null;
  let scrollY = 0;
  const focusSel = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function lockScroll(){
    scrollY = window.scrollY || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
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
    window.scrollTo(0, scrollY || 0);
  }

  function openDrawer(){
    lastFocus = document.activeElement;
    mobileDrawer.classList.add('-open');
    mobileDrawer.setAttribute('aria-hidden','false');
    menuBtn?.setAttribute('aria-expanded','true');
    lockScroll();
    setTimeout(()=> drawerPanel.querySelector(focusSel)?.focus(), 50);
  }
  function closeDrawer(){
    mobileDrawer.classList.remove('-open');
    mobileDrawer.setAttribute('aria-hidden','true');
    menuBtn?.setAttribute('aria-expanded','false');
    unlockScroll();
    setTimeout(()=> lastFocus?.focus(), 0);
  }

  menuBtn?.addEventListener('click', (e)=>{ e.stopPropagation(); openDrawer(); });
  menuClose?.addEventListener('click', (e)=>{ e.stopPropagation(); closeDrawer(); });

  // click outside closes
  mobileDrawer.addEventListener('pointerdown', (e)=>{
    if(!drawerPanel.contains(e.target)) closeDrawer();
  });

  // trap focus within drawer
  mobileDrawer.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ e.preventDefault(); closeDrawer(); return; }
    if(e.key !== 'Tab') return;
    const nodes = Array.from(drawerPanel.querySelectorAll(focusSel)).filter(el=> el.offsetParent !== null);
    if(!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });

  // close when a link inside is clicked
  drawerPanel.addEventListener('click', (e)=>{
    const link = e.target.closest('a[href^="#"]');
    if(link){ closeDrawer(); }
  });

  // Expose globally for other modules
  window.__openMobileDrawer = openDrawer;
  window.__closeMobileDrawer = closeDrawer;
}
