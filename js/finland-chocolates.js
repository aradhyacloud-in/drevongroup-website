document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SCROLL REVEAL ANIMATIONS ---
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

    // --- 2. PREMIUM ZOOM MODAL LOGIC ---
    const modal = document.getElementById("premiumZoomModal");
    const modalBody = document.getElementById("zoomModalBody");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalOverlay = document.querySelector(".zoom-modal-overlay");
    const zoomCards = document.querySelectorAll(".zoom-card");

    zoomCards.forEach(card => {
        card.addEventListener("click", function(e) {
            // Prevent modal from opening if user clicked a direct link inside the card
            if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
                // Remove the return statement if you want the button to ALSO open the modal
                // Currently, clicking the button inside the card triggers the modal perfectly
            }

            // Extract content and background image from the clicked card
            const innerHTML = this.innerHTML;
            const bgImage = this.style.backgroundImage;

            // Inject content into modal. Apply background as a subtle overlay
            if (bgImage && bgImage !== 'none') {
                modalBody.innerHTML = `<div class="modal-injected-bg" style="background-image: ${bgImage};"></div> ${innerHTML}`;
            } else {
                modalBody.innerHTML = innerHTML;
            }

            // Hide the button inside the modal to keep it clean
            const btnInModal = modalBody.querySelector('.product-btn');
            if(btnInModal) btnInModal.style.display = 'none';

            // Show Modal & lock page scrolling
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
        // Clear content after animation finishes
        setTimeout(() => { modalBody.innerHTML = ''; }, 400);
    };

    // Close Events
    closeModalBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});
