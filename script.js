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

/* =========================================================
   BUSINESS ENQUIRY PAGE
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SCROLL ANIMATIONS (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // --- 2. FORM SUBMISSION HANDLING (Optional UI Enhancement) ---
  const form = document.getElementById("businessEnquiryForm");
  const statusMessage = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function(e) {
      // Allow Web3Forms to do its default action if you aren't doing AJAX,
      // but you can change button text to indicate loading:
      const btn = form.querySelector(".enquiry-submit-btn span");
      const icon = form.querySelector(".enquiry-submit-btn i");
      
      btn.innerText = "Sending Enquiry...";
      icon.className = "fa-solid fa-spinner fa-spin";
      
      // The form will continue to submit to Web3Forms automatically 
      // based on your hidden access_key input.
    });
  }
});
