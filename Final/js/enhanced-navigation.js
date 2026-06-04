/**
 * Enhanced Navigation JavaScript
 * Handles functionality for the enhanced navigation bar
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            (mobileMenuToggle && !mobileMenuToggle.contains(event.target))) {
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Dropdown menu on hover for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        // For touch devices
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth > 992) {
                if (e.target.tagName === 'A' && e.target.nextElementSibling && e.target.nextElementSibling.classList.contains('dropdown-menu')) {
                    e.preventDefault();
                    this.classList.toggle('show-dropdown');
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show-dropdown');
            }
        });
    });
    
    // Update cart count based on local storage
    updateCartCount();
    
    // Update bookmark count based on local storage
    updateBookmarkCount();
});

/**
 * Updates the cart count based on items in local storage
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let count = cartItems.length;
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        
        // Show/hide based on count
        if (count > 0) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

/**
 * Updates the bookmark notification badge based on items in local storage
 */
function updateBookmarkCount() {
    const bookmarkBadges = document.querySelectorAll('.notification-badge');
    let bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
    let count = bookmarkedItems.length;
    
    bookmarkBadges.forEach(badge => {
        badge.textContent = count;
        
        // Show/hide based on count
        if (count > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Add event listeners for cart and bookmark changes
window.addEventListener('storage', function(e) {
    if (e.key === 'cartItems') {
        updateCartCount();
    }
    if (e.key === 'bookmarkedItems') {
        updateBookmarkCount();
    }
});
