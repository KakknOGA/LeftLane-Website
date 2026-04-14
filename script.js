document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    function updateScrollButtonVisibility() {
        if (window.scrollY > 120) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    }

    // Scroll-to-Top Button zeigen/verstecken basierend auf Scrollposition
    window.addEventListener('scroll', function() {
        updateScrollButtonVisibility();
    });

    // Auch direkt beim Laden den korrekten Zustand setzen.
    updateScrollButtonVisibility();

    // Zum Top scrollen wenn Button geklickt wird
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
