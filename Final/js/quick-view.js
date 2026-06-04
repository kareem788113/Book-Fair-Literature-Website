/**
 * Quick View JavaScript for LitFest - Book Fair & Literature Website
 * Handles quick view functionality for books
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create quick view modal if it doesn't exist
    function createQuickViewModal() {
        if (document.getElementById('quick-view-modal')) {
            return;
        }
        
        const modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="quick-view-container">
                    <div class="quick-view-image">
                        <img src="" alt="Book Cover">
                    </div>
                    <div class="quick-view-details">
                        <h2 class="quick-view-title"></h2>
                        <p class="quick-view-author"></p>
                        <div class="quick-view-rating"></div>
                        <div class="quick-view-badges"></div>
                        <p class="quick-view-description"></p>
                        <div class="quick-view-price"></div>
                        <div class="quick-view-actions">
                            <a href="#" class="btn-small view-details-btn">View Details</a>
                            <button class="btn-small btn-primary add-to-cart-btn">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn-small bookmark-btn">
                                <i class="far fa-bookmark"></i> Bookmark
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            closeQuickViewModal();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeQuickViewModal();
            }
        });
        
        // Add CSS for modal
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.5);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal.show {
                opacity: 1;
            }
            
            .modal-content {
                background-color: var(--bg-color);
                margin: 5% auto;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                max-width: 900px;
                width: 90%;
                transform: translateY(-50px);
                transition: transform 0.3s ease;
                position: relative;
            }
            
            .modal.show .modal-content {
                transform: translateY(0);
            }
            
            .close-modal {
                position: absolute;
                right: 20px;
                top: 15px;
                font-size: 28px;
                font-weight: bold;
                color: var(--text-muted);
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .close-modal:hover {
                color: var(--primary-color);
            }
            
            .quick-view-container {
                display: grid;
                grid-template-columns: 250px 1fr;
                gap: 30px;
            }
            
            .quick-view-image img {
                width: 100%;
                height: auto;
                border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .quick-view-title {
                margin-top: 0;
                margin-bottom: 5px;
                color: var(--heading-color);
            }
            
            .quick-view-author {
                color: var(--text-muted);
                margin-top: 0;
                margin-bottom: 15px;
            }
            
            .quick-view-rating {
                margin-bottom: 15px;
                color: #f39c12;
            }
            
            .quick-view-badges {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                margin-bottom: 15px;
            }
            
            .quick-view-description {
                margin-bottom: 20px;
                color: var(--text-color);
                line-height: 1.6;
            }
            
            .quick-view-price {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 20px;
            }
            
            .quick-view-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .quick-view-container {
                    grid-template-columns: 1fr;
                }
                
                .quick-view-image {
                    text-align: center;
                }
                
                .quick-view-image img {
                    max-width: 200px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Open quick view modal
    function openQuickViewModal(bookId) {
        // Create modal if it doesn't exist
        createQuickViewModal();
        
        // Get book data
        const book = booksData.find(book => book.id.toString() === bookId);
        
        if (!book) {
            console.error('Book not found:', bookId);
            return;
        }
        
        // Get modal elements
        const modal = document.getElementById('quick-view-modal');
        const image = modal.querySelector('.quick-view-image img');
        const title = modal.querySelector('.quick-view-title');
        const author = modal.querySelector('.quick-view-author');
        const rating = modal.querySelector('.quick-view-rating');
        const badges = modal.querySelector('.quick-view-badges');
        const description = modal.querySelector('.quick-view-description');
        const price = modal.querySelector('.quick-view-price');
        const viewDetailsBtn = modal.querySelector('.view-details-btn');
        const addToCartBtn = modal.querySelector('.add-to-cart-btn');
        const bookmarkBtn = modal.querySelector('.bookmark-btn');
        
        // Set book data
        image.src = book.coverImage;
        image.alt = book.title;
        title.textContent = book.title;
        author.textContent = `By ${book.author}`;
        
        // Generate star rating
        rating.innerHTML = generateStarRating(book.rating);
        
        // Generate badges
        badges.innerHTML = '';
        book.categories.forEach(category => {
            const badge = document.createElement('span');
            badge.className = `book-badge ${category.toLowerCase()}`;
            badge.textContent = category;
            badges.appendChild(badge);
        });
        
        // Set description
        description.textContent = book.description;
        
        // Set price
        const hasDiscount = book.originalPrice && book.originalPrice > book.price;
        const discountPercentage = hasDiscount ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;
        
        price.innerHTML = `
            $${book.price.toFixed(2)}
            ${hasDiscount ? `<span class="original-price">$${book.originalPrice.toFixed(2)}</span>
            <span class="discount-badge">${discountPercentage}% off</span>` : ''}
        `;
        
        // Set view details link
        viewDetailsBtn.href = `book-details.html?id=${book.id}`;
        
        // Set add to cart button
        addToCartBtn.setAttribute('data-book-id', book.id);
        addToCartBtn.addEventListener('click', function() {
            const id = this.getAttribute('data-book-id');
            addToCart(id);
            closeQuickViewModal();
        });
        
        // Set bookmark button
        bookmarkBtn.setAttribute('data-book-id', book.id);
        
        // Check if book is already bookmarked
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
        if (bookmarks.includes(book.id.toString())) {
            bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
            bookmarkBtn.classList.add('bookmarked');
        } else {
            bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i> Bookmark';
            bookmarkBtn.classList.remove('bookmarked');
        }
        
        // Add event listener to bookmark button
        bookmarkBtn.addEventListener('click', function() {
            const id = this.getAttribute('data-book-id');
            toggleBookmark(id, this);
        });
        
        // Show modal
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    // Close quick view modal
    function closeQuickViewModal() {
        const modal = document.getElementById('quick-view-modal');
        
        if (modal) {
            modal.classList.remove('show');
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }
    
    // Generate star rating HTML
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        // Add half star if needed
        if (halfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml + ` <span class="rating-text">(${rating}/5)</span>`;
    }
    
    // Add to cart function
    function addToCart(bookId) {
        // Check if bookId is valid
        if (!bookId) {
            console.error('Invalid book ID');
            return;
        }
        
        // Check if CartUtils is available
        if (typeof CartUtils !== 'undefined' && typeof CartUtils.addToCart === 'function') {
            // Use the global CartUtils
            CartUtils.addToCart(bookId);
        } else {
            console.error('Add to cart function not available');
            
            // Fallback implementation if CartUtils is not available
            // Get cart from localStorage
            let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            
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
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            
            // Show notification
            showToast('Book added to cart');
        }
    }
    
    // Toggle bookmark function
    function toggleBookmark(bookId, buttonElement) {
        // Get bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
        
        // Check if book is already bookmarked
        const index = bookmarks.indexOf(bookId);
        
        if (index === -1) {
            // Add to bookmarks
            bookmarks.push(bookId);
            buttonElement.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
            buttonElement.classList.add('bookmarked');
            showToast('Book added to bookmarks');
        } else {
            // Remove from bookmarks
            bookmarks.splice(index, 1);
            buttonElement.innerHTML = '<i class="far fa-bookmark"></i> Bookmark';
            buttonElement.classList.remove('bookmarked');
            showToast('Book removed from bookmarks');
        }
        
        // Save to localStorage
        localStorage.setItem('bookmarkedBooks', JSON.stringify(bookmarks));
    }
    
    // Show toast notification
    function showToast(message) {
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
                    background-color: var(--primary-color);
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
    }
    
    // Add event listeners to quick view buttons
    function addQuickViewEventListeners() {
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        
        quickViewButtons.forEach(button => {
            // Remove any existing event listeners
            button.removeEventListener('click', quickViewClickHandler);
            
            // Add new event listener
            button.addEventListener('click', quickViewClickHandler);
        });
    }
    
    // Quick view click handler function
    function quickViewClickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const bookId = this.getAttribute('data-book-id');
        console.log('Quick view clicked for book ID:', bookId);
        openQuickViewModal(bookId);
    }
    
    // Initialize quick view
    addQuickViewEventListeners();
    
    // Add a mutation observer to handle dynamically added elements
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                addQuickViewEventListeners();
            }
        });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Export functions
    window.openQuickViewModal = openQuickViewModal;
    window.closeQuickViewModal = closeQuickViewModal;
});
