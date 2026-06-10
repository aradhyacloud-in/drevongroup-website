document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');

    // Create an Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the CSS transition
                entry.target.classList.add('visible');
                // Unobserve the element so the animation only happens once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply the observer to all selected elements
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});
