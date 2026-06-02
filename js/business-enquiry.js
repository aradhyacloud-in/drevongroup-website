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

