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
            if (e.target.closest('.product-btn')) return;

            const innerHTML = this.innerHTML;
            
            // 1. Get the background image URL directly from the style attribute
            const bgStyle = this.getAttribute('style');
            let bgImage = '';
            if (bgStyle && bgStyle.includes('url')) {
                // Extracts the URL part from the inline style
                bgImage = bgStyle.match(/url\(['"]?([^'"]+)['"]?\)/)[1];
            }

            // 2. Inject
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = innerHTML;
            const btn = tempDiv.querySelector('.product-btn');
            if(btn) btn.remove();

            modalBody.innerHTML = `
                <div class="modal-injected-bg" style="background-image: url('${bgImage}');"></div>
                <div style="position: relative; z-index: 1;">
                    ${tempDiv.innerHTML}
                </div>
            `;

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
