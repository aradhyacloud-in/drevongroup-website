document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll(".reveal");
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 2. PREMIUM ZOOM MODAL LOGIC ---
    const modal = document.getElementById("premiumZoomModal");
    const modalBody = document.getElementById("zoomModalBody");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalOverlay = document.querySelector(".zoom-modal-overlay");
    const zoomCards = document.querySelectorAll(".zoom-card");

    zoomCards.forEach(card => {
        card.addEventListener("click", function(e) {
            // FIX: If the user clicked the button, let the default link behavior happen
            if (e.target.closest('.product-btn')) {
                return; 
            }

            // Extract content and background image
            const innerHTML = this.innerHTML;
            const bgImage = window.getComputedStyle(this).backgroundImage;

            // Prepare Modal Content
            // We use a temporary div to strip the button out of the modal view
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = innerHTML;
            const btn = tempDiv.querySelector('.product-btn');
            if(btn) btn.remove();

            // Inject background and clean content
            modalBody.innerHTML = `
                <div class="modal-injected-bg" style="background-image: ${bgImage};"></div>
                <div style="position: relative; z-index: 1;">
                    ${tempDiv.innerHTML}
                </div>
            `;

            // Show Modal & lock page scrolling
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
        setTimeout(() => { modalBody.innerHTML = ''; }, 400);
    };

    closeModalBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});
