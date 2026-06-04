/**
 * Publishers Page Enhancements
 * Additional interactive features for the publishers page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add tooltip functionality
    addTooltips();
    
    // Add pulse animation to important elements
    addPulseAnimations();
    
    // Add interactive hover effects to regions
    enhanceRegionInteractivity();
    
    // Add image lazy loading
    implementLazyLoading();
    
    // Add interactive stats counters
    implementStatsCounters();
    
    // Enhance publisher cards with interactive effects
    enhancePublisherCards();
    
    // Add search animation effects
    enhanceSearchBox();
    
    // Helper functions
    function addTooltips() {
        // Add tooltips to action buttons
        const actionButtons = document.querySelectorAll('.action-btn, .publisher-details-btn');
        
        actionButtons.forEach(button => {
            // Add tooltip class
            button.classList.add('tooltip');
            
            // Get tooltip text from title attribute
            const tooltipText = button.getAttribute('title');
            
            if (tooltipText) {
                // Create tooltip element
                const tooltip = document.createElement('span');
                tooltip.className = 'tooltip-text';
                tooltip.textContent = tooltipText;
                
                // Add tooltip to button
                button.appendChild(tooltip);
                
                // Remove title attribute to prevent default browser tooltip
                button.removeAttribute('title');
            }
        });
    }
    
    function addPulseAnimations() {
        // Add pulse animation to clear filters button
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.classList.add('pulse-animation');
        }
        
        // Add pulse animation to featured publisher buttons
        const featuredPublisherButtons = document.querySelectorAll('.publisher-details-btn');
        featuredPublisherButtons.forEach((button, index) => {
            // Add pulse animation with delay
            setTimeout(() => {
                button.classList.add('pulse-animation');
            }, index * 1000);
        });
    }
    
    function enhanceRegionInteractivity() {
        const regions = document.querySelectorAll('.region');
        
        regions.forEach(region => {
            // Add hover effect
            region.addEventListener('mouseenter', function() {
                // Add glow effect
                this.style.boxShadow = '0 0 15px rgba(var(--primary-rgb), 0.5)';
                
                // Scale up slightly
                this.style.transform = 'scale(1.05)';
                
                // Change background color
                this.style.backgroundColor = 'rgba(var(--primary-rgb), 0.3)';
            });
            
            region.addEventListener('mouseleave', function() {
                // Remove glow effect
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                
                // Reset scale
                this.style.transform = 'scale(1)';
                
                // Reset background color if not active
                if (!this.classList.contains('active')) {
                    this.style.backgroundColor = 'rgba(var(--primary-rgb), 0.2)';
                }
            });
            
            // Add click effect
            region.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    function implementLazyLoading() {
        // Get all images
        const images = document.querySelectorAll('img');
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Stop observing once loaded
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '0px 0px 100px 0px' // Load images when they are 100px from viewport
        });
        
        // Observe all images with data-src attribute
        images.forEach(img => {
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
                observer.observe(img);
            }
        });
    }
    
    function implementStatsCounters() {
        // Get all stat numbers
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetValue = statElement.textContent;
                    
                    // Only animate if it's a number with a + sign
                    if (targetValue.includes('+')) {
                        const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''));
                        
                        // Animate counter
                        animateCounter(statElement, 0, numericValue);
                        
                        // Stop observing once animated
                        observer.unobserve(statElement);
                    }
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of element is visible
        });
        
        // Observe all stat numbers
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateCounter(element, start, end) {
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60 fps
        const totalFrames = Math.round(duration / frameDuration);
        const increment = (end - start) / totalFrames;
        
        let currentFrame = 0;
        let currentValue = start;
        
        const animate = () => {
            currentFrame++;
            currentValue += increment;
            
            // Update element text
            element.textContent = Math.floor(currentValue) + '+';
            
            // Continue animation if not complete
            if (currentFrame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final value is exact
                element.textContent = end + '+';
            }
        };
        
        // Start animation
        animate();
    }
    
    function enhancePublisherCards() {
        // Get all publisher cards
        const publisherCards = document.querySelectorAll('.publisher-card');
        
        publisherCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                // Add elevation
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                
                // Highlight publisher name
                const publisherName = this.querySelector('.publisher-name');
                if (publisherName) {
                    publisherName.style.color = 'var(--primary-color)';
                }
                
                // Scale logo
                const publisherLogo = this.querySelector('.publisher-logo');
                if (publisherLogo) {
                    publisherLogo.style.transform = 'scale(1.1)';
                }
                
                // Highlight action buttons
                const actionButtons = this.querySelectorAll('.action-btn');
                actionButtons.forEach(button => {
                    button.style.backgroundColor = 'var(--primary-color)';
                    button.style.color = 'white';
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset elevation
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                
                // Reset publisher name
                const publisherName = this.querySelector('.publisher-name');
                if (publisherName) {
                    publisherName.style.color = '';
                }
                
                // Reset logo
                const publisherLogo = this.querySelector('.publisher-logo');
                if (publisherLogo) {
                    publisherLogo.style.transform = 'scale(1)';
                }
                
                // Reset action buttons
                const actionButtons = this.querySelectorAll('.action-btn');
                actionButtons.forEach(button => {
                    button.style.backgroundColor = '';
                    button.style.color = '';
                });
            });
        });
        
        // Add click effect to publisher cards
        publisherCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Only trigger if clicking on the card itself, not on buttons or links
                if (e.target === this || e.target.closest('.publisher-info') === this.querySelector('.publisher-info')) {
                    // Create ripple effect
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const ripple = document.createElement('span');
                    ripple.className = 'card-ripple';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    
                    this.appendChild(ripple);
                    
                    // Remove ripple after animation
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                    
                    // Get publisher ID and open modal
                    const publisherId = this.getAttribute('data-publisher-id');
                    if (publisherId && typeof openPublisherModal === 'function') {
                        openPublisherModal(publisherId);
                    }
                }
            });
        });
    }
    
    function enhanceSearchBox() {
        const searchBox = document.querySelector('.animated-search');
        const searchInput = document.getElementById('publisher-search');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchBox && searchInput && searchBtn) {
            // Add focus effect
            searchInput.addEventListener('focus', function() {
                searchBox.classList.add('focused');
                
                // Trigger pulse animation
                const searchPulse = searchBox.querySelector('.search-pulse');
                if (searchPulse) {
                    // Reset animation by removing and re-adding the element
                    const parent = searchPulse.parentNode;
                    const clone = searchPulse.cloneNode(true);
                    parent.removeChild(searchPulse);
                    parent.appendChild(clone);
                }
            });
            
            searchInput.addEventListener('blur', function() {
                searchBox.classList.remove('focused');
            });
            
            // Add click effect to search button
            searchBtn.addEventListener('click', function() {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Trigger search
                const event = new Event('submit');
                document.getElementById('publisher-search-form').dispatchEvent(event);
            });
        }
    }
});
