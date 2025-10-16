// Mobile menu
const menuBtn = document.getElementById('menu');
const navLinks = document.querySelector('.links') || document.querySelector('.nav-links');
if (menuBtn && navLinks){
  menuBtn.addEventListener('click', () => {
    const open = getComputedStyle(navLinks).display !== 'none';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.right = '20px';
    navLinks.style.background = '#fff';
    navLinks.style.gap = '12px';
    navLinks.style.padding = '12px';
    navLinks.style.border = '1px solid #e5edff';
    navLinks.style.borderRadius = '10px';
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth',block:'start'});
    if (window.innerWidth < 840 && navLinks) navLinks.style.display = 'none';
  });
});

// Scroll reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});

  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
}

// Parallax
const parallaxEls = document.querySelectorAll('.parallax');
if (parallaxEls.length && !prefersReduced){
  let ticking = false;
  const onScroll = ()=>{
    const y = window.scrollY || window.pageYOffset;
    parallaxEls.forEach(el=>{
      const speed = parseFloat(el.dataset.speed || '0.15');
    el.style.transform = `translateY(${y * speed}px)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', ()=>{
    if (!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, {passive:true});
}

// Hero image diagnostics: log load/error so user can see if remote image is blocked/missing
const heroImg = document.querySelector('.hero-visual img');
if (heroImg){
  heroImg.addEventListener('load', ()=> console.info('Hero image loaded:', heroImg.currentSrc || heroImg.src));
  heroImg.addEventListener('error', (e)=> console.warn('Hero image failed to load:', heroImg.src, e));
}

// Story images fallback: replace broken images with a small neutral placeholder
document.querySelectorAll('.story-grid img').forEach(img => {
  // ensure alt exists
  if (!img.alt) img.alt = 'Story image';
  img.addEventListener('error', (e)=>{
    console.warn('Story image failed to load, replacing with placeholder:', img.src);
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23eef4ff"/><text x="50%" y="50%" font-size="20" text-anchor="middle" fill="%231e50a2" dy=".3em">Image unavailable</text></svg>';
  });
});

/* Register + Pricing + Checkout (modal in-page) */
(function(){
  const plans = document.querySelectorAll('.select-plan');
  const agree = document.getElementById('agree');
  const submit = document.getElementById('submitReg');
  const note = document.getElementById('regNote');
  const form = document.getElementById('registerForm');
  const selectedPlanInput = document.getElementById('selectedPlanInput');

  // default to Free Sync (we removed Select button on free plan)
  let selectedPlan = selectedPlanInput?.value || 'Free Sync';
  
  plans.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.plan').forEach(c=>c.classList.remove('selected'));
      const card = btn.closest('.plan');
      if (card) card.classList.add('selected');
  selectedPlan = btn.dataset.plan || selectedPlan;
  if (selectedPlanInput) selectedPlanInput.value = selectedPlan;
      // If the selected plan is free, don't open payment — enable form submit if checkbox is checked
      if (String(selectedPlan).toLowerCase().includes('free')){
        if (submit && agree) submit.disabled = !agree.checked;
        if (note) {
          if (!agree.checked) {
            note.textContent = 'Free plan selected! Please check the terms agreement to continue.';
            note.style.color = '#7B8FC4';
          } else {
            note.textContent = 'Free plan selected — complete the form to create your account.';
            note.style.color = '#7B8FC4';
          }
        }
        // ensure we don't open the checkout modal for free plans
        return;
      }

      if (typeof openCheckout === 'function') openCheckout(selectedPlan);
    });
  });

  if (agree && submit){
    const sync = ()=> submit.disabled = !agree.checked;
    sync(); agree.addEventListener('change', sync);
  }

  if (form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const pass = document.getElementById('password').value.trim();
      const conf = document.getElementById('confirm').value.trim();
      if (pass.length < 6){ note.textContent = 'Password must be at least 6 characters'; return; }
      if (pass !== conf){ note.textContent = 'Passwords do not match'; return; }
      note.textContent = 'Account created. Select a plan to continue to payment.';
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }
})();

/* Checkout helpers */
function qs(s,root=document){return root.querySelector(s);}
function qsa(s,root=document){return root.querySelectorAll(s);}

const checkoutEl = qs('#checkout');
const titleEl = qs('#checkoutTitle');
const pmList = qs('#pmList');
const pmForm = qs('#pmForm');
const pmFields = qs('#pmFields');
const pmNote = qs('#pmNote');

function openCheckout(plan){
  if (!checkoutEl) return;
  titleEl.textContent = `Checkout — ${plan}`;
  pmList.hidden = false;
  pmForm.hidden = true;
  checkoutEl.classList.add('show');
}
function closeCheckout(){
  checkoutEl?.classList.remove('show');
}
qs('#closeCheckout')?.addEventListener('click', closeCheckout);
checkoutEl?.addEventListener('click', e=>{
  if (e.target === checkoutEl || e.target.classList.contains('modal-backdrop')) closeCheckout();
});

qsa('.pm-item').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const method = btn.dataset.method;
    buildFields(method);
    pmList.hidden = true;
    pmForm.hidden = false;
  });
});
qs('#pmBack')?.addEventListener('click', ()=>{
  pmForm.hidden = true;
  pmList.hidden = false;
  pmNote.textContent = '';
});
function buildFields(method){
  let html = '';
  if (method === 'gcash'){
    html = `
      <div class="field"><label>GCash number</label><input type="tel" placeholder="09XXXXXXXXX" required></div>
      <div class="field"><label>Account name</label><input type="text" placeholder="Full name" required></div>`;
  } else if (method === 'paypal'){
    html = `<div class="field"><label>PayPal email</label><input type="email" placeholder="you@example.com" required></div>`;
  } else if (method === 'card'){
    html = `
      <div class="field"><label>Card number</label><input inputmode="numeric" placeholder="4111 1111 1111 1111" required></div>
      <div class="field"><label>Name on card</label><input type="text" placeholder="Full name" required></div>
      <div class="field" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label>Expiry</label><input placeholder="MM/YY" required></div>
        <div><label>CVV</label><input inputmode="numeric" placeholder="123" required></div>
      </div>`;
  } else if (method === 'bank'){
    html = `
      <div class="field">
        <label>Select bank</label>
        <select required>
          <option value="">Choose…</option>
          <option>Metrobank</option>
          <option>BDO</option>
          <option>LandBank</option>
          <option>Other</option>
        </select>
      </div>
      <div class="field"><label>Account number</label><input inputmode="numeric" placeholder="0000 0000 0000" required></div>
      <div class="field"><label>Account name</label><input type="text" placeholder="Full name" required></div>`;
  }
  if (pmFields) pmFields.innerHTML = html;
}
pmForm?.addEventListener('submit', e=>{
  e.preventDefault();
  pmNote.textContent = 'Payment successful. A receipt was sent to your email.';
  setTimeout(()=>{ closeCheckout(); }, 900);
});

/* FAQ Accordion */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already open
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});