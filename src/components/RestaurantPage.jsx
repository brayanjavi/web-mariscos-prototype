import { useEffect, useMemo, useRef, useState } from 'react';
import { sendReservationEmails } from '../lib/reservationService';

const navLinks = [
  { href: '#hero', label: 'Inicio' },
  { href: '#about', label: 'Nosotros' },
  { href: '#menu', label: 'Menú' },
  { href: '#reservations', label: 'Reservar Mesa', cta: true },
];

const stats = [
  { target: 15, suffix: '+', label: 'Años de experiencia' },
  { target: 48, suffix: '+', label: 'Platillos en el menú' },
  { target: 4800, suffix: '+', label: 'Clientes satisfechos' },
  { target: 100, suffix: '%', label: 'Ingredientes frescos' },
];

const features = [
  '🐟 Mariscos frescos diarios',
  '👨‍🍳 Chef experto certificado',
  '🌿 Ingredientes orgánicos',
  '🏆 Premio Mejor Restaurante',
  '🍷 Carta de vinos selecta',
  '🎶 Música en vivo',
];

const filters = [
  { key: 'all', label: '🌊 Todo' },
  { key: 'entrada', label: '🥗 Entradas' },
  { key: 'marisco', label: '🦐 Mariscos' },
  { key: 'pescado', label: '🐟 Pescados' },
  { key: 'especial', label: '⭐ Especiales' },
  { key: 'bebida', label: '🍹 Bebidas' },
];

