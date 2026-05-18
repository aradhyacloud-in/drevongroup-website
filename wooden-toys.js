// =============================
// DREVON WOODEN TOYS - JS
// Basic interactions + future-ready enhancements
// =============================


// 1. SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('.toys-nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    // Only handle internal links like #collections
    if (targetId.startsWith('#')) {
      e.preventDefault();

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});


// 2. NAVBAR SHADOW ON SCROLL (premium feel)
const navbar = document.querySelector('.toys-navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
    navbar.style.background = "#ffffff";
  } else {
    navbar.style.boxShadow = "none";
  }
});


// 3. FADE-IN ANIMATION ON SCROLL (simple reveal effect)
const revealElements = document.querySelectorAll(
  '.collection-card, .story-container'
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease-out";
    }
  });
};

// initial state for animation
revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// 4. HERO BUTTON CLICK FEEDBACK (optional polish)
const heroBtn = document.querySelector('.toys-btn');

if (heroBtn) {
  heroBtn.addEventListener('click', () => {
    heroBtn.style.transform = "scale(0.95)";

    setTimeout(() => {
      heroBtn.style.transform = "scale(1)";
    }, 150);
  });
}
