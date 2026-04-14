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
    const socialIcons = document.querySelector('.social-icons');
    const logoFirst = document.querySelector('.logo-first');
    const logoLast = document.querySelector('.logo-last');
    const subtitle = document.querySelector('.subtitle');

    /**
     * Initialize the application
     */
    function init() {
        loadContent();
        setupMobileMenu();
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
                renderSiteInfo(data.site);
                renderSocialLinks(data.social);
                renderCategories(data.categories);
                renderApropos(data.apropos);
                renderPortfolio(data.portfolio);

                checkUrlFilter();
                setupPortfolioFiltering();
                setupLazyLoading();
                preloadImages();
            })
            .catch(function(error) {
                console.error('Error loading content:', error);
                if (portfolioGrid) {
                    portfolioGrid.innerHTML = '<p style="color: red; padding: 2rem;">Erreur: Impossible de charger le contenu. Vérifiez que content.json est valide.</p>';
                }
            });
    }

    /**
     * Render about/apropos content
     */
    function renderApropos(apropos) {
        var aboutText = document.getElementById('aboutText');
        var aboutImage = document.querySelector('.portrait-image');
        if (!aboutText) return;

        if (apropos) {
            if (aboutText && apropos.bio) {
                aboutText.innerHTML = '<p>' + apropos.bio + '</p>';
            }
            if (aboutImage && apropos.image) {
                aboutImage.src = apropos.image;
            }
        }
    }

    /**
     * Render site info (name, subtitle)
     */
    function renderSiteInfo(site) {
        if (!site) return;

        if (logoFirst && site.firstName) {
            logoFirst.textContent = site.firstName;
        }
        if (logoLast && site.lastName) {
            logoLast.textContent = site.lastName;
        }
        if (subtitle && site.subtitle) {
            subtitle.textContent = site.subtitle;
        }

        // Update page title
        if (site.firstName && site.lastName && site.subtitle) {
            document.title = site.firstName + ' ' + site.lastName + ' | ' + site.subtitle;
        }
    }

    /**
     * Render social media links
     */
    function renderSocialLinks(social) {
        if (!socialIcons || !social || !social.length) return;

        // Map platform names to Font Awesome icons
        var iconMap = {
            'instagram': 'fab fa-instagram',
            'linkedin': 'fab fa-linkedin-in',
            'x-twitter': 'fab fa-x-twitter',
            'twitter': 'fab fa-twitter',
            'facebook': 'fab fa-facebook-f',
            'youtube': 'fab fa-youtube',
            'tiktok': 'fab fa-tiktok',
            'vimeo': 'fab fa-vimeo-v'
        };

        socialIcons.innerHTML = social.map(function(item) {
            var iconClass = iconMap[item.platform] || 'fas fa-link';
            var label = item.platform.charAt(0).toUpperCase() + item.platform.slice(1);

            return '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="' + label + '">' +
                '<i class="' + iconClass + '"></i>' +
            '</a>';
        }).join('');
    }

    /**
     * Render navigation categories
     */
    function renderCategories(categories) {
        if (!navLinks || !categories || !categories.length) return;

        navLinks.innerHTML = categories.map(function(cat, index) {
            var activeClass = index === 0 ? ' active' : '';
            var href;
            if (cat.id === 'apropos') {
                href = './apropos.html';
            } else {
                href = './?filter=' + cat.id;
            }
            return '<li><a href="' + href + '" class="nav-link' + activeClass + '" data-filter="' + cat.id + '">' + cat.label + '</a></li>';
        }).join('');
    }

    /**
     * Render portfolio items from data
     * @param {Array} items - Portfolio items from content.json
     */
    function renderPortfolio(items) {
        if (!portfolioGrid || !items || !items.length) return;

        if (portfolioGrid.style.display === 'none') {
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
        }
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
            var isExpanded = navLinks.classList.contains('active');
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
        var navLinkElements = document.querySelectorAll('.nav-link[data-filter]');
        if (!navLinkElements.length) return;

        navLinkElements.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href && href.startsWith('./?filter=')) {
                    e.preventDefault();
                    var filter = this.getAttribute('data-filter');
                    showPortfolio(filter);
                    setActiveState(navLinkElements, this);
                }
            });
        });
    }

    function checkUrlFilter() {
        var params = new URLSearchParams(window.location.search);
        var filter = params.get('filter');
        if (filter) {
            showPortfolio(filter);
            var navLinkElements = document.querySelectorAll('.nav-link[data-filter]');
            navLinkElements.forEach(function(l) {
                l.classList.remove('active');
                if (l.getAttribute('data-filter') === filter) {
                    l.classList.add('active');
                }
            });
        }
    }

    function showPortfolio(filter) {
        var landingLogo = document.getElementById('landingLogo');
        var portfolioGrid = document.getElementById('portfolioGrid');
        var videoBg = document.getElementById('videoBg');
        if (landingLogo) landingLogo.style.display = 'none';
        if (portfolioGrid) portfolioGrid.style.display = '';
        if (videoBg) videoBg.style.display = 'none';
        filterPortfolioItems(filter);
    }

    function setActiveState(navLinkElements, activeLink) {
        navLinkElements.forEach(function(l) {
            l.classList.remove('active');
        });
        if (activeLink) activeLink.classList.add('active');
    }

    /**
     * Filter portfolio items with smooth animation
     * @param {string} category - The category to filter by ('all' for no filter)
     */
    function filterPortfolioItems(category) {
        var items = document.querySelectorAll('.portfolio-item');

        items.forEach(function(item, index) {
            var itemCategory = item.getAttribute('data-category');
            var shouldShow = category === 'all' || itemCategory === category;

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
                var href = this.getAttribute('href');

                // Skip if it's just "#" or if it has a data-filter attribute
                if (href === '#' || this.hasAttribute('data-filter')) return;

                e.preventDefault();
                var target = document.querySelector(href);

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
        if (!('IntersectionObserver' in window)) return;

        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;

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

        document.querySelectorAll('.thumbnail').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    /**
     * Debounce utility function
     */
    function debounce(func, wait) {
        var timeout;
        return function executedFunction() {
            var context = this;
            var args = arguments;
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
        var criticalImages = document.querySelectorAll('.portfolio-item:nth-child(-n+6) .thumbnail');
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