const menuItems = [
  {
    category: 'entrada',
    cardCategory: 'Entrada',
    title: 'Ceviche Clásico',
    desc: 'Camarón fresco marinado en limón, cebolla morada, cilantro y chile serrano. Servido con tostadas.',
    price: '$120',
    rating: '4.9',
    emoji: '🥗',
    bgFrom: '#0a6e4a',
    bgTo: '#0d9c6a',
  },
  {
    category: 'entrada',
    cardCategory: 'Entrada',
    title: 'Camarones al Mojo',
    desc: 'Camarones gigantes salteados en mantequilla, ajo dorado, limón y hierbas finas. Irresistibles.',
    price: '$145',
    rating: '4.8',
    emoji: '🍤',
    bgFrom: '#6e4a0a',
    bgTo: '#9c6a0d',
  },
  {
    category: 'entrada',
    cardCategory: 'Entrada',
    title: 'Cóctel de Cangrejo',
    desc: 'Carne de cangrejo real con salsa cóctel artesanal, aguacate cremoso y jugo de limón fresco.',
    price: '$160',
    rating: '4.9',
    emoji: '🦀',
    badge: 'Popular',
    bgFrom: '#0a3a6e',
    bgTo: '#0d5ea0',
  },
  {
    category: 'marisco',
    cardCategory: 'Marisco',
    title: 'Langosta Thermidor',
    desc: 'Langosta entera a la plancha con mantequilla trufada, bisque de mariscos y hierbas provenzales.',
    price: '$420',
    rating: '5.0',
    emoji: '🦞',
    badge: 'Firma',
    bgFrom: '#6e0a0a',
    bgTo: '#a01a0d',
  },
  {
    category: 'marisco',
    cardCategory: 'Marisco',
    title: 'Pulpo a la Gallega',
    desc: 'Pulpo tierno cocido a la perfección con aceite de oliva extra virgen, pimentón ahumado y papas gallegas.',
    price: '$280',
    rating: '4.7',
    emoji: '🦑',
    bgFrom: '#0a556e',
    bgTo: '#0d7ea0',
  },
  {
    category: 'marisco',
    cardCategory: 'Marisco',
    title: 'Ostiones Naturales',
    desc: 'Media docena de ostiones frescos del día con mignonette de champán, salsa picante y limón Meyer.',
    price: '$210',
    rating: '4.8',
    emoji: '🦪',
    bgFrom: '#3a6e0a',
    bgTo: '#5aa00d',
  },
  {
    category: 'marisco',
    cardCategory: 'Marisco',
    title: 'Camarones Empanizados',
    desc: 'Camarones jumbo empanizados con panko dorado, servidos con salsa tártara y ensalada de col.',
    price: '$195',
    rating: '4.6',
    emoji: '🦐',
    badge: 'Popular',
    bgFrom: '#6e560a',
    bgTo: '#a07a0d',
  },
  {
    category: 'pescado',
    cardCategory: 'Pescado',
    title: 'Filete de Róbalo',
    desc: 'Filete de róbalo a la plancha con costra de hierbas, puré de camote y vinagreta de cítricos.',
    price: '$230',
    rating: '4.7',
    emoji: '🐟',
    bgFrom: '#0a4a6e',
    bgTo: '#0d6ea0',
  },
  {
    category: 'pescado',
    cardCategory: 'Pescado',
    title: 'Tikin-Xic Yucateco',
    desc: 'Pesca del día marinada en achiote y naranja agria, asada en hoja de plátano. Receta tradicional maya.',
    price: '$250',
    rating: '4.9',
    emoji: '🐠',
    badge: "Chef's Pick",
    bgFrom: '#6e0a4a',
    bgTo: '#a00d6e',
  },
  {
    category: 'pescado',
    cardCategory: 'Pescado',
    title: 'Dorado al Limón',
    desc: 'Dorado fresco a la plancha glaseado con mantequilla de limón, alcaparras y eneldo fresco.',
    price: '$220',
    rating: '4.6',
    emoji: '🐡',
    bgFrom: '#0a6e6e',
    bgTo: '#0da0a0',
  },
  {
    category: 'especial',
    cardCategory: 'Especial del Chef',
    title: 'Paella de Mariscos',
    desc: 'Paella valenciana con camarones, langostinos, almejas, mejillones y calamar en caldo de azafrán. Para 2 personas.',
    price: '$380',
    rating: '5.0',
    emoji: '🥘',
    badge: 'Especial',
    bgFrom: '#3a0a6e',
    bgTo: '#5a0da0',
  },
  {
    category: 'especial',
    cardCategory: 'Especial del Chef',
    title: 'Caldo 7 Mares',
    desc: 'Caldo jugoso con cangrejo, camarón, almeja, pulpo, calamar, jaiba y mejillón. Un festín del océano.',
    price: '$290',
    rating: '4.9',
    emoji: '🫕',
    bgFrom: '#0a6e3a',
    bgTo: '#0da05a',
  },
  {
    category: 'bebida',
    cardCategory: 'Bebida',
    title: 'Margarita de Maracuyá',
    desc: 'Tequila blanco, triple sec, jugo de maracuyá fresco y limón. Servida con borde de sal y chile.',
    price: '$85',
    rating: '4.8',
    emoji: '🍹',
    bgFrom: '#6e4a0a',
    bgTo: '#a0700d',
  },
  {
    category: 'bebida',
    cardCategory: 'Bebida',
    title: 'Agua de Horchata',
    desc: 'Horchata artesanal de arroz con canela y vainilla, refrescante y naturalmente dulce. Sin alcohol.',
    price: '$40',
    rating: '4.7',
    emoji: '🥤',
    bgFrom: '#0a4a6e',
    bgTo: '#0d6fa0',
  },
];

const infoItems = [
  { icon: '🕐', title: 'Horario de Atención', text: 'Lunes a Domingo · 12:00 – 22:00 hrs' },
  { icon: '📍', title: 'Ubicación', text: 'Av. del Litoral 456, Col. Marina, Ciudad del Mar' },
  { icon: '📞', title: 'Reservas por Teléfono', text: '+52 (312) 555-0199' },
  { icon: '📧', title: 'Correo Electrónico', text: 'reservas@laperladelmar.mx' },
];

