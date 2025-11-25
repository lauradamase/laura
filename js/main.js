/**
 * Laura Damase Portfolio - Main JavaScript
 * Réalisatrice & Cheffe OPV
 */

(function() {
    'use strict';

    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const sidebar = document.getElementById('sidebar');
    const portfolioGrid = document.getElementById('portfolioGrid');
    const navLinkElements = document.querySelectorAll('.nav-link[data-filter]');
    const socialIcons = document.querySelector('.social-icons');

    // Store portfolio items for filtering
    let portfolioItems = [];

    /**
     * Initialize the application
     */
    function init() {
        loadContent();
        setupMobileMenu();
        setupPortfolioFiltering();
        setupSmoothScroll();
    }

    /**
     * Load content from content.json
     */
    function loadContent() {
        fetch('./content.json')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Could not load content.json');
                }
                return response.json();
            })
            .then(function(data) {
                renderPortfolio(data.portfolio);
                setupLazyLoading();
                preloadImages();
            })
            .catch(function(error) {
                console.error('Error loading content:', error);
                portfolioGrid.innerHTML = '<p style="color: red; padding: 2rem;">Erreur: Impossible de charger le contenu. Vérifiez que content.json est valide.</p>';
            });
    }

    /**
     * Render portfolio items from data
     * @param {Array} items - Portfolio items from content.json
     */
    function renderPortfolio(items) {
        if (!portfolioGrid || !items || !items.length) return;

        portfolioGrid.innerHTML = items.map(function(item) {
            return '<article class="portfolio-item" data-category="' + item.category + '">' +
                '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer" class="portfolio-link">' +
                    '<div class="thumbnail-container">' +
                        '<img src="' + item.image + '" ' +
                             'alt="' + item.title + '" ' +
                             'class="thumbnail" ' +
                             'loading="lazy">' +
                        '<div class="overlay"></div>' +
                    '</div>' +
                    '<h3 class="project-title">' + item.title + '</h3>' +
                    '<p class="project-category">' + item.description + '</p>' +
                '</a>' +
            '</article>';
        }).join('');

        // Update portfolioItems reference after rendering
        portfolioItems = document.querySelectorAll('.portfolio-item');
    }

    /**
     * Mobile Menu Toggle
     */
    function setupMobileMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Also toggle social icons visibility on mobile
            if (socialIcons) {
                socialIcons.classList.toggle('active');
            }

            // Update ARIA attributes
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                if (socialIcons) {
                    socialIcons.classList.remove('active');
                }
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                if (socialIcons) {
                    socialIcons.classList.remove('active');
                }
                menuToggle.focus();
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                if (socialIcons) {
                    socialIcons.classList.remove('active');
                }
            }
        }, 250));
    }

    /**
     * Portfolio Filtering
     */
    function setupPortfolioFiltering() {
        if (!navLinkElements.length) return;

        navLinkElements.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Update active state
                navLinkElements.forEach(function(l) {
                    l.classList.remove('active');
                });
                this.classList.add('active');

                // Get filter category
                const filter = this.getAttribute('data-filter');

                // Filter items with animation
                filterPortfolioItems(filter);

                // Close mobile menu after selection
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    if (socialIcons) {
                        socialIcons.classList.remove('active');
                    }
                }
            });
        });
    }

    /**
     * Filter portfolio items with smooth animation
     * @param {string} category - The category to filter by ('all' for no filter)
     */
    function filterPortfolioItems(category) {
        // Re-query portfolio items in case they were dynamically loaded
        const items = document.querySelectorAll('.portfolio-item');

        items.forEach(function(item, index) {
            const itemCategory = item.getAttribute('data-category');
            const shouldShow = category === 'all' || itemCategory === category;

            if (shouldShow) {
                item.classList.remove('hidden');
                // Reset and trigger animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = 'fadeInUp 0.6s ease-out backwards';
                item.style.animationDelay = (index * 0.05) + 's';
            } else {
                item.classList.add('hidden');
            }
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or if it has a data-filter attribute
                if (href === '#' || this.hasAttribute('data-filter')) return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Lazy loading enhancement using Intersection Observer
     */
    function setupLazyLoading() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) return;

        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // If using data-src for lazy loading
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all thumbnail images
        document.querySelectorAll('.thumbnail').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    /**
     * Debounce utility function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    /**
     * Preload critical images
     */
    function preloadImages() {
        const criticalImages = document.querySelectorAll('.portfolio-item:nth-child(-n+6) .thumbnail');
        criticalImages.forEach(function(img) {
            if (img.complete) return;
            img.loading = 'eager';
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
        });
    } else {
        init();
    }

})();
