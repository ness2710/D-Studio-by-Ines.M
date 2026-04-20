function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  const nav = document.getElementById('nav-' + id);
  if (nav) nav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backTop');
  if (window.scrollY > 200) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

function toggleCreation(id) {
  const content = document.getElementById(id);

  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}