/**
 * Enhanced Bookmarks JavaScript
 * Provides improved functionality for the bookmarks page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchResults = document.querySelector('.search-results');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const emptyState = document.querySelector('.empty-state');
    const booksCountElement = document.getElementById('books-count');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    
    // View mode
    let currentViewMode = 'grid';
    
    // Initialize
    initializeBookmarks();
    
    // Set up event listeners
    setupEventListeners();
    
    /**
     * Initialize the bookmarks page
     */
    function initializeBookmarks() {
        // Simulate loading delay
        setTimeout(() => {
            // Get bookmarked books from localStorage
            const bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
            
            // Update books count
            updateBooksCount(bookmarkedItems.length);
            
            // Show appropriate view based on bookmarks count
            if (bookmarkedItems.length === 0) {
                showEmptyState();
            } else {
                renderBookmarks(bookmarkedItems);
            }
        }, 1500);
    }
    
    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // View mode buttons
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', function() {
                setViewMode('grid');
            });
        }
        
        if (listViewBtn) {
            listViewBtn.addEventListener('click', function() {
                setViewMode('list');
            });
        }
        
        // Load view mode from localStorage
        const savedViewMode = localStorage.getItem('bookmarksViewMode');
        if (savedViewMode) {
            setViewMode(savedViewMode);
        }
    }
    
    /**
     * Set the view mode (grid or list)
     * @param {string} mode - The view mode ('grid' or 'list')
     */
    function setViewMode(mode) {
        currentViewMode = mode;
        
        // Update buttons
        if (gridViewBtn) {
            gridViewBtn.classList.toggle('active', mode === 'grid');
        }
        
        if (listViewBtn) {
            listViewBtn.classList.toggle('active', mode === 'list');
        }
        
        // Update search results container
        if (searchResults) {
            searchResults.className = `search-results ${mode}-view`;
        }
        
        // Save preference to localStorage
        localStorage.setItem('bookmarksViewMode', mode);
    }
    
    /**
     * Show empty state when no bookmarks exist
     */
    function showEmptyState() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        if (emptyState) {
            emptyState.style.display = 'block';
        }
    }
    
    /**
     * Update the books count display
     * @param {number} count - The number of bookmarked books
     */
    function updateBooksCount(count) {
        if (booksCountElement) {
            booksCountElement.textContent = count;
        }
    }
    
    /**
     * Render bookmarked books
     * @param {Array} bookmarkIds - Array of bookmarked book IDs
     */
    function renderBookmarks(bookmarkIds) {
        if (!searchResults) return;
        
        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        // Clear existing content (except loading spinner)
        const existingBooks = searchResults.querySelectorAll('.book-card');
        existingBooks.forEach(book => book.remove());
        
        // Check if booksData is available
        if (typeof booksData === 'undefined') {
            console.error('Books data not loaded');
            searchResults.innerHTML = '<p>Error loading books data. Please try again later.</p>';
            return;
        }
        
        // Filter books by bookmarked IDs
        const bookmarkedBooks = booksData.filter(book => bookmarkIds.includes(book.id.toString()));
        
        // Create book cards
        bookmarkedBooks.forEach(book => {
            const bookCard = createBookCard(book);
            searchResults.appendChild(bookCard);
        });
    }
    
    /**
     * Create a book card element
     * @param {Object} book - Book object
     * @returns {HTMLElement} - Book card element
     */
    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.id;
        
        // Create image section
        const imageSection = document.createElement('div');
        imageSection.className = 'book-card-image';
        
        const img = document.createElement('img');
        img.src = book.coverImage || 'images/book-placeholder.jpg';
        img.alt = book.title;
        imageSection.appendChild(img);
        
        // Add bestseller or popular ribbon if applicable
        if (book.bestseller) {
            const ribbon = document.createElement('div');
            ribbon.className = 'book-ribbon bestseller';
            ribbon.textContent = 'Bestseller';
            imageSection.appendChild(ribbon);
        } else if (book.popular) {
            const ribbon = document.createElement('div');
            ribbon.className = 'book-ribbon popular';
            ribbon.textContent = 'Popular';
            imageSection.appendChild(ribbon);
        }
        
        // Create content section
        const contentSection = document.createElement('div');
        contentSection.className = 'book-card-content';
        
        // Add category badges
        if (book.categories && book.categories.length > 0) {
            const badges = document.createElement('div');
            badges.className = 'book-badges';
            
            book.categories.forEach(category => {
                const badge = document.createElement('span');
                badge.className = `book-badge ${category.toLowerCase()}`;
                badge.textContent = category;
                badges.appendChild(badge);
            });
            
            contentSection.appendChild(badges);
        }
        
        const title = document.createElement('h3');
        title.className = 'book-card-title';
        title.textContent = book.title;
        
        const author = document.createElement('p');
        author.className = 'book-card-author';
        author.innerHTML = `By <a href="author-details.html?id=${book.authorId}">${book.author}</a>`;
        
        // Add rating
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'book-rating';
        ratingDiv.innerHTML = `
            ${generateStarRating(book.rating)}
            <span class="rating-count">(${book.rating}/5)</span>
            <span class="reviews-count">${book.reviews} reviews</span>
        `;
        
        const description = document.createElement('p');
        description.className = 'book-card-description';
        description.textContent = book.description || 'No description available.';
        
        // Create footer section
        const footer = document.createElement('div');
        footer.className = 'book-card-footer';
        
        // Price section with potential discount
        const priceContainer = document.createElement('div');
        priceContainer.className = 'book-price-container';
        
        const price = document.createElement('p');
        price.className = 'book-price';
        price.textContent = `$${book.price.toFixed(2)}`;
        priceContainer.appendChild(price);
        
        // Check for discount
        if (book.originalPrice && book.originalPrice > book.price) {
            const originalPrice = document.createElement('p');
            originalPrice.className = 'book-original-price';
            originalPrice.textContent = `$${book.originalPrice.toFixed(2)}`;
            priceContainer.appendChild(originalPrice);
            
            const discountPercentage = Math.round((1 - book.price / book.originalPrice) * 100);
            const discountBadge = document.createElement('span');
            discountBadge.className = 'discount-badge';
            discountBadge.textContent = `${discountPercentage}% off`;
            priceContainer.appendChild(discountBadge);
        }
        
        footer.appendChild(priceContainer);
        
        const actions = document.createElement('div');
        actions.className = 'book-card-actions';
        
        // Create action buttons
        const viewBtn = document.createElement('button');
        viewBtn.className = 'book-card-btn view-btn';
        viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
        viewBtn.title = 'Quick View';
        viewBtn.addEventListener('click', () => openQuickView(book.id));
        
        const cartBtn = document.createElement('button');
        cartBtn.className = 'book-card-btn cart-btn';
        cartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        cartBtn.title = 'Add to Cart';
        cartBtn.addEventListener('click', () => addToCart(book.id));
        
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'book-card-btn bookmark-btn active';
        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
        bookmarkBtn.title = 'Remove Bookmark';
        bookmarkBtn.addEventListener('click', () => removeBookmark(book.id));
        
        // Append elements
        actions.appendChild(viewBtn);
        actions.appendChild(cartBtn);
        actions.appendChild(bookmarkBtn);
        
        footer.appendChild(actions);
        
        contentSection.appendChild(title);
        contentSection.appendChild(author);
        contentSection.appendChild(ratingDiv);
        contentSection.appendChild(description);
        contentSection.appendChild(footer);
        
        card.appendChild(imageSection);
        card.appendChild(contentSection);
        
        return card;
    }
    
    /**
     * Open quick view for a book
     * @param {string} bookId - Book ID
     */
    function openQuickView(bookId) {
        // This function would typically trigger the quick view modal
        console.log('Opening quick view for book:', bookId);
        
        // If a global quick view function exists, call it
        if (typeof showQuickView === 'function') {
            showQuickView(bookId);
        }
    }
    
    /**
     * Add a book to cart
     * @param {string} bookId - Book ID
     */
    function addToCart(bookId) {
        console.log('Adding book to cart:', bookId);
        
        // Get current cart items
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Check if book is already in cart
        const isInCart = cartItems.some(item => item.id === bookId);
        
        if (!isInCart) {
            // Get book details from bookmarked items
            const bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
            const book = bookmarkedItems.find(item => item.id === bookId);
            
            if (book) {
                // Add to cart
                cartItems.push({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    cover: book.cover,
                    price: book.price,
                    quantity: 1
                });
                
                // Save to localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Show success message
                showToast('Book added to cart successfully!');
                
                // Update cart count if a function exists
                if (typeof updateCartCount === 'function') {
                    updateCartCount();
                }
            }
        } else {
            showToast('This book is already in your cart.');
        }
    }
    
    /**
     * Remove a bookmark
     * @param {string} bookId - Book ID
     */
    function removeBookmark(bookId) {
        console.log('Removing bookmark:', bookId);
        
        // Get current bookmarked items
        const bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
        
        // Remove the book
        const updatedBookmarks = bookmarkedItems.filter(item => item.id !== bookId);
        
        // Save to localStorage
        localStorage.setItem('bookmarkedBooks', JSON.stringify(updatedBookmarks));
        
        // Show success message
        showToast('Book removed from bookmarks.');
        
        // Update the UI
        const bookCard = document.querySelector(`.book-card[data-id="${bookId}"]`);
        if (bookCard) {
            // Animate removal
            bookCard.style.transition = 'all 0.3s ease';
            bookCard.style.opacity = '0';
            bookCard.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                bookCard.remove();
                
                // Update books count
                updateBooksCount(updatedBookmarks.length);
                
                // Show empty state if no bookmarks left
                if (updatedBookmarks.length === 0) {
                    showEmptyState();
                }
            }, 300);
        }
    }
    
    /**
     * Generate star rating HTML
     * @param {number} rating - The rating value (0-5)
     * @returns {string} - HTML for star rating
     */
    function generateStarRating(rating) {
        let starsHtml = '';
        
        // Convert rating to nearest half star
        const roundedRating = Math.round(rating * 2) / 2;
        
        // Generate 5 stars
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                // Full star
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 === roundedRating) {
                // Half star
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                // Empty star
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        
        return starsHtml;
    }
    
    /**
     * Show a toast notification
     * @param {string} message - The message to display
     */
    function showToast(message) {
        // Check if toast container exists, create if not
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
            
            // Add styles if not already added
            if (!document.getElementById('toast-styles')) {
                const style = document.createElement('style');
                style.id = 'toast-styles';
                style.textContent = `
                    .toast-container {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        z-index: 1000;
                    }
                    
                    .toast {
                        background-color: #4a6fa5;
                        color: white;
                        padding: 12px 20px;
                        border-radius: 4px;
                        margin-top: 10px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        display: flex;
                        align-items: center;
                        animation: toast-in 0.3s ease-out forwards;
                    }
                    
                    .toast i {
                        margin-right: 10px;
                    }
                    
                    @keyframes toast-in {
                        from {
                            transform: translateY(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    
                    .theme-dark .toast {
                        background-color: #4a6fa5;
                    }
                    
                    .theme-vintage .toast {
                        background-color: #8b6b4c;
                    }
                    
                    .theme-modern .toast {
                        background-color: #6c63ff;
                        border-radius: 30px;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
});
