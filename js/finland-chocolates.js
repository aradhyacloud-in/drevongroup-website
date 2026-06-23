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
    
    if (track && nextButton && prevButton) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const updateSliderPosition = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            if (currentIndex === slides.length - 1) {
                currentIndex = 0; 
            } else {
                currentIndex++; 
            }
            updateSliderPosition(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex === 0) {
                currentIndex = slides.length - 1; 
            } else {
                currentIndex--; 
            }
            updateSliderPosition(currentIndex);
        });
    }

    // --- 2. PREMIUM ZOOM MODAL LOGIC ---
    const modal = document.getElementById("premiumZoomModal");
    const modalBody = document.getElementById("zoomModalBody");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalOverlay = document.querySelector(".zoom-modal-overlay");
    const zoomCards = document.querySelectorAll(".zoom-card");

    const populateModal = (cardElement) => {
        const innerHTML = cardElement.innerHTML;
        
        const style = window.getComputedStyle(cardElement);
        const backgroundImage = style.backgroundImage;

        let bgUrl = '';
        const match = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (match) {
            bgUrl = match[1];
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = innerHTML;
        const btn = tempDiv.querySelector('.product-btn');
        if(btn) btn.remove();

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

    // Unified click listener for the card itself (removes previous duplication glitch)
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
