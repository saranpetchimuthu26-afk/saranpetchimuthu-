document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navMenu = document.getElementById('nav-menu');
            
            if (targetSection) {
                // Adjust for the fixed header height
                const headerOffset = 70; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Also, close the mobile menu if it's open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    // Optional: reset hamburger icon if you have a 'close' state
                }
            }
        });
    });

    // --- 2. Mobile Hamburger Menu ---
    const hamburger = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // ARIA accessibility
        const isExpanded = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // --- 3. TEDx Gallery Navigation ---
    const gallery = document.querySelector('.initiative-gallery');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');

    if (gallery && prevButton && nextButton) {
        const imageWidth = gallery.clientWidth; // Width of one image

        prevButton.addEventListener('click', () => {
            gallery.scrollBy({ left: -imageWidth, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            gallery.scrollBy({ left: imageWidth, behavior: 'smooth' });
        });
    }

    // --- 4. On-Scroll Staggered Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a delay based on the element's order
                const delay = (entry.target.dataset.index % 4) * 150; // 0ms, 150ms, 300ms, etc.
                
                setTimeout(() => {
                    entry.target.classList.add('visible-anim');
                }, delay);
                
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all elements with the 'hidden-anim' class
    // We need to add this class to the elements we want to animate
    // Let's add it to cards, timeline items, and skills
    const elementsToAnimate = document.querySelectorAll('.card, .timeline-item, .skill-item, .certification-item, .about-grid > div');
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('hidden-anim'); // Add the base class
        el.dataset.index = index; // Add an index for staggering
        observer.observe(el);
    });
    
    // --- 5. NEW: Mouse-Follow Spotlight Effect for Cards ---
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position inside the card
            const y = e.clientY - rect.top;  // y position inside the card

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
