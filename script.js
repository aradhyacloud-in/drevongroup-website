/* =========================================================
   DREVON GROUP - CORE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* --- 1. GLOBAL SCROLL REVEAL ANIMATIONS --- */
  const revealElements = document.querySelectorAll(".fade-up");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a slight delay based on index for staggered grid loading
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 100); 
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 2. CINEMATIC SLIDER & VIDEO AUDIO LOGIC --- */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const heroVideo = document.getElementById("heroVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");
  const sliderSection = document.querySelector(".slider-section");

  let currentSlide = 0;
  let slideInterval;
  let isSliderVisible = true;

  // Video Audio Toggle (Browsers require user interaction to unmute)
  if (unmuteBtn && heroVideo) {
    unmuteBtn.addEventListener("click", () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        unmuteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Mute Sound';
      } else {
        heroVideo.muted = true;
        unmuteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Unmute Experience';
      }
    });
  }

  // Smart Visibility (Pause video when scrolled out of view)
  if (sliderSection && heroVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isSliderVisible = entry.isIntersecting;
        if (isSliderVisible && slides[currentSlide].classList.contains('video-slide')) {
          heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.2 });
    videoObserver.observe(sliderSection);
  }

  // Slider Logic
  if (slides.length > 0 && nextBtn && prevBtn) {
    function showSlide(index) {
      clearInterval(slideInterval);

      slides.forEach((slide) => {
        slide.classList.remove("active");
        const video = slide.querySelector("video");
        if (video) {
          video.currentTime = 0;
        }
      });

      currentSlide = index;
      const activeSlide = slides[currentSlide];
      activeSlide.classList.add("active");

      if (activeSlide.classList.contains('video-slide') && isSliderVisible && heroVideo) {
        heroVideo.play().catch(() => {});
        // Move to next slide when video ends naturally
        heroVideo.onended = () => nextSlide();
      } else {
        // Change image slide every 6 seconds
        slideInterval = setInterval(nextSlide, 6000);
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) >= slides.length ? 0 : currentSlide + 1;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1) < 0 ? slides.length - 1 : currentSlide - 1;
      showSlide(currentSlide);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    showSlide(currentSlide);
  }

 
