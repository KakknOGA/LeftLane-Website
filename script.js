document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    const startsideImage = document.getElementById('startsideImage');

    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (!href) return;
        const targetPage = href.split('/').pop();

        if (targetPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const scrollToTopBtn = document.getElementById('scrollToTop');

    function updateScrollEffects() {
        const scrollY = window.scrollY;

        if (startsideImage) {
            const progress = Math.min(scrollY / 520, 1);
            const scale = 1 - (progress * 0.28);
            const translateY = progress * 70;
            const opacity = 1 - progress;

            startsideImage.style.transform = 'translateY(' + translateY + 'px) scale(' + scale + ')';
            startsideImage.style.opacity = String(opacity);
        }

        if (scrollToTopBtn) {
            if (scrollY > 120) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        }
    }

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    window.addEventListener('scroll', function() {
        updateScrollEffects();
    }, { passive: true });

    updateScrollEffects();
});
