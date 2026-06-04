/**
 * Fix Buttons Functionality
 * This script ensures the quick view and add to cart buttons work correctly
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing button fixes...');
    
    // Fix all buttons with a slight delay to ensure DOM is fully loaded
    setTimeout(fixAllButtons, 300);
    
    // Add a mutation observer to handle dynamically added buttons
    setupMutationObserver();
    
    /**
     * Fix all quick view and add to cart buttons
     */
    function fixAllButtons() {
        console.log('Fixing all buttons...');
        fixQuickViewButtons();
        fixAddToCartButtons();
    }
    
    /**
     * Fix quick view buttons
     */
    function fixQuickViewButtons() {
        // Get all quick view buttons
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        console.log('Found', quickViewButtons.length, 'quick view buttons');
        
        quickViewButtons.forEach(function(button) {
            // Skip if already fixed
            if (button.hasAttribute('data-fixed')) return;
            
            // Remove existing listeners by cloning the button
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Mark as fixed
            newButton.setAttribute('data-fixed', 'true');
            
            // Add new click event listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const bookId = this.getAttribute('data-book-id');
                console.log('Quick view clicked for book ID:', bookId);
                
                // Call the appropriate function based on what's available
                if (typeof showQuickViewModal === 'function') {
                    showQuickViewModal(bookId);
                } else if (typeof openQuickViewModal === 'function') {
                    openQuickViewModal(bookId);
                } else {
                    console.error('No quick view function available');
                }
                
                return false;
            });
        });
    }
    
    /**
     * Fix add to cart buttons
     */
    function fixAddToCartButtons() {
        // Get all add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        console.log('Found', addToCartButtons.length, 'add to cart buttons');
        
        addToCartButtons.forEach(function(button) {
            // Skip if already fixed
            if (button.hasAttribute('data-fixed')) return;
            
            // Remove existing listeners by cloning the button
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Mark as fixed
            newButton.setAttribute('data-fixed', 'true');
            
            // Add new click event listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const bookId = this.getAttribute('data-book-id');
                console.log('Add to cart clicked for book ID:', bookId);
                
                // Call the CartUtils.addToCart function
                if (typeof CartUtils !== 'undefined' && typeof CartUtils.addToCart === 'function') {
                    CartUtils.addToCart(bookId);
                    // CartUtils.showToast handles the success message
                } else {
                    console.error('Add to cart function not available');
                    // Fallback to alert if CartUtils is not available
                    alert('Book added to cart successfully!');
                }
                
                return false;
            });
        });
    }
    
    /**
     * Set up mutation observer to watch for new buttons
     */
    function setupMutationObserver() {
        // Create an observer instance
        const observer = new MutationObserver(function(mutations) {
            let shouldFixButtons = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if any added nodes contain buttons we need to fix
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            if (node.querySelector('.quick-view-btn, .add-to-cart')) {
                                shouldFixButtons = true;
                            }
                        }
                    });
                }
            });
            
            // Fix buttons if needed
            if (shouldFixButtons) {
                console.log('New buttons detected, fixing...');
                fixAllButtons();
            }
        });
        
        // Start observing the document body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('Mutation observer set up');
    }
    
    // Fix buttons in quick view modal when it's opened
    document.addEventListener('quickViewOpened', function() {
        console.log('Quick view opened, fixing buttons inside modal...');
        
        // Small delay to ensure modal content is fully loaded
        setTimeout(function() {
            const modalAddToCartBtn = document.querySelector('#quick-view-modal .add-to-cart-btn');
            if (modalAddToCartBtn && !modalAddToCartBtn.hasAttribute('data-fixed')) {
                modalAddToCartBtn.setAttribute('data-fixed', 'true');
                
                modalAddToCartBtn.addEventListener('click', function() {
                    const bookId = this.getAttribute('data-book-id');
                    if (bookId && typeof CartUtils !== 'undefined' && typeof CartUtils.addToCart === 'function') {
                        CartUtils.addToCart(bookId);
                        // CartUtils.showToast handles the success message
                    } else {
                        console.error('Add to cart function not available');
                        // Fallback to alert if CartUtils is not available
                        alert('Book added to cart successfully!');
                    }
                });
            }
        }, 100);
    });
    
    // Create and dispatch custom event when quick view modal is opened
    const originalShowQuickViewModal = window.showQuickViewModal;
    if (typeof originalShowQuickViewModal === 'function') {
        window.showQuickViewModal = function(bookId) {
            originalShowQuickViewModal(bookId);
            document.dispatchEvent(new CustomEvent('quickViewOpened'));
        };
    }
    
    const originalOpenQuickViewModal = window.openQuickViewModal;
    if (typeof originalOpenQuickViewModal === 'function') {
        window.openQuickViewModal = function(bookId) {
            originalOpenQuickViewModal(bookId);
            document.dispatchEvent(new CustomEvent('quickViewOpened'));
        };
    }
});
