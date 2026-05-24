/* =========================================================
   DREVON GROUP - MAIN JAVASCRIPT FILE
   ========================================================= */


/* =========================================================
   HOMEPAGE CINEMATIC SLIDER
   ========================================================= */

/*
  This section controls:
  - image/video slideshow
  - next/previous navigation
  - automatic transitions
  - video autoplay handling

  Runs ONLY if slider elements exist.
*/

const slides = document.querySelectorAll(".slide");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

let slideTimeout;


/* ---------------------------------------------------------
   INITIALIZE SLIDER SAFELY
--------------------------------------------------------- */

if (slides.length > 0 && nextBtn && prevBtn) {

  /* -------------------------------------------------------
     SHOW ACTIVE SLIDE
  ------------------------------------------------------- */

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

    const activeVideo =
      activeSlide.querySelector("video");


    /* -----------------------------------------------------
       VIDEO SLIDE HANDLING
    ----------------------------------------------------- */

    if (activeVideo) {

      activeVideo.play();

      activeVideo.onended = () => {

        nextSlide();

      };

    }


    /* -----------------------------------------------------
       IMAGE SLIDE AUTO TRANSITION
    ----------------------------------------------------- */

    else {

      slideTimeout = setTimeout(() => {

        nextSlide();

      }, 5000);

    }

  }


  /* -------------------------------------------------------
     NEXT SLIDE
  ------------------------------------------------------- */

  function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

      currentSlide = 0;

    }

    showSlide(currentSlide);

  }


  /* -------------------------------------------------------
     PREVIOUS SLIDE
  ------------------------------------------------------- */

  function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {

      currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

  }


  /* -------------------------------------------------------
     BUTTON EVENTS
  ------------------------------------------------------- */

  nextBtn.addEventListener("click", () => {

    nextSlide();

  });

  prevBtn.addEventListener("click", () => {

    prevSlide();

  });


  /* -------------------------------------------------------
     INITIAL SLIDER LOAD
  ------------------------------------------------------- */

  showSlide(currentSlide);

}



/* =========================================================
   BUSINESS ENQUIRY PAGE
   ========================================================= */

/*
  Future enquiry form logic will go here.

  Example:
  - form validation
  - dropdown handling
  - conditional fields
  - form submission
  - email integration
  - WhatsApp integration

  IMPORTANT:
  Keep all enquiry-related JS inside this section only.
*/



/* =========================================================
   FUTURE GLOBAL WEBSITE FEATURES
   ========================================================= */

/*
  Future reusable site-wide features can go here.

  Example:
  - dark/light mode
  - mobile menu
  - scroll animations
  - counters
  - notifications
  - reusable modals
*/
