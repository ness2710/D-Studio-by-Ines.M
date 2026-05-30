/* ══ CANVAS PARTICULES ══ */
const C = document.getElementById('cvs');
if (C) {
  const cx = C.getContext('2d');
  C.width = window.innerWidth; C.height = window.innerHeight;
  window.addEventListener('resize', () => { C.width = window.innerWidth; C.height = window.innerHeight; });
  let MX = innerWidth / 2, MY = innerHeight / 2;
  document.addEventListener('mousemove', e => { MX = e.clientX; MY = e.clientY; });
  const P = Array.from({ length: 80 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
    r: Math.random() * 1.4 + .2, a: Math.random() * .25 + .04
  }));
  function drawP() {
    cx.clearRect(0, 0, C.width, C.height);
    P.forEach(p => {
      const dx = MX - p.x, dy = MY - p.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 200) { p.vx += dx / d * .03; p.vy += dy / d * .03; }
      p.vx *= .97; p.vy *= .97;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = C.width; if (p.x > C.width) p.x = 0;
      if (p.y < 0) p.y = C.height; if (p.y > C.height) p.y = 0;
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fillStyle = `rgba(245,245,240,${p.a})`; cx.fill();
    });
    const g = cx.createRadialGradient(MX, MY, 0, MX, MY, 80);
    g.addColorStop(0, 'rgba(245,245,240,.05)'); g.addColorStop(1, 'rgba(245,245,240,0)');
    cx.beginPath(); cx.arc(MX, MY, 80, 0, Math.PI * 2); cx.fillStyle = g; cx.fill();
    requestAnimationFrame(drawP);
  }
  drawP();
}

/* ══ CURSEUR ══ */
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
if (cur && ring) {
  let rx = 0, ry = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    cur.style.left = tx + 'px'; cur.style.top = ty + 'px';
  });
  (function lc() {
    rx += (tx - rx) * .11; ry += (ty - ry) * .11;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(lc);
  })();
}

/* ══ INTRO (index.html uniquement) ══ */
const intro = document.getElementById('intro');
if (intro) {
  window.addEventListener('load', () => {
    setTimeout(() => intro.classList.add('reveal'), 80);
    setTimeout(() => {
      intro.classList.add('gone');
      const hdr = document.getElementById('hdr');
      if (hdr) hdr.classList.add('show');
      ['gl1', 'gl2', 'gl3'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) setTimeout(() => el.classList.add('vis'), i * 100);
      });
      initObs();
    }, 2600);
  });
} else {
  /* pages projet : header visible direct */
  document.addEventListener('DOMContentLoaded', () => {
    const hdr = document.getElementById('hdr');
    if (hdr) hdr.classList.add('show');
    initObs();
  });
}

/* ══ NAVIGATION (index.html) ══ */
function goPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  const pg = document.getElementById('pg-' + id);
  if (pg) { pg.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  const n = document.getElementById('n-' + id);
  if (n) n.classList.add('active');
  setTimeout(initObs, 100);
  return false;
}

/* ══ GALERIE FILTRE ══ */
function filterGal(cat) {
  document.querySelectorAll('.gfbtn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-cat="${cat}"]`);
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.gitem').forEach(item => {
    item.classList.toggle('hidden', cat !== 'all' && item.dataset.cat !== cat);
  });
}

/* ══ LIGHTBOX ══ */
const ALL_IMGS = [
  'kairouan.jpg', 'musée.jpg', 'mars.PNG', 'hajji.jpg', 'casa.JPG',
  'jian.jpg', 'amour.jpg', 'mecca.jpg', 'china.JPG', 'shanghai.JPG',
  'zaha hadid.JPG', 'sancaklar.jpg', 'citernes.JPG', 'cimetiere it.jpg', 'maroc.jpg'
];
let lbIdx = 0;
function openLB(i) {
  lbIdx = i;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  if (!lb || !img) return;
  img.src = ALL_IMGS[i];
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  const visible = ALL_IMGS.filter((_, i) => {
    const el = document.querySelectorAll('.gitem')[i];
    return el && !el.classList.contains('hidden');
  });
  const visIdx = visible.indexOf(ALL_IMGS[lbIdx]);
  const newVisIdx = (visIdx + dir + visible.length) % visible.length;
  lbIdx = ALL_IMGS.indexOf(visible[newVisIdx]);
  const img = document.getElementById('lb-img');
  if (!img) return;
  img.style.opacity = '0';
  setTimeout(() => { img.src = visible[newVisIdx]; img.style.opacity = '1'; }, 180);
}
document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  if (lb) lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  if (lbImg) lbImg.style.transition = 'opacity .18s';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

/* ══ ACCORDION TRAVAUX EXTRA ══ */
function togX(head) {
  const row = head.parentElement;
  const open = row.classList.contains('open');
  document.querySelectorAll('.xrow').forEach(r => r.classList.remove('open'));
  if (!open) row.classList.add('open');
}

document.querySelectorAll('.xinner img').forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    lbImg.src = img.src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

/* ══ INTERSECTION OBSERVER ══ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: .06 });
function initObs() {
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══ BACK TO TOP ══ */
window.addEventListener('scroll', () => {
  const btt = document.getElementById('btt');
  if (btt) btt.classList.toggle('on', scrollY > 300);
});


document.querySelectorAll('.pg-full img, .pg-2 img, .pg-3 img').forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    lbImg.src = img.src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});