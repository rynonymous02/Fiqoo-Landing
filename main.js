/* ==============================
   FIQOO — Shared JavaScript
   ============================== */

// ── Scroll Reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Counter Animation (index only) ─────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const steps = 60;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    const eased = 1 - (1 - progress) * (1 - progress);
    el.textContent = Math.round(eased * target) + suffix;
    if (step >= steps) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, duration / steps);
}

const statsEl = document.querySelector('.stats');
if (statsEl) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.counter').forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0 });
  statsObserver.observe(statsEl);
}

// ── Rive Character Animation (index only) ──────────────────────
window.addEventListener('load', function () {
  const canvas = document.getElementById('rive-char-canvas');
  if (!canvas) return;
  const RiveLib = window.rive || window.Rive;
  if (!RiveLib) { console.warn('Rive library not loaded'); return; }
  const r = new RiveLib.Rive({
    src: 'images/char-01.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'SplashAnim',
    layout: new RiveLib.Layout({
      fit: RiveLib.Fit.Contain,
      alignment: RiveLib.Alignment.BottomCenter,
    }),
    onLoad: () => { r.resizeDrawingSurfaceToCanvas(); }
  });
});

// ── Active Nav Link ─────────────────────────────────────────────
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });
})();

// ── Materi Tab Filter (materi-pembelajaran.html only) ──────────
const tabs = document.querySelectorAll('.materi-tab');
if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('.materi-card').forEach(card => {
        if (filter === 'semua' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}