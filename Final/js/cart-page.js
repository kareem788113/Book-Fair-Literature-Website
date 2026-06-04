/**
 * Cart Page JavaScript for Elite Readers Website
 * Handles cart page specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // If on cart page, load cart items
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
        loadRecommendedBooks();
    }
    
    // Initialize checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('This is a demo. In a real application, this would proceed to checkout.');
        });
    }
    
    // Load cart items
    function loadCart() {
        // Get cart elements
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.getElementById('cart-count');
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');
        
        // Constants for calculations
        const SHIPPING_RATE = 4.99;
        const TAX_RATE = 0.08; // 8%
        
        // Remove loading spinner
        const loadingSpinner = document.querySelector('.loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.remove();
        }
        
        // Get cart from CartUtils
        const cart = CartUtils.getCartItems();
        
        // Update cart count
        if (cartCount) {
            cartCount.textContent = CartUtils.getCartItemCount();
        }
        
        // If cart is empty, show message
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your Cart is Empty</h3>
                    <p>Looks like you haven't added any books to your cart yet.</p>
                    <a href="books.html" class="btn btn-primary">Browse Books</a>
                </div>
            `;
            
            // Set summary values to 0
            updateOrderSummary(0, 0, 0, 0);
            return;
        }
        
        // Create HTML for each cart item
        let cartHTML = '';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.coverImage}" alt="${item.title}" class="cart-item-image">
                    
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.title}</h3>
                        <p class="cart-item-author">By ${item.author}</p>
                        <div class="cart-item-price">
                            <span class="current-price">$${item.price.toFixed(2)}</span>
                            ${item.originalPrice ? `<span class="original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input" data-id="${item.id}">
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    
                    <div class="cart-item-total">
                        $${itemTotal.toFixed(2)}
                    </div>
                    
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
        });
        
        // Add to cart items container
        cartItems.innerHTML = cartHTML;
        
        // Calculate subtotal
        const subtotal = calculateSubtotal();
        
        // Calculate shipping and tax
        const shipping = SHIPPING_RATE;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + shipping + tax;
        
        // Update order summary
        updateOrderSummary(subtotal, shipping, tax, total);
        
        // Add event listeners to cart item buttons
        addCartItemEventListeners();
    }
    
    // Add event listeners to cart item buttons
    function addCartItemEventListeners() {
        // Decrease quantity buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                updateItemQuantity(id, 'decrease');
            });
        });
        
        // Increase quantity buttons
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                updateItemQuantity(id, 'increase');
            });
        });
        
        // Quantity input fields
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = this.getAttribute('data-id');
                updateItemQuantity(id, 'set', parseInt(this.value));
            });
        });
        
        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    }
    
    // Update item quantity
    function updateItemQuantity(id, action, value) {
        // Get cart from CartUtils
        const cart = CartUtils.getCartItems();
        const item = cart.find(item => item.id === id);
        
        if (!item) return;
        
        if (action === 'increase') {
            CartUtils.updateItemQuantity(id, item.quantity + 1);
        } else if (action === 'decrease') {
            if (item.quantity > 1) {
                CartUtils.updateItemQuantity(id, item.quantity - 1);
            } else {
                removeFromCart(id);
                return;
            }
        } else if (action === 'set') {
            CartUtils.updateItemQuantity(id, value);
        }
        
        // Reload cart to reflect changes
        loadCart();
    }
    
    // Remove item from cart
    function removeFromCart(id) {
        CartUtils.removeFromCart(id);
        
        // Show notification
        CartUtils.showToast('Item removed from cart');
        
        // Reload cart
        loadCart();
    }
    
    // Calculate subtotal
    function calculateSubtotal() {
        const cart = CartUtils.getCartItems();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Update order summary
    function updateOrderSummary(subtotal, shipping, tax, total) {
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    // Load recommended books
    function loadRecommendedBooks() {
        const recommendedBooksSlider = document.querySelector('.recommended-books-slider');
        if (!recommendedBooksSlider) return;
        
        // Get cart from CartUtils
        const cart = CartUtils.getCartItems();
        
        // Get random books (excluding ones in cart)
        const cartBookIds = cart.map(item => item.id);
        const availableBooks = booksData.filter(book => !cartBookIds.includes(book.id.toString()));
        
        // Shuffle and get first 4
        const shuffled = availableBooks.sort(() => 0.5 - Math.random());
        const recommended = shuffled.slice(0, 4);
        
        // Create HTML
        let html = '';
        
        recommended.forEach(book => {
            html += `
                <div class="book-card">
                    <img src="${book.coverImage}" alt="${book.title}" class="book-card-image">
                    <div class="book-card-content">
                        <h3 class="book-card-title">${book.title}</h3>
                        <p class="book-card-author">By ${book.author}</p>
                        <p class="book-card-price">$${book.price.toFixed(2)}</p>
                        <button class="btn-small btn-primary add-to-cart" data-book-id="${book.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
        });
        
        // Add to slider
        recommendedBooksSlider.innerHTML = html;
    }
});
