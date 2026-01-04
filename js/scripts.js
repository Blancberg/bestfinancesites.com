/**
 * BestFinanceSites.com - Main JavaScript
 */

// Google Analytics initialization - deferred to not block rendering
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // Create script element for Google Tag Manager with reduced functionality
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DVS8CJBC7B';
        document.head.appendChild(script);

        // Initialize dataLayer and gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag; // Make gtag available globally

        gtag('js', new Date());
        // Use more efficient settings to reduce JS payload
        gtag('config', 'G-DVS8CJBC7B', {
            'send_page_view': true,
            'anonymize_ip': true,
            'transport_type': 'beacon'
        });
    }, 1000); // Delay initialization by 2 seconds to prioritize content rendering
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Additional CLS prevention specifically for the reported elements
    window.addEventListener('load', function() {
        // Force specific dimensional stability on elements causing CLS

        // 1. Main content stabilization
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            // Force computed layout and height
            const height = Math.max(
                mainContent.scrollHeight,
                mainContent.offsetHeight,
                mainContent.clientHeight,
                3000
            );
            mainContent.style.minHeight = height + 'px';
        }

        // 2. Alternative Investments list item
        const altInvestmentItems = document.querySelectorAll('li:contains("Alternative Investments")');
        if (altInvestmentItems.length > 0) {
            altInvestmentItems.forEach(function(item) {
                item.style.contain = 'layout size paint';
                item.style.minHeight = (item.offsetHeight + 5) + 'px';
            });
        }

        // 3. Domain span stabilization
        const domainSpan = document.querySelector('.domain');
        if (domainSpan) {
            domainSpan.style.contain = 'layout size paint';
            domainSpan.style.display = 'inline-block';
            domainSpan.style.width = domainSpan.offsetWidth + 'px';
        }
    });

    // Polyfill for :contains selector
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (typeof document.querySelectorAll(':contains') === 'undefined') {
        // Add a contains selector implementation
        document.querySelectorAll = (function(originalQsa) {
            return function(selector) {
                if (selector.indexOf(':contains') > -1) {
                    // Extract the content to search for
                    const match = selector.match(/:contains\(['"](.+?)['"]\)/i);
                    if (match) {
                        const text = match[1];
                        const elements = Array.from(document.querySelectorAll('li'));
                        return elements.filter(el => el.textContent.includes(text));
                    }
                }
                return originalQsa.call(this, selector);
            };
        })(document.querySelectorAll);
    }
});