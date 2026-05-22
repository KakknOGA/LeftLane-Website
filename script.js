document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const startsideImage = document.getElementById('startsideImage');
    const homeGalleryImage = document.getElementById('homeGalleryImage');
    const homeGalleryCaption = document.getElementById('homeGalleryCaption');
    const homeGalleryOverlay = document.getElementById('homeGalleryOverlay');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    let galleryIndex = 0;
    let galleryIntervalId = null;
    let lastScrollY = window.scrollY || 0;
    let scrollFrameId = null;

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

    function syncNavSpacing() {
        if (!nav) return;
        document.body.style.paddingTop = nav.offsetHeight + 'px';
    }

    function updateNavState() {
        if (!nav) return;

        const scrollY = window.scrollY || 0;

        if (scrollY <= 24) {
            nav.classList.remove('nav-scrolled');
            nav.classList.remove('nav-hidden');
        } else {
            nav.classList.add('nav-scrolled');

            if (scrollY > lastScrollY + 6) {
                nav.classList.add('nav-hidden');
            } else if (scrollY < lastScrollY - 6) {
                nav.classList.remove('nav-hidden');
            }
        }

        lastScrollY = scrollY;
    }

    function setGallerySlide(index, animate) {
        if (!homeGalleryImage || galleryThumbs.length === 0) return;

        const shouldAnimate = animate === true;
        galleryThumbs.forEach(function(thumb) {
            thumb.classList.remove('active');
        });

        const safeIndex = ((index % galleryThumbs.length) + galleryThumbs.length) % galleryThumbs.length;
        const activeThumb = galleryThumbs[safeIndex];

        activeThumb.classList.add('active');

        const targetPosition = activeThumb.dataset.pos || 'center center';
        const targetLabel = activeThumb.dataset.label || 'Szene';
        const targetKind = activeThumb.dataset.kind || 'image';

        if (shouldAnimate) {
            homeGalleryImage.classList.add('sliding');
            homeGalleryImage.style.transform = 'translateX(-8%)';
            homeGalleryImage.style.opacity = '0';
        }

        window.setTimeout(function() {
            homeGalleryImage.style.objectPosition = targetPosition;
            if (homeGalleryCaption) {
                homeGalleryCaption.textContent = targetLabel;
            }

            if (homeGalleryOverlay) {
                if (targetKind === 'trailer') {
                    homeGalleryOverlay.classList.remove('hidden');
                } else {
                    homeGalleryOverlay.classList.add('hidden');
                }
            }

            if (shouldAnimate) {
                homeGalleryImage.style.transform = 'translateX(8%)';
                window.requestAnimationFrame(function() {
                    homeGalleryImage.style.transform = 'translateX(0)';
                    homeGalleryImage.style.opacity = '1';
                });
                window.setTimeout(function() {
                    homeGalleryImage.classList.remove('sliding');
                }, 220);
            }
        }, shouldAnimate ? 160 : 0);

        galleryIndex = safeIndex;
    }

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

    syncNavSpacing();
    updateNavState();

    window.addEventListener('resize', function() {
        syncNavSpacing();
    });

    if (homeGalleryImage && galleryThumbs.length > 0) {
        galleryThumbs.forEach(function(thumb, index) {
            thumb.addEventListener('click', function() {
                setGallerySlide(index, true);
            });
        });

        setGallerySlide(0, false);

        galleryIntervalId = window.setInterval(function() {
            setGallerySlide(galleryIndex + 1, true);
        }, 3600);

        window.addEventListener('beforeunload', function() {
            if (galleryIntervalId) {
                window.clearInterval(galleryIntervalId);
            }
        });
    }

    window.addEventListener('scroll', function() {
        if (scrollFrameId) return;

        scrollFrameId = window.requestAnimationFrame(function() {
            updateNavState();
            updateScrollEffects();
            scrollFrameId = null;
        });
    }, { passive: true });

    updateScrollEffects();
});
