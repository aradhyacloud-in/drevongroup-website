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

    // --- CHOCOLATE GALLERY SLIDER LOGIC ---
    const track = document.querySelector('.slider-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    
    // Only execute if the slider actually exists on the page
    if (track && nextButton && prevButton) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const updateSliderPosition = (index) => {
            // Move the track sideways based on the index (0%, 100%, 200%, etc.)
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            if (currentIndex === slides.length - 1) {
                currentIndex = 0; // Loop back to start
            } else {
                currentIndex++; // Move to next
            }
            updateSliderPosition(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex === 0) {
                currentIndex = slides.length - 1; // Loop to end
            } else {
                currentIndex--; // Move to previous
            }
            updateSliderPosition(currentIndex);
        });
    }
    // --- END GALLERY SLIDER LOGIC ---

  // --- 2. PREMIUM ZOOM MODAL LOGIC ---
    const modal = document.getElementById("premiumZoomModal");
    const modalBody = document.getElementById("zoomModalBody");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalOverlay = document.querySelector(".zoom-modal-overlay");
    const zoomCards = document.querySelectorAll(".zoom-card");

    const populateModal = (cardElement) => {
        const innerHTML = cardElement.innerHTML;
        
        // Safely extract the background image url
        const style = window.getComputedStyle(cardElement);
        const backgroundImage = style.backgroundImage;
        let bgUrl = '';
        const match = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
        if (match) {
            bgUrl = match[1];
        }

        // Clean content (remove the button inside the modal)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = innerHTML;
        const btn = tempDiv.querySelector('.product-btn');
        if(btn) btn.remove();

        // Inject HTML and ensure background is set securely
        modalBody.innerHTML = `
            <div style="position: absolute; inset: 0; background-image: url('${bgUrl}'); background-size: cover; background-position: center; opacity: 0.3; filter: brightness(0.6); z-index: 0;"></div>
            <div style="position: relative; z-index: 1;">
                ${tempDiv.innerHTML}
            </div>
        `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Stop background scroll
    };

    // Global function attached to the 'View Specifications' button
    window.openZoomModal = (cardElement) => {
        populateModal(cardElement);
    };

    // Click anywhere else on the card to open it
    zoomCards.forEach(card => {
        card.addEventListener("click", function(e) {
            if (e.target.closest('.product-btn')) return; // Let the button handle itself
            populateModal(this);
        });
    });

    // --- 3. CLOSE MODAL LOGIC ---
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
        setTimeout(() => { modalBody.innerHTML = ''; }, 400); // Wait for animation to finish
    };

    if(closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if(modalOverlay) modalOverlay.addEventListener("click", closeModal);
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
