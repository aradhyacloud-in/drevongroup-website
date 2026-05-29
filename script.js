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
  Handles:
  - AJAX form submission
  - success/error messages
  - keeps users on website
*/

const enquiryForm =
  document.getElementById("businessEnquiryForm");

const formStatusMessage =
  document.querySelector(".form-status-message");
const whatsappFollowupBtn =
  document.querySelector(".whatsapp-followup-btn");


/* ---------------------------------------------------------
   AJAX FORM SUBMISSION
--------------------------------------------------------- */

if (enquiryForm) {

  enquiryForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    formStatusMessage.textContent =
      "Submitting your enquiry...";


    /* -----------------------------------------------------
       FORM DATA
    ----------------------------------------------------- */

    const formData = new FormData(enquiryForm);


    /* -----------------------------------------------------
       SEND DATA TO WEB3FORMS
    ----------------------------------------------------- */

    try {

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();


      /* ---------------------------------------------------
         SUCCESS
      --------------------------------------------------- */

     if (result.success) {

        formStatusMessage.textContent =
          "Business enquiry submitted successfully.";
      
        enquiryForm.reset();
      
      
        /* SHOW WHATSAPP BUTTON */
      
        if (whatsappFollowupBtn) {
      
          whatsappFollowupBtn.style.display =
            "inline-block";
      
        }
      
      }

      /* ---------------------------------------------------
         ERROR
      --------------------------------------------------- */

      else {

        formStatusMessage.textContent =
          "Something went wrong. Please try again.";

      }

    }


    /* -----------------------------------------------------
       NETWORK ERROR
    ----------------------------------------------------- */

    catch (error) {

      formStatusMessage.textContent =
        "Network error. Please try again later.";

    }

  });

}



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
