/* =========================================================
   DREVON ESTATES - PREMIUM SCROLL ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the 'reveal' class
    const revealElements = document.querySelectorAll(".reveal");

    // Configure the Intersection Observer
    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Adds a slight delay before triggering
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the 'active' class to trigger the CSS transition
                entry.target.classList.add("active");
                // Stop observing once the animation has run
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply the observer to each element
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Navbar Background Effect on Scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(10, 11, 13, 0.95)";
            navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
        } else {
            navbar.style.background = "rgba(10, 11, 13, 0.85)";
            navbar.style.boxShadow = "none";
        }
    });
});

/*-------- product grid-------*/

/* =========================================================
   PROJECT ZOOM MODAL & YOUTUBE LOGIC
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const exploreBtns = document.querySelectorAll(".explore-btn");
    const modal = document.getElementById("projectModal");
    const overlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("closeModal");
    
    const modalTitle = document.getElementById("modalTitle");
    const modalDetails = document.getElementById("modalDetails");
    const modalVideo = document.getElementById("modalVideo");

    // Open Modal and Inject Data
    exploreBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // Traverse up to find the parent project card
            const card = this.closest(".project-card");
            
            // Extract the data securely stored in the HTML attributes and hidden divs
            const title = card.getAttribute("data-title");
            const videoLink = card.getAttribute("data-video");
            const detailsHTML = card.querySelector(".hidden-details").innerHTML;

            // Inject the data into the Modal
            modalTitle.textContent = title;
            modalDetails.innerHTML = detailsHTML;
            modalVideo.src = videoLink; // Starts the YouTube Video Embed

            // Trigger Zoom-in Animation
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        });
    });

    // Close Modal Logic Function
    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "auto"; // Restore background scrolling
        // Clear iframe src so video stops playing in the background
        setTimeout(() => {
            modalVideo.src = "";
        }, 400); 
    }

    // Close on 'X' click
    closeBtn.addEventListener("click", closeModal);
    // Close on clicking the dark background overlay
    overlay.addEventListener("click", closeModal);
});
