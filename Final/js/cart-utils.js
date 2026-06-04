/**
 * Cart Utilities for Elite Readers Website
 * Provides global cart functionality that can be used across all pages
 */

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// Global cart functions
window.CartUtils = {
    // Add to cart function
    addToCart: function(bookId) {
        // Check if bookId is valid
        if (!bookId) {
            console.error('Invalid book ID');
            return;
        }
        
        // Find book in booksData
        const book = booksData.find(book => book.id.toString() === bookId);
        
        if (!book) {
            console.error('Book not found:', bookId);
            return;
        }
        
        // Check if book is already in cart
        const existingItem = cart.find(item => item.id === bookId);
        
        if (existingItem) {
            // Increment quantity
            existingItem.quantity += 1;
        } else {
            // Add new item to cart
            cart.push({
                id: bookId,
                title: book.title,
                author: book.author,
                price: book.price,
                originalPrice: book.originalPrice,
                coverImage: book.coverImage,
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        this.saveCart();
        
        // Show notification
        this.showToast('Book added to cart');
        
        // Update cart count in header
        this.updateCartCount();
    },
    
    // Remove from cart
    removeFromCart: function(bookId) {
        const index = cart.findIndex(item => item.id === bookId);
        if (index !== -1) {
            cart.splice(index, 1);
            this.saveCart();
            this.updateCartCount();
        }
    },
    
    // Update item quantity
    updateItemQuantity: function(bookId, quantity) {
        const item = cart.find(item => item.id === bookId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(bookId);
            } else {
                this.saveCart();
            }
        }
    },
    
    // Save cart to localStorage
    saveCart: function() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    },
    
    // Get cart items
    getCartItems: function() {
        return cart;
    },
    
    // Get cart item count
    getCartItemCount: function() {
        return cart.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Update cart count in header
    updateCartCount: function() {
        const headerCartCount = document.querySelector('.cart-count');
        
        if (headerCartCount) {
            const count = this.getCartItemCount();
            headerCartCount.textContent = count;
            
            if (count > 0) {
                headerCartCount.classList.add('has-items');
            } else {
                headerCartCount.classList.remove('has-items');
            }
        }
    },
    
    // Show toast notification
    showToast: function(message) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            document.body.appendChild(toast);
            
            // Add CSS for toast
            const style = document.createElement('style');
            style.textContent += `
                #toast-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: var(--primary-color, #4a6fa5);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    transform: translateY(100px);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }
                
                #toast-notification.show {
                    transform: translateY(0);
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set message and show toast
        toast.textContent = message;
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },
    
    // Handle add to cart button click
    handleAddToCartClick: function() {
        // Get the book ID from the button
        const bookId = this.getAttribute('data-book-id');
        
        if (bookId) {
            // Add to cart
            CartUtils.addToCart(bookId);
        } else {
            console.error('No book ID found on button');
            
            // Try to get book ID from URL if we're on the book details page
            if (window.location.pathname.includes('book-details')) {
                const urlParams = new URLSearchParams(window.location.search);
                const bookIdFromUrl = urlParams.get('id');
                
                if (bookIdFromUrl) {
                    // Set the book ID on the button for future clicks
                    this.setAttribute('data-book-id', bookIdFromUrl);
                    
                    // Add to cart using the ID from URL
                    CartUtils.addToCart(bookIdFromUrl);
                }
            }
        }
    }
};

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count in header
    CartUtils.updateCartCount();
    
    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        // Remove any existing event listeners first to avoid duplicates
        button.removeEventListener('click', CartUtils.handleAddToCartClick);
        
        // Add the event listener
        button.addEventListener('click', CartUtils.handleAddToCartClick);
    });
    
    // Special handling for the book details page add-to-cart button
    const detailsAddToCartBtn = document.getElementById('add-to-cart-btn');
    if (detailsAddToCartBtn) {
        // Get the book ID from the URL if it's not set on the button
        if (!detailsAddToCartBtn.getAttribute('data-book-id')) {
            const urlParams = new URLSearchParams(window.location.search);
            const bookId = urlParams.get('id');
            if (bookId) {
                detailsAddToCartBtn.setAttribute('data-book-id', bookId);
                console.log('Set book ID on button:', bookId);
            }
        }
    }
    
    console.log('Cart utilities initialized');
});
