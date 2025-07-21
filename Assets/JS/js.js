// ===============================================
// HEADER & NAVIGATION FUNCTIONALITY
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');

    // ===============================================
    // SCROLL EFFECT FOR HEADER
    // ===============================================
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // ===============================================
    // ACTIVE LINK HIGHLIGHTING
    // ===============================================
    function highlightActiveLink() {
        const currentPage = window.location.pathname;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if link href matches current page
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPage || 
                (currentPage.includes('index.html') && link.href.includes('#home'))) {
                link.classList.add('active');
            }
        });
    }

    // Run on page load
    highlightActiveLink();

    // ===============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===============================================
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // ===============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ===============================================
    function handleKeyboardNavigation(event) {
        // Add any keyboard navigation features if needed
    }

    document.addEventListener('keydown', handleKeyboardNavigation);

    // ===============================================
    // RESIZE HANDLER
    // ===============================================
    function handleResize() {
        // Add any resize functionality if needed
    }

    window.addEventListener('resize', handleResize);

    // ===============================================
    // HEADER ANIMATION ON LOAD
    // ===============================================
    function animateHeaderOnLoad() {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.6s ease-out';
        
        setTimeout(() => {
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Run header animation
    animateHeaderOnLoad();

    // ===============================================
    // INTERSECTION OBSERVER FOR SECTION HIGHLIGHTING
    // ===============================================
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // ===============================================
    // PERFORMANCE OPTIMIZATION
    // ===============================================
    let ticking = false;

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }

    function handleOptimizedScroll() {
        requestTick();
        ticking = false;
    }

    // Replace the simple scroll listener with optimized version
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleOptimizedScroll, { passive: true });
});

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
