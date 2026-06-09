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

// Global function to trigger the zoom from the button or card
    const populateModal = (cardElement) => {
        const innerHTML = cardElement.innerHTML;
        
        // 1. Get computed style
        const style = window.getComputedStyle(cardElement);
        const backgroundImage = style.backgroundImage;

        // 2. Extract the actual URL using Regex
        // This will find the path inside url("...") even if a gradient is present
        let bgUrl = '';
        const match = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (match) {
            bgUrl = match[1];
        }

        // 3. Clean content (remove the button)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = innerHTML;
        const btn = tempDiv.querySelector('.product-btn');
        if(btn) btn.remove();

        // 4. Inject into modal
        // We set the background-image directly using the extracted bgUrl
        modalBody.innerHTML = `
            <div class="modal-injected-bg" style="background-image: url('${bgUrl}'); background-size: cover; background-position: center;"></div>
            <div style="position: relative; z-index: 1;">
                ${tempDiv.innerHTML}
            </div>
        `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    // Global accessibility for your onclick buttons
    window.openZoomModal = (cardElement) => {
        populateModal(cardElement);
    };

    // Click listener for the card
    zoomCards.forEach(card => {
        card.addEventListener("click", function(e) {
            if (e.target.closest('.product-btn')) return;
            populateModal(this);
        });
    });
    
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
