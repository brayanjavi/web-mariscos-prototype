/* ===========================
   NAVBAR SCROLL
=========================== */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===========================
   STAGGERED CARD REVEAL
=========================== */
const cardObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cards = e.target.querySelectorAll('.menu-card:not(.hidden)');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        cardObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.05 }
);

const menuGrid = document.querySelector('.menu-grid');
if (menuGrid) {
  menuGrid.querySelectorAll('.menu-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.35s ease';
  });
  cardObserver.observe(menuGrid);
}

/* ===========================
   MENU FILTER
=========================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards  = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.filter;

    menuCards.forEach(card => {
      const show = category === 'all' || card.dataset.category === category;
      if (show) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.97)';
        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ===========================
   BUBBLES (hero)
=========================== */
function createBubbles() {
  const container = document.querySelector('.bubbles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const b = document.createElement('div');
    b.classList.add('bubble');
    const size = Math.random() * 60 + 15;
    b.style.setProperty('--size',  `${size}px`);
    b.style.setProperty('--x',     `${Math.random() * 100}%`);
    b.style.setProperty('--dur',   `${Math.random() * 10 + 6}s`);
    b.style.setProperty('--delay', `${Math.random() * 8}s`);
    container.appendChild(b);
  }
}
createBubbles();

/* ===========================
   FLOATING PARTICLES (canvas)
=========================== */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 2.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.a  = Math.random() * 0.5 + 0.1;
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.a})`;
    ctx.fill();
  };

  function init() {
    resize();
    particles = Array.from({ length: 70 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

/* ===========================
   COUNTER ANIMATION
=========================== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

const statsRibbon = document.querySelector('.stats-ribbon');
if (statsRibbon) counterObserver.observe(statsRibbon);

/* ===========================
   RESERVATION FORM
=========================== */
const form = document.getElementById('reservationForm');
const successMsg = document.querySelector('.success-msg');

// Set min date to today
const dateInput = document.getElementById('res-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

function showError(input, msg) {
  input.classList.add('error');
  const err = input.parentElement.querySelector('.field-error');
  if (err) { err.textContent = msg; err.classList.add('show'); }
}
function clearError(input) {
  input.classList.remove('error');
  const err = input.parentElement.querySelector('.field-error');
  if (err) err.classList.remove('show');
}

if (form) {
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'res-name',    msg: 'Por favor ingresa tu nombre completo.' },
      { id: 'res-phone',   msg: 'Por favor ingresa un teléfono válido.' },
      { id: 'res-date',    msg: 'Por favor selecciona una fecha.' },
      { id: 'res-time',    msg: 'Por favor selecciona un horario.' },
      { id: 'res-guests',  msg: 'Por favor indica el número de personas.' },
    ];

    fields.forEach(({ id, msg }) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) { showError(el, msg); valid = false; }
    });

    // Phone validation: must contain 7-15 digits (spaces, dashes, parens, + allowed)
    const phoneEl = document.getElementById('res-phone');
    if (phoneEl && phoneEl.value.trim()) {
      const digits = phoneEl.value.replace(/\D/g, '');
      const allowed = /^[0-9\s\-()+]+$/.test(phoneEl.value.trim());
      if (!allowed || digits.length < 7 || digits.length > 15) {
        showError(phoneEl, 'Ingresa un número de teléfono válido (7–15 dígitos).');
        valid = false;
      }
    }

    // Email validation (optional field)
    const emailEl = document.getElementById('res-email');
    if (emailEl && emailEl.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
      showError(emailEl, 'Ingresa un correo electrónico válido.');
      valid = false;
    }

    if (!valid) return;

    // Fill success details
    const name   = document.getElementById('res-name').value.trim();
    const date   = document.getElementById('res-date').value;
    const time   = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const zone   = document.getElementById('res-zone')?.value || '';

    const sd = document.getElementById('success-details');
    if (sd) {
      sd.innerHTML = `
        <p>👤 <strong>Nombre:</strong> ${name}</p>
        <p>📅 <strong>Fecha:</strong> ${formatDate(date)}</p>
        <p>🕐 <strong>Hora:</strong> ${time}</p>
        <p>👥 <strong>Personas:</strong> ${guests}</p>
        ${zone ? `<p>🪑 <strong>Zona:</strong> ${zone}</p>` : ''}
      `;
    }

    form.style.display = 'none';
    successMsg.classList.add('show');
  });
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}

document.getElementById('newReservation')?.addEventListener('click', () => {
  form.reset();
  form.style.display = '';
  successMsg.classList.remove('show');
});

/* ===========================
   ACTIVE NAV LINK ON SCROLL
=========================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active-link'));
      const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active-link');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
