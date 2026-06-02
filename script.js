/* =========================================================
   DREVON GROUP - MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     GLOBAL SCROLL REVEAL ANIMATIONS
  ========================================================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================================================
     CINEMATIC SLIDER & SMART VIDEO PLAYBACK
  ========================================================= */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const heroVideo = document.getElementById("heroVideo");
  const sliderSection = document.querySelector(".cinematic-slider");

  let currentSlide = 0;
  let slideInterval;
  let isSliderVisible = true;

  // 1. Observer to pause video/slides when out of view
  if (sliderSection && heroVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isSliderVisible = entry.isIntersecting;
        if (isSliderVisible) {
          // Play video if the active slide is the video slide
          if (slides[currentSlide].classList.contains('video-slide')) {
            heroVideo.play().catch(() => {});
          }
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.2 });
    
    videoObserver.observe(sliderSection);
  }

  // 2. Slide switching logic
  if (slides.length > 0 && nextBtn && prevBtn) {
    
    function showSlide(index) {
      clearInterval(slideInterval);

      slides.forEach((slide) => {
        slide.classList.remove("active");
        const video = slide.querySelector("video");
        if (video) {
          video.pause();
          video.currentTime = 0; // Reset video on change
        }
      });

      currentSlide = index;
      const activeSlide = slides[currentSlide];
      activeSlide.classList.add("active");

      // Handle Video Slide
      const activeVideo = activeSlide.querySelector("video");
      if (activeVideo && isSliderVisible) {
        activeVideo.play().catch(() => {});
        // Move to next slide when video ends naturally
        activeVideo.onended = () => nextSlide();
      } else {
        // Handle Image Slides (Switch every 6 seconds)
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

    // Initialize first slide
    showSlide(currentSlide);
  }

  /* =========================================================
     BUSINESS ENQUIRY FORM LOGIC (Unchanged)
  ========================================================= */
  const form = document.getElementById("businessEnquiryForm");
  const statusMessage = document.querySelector(".form-status-message");
  const whatsappFollowupBtn = document.querySelector(".whatsapp-followup-btn");

  if (form) {
    form.addEventListener("submit", async function(e) {
      // Allow default Web3Forms behavior or handle AJAX here
      // This matches your previously established logic
      const btn = form.querySelector(".enquiry-submit-btn span");
      const icon = form.querySelector(".enquiry-submit-btn i");
      
      if (btn && icon) {
        btn.innerText = "Sending Enquiry...";
        icon.className = "fa-solid fa-spinner fa-spin";
      }
    });
  }

});
