const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;
let slideTimeout;

/* SHOW SLIDE */
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

  const activeSlide = slides[index];

  activeSlide.classList.add("active");

  const activeVideo = activeSlide.querySelector("video");

  /* VIDEO SLIDE */
  if (activeVideo) {

    activeVideo.play();

    activeVideo.onended = () => {
      nextSlide();
    };

  }

  /* IMAGE SLIDE */
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
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

/* INITIAL LOAD */
showSlide(currentSlide);

/* =========================
   VIDEO PAUSE WHEN OFFSCREEN
========================= */

const sliderSection = document.getElementById("sliderSection");

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    const activeSlide = slides[currentSlide];

    const activeVideo = activeSlide.querySelector("video");

    if (activeVideo) {

      if (entry.isIntersecting) {

        activeVideo.play();

      } else {

        activeVideo.pause();

      }

    }

  });

}, {
  threshold: 0.4
});

/* OBSERVE */
observer.observe(sliderSection);
