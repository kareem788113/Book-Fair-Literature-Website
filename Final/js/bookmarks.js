/**
 * Bookmarks JavaScript for LitFest - Book Fair & Literature Website
 * Handles loading and displaying bookmarked books
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only run on bookmarks page
    if (!window.location.pathname.includes('bookmarks.html')) {
        return;
    }
    
    // Get bookmarked book IDs from localStorage
    const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
    const searchResults = document.querySelector('.search-results');
    const booksCount = document.getElementById('books-count');
    
    // Remove loading spinner
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.remove();
    }
    
    // Update books count
    if (booksCount) {
        booksCount.textContent = bookmarkedIds.length;
    }
    
    // If no bookmarks, show message
    if (bookmarkedIds.length === 0) {
        searchResults.innerHTML = `
            <div class="no-bookmarks">
                <i class="far fa-bookmark"></i>
                <h3>No Bookmarked Books</h3>
                <p>You haven't bookmarked any books yet. Browse our collection and bookmark your favorites!</p>
                <a href="books.html" class="btn btn-primary">Browse Books</a>
            </div>
        `;
        return;
    }
    
    // Get books data
    if (typeof booksData === 'undefined') {
        console.error('Books data not loaded');
        searchResults.innerHTML = '<p>Error loading books data. Please try again later.</p>';
        return;
    }
    
    // Filter books by bookmarked IDs
    const bookmarkedBooks = booksData.filter(book => bookmarkedIds.includes(book.id.toString()));
    
    // Create HTML for each bookmarked book
    bookmarkedBooks.forEach(book => {
        const bookElement = createBookElement(book);
        searchResults.appendChild(bookElement);
    });
    
    // Create book element
    function createBookElement(book) {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        
        // Determine if book has a discount
        const hasDiscount = book.originalPrice && book.originalPrice > book.price;
        const discountPercentage = hasDiscount ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;
        
        // Create book HTML
        bookItem.innerHTML = `
            <div class="book-cover">
                <img src="${book.coverImage}" alt="${book.title}">
                ${book.bestseller ? '<div class="book-ribbon bestseller">Bestseller</div>' : ''}
                ${book.popular && !book.bestseller ? '<div class="book-ribbon popular">Popular</div>' : ''}
                <div class="book-actions">
                    <button class="bookmark-btn bookmarked" data-book-id="${book.id}" title="Remove from bookmarks">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="quick-view-btn" data-book-id="${book.id}" title="Quick view">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="book-info">
                <div class="book-badges">
                    ${book.categories.map(category => `<span class="book-badge ${category.toLowerCase()}">${category}</span>`).join('')}
                </div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">By <a href="author-details.html?id=${book.authorId}">${book.author}</a></p>
                <div class="book-rating">
                    ${generateStarRating(book.rating)}
                    <span class="rating-count">(${book.rating}/5)</span>
                    <span class="reviews-count">${book.reviews} reviews</span>
                </div>
                <p class="book-description">${book.description}</p>
                <div class="book-price-container">
                    <p class="book-price">$${book.price.toFixed(2)}</p>
                    ${hasDiscount ? `<p class="book-original-price">$${book.originalPrice.toFixed(2)}</p>
                    <span class="discount-badge">${discountPercentage}% off</span>` : ''}
                </div>
                <div class="book-buttons">
                    <a href="book-details.html?id=${book.id}" class="btn-small">View Details</a>
                    <button class="btn-small btn-primary add-to-cart" data-book-id="${book.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        return bookItem;
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
        
        return starsHtml;
    }
});
