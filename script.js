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
                return; 
            }

            // Extract content and background image from the clicked card
            const innerHTML = this.innerHTML;
            const rawBg = this.style.backgroundImage;

            // Inject content into modal.
            if (rawBg && rawBg !== 'none') {
                // IMPORTANT FIX: Extract JUST the image URL so we can strip away the dark gradient
                const urlMatch = rawBg.match(/url\(['"]?(.*?)['"]?\)/);
                const imageUrl = urlMatch ? urlMatch[0] : '';

                // Apply a softer, cinematic gradient specifically for the modal so the image pops!
                const modalBg = `linear-gradient(rgba(10, 11, 13, 0.2), rgba(10, 11, 13, 0.95)), ${imageUrl}`;
                
                modalBody.innerHTML = `<div class="modal-injected-bg" style="background-image: ${modalBg};"></div> ${innerHTML}`;
            } else {
                modalBody.innerHTML = innerHTML;
            }

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

    // Close when clicking X button
    closeModalBtn.addEventListener("click", closeModal);

    // Close when clicking the dark overlay background
    modalOverlay.addEventListener("click", closeModal);

    // Close when hitting Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});
