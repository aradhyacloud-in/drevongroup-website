/* =========================================================
   DREVON GROUP - ENQUIRY PORTAL LOGIC
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* --- 1. PREMIUM SCROLL REVEAL --- */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 2. SECURE FORM SUBMISSION (Web3Forms) --- */
  const enquiryForm = document.getElementById("businessEnquiryForm");
  const formStatus = document.getElementById("formStatus");
  const whatsappBtn = document.querySelector(".whatsapp-followup-btn");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function (event) {
      event.preventDefault(); 

      const btnText = enquiryForm.querySelector(".enquiry-submit-btn span");
      const icon = enquiryForm.querySelector(".enquiry-submit-btn i");
      
      // Loading State
      if (btnText && icon) {
        btnText.innerText = "Transmitting...";
        icon.className = "fa-solid fa-spinner fa-spin";
      }
      formStatus.textContent = "Establishing secure connection...";
      formStatus.style.color = "#d4af37";

      const formData = new FormData(enquiryForm);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // Success State
          formStatus.textContent = "Requirement transmitted successfully. Our desk will contact you shortly.";
          formStatus.style.color = "#25D366"; // Green success
          enquiryForm.reset();
          
          if (btnText && icon) {
            btnText.innerText = "Transmission Complete";
            icon.className = "fa-solid fa-check";
          }
          if (whatsappBtn) {
            whatsappBtn.style.display = "inline-flex";
          }
        } else {
          // Failure State
          throw new Error("API Rejection");
        }
      } catch (error) {
        formStatus.textContent = "Transmission failed. Please ensure network stability or use direct contact methods.";
        formStatus.style.color = "#ff4444"; // Red error
        if (btnText && icon) {
          btnText.innerText = "Retry Transmission";
          icon.className = "fa-solid fa-rotate-right";
        }
      }
    });
  }
});
