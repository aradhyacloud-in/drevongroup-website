/* =========================================================
   DREVON GROUP - MAIN JAVASCRIPT FILE
   ========================================================= */


/* =========================================================
   HOMEPAGE CINEMATIC SLIDER
   ========================================================= */

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;
let slideTimeout;

if (slides.length > 0 && nextBtn && prevBtn) {

  function showSlide(index) {

    clearTimeout(slideTimeout);

    slides.forEach((slide) => {

      slide.classList.remove("active");

      const video = slide.querySelector("video");

      if (video) {

        video.pause();

        video.currentTime = 0;

      }

    });

    currentSlide = index;

    const activeSlide = slides[currentSlide];

    activeSlide.classList.add("active");

    const activeVideo =
      activeSlide.querySelector("video");

    /* VIDEO SLIDE */

    if (activeVideo) {

      activeVideo.loop = false;

      activeVideo.play().catch(() => {});

      activeVideo.onended = () => {

        nextSlide();

      };

    }

    /* IMAGE SLIDES */

    else {

      slideTimeout = setTimeout(() => {

        nextSlide();

      }, 5000);

    }

  }

  /* NEXT */

  function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

      currentSlide = 0;

    }

    showSlide(currentSlide);

  }

  /* PREVIOUS */

  function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {

      currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

  }

  /* BUTTONS */

  nextBtn.addEventListener("click", () => {

    nextSlide();

  });

  prevBtn.addEventListener("click", () => {

    prevSlide();

  });

  /* INITIAL LOAD */

  showSlide(currentSlide);

}


/* =========================================================
   VIDEO CLICK TO ENABLE SOUND ONCE
   ========================================================= */

const heroVideo =
  document.getElementById("heroVideo");

if (heroVideo) {

  heroVideo.addEventListener("click", () => {

    heroVideo.muted = false;
    heroVideo.volume = 1;

    localStorage.setItem(
      "drevonVideoAudio",
      "enabled"
    );

  });

  heroVideo.addEventListener("ended", () => {

    heroVideo.muted = true;

    localStorage.removeItem(
      "drevonVideoAudio"
    );

  });

}


/


/* =========================================================
   PREMIUM SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
  ".section, .product-card"
);

const revealOnScroll = () => {

  revealElements.forEach((element) => {

    const windowHeight = window.innerHeight;

    const revealTop =
      element.getBoundingClientRect().top;

    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {

      element.classList.add("reveal", "active");

    }

  });

};

window.addEventListener(
  "scroll",
  revealOnScroll
);

revealOnScroll();
