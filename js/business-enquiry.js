/* =========================================================
   BUSINESS ENQUIRY PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. SCROLL ANIMATIONS (Intersection Observer)
  --------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });


  /* ---------------------------------------------------------
     2. AJAX FORM SUBMISSION (Web3Forms) & UI HANDLING
  --------------------------------------------------------- */
  const enquiryForm = document.getElementById("businessEnquiryForm");
  const formStatusMessage = document.querySelector(".form-status-message");
  const whatsappFollowupBtn = document.querySelector(".whatsapp-followup-btn");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Stop standard redirect

      /* --- Update Button UI --- */
      const btnText = enquiryForm.querySelector(".enquiry-submit-btn span");
      const icon = enquiryForm.querySelector(".enquiry-submit-btn i");
      
      if (btnText && icon) {
        btnText.innerText = "Sending Enquiry...";
        icon.className = "fa-solid fa-spinner fa-spin";
      }

      if (formStatusMessage) {
        formStatusMessage.textContent = "Submitting your enquiry...";
      }

      /* --- Fetch Data --- */
      const formData = new FormData(enquiryForm);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        /* --- Success Handling --- */
        if (result.success) {
          if (formStatusMessage) {
            formStatusMessage.textContent = "Business enquiry submitted successfully.";
          }
          
          enquiryForm.reset();
          
          if (btnText && icon) {
            btnText.innerText = "Enquiry Sent";
            icon.className = "fa-solid fa-check";
          }
          
          /* Show WhatsApp Follow-up Button */
          if (whatsappFollowupBtn) {
            whatsappFollowupBtn.style.display = "inline-block";
          }
        } 
        
        /* --- Error Handling --- */
        else {
          if (formStatusMessage) {
            formStatusMessage.textContent = "Something went wrong. Please try again.";
          }
          if (btnText && icon) {
            btnText.innerText = "Submit Enquiry";
            icon.className = "fa-solid fa-arrow-right";
          }
        }

      } catch (error) {
        if (formStatusMessage) {
          formStatusMessage.textContent = "Network error. Please try again later.";
        }
        if (btnText && icon) {
          btnText.innerText = "Submit Enquiry";
          icon.className = "fa-solid fa-arrow-right";
        }
      }
    });
  }
});
