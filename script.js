/* =========================================================
   VISHAL T — PORTFOLIO SCRIPT
   Vanilla JS only. Handles: loading screen, theme toggle,
   custom cursor, scroll progress, nav highlighting, typing
   animation, scroll-reveal, animated counters/skill bars,
   mobile menu, back-to-top, and the contact form.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Loading screen ---------- */
  const loaderTextEl = document.getElementById('loader-text');
  const loadingScreen = document.getElementById('loading-screen');
  const loaderPhrase = 'booting portfolio...';
  let li = 0;

  (function typeLoader(){
    if (li <= loaderPhrase.length){
      loaderTextEl.textContent = loaderPhrase.slice(0, li);
      li++;
      setTimeout(typeLoader, 45);
    }
  })();

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 900);
  });

  /* ---------- 2. Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = getStoredTheme();

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    storeTheme(next);
  });

  // In-memory fallback storage (artifact-safe; on a real GitHub Pages
  // deployment this also happily uses localStorage).
  function storeTheme(value){
    try { window.__themePref = value; localStorage.setItem('vishal-theme', value); }
    catch(e){ window.__themePref = value; }
  }
  function getStoredTheme(){
    try { return localStorage.getItem('vishal-theme') || window.__themePref || null; }
    catch(e){ return window.__themePref || null; }
  }

  /* ---------- 3. Custom cursor ---------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  (function animateRing(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .project-card, .stat-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });

  /* ---------- 4. Scroll progress bar ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ---------- 5. Header scrolled state + back-to-top ---------- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  function handleScrollUI(){
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    backToTop.classList.toggle('visible', y > 500);
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 6. Active nav link highlighting ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav(){
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight){
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.nav === currentId);
    });
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleScrollUI();
    highlightNav();
  }, { passive: true });

  updateScrollProgress();
  handleScrollUI();
  highlightNav();

  /* ---------- 7. Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 8. Typing animation (hero title) ---------- */
  const typingEl = document.getElementById('typing-text');
  const roles = [
    'Full-Stack Web Developer',
    'Java & Python Programmer',
    'Aspiring Software Engineer',
    'Building Clean UI, One Line at a Time'
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = roles[roleIndex];
    if (!deleting){
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- 9. Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 10. Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el){
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1200;
    const start = performance.now();

    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- 11. Animated skill bars ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const bar = entry.target;
        const level = bar.dataset.level || 0;
        const fill = bar.querySelector('.skill-bar-fill');
        requestAnimationFrame(() => { fill.style.width = level + '%'; });
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- 12. Contact form (client-side validation, no backend) ---------- */
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', test: v => v.trim().length > 1, msg: 'Please enter your name.' },
      { id: 'email', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email.' },
      { id: 'message', test: v => v.trim().length > 9, msg: 'Message should be at least 10 characters.' }
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errorEl = form.querySelector(`[data-error-for="${f.id}"]`);
      const row = input.closest('.form-row');
      if (!f.test(input.value)){
        valid = false;
        errorEl.textContent = f.msg;
        row.classList.add('error');
      } else {
        errorEl.textContent = '';
        row.classList.remove('error');
      }
    });

    if (!valid){
      statusEl.textContent = '';
      return;
    }

    // No backend is wired up — open the user's mail client with a
    // pre-filled message as a functional fallback for GitHub Pages.
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    statusEl.textContent = 'Opening your email client…';
    window.location.href = `mailto:vishal2006t@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      statusEl.textContent = 'Thanks! Your message is ready to send.';
      form.reset();
    }, 600);
  });

  /* ---------- 13. Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