const socialLinks = [
  { label: 'Facebook', icon: '📘' },
  { label: 'Instagram', icon: '📸' },
  { label: 'WhatsApp', icon: '💬' },
  { label: 'TikTok', icon: '🎵' },
];

const featuredMenu = [
  '🦞 Langosta Thermidor',
  '🥘 Paella de Mariscos',
  '🫕 Caldo 7 Mares',
  '🦑 Pulpo a la Gallega',
  '🥗 Ceviche Clásico',
];

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '',
  zone: '',
  notes: '',
};

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
}

export default function RestaurantPage() {
  const canvasRef = useRef(null);
  const statsRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeFilter, setActiveFilter] = useState('all');
  const [counterValues, setCounterValues] = useState(stats.map(() => 0));
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        style: {
          '--size': `${Math.random() * 60 + 15}px`,
          '--x': `${Math.random() * 100}%`,
          '--dur': `${Math.random() * 10 + 6}s`,
          '--delay': `${Math.random() * 8}s`,
        },
      })),
    [],
  );
  const filteredItems = useMemo(
    () => menuItems.filter((item) => activeFilter === 'all' || item.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      setNavbarScrolled(scrolled);
      setShowBackToTop(scrolled);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: '-20% 0px -35% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId = 0;

    const startCounters = () => {
      if (reduceMotion) {
        setCounterValues(stats.map((stat) => stat.target));
        return;
      }

      const start = performance.now();
      const duration = 1600;

      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        setCounterValues(stats.map((stat) => Math.round(stat.target * progress)));
        if (progress < 1) {
          frameId = window.requestAnimationFrame(step);
        }
      };

      frameId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const context = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let frameId = 0;

    const particles = Array.from({ length: 70 }, () => ({
      x: 0,
      y: 0,
      r: 0,
      vx: 0,
      vy: 0,
      a: 0,
    }));

    const resetParticle = (particle) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.r = Math.random() * 2.5 + 0.5;
      particle.vx = (Math.random() - 0.5) * 0.4;
      particle.vy = (Math.random() - 0.5) * 0.4;
      particle.a = Math.random() * 0.5 + 0.1;
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      particles.forEach(resetParticle);
    };

    const loop = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,255,255,${particle.a})`;
        context.fill();
      });
      frameId = window.requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Por favor ingresa tu nombre completo.';
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Por favor ingresa un teléfono válido.';
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      const allowed = /^[0-9\s\-()+]+$/.test(formData.phone.trim());
      if (!allowed || digits.length < 7 || digits.length > 15) {
        nextErrors.phone = 'Ingresa un número de teléfono válido (7–15 dígitos).';
      }
    }
    if (!formData.date) nextErrors.date = 'Por favor selecciona una fecha.';
    if (!formData.time) nextErrors.time = 'Por favor selecciona un horario.';
    if (!formData.guests) nextErrors.guests = 'Por favor indica el número de personas.';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const formattedDate = formatDate(formData.date);

    try {
      try {
        await sendReservationEmails({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          date: formattedDate,
          time: formData.time,
          guests: formData.guests,
          zone: formData.zone,
          notes: formData.notes.trim(),
        });
      } catch (error) {
        console.warn('No se pudieron enviar los correos de reservación:', error);
      }

      setSuccessData({
        name: formData.name.trim(),
        email: formData.email.trim(),
        date: formattedDate,
        time: formData.time,
        guests: formData.guests,
        zone: formData.zone,
      });
      setFormData(initialFormData);
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <nav id="navbar" className={navbarScrolled ? 'scrolled' : ''} role="navigation" aria-label="Navegación principal">
        <a href="#hero" className="nav-logo" aria-label="La Perla del Mar – inicio" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-icon" aria-hidden="true">🦞</span>
          La Perla del <span>Mar</span>
        </a>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="navLinks" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${link.cta ? 'nav-cta' : ''} ${activeSection === link.href.slice(1) ? 'active-link' : ''}`.trim()}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          type="button"
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <section id="hero" aria-label="Bienvenida">
        <div className="hero-bg" aria-hidden="true"></div>
        <canvas ref={canvasRef} id="particles-canvas" aria-hidden="true"></canvas>
        <div className="bubbles" aria-hidden="true">
          {bubbles.map((bubble) => (
            <span key={bubble.id} className="bubble" style={bubble.style}></span>
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-badge" aria-label="Abierto hoy">
            <span aria-hidden="true">⭐</span> Abierto hoy · Lun–Dom 12:00–22:00
          </div>

          <h1 className="hero-title">
            El Sabor del Mar<br />
            en Cada <span className="highlight">Bocado</span>
          </h1>

          <p className="hero-subtitle">
            Mariscos frescos traídos directamente del litoral, preparados con recetas tradicionales y un toque contemporáneo que conquista el paladar.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="btn btn-primary">
              <span aria-hidden="true">🍽️</span> Ver Menú
            </a>
            <a href="#reservations" className="btn btn-outline">
              <span aria-hidden="true">📅</span> Reservar Mesa
            </a>
          </div>
        </div>

        <div className="stats-ribbon" aria-label="Estadísticas del restaurante" ref={statsRef}>
          {stats.map((stat, index) => (
            <div className="stat-item" key={stat.label}>
              <strong><span>{counterValues[index]}{stat.suffix}</span></strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>Desliza</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      <div className="wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#e8f4f8"></path>
        </svg>
      </div>

      <section id="about" aria-labelledby="about-title">
        <div className="about-grid">
          <div className="about-visual reveal-left">
            <div className="about-img-wrap" role="img" aria-label="Icono de langosta representando el restaurante">🦞</div>
            <div className="about-badge" aria-label="15 años de sabor">
              <strong>15</strong>
              Años de<br />Sabor
            </div>
          </div>

          <div className="about-text reveal-right">
            <span className="section-tag">Nuestra Historia</span>
            <h2 className="section-title" id="about-title">
              Pasión por los <span>Mariscos</span><br />desde 2009
            </h2>
            <div className="divider-line"></div>
            <p>
              La Perla del Mar nació de un sueño familiar: llevar los sabores auténticos del litoral a cada mesa. Cada platillo es una celebración del mar, preparado con ingredientes frescos seleccionados diariamente.
            </p>
            <p>
              Nuestro chef ejecutivo combina técnicas culinarias clásicas con innovaciones contemporáneas para crear experiencias gastronómicas únicas e inolvidables.
            </p>

            <ul className="features-list" aria-label="Características del restaurante">
              {features.map((feature) => (
                <li key={feature}>
                  <span className="feat-icon" aria-hidden="true">{feature.slice(0, 2)}</span>
                  {feature.slice(3)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" fill="#e8f4f8"></path>
        </svg>
      </div>

      <section id="menu" aria-labelledby="menu-title">
        <div className="section-header reveal">
          <span className="section-tag">Lo que ofrecemos</span>
          <h2 className="section-title" id="menu-title">Nuestro <span>Menú</span></h2>
          <p className="section-subtitle">
            Platillos elaborados con los mejores mariscos del océano, cada uno un viaje sensorial al mar.
          </p>
          <div className="divider-line"></div>
        </div>

        <div className="menu-filters" role="group" aria-label="Filtrar categorías del menú">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="menu-grid" role="list" aria-label="Platillos del menú">
          {filteredItems.map((item, index) => (
            <article
              className="menu-card menu-card-filtered"
              data-category={item.category}
              role="listitem"
              key={`${activeFilter}-${item.title}`}
              style={{ '--bg-from': item.bgFrom, '--bg-to': item.bgTo, animationDelay: `${index * 80}ms` }}
            >
              <div className="card-img">
                <span className="emoji" aria-hidden="true">{item.emoji}</span>
                {item.badge ? <span className="card-badge">{item.badge}</span> : null}
              </div>
              <div className="card-body">
                <p className="card-category">{item.cardCategory}</p>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-footer">
                  <span className="card-price">{item.price}</span>
                  <span className="card-rating" aria-label={`Calificación: ${item.rating}`}>⭐ {item.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,80 1080,0 1440,80 L1440,80 L0,80 Z" fill="#0b2535"></path>
        </svg>
      </div>

      <section id="reservations" aria-labelledby="reservations-title">
        <div className="reservations-inner">
          <div className="reservations-info reveal-left">
            <span className="section-tag">Reserva tu lugar</span>
            <h2 className="section-title" id="reservations-title">Asegura tu <span>Mesa</span> Hoy</h2>
            <div className="divider-line"></div>
            <p>
              Vive una experiencia gastronómica única. Reserva con anticipación y garantiza tu lugar en el paraíso del sabor marino.
            </p>

            <div className="info-items">
              {infoItems.map((item) => (
                <div className="info-item" key={item.title}>
                  <div className="info-icon" aria-hidden="true">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reservation-form-wrap reveal-right">
            <h3 className="form-title">Formulario de Reservación</h3>
            <p className="form-subtitle">Completa los datos y te confirmaremos en menos de 2 horas.</p>

            {!successData ? (
              <form id="reservationForm" onSubmit={handleSubmit} noValidate aria-label="Formulario para reservar mesa">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-name">👤 Nombre completo <span aria-hidden="true" style={{ color: '#e05252' }}>*</span></label>
                    <input type="text" id="res-name" name="name" placeholder="Ej. María García" autoComplete="name" value={formData.name} onChange={handleFieldChange} required />
                    <span className={`field-error ${errors.name ? 'show' : ''}`} role="alert">{errors.name}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-phone">📞 Teléfono <span aria-hidden="true" style={{ color: '#e05252' }}>*</span></label>
                    <input type="tel" id="res-phone" name="phone" placeholder="Ej. 312 555 0199" autoComplete="tel" value={formData.phone} onChange={handleFieldChange} required />
                    <span className={`field-error ${errors.phone ? 'show' : ''}`} role="alert">{errors.phone}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="res-email">📧 Correo electrónico <span className="label-hint">(recibirás tu confirmación aquí)</span></label>
                  <input type="email" id="res-email" name="email" placeholder="tucorreo@ejemplo.com" autoComplete="email" value={formData.email} onChange={handleFieldChange} />
                  <span className={`field-error ${errors.email ? 'show' : ''}`} role="alert">{errors.email}</span>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-date">📅 Fecha <span aria-hidden="true" style={{ color: '#e05252' }}>*</span></label>
                    <input type="date" id="res-date" name="date" min={minDate} value={formData.date} onChange={handleFieldChange} required />
                    <span className={`field-error ${errors.date ? 'show' : ''}`} role="alert">{errors.date}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-time">🕐 Horario <span aria-hidden="true" style={{ color: '#e05252' }}>*</span></label>
                    <select id="res-time" name="time" value={formData.time} onChange={handleFieldChange} required>
                      <option value="">Selecciona horario</option>
                      {['12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'].map((hour) => (
                        <option key={hour} value={hour}>{hour === '12:00' ? '12:00 pm' : `${parseInt(hour, 10) - (parseInt(hour, 10) > 12 ? 12 : 0)}:00 pm`}</option>
                      ))}
                    </select>
                    <span className={`field-error ${errors.time ? 'show' : ''}`} role="alert">{errors.time}</span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-guests">👥 Personas <span aria-hidden="true" style={{ color: '#e05252' }}>*</span></label>
                    <select id="res-guests" name="guests" value={formData.guests} onChange={handleFieldChange} required>
                      <option value="">¿Cuántos son?</option>
                      {['1 persona','2 personas','3 personas','4 personas','5 personas','6 personas','7-10 personas','Más de 10 personas'].map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <span className={`field-error ${errors.guests ? 'show' : ''}`} role="alert">{errors.guests}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-zone">🪑 Zona preferida</label>
                    <select id="res-zone" name="zone" value={formData.zone} onChange={handleFieldChange}>
                      <option value="">Sin preferencia</option>
                      <option value="Interior">Interior (aire acondicionado)</option>
                      <option value="Terraza">Terraza (vista al mar)</option>
                      <option value="Barra">Barra del bar</option>
                      <option value="Privado">Salón privado</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="res-notes">📝 Notas especiales</label>
                  <textarea id="res-notes" name="notes" placeholder="Alergias, festejo especial, peticiones…" value={formData.notes} onChange={handleFieldChange}></textarea>
                </div>

                <button type="submit" className="submit-btn" aria-label="Enviar reservación" disabled={submitting}>
                  <span aria-hidden="true">{submitting ? '⏳' : '🦞'}</span> {submitting ? 'Enviando…' : 'Confirmar Reservación'}
                </button>
              </form>
            ) : (
              <div className="success-msg show" role="status" aria-live="polite">
                <div className="success-icon" aria-hidden="true">🎉</div>
                <h3>¡Reservación Exitosa!</h3>
                <p>Hemos recibido tu solicitud. Te confirmaremos dentro de las próximas 2 horas.</p>
                <div className="success-details" id="success-details" aria-label="Detalles de la reservación">
                  <p>👤 <strong>Nombre:</strong> {successData.name}</p>
                  <p>📅 <strong>Fecha:</strong> {successData.date}</p>
                  <p>🕐 <strong>Hora:</strong> {successData.time}</p>
                  <p>👥 <strong>Personas:</strong> {successData.guests}</p>
                  {successData.zone ? <p>🪑 <strong>Zona:</strong> {successData.zone}</p> : null}
                  {successData.email ? <p>📧 <strong>Confirmación enviada a:</strong> {successData.email}</p> : null}
                </div>
                <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setSuccessData(null)}>
                  <span aria-hidden="true">📅</span> Nueva Reservación
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C360,0 1080,80 1440,0 L1440,0 L0,0 Z" fill="#0b2535"></path>
        </svg>
      </div>

      <footer role="contentinfo">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">
              <span className="logo-icon" aria-hidden="true">🦞</span>
              La Perla del <span>Mar</span>
            </div>
            <p>
              El mejor restaurante de mariscos de la ciudad, donde cada visita es una experiencia inolvidable llena de sabor y frescura del océano.
            </p>
            <div className="social-links" role="list" aria-label="Redes sociales">
              {socialLinks.map((social) => (
                <div className="social-link" role="listitem" tabIndex={0} aria-label={social.label} title={social.label} key={social.label}>
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Navegación</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Menú Destacado</h4>
            <ul>
              {featuredMenu.map((item) => (
                <li key={item}><a href="#menu">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contáctanos</h4>
            <div className="footer-contact-item"><span className="icon" aria-hidden="true">📍</span><p>Av. del Litoral 456, Col. Marina, Ciudad del Mar</p></div>
            <div className="footer-contact-item"><span className="icon" aria-hidden="true">📞</span><p>+52 (312) 555-0199</p></div>
            <div className="footer-contact-item"><span className="icon" aria-hidden="true">📧</span><p>reservas@laperladelmar.mx</p></div>
            <div className="footer-contact-item"><span className="icon" aria-hidden="true">🕐</span><p>Lun–Dom · 12:00–22:00 hrs</p></div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 La Perla del Mar · Todos los derechos reservados · Hecho con <span>❤️</span> y mucho sabor 🌊</p>
        </div>
      </footer>

      <button
        id="backToTop"
        className={showBackToTop ? 'visible' : ''}
        type="button"
        aria-label="Volver arriba"
        title="Volver al inicio"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </>
  );
}
