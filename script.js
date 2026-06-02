/* =========================================================
   DREVON GROUP - HOMEPAGE CORE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. HIGH-END SCROLL REVEAL ANIMATIONS
     Uses a very subtle intersection observer for a premium feel
  --------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-fade");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { 
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Slight offset so it reveals right as it enters
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     2. CINEMATIC SLIDER LOGIC
  --------------------------------------------------------- */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const heroVideo = document.getElementById("heroVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");
  const sliderSection = document.querySelector(".cinematic-slider");

  let currentSlide = 0;
  let slideInterval;
  let isSliderVisible = true;

  // Sound Toggle Logic (Custom UI for browser autoplay policies)
  if (unmuteBtn && heroVideo) {
    unmuteBtn.addEventListener("click", () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        unmuteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Mute';
      } else {
        heroVideo.muted = true;
        unmuteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Sound';
      }
    });
  }

  // Smart Observer to pause video when user scrolls past the slider
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

  // Core Slider Function
  if (slides.length > 0 && nextBtn && prevBtn) {
    function showSlide(index) {
      clearInterval(slideInterval);

      // Reset all slides
      slides.forEach((slide) => {
        slide.classList.remove("active");
        const video = slide.querySelector("video");
        if (video) {
          video.currentTime = 0; // Reset video to start
        }
      });

      // Activate current slide
      currentSlide = index;
      const activeSlide = slides[currentSlide];
      activeSlide.classList.add("active");

      // Handle Video vs Image Slides
      if (activeSlide.classList.contains('video-slide') && isSliderVisible && heroVideo) {
        heroVideo.play().catch(() => {});
        heroVideo.onended = () => nextSlide();
      } else {
        // Hold image slides for 6.5 seconds
        slideInterval = setInterval(nextSlide, 6500); 
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

    // Initialize first slide on load
    showSlide(currentSlide);
  }
});
