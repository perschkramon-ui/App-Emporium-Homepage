/* ══════════════════════════
   APP-EMPORIUM – JavaScript
   ══════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.querySelectorAll('span').forEach((s, i) => {
    if (isOpen) {
      if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (i === 1) s.style.opacity = '0';
      if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      s.style.transform = '';
      s.style.opacity = '';
    }
  });
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Animated particles ──
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.opacity = Math.random() * 0.6 + 0.2;
    container.appendChild(p);
  }
}
createParticles();

// ── Scroll reveal animations ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
  '.app-card, .feature-card, .pricing-card, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 3) * 0.1 + 's';
  revealObserver.observe(el);
});

// ── Form handling ──
const form = document.getElementById('anfrageForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const submitArrow = document.getElementById('submitArrow');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.classList.remove('show');
  formSuccess.classList.remove('show');

  // Validate
  const fname = form.fname.value.trim();
  const lname = form.lname.value.trim();
  const email = form.email.value.trim();
  const interest = form.interest.value;
  const message = form.message.value.trim();
  const datenschutz = form.datenschutz.checked;

  if (!fname || !lname || !email || !interest || !message || !datenschutz) {
    formError.classList.add('show');
    formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formError.textContent = '⚠️ Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    formError.classList.add('show');
    return;
  }

  // Loading state
  submitBtn.disabled = true;
  submitBtnText.textContent = 'Wird gesendet…';
  submitArrow.style.display = 'none';

  // Simulate send (replace with actual backend/formspree later)
  await new Promise(r => setTimeout(r, 1800));

  // Build mailto link as fallback
  const subject = encodeURIComponent(`App-Emporium Anfrage: ${interest}`);
  const body = encodeURIComponent(
    `Name: ${fname} ${lname}\nE-Mail: ${email}\nTelefon: ${form.phone.value || '–'}\nInteresse: ${interest}\n\nNachricht:\n${message}`
  );
  
  // Open mailto (fallback if no backend)
  window.location.href = `mailto:kontakt@app-emporium.com?subject=${subject}&body=${body}`;

  // Show success
  submitBtn.style.display = 'none';
  formSuccess.classList.add('show');
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  form.reset();
});

// ── Active nav link highlighting ──
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#a78bfa';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Hero badge pulsing green dot ──
// Already handled in CSS

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Tilt effect on app cards ──
document.querySelectorAll('.app-card:not(.app-card-custom)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
});

// ── Animate pricing numbers on scroll ──
function animateNumber(el, target, duration = 1000) {
  const start = 0;
  const step = (timestamp) => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  let startTime;
  requestAnimationFrame((ts) => { startTime = ts; step(ts); });
}

const priceNums = document.querySelectorAll('.price-num');
const priceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const val = parseInt(entry.target.textContent);
      animateNumber(entry.target, val, 800);
      priceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

priceNums.forEach(el => priceObserver.observe(el));

// ── "Projekt anfragen" → scroll to form + pre-select option ──
const customAppBtn = document.getElementById('customAppBtn');
if (customAppBtn) {
  customAppBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const kontakt = document.getElementById('kontakt');
    const interestSelect = document.getElementById('interest');
    if (kontakt) kontakt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (interestSelect) {
      setTimeout(() => {
        interestSelect.value = 'Individuelle Entwicklung';
        interestSelect.focus();
        // Highlight the select briefly
        interestSelect.style.borderColor = '#7c3aed';
        interestSelect.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.3)';
        setTimeout(() => {
          interestSelect.style.borderColor = '';
          interestSelect.style.boxShadow = '';
        }, 1800);
      }, 600);
    }
  });
}

// ── App card CTAs → scroll to form + pre-select option ──
const appCtaMap = {
  'zeitscan-cta':  'ZeitScan (Zeiterfassung)',
  'billforge-cta': 'BillForge (Rechnungsgenerator)',
  'tableflow-cta': 'TableFlow (Reservierungstool)',
  'gympro-cta':    'GymPro (Fitness App)',
};

Object.entries(appCtaMap).forEach(([id, value]) => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const kontakt = document.getElementById('kontakt');
    const interestSelect = document.getElementById('interest');
    if (kontakt) kontakt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (interestSelect) {
      setTimeout(() => {
        interestSelect.value = value;
        interestSelect.focus();
        interestSelect.style.borderColor = '#7c3aed';
        interestSelect.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.3)';
        setTimeout(() => {
          interestSelect.style.borderColor = '';
          interestSelect.style.boxShadow = '';
        }, 1800);
      }, 600);
    }
  });
});

console.log('%c🚀 App-Emporium loaded', 'color:#7c3aed;font-size:1.2rem;font-weight:bold');
