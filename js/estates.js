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
