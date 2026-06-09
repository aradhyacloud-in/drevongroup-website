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

    // Helper to process modal injection
    const populateModal = (cardElement) => {
        const innerHTML = cardElement.innerHTML;
        
        // Extracting image URL from the background-image property
        // This handles both inline styles and CSS classes correctly
        const bgImage = window.getComputedStyle(cardElement).backgroundImage;
        
        // Clean content for modal (removes button)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = innerHTML;
        const btn = tempDiv.querySelector('.product-btn');
        if(btn) btn.remove();

        // Inject content
        // bgImage is already a 'url(...)' string, so we use it directly
        modalBody.innerHTML = `
            <div class="modal-injected-bg" style="background-image: ${bgImage};"></div>
            <div style="position: relative; z-index: 1;">
                ${tempDiv.innerHTML}
            </div>
        `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    // Global function for onclick="openZoomModal(this.closest('.product-card'))"
    window.openZoomModal = (cardElement) => {
        populateModal(cardElement);
    };

    // Click listener for the card itself
    zoomCards.forEach(card => {
        card.addEventListener("click", function(e) {
            if (e.target.closest('.product-btn')) return;
            populateModal(this);
        });
    });

    // --- 3. CLOSE MODAL LOGIC ---
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
