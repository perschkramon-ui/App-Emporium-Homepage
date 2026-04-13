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

// ── Tilt effect on app cards (deactivated on button hover to prevent blocking) ──
document.querySelectorAll('.app-card:not(.app-card-custom)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    // Don't tilt if hovering a button
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
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

// ── Global selectApp() – called via onclick in HTML ──
window.selectApp = function(value, e) {
  if (e) e.preventDefault();
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
    }, 500);
  }
};

// ── App Modal Management ──
const appData = {
  zeitscan: {
    id: "ZeitScan (Zeiterfassung)",
    name: "ZeitScan",
    icon: "icon_zeitscan.png",
    badges: ['<span class="badge badge-popular">⭐ Beliebt</span>', '<span class="badge badge-web">Web-App</span>'],
    desc: "Digitale Arbeitszeiterfassung – flexibel für jeden Betrieb. Das Besondere: Jeder Mitarbeiter erhält seine eigene persönliche App-Instanz, erreichbar auf zwei Wegen: per direktem Link auf jedem Smartphone oder Tablet, oder durch einfaches Scannen eines QR-Codes an einem zentralen Gerät. DSGVO-konform, rechtsicher nach §4 ArbZG mit automatischer Pausenregelung und umfangreichem Admin-Dashboard.",
    features: [
      "Persönliche App per Link oder QR-Code",
      "QR-Code Stempeluhr (zentrales Gerät)",
      "Automatische Pausenabzüge (§4 ArbZG)",
      "Admin-Dashboard & Berichte",
      "Export für Steuerberater",
      "DSGVO-konform & rechtsicher"
    ],
    link: "https://zeitscan--studio-1102330467-ee607.europe-west4.hosted.app"
  },
  billforge: {
    id: "BillForge (Rechnungsgenerator)",
    name: "RE-Generator",
    icon: "icon_regenerator.png",
    badges: ['<span class="badge badge-new">Neu</span>', '<span class="badge badge-web">Web-App</span>'],
    desc: "Professionelle Rechnungen in Sekunden erstellen, als PDF exportieren und GoBD-konform archivieren. Der RE-Generator nimmt dir die Arbeit ab: Kundenkartei verwalten, Produkte vordefinieren und mit einem Klick eine makellose Rechnung erzeugen. Jeder Nutzer hat seinen komplett abgetrennten, privaten Datenbereich – keinerlei Datenvermischung möglich.",
    features: [
      "PDF-Export auf Knopfdruck",
      "Kunden- & Produktverwaltung",
      "Automatische Rechnungsnummern",
      "Eigenes Firmen-Branding & Logo",
      "Umsatz-Tracking & Auswertung",
      "GoBD-konforme Archivierung",
      "100% datenisoliert pro Nutzer"
    ],
    link: "https://re-generator-f1de5.web.app"
  },
  tableflow: {
    id: "TableFlow (Reservierungstool)",
    name: "TableFlow",
    icon: "icon_tableflow.png",
    badges: ['<span class="badge badge-new">Neu</span>', '<span class="badge badge-web">Web-App</span>'],
    desc: "Das smarte Reservierungssystem für dich. Gestalte deinen Grundriss visuell im Browser, nimm Online-Reservierungen an und weise Gäste direkt den Tischen zu. Mit integriertem Kassensystem-Interface (POS) für effizienten Service aus einer Hand.",
    features: [
      "Visueller Tischplan",
      "Online-Reservierungswidget",
      "POS-Integration (Kasse)",
      "Wartelisten & Walk-ins",
      "No-Show Prävention",
      "Gäste-Verwaltung"
    ],
    link: "https://tableflow.app-emporium.de"
  },
  gympro: {
    id: "GymPro (Fitness App)",
    name: "GymPro",
    icon: "icon_gympro.png",
    badges: ['<span class="badge badge-android">PWA</span>', '<span class="badge badge-web">Offline</span>'],
    desc: "Die Zero-Friction Fitness Progressive Web App. Entwickelt für die reibungslose Erfassung deines Workouts direkt im Gym, auch offline. Mit RPE/RIR für genaue Belastungssteuerung, smartem Ruhetimer und superschnellem Barcode-Scanner für Nährwerte.",
    features: [
      "Vollständig offline nutzbar",
      "Barcode-Scanner für Nährwerte",
      "RPE/RIR Trainingssteuerung",
      "Intelligenter Ruhetimer",
      "Visueller Plate-Calculator",
      "Lückenlose Analyse"
    ],
    link: "https://gympro.app-emporium.de"
  }
};

const modal = document.getElementById('appModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalBadges = document.getElementById('modalBadges');
const modalDesc = document.getElementById('modalDesc');
const modalFeatures = document.getElementById('modalFeatures');
const modalLink = document.getElementById('modalLink');
const modalInquireBtn = document.getElementById('modalInquireBtn');
const modalCloseBtn = document.getElementById('modalClose');
let currentAppId = "";

window.openAppModal = function(appKey, event) {
  if (event) event.preventDefault();
  const data = appData[appKey];
  if (!data) {
    console.error('App nicht gefunden:', appKey);
    return;
  }
  
  currentAppId = data.id;
  modalIcon.src = data.icon;
  modalTitle.textContent = data.name;
  modalBadges.innerHTML = data.badges.join('');
  modalDesc.textContent = data.desc;
  
  modalFeatures.innerHTML = data.features.map(f => `<li><span class="check">✓</span> ${f}</li>`).join('');
  
  modalLink.href = data.link;
  
  // Zeige Modal an
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

// ── Event delegation für App-Buttons (zusätzlich zu onclick) ──
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-app]');
  if (btn) {
    e.preventDefault();
    window.openAppModal(btn.dataset.app, e);
  }
});

function closeAppModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeAppModal);
if(modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAppModal();
  });
}

if(modalInquireBtn) {
  modalInquireBtn.addEventListener('click', () => {
    closeAppModal();
    window.selectApp(currentAppId);
  });
}

console.log('%c🚀 App-Emporium loaded', 'color:#7c3aed;font-size:1.2rem;font-weight:bold');
