import { $ } from './utils.js';

export function initContactModal(){
  const openBtn = document.getElementById('contactOpen');
  const modal = document.getElementById('contactModal');
  if(!openBtn || !modal) return;
  const panel = modal.querySelector('.drawer-panel');
  const closeBtn = document.getElementById('contactClose');
  const cancelBtn = document.getElementById('contactCancel');
  const form = document.getElementById('contactForm');
  const TO_EMAIL = 'devam2001patel@gmail.com';

  let lastFocus = null;
  const focusSel = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function open(){
    lastFocus = document.activeElement;
    modal.classList.add('-open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    setTimeout(()=> panel.querySelector('input, textarea, button')?.focus(), 50);
  }
  function close(){
    modal.classList.remove('-open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    lastFocus?.focus();
  }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);
  modal.addEventListener('click', (e)=>{ if(!panel.contains(e.target)) close(); });

  modal.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ e.preventDefault(); close(); }
    if(e.key === 'Tab'){
      const focusables = Array.from(panel.querySelectorAll(focusSel)).filter(el=> el.offsetParent !== null);
      if(!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });

  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Portfolio contact';
    const message = form.message.value.trim();
    const body = `From: ${name} <${email}>\\n\\n${message}`;
    const href = `mailto:${encodeURIComponent(TO_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    close();
  });
}
