// =============================
// DREVON WOODEN TOYS - JS
// Premium interactions + slideshow system
// =============================


/* =============================
   1. SMOOTH SCROLL NAVIGATION
============================= */
document.querySelectorAll('.toys-nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

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


/* =============================
   2. NAVBAR SCROLL EFFECT
============================= */
const navbar = document.querySelector('.toys-navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
    navbar.style.background = "#ffffff";
  } else {
    navbar.style.boxShadow = "none";
  }
});


/* =============================
   3. SCROLL REVEAL ANIMATION
============================= */
const revealElements = document.querySelectorAll(
  '.collection-card, .story-container'
);

// initial state
revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease-out";
});

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


/* =============================
   4. HERO BUTTON FEEDBACK
============================= */
const heroBtn = document.querySelector('.toys-btn');

if (heroBtn) {
  heroBtn.addEventListener('click', () => {
    heroBtn.style.transform = "scale(0.95)";

    setTimeout(() => {
      heroBtn.style.transform = "scale(1)";
    }, 150);
  });
}


/* =============================
   5. HERO SLIDESHOW (NEW)
============================= */
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// show slide function
function showSlide(index) {

  slides.forEach(slide => {

    slide.classList.remove("active");

    // pause videos when hidden
    if (slide.tagName === "VIDEO") {
      slide.pause();
    }

  });

  slides[index].classList.add("active");

  autoSlide();
}

// next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// auto slideshow (5 seconds)
/* =============================
   SMART AUTO SLIDESHOW
============================= */

let slideTimeout;

// auto slide handler
function autoSlide() {

  clearTimeout(slideTimeout);

  const currentElement = slides[currentSlide];

  // IF CURRENT SLIDE IS VIDEO
  if (currentElement.tagName === "VIDEO") {

    currentElement.currentTime = 0;
    currentElement.play();

    currentElement.onended = () => {
      nextSlide();
    };

  } else {

    // IMAGE = normal 5 second delay
    slideTimeout = setTimeout(() => {
      nextSlide();
    }, 5000);

  }
}

// expose functions to HTML buttons
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
// start slideshow
showSlide(currentSlide);
/* =============================
   VIDEO SOUND CONTROL
============================= */

function toggleSound() {

  const video = document.getElementById("heroVideo");

  if (video.muted) {

    video.muted = false;

  } else {

    video.muted = true;

  }
}
