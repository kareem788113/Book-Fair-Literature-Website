/**
 * Books Page JavaScript for LitFest
 * Handles taxonomy navigation, sorting, and view switching functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const searchResults = document.querySelector('.search-results');
    const bookItems = document.querySelectorAll('.book-item');
    const booksCount = document.getElementById('books-count');
    const sortSelect = document.getElementById('sort-by');
    const showFiltersBtn = document.getElementById('show-filters');
    const taxonomySidebar = document.querySelector('.taxonomy-sidebar');
    const taxonomyLinks = document.querySelectorAll('.taxonomy-link');
    
    // View switching (Grid/List)
    gridViewBtn.addEventListener('click', function() {
        searchResults.classList.remove('list-view');
        searchResults.classList.add('grid-view');
        listViewBtn.classList.remove('active');
        gridViewBtn.classList.add('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        searchResults.classList.remove('grid-view');
        searchResults.classList.add('list-view');
        gridViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
    });
    
    // Mobile taxonomy toggle
    if (showFiltersBtn) {
        showFiltersBtn.addEventListener('click', function() {
            taxonomySidebar.classList.toggle('show');
        });
    }
    
    // Taxonomy links
    taxonomyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            taxonomyLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Filter books by category
            filterBooksByCategory(category);
            
            // Close mobile sidebar if open
            if (window.innerWidth < 992) {
                taxonomySidebar.classList.remove('show');
            }
        });
    });
    
    // Function to filter books by category
    function filterBooksByCategory(category) {
        if (!category) {
            // Show all books if no category selected
            bookItems.forEach(book => {
                book.style.display = 'block';
            });
        } else {
            // Filter books by category
            const categories = category.split(' ');
            
            bookItems.forEach(book => {
                const bookBadges = Array.from(book.querySelectorAll('.book-badge')).map(badge => badge.classList[1]);
                const bookRibbon = book.querySelector('.book-ribbon');
                const ribbonClass = bookRibbon ? bookRibbon.classList[1] : '';
                
                // Check if book matches any of the categories
                const matchesCategory = categories.some(cat => {
                    return bookBadges.includes(cat) || ribbonClass === cat;
                });
                
                book.style.display = matchesCategory ? 'block' : 'none';
            });
        }
        
        // Update books count
        updateBooksCount();
    }
    
    // Sorting functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortBooks(this.value);
        });
    }
    
    // Show more links
    document.querySelectorAll('.show-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterOptions = this.previousElementSibling;
            const hiddenOptions = filterOptions.querySelectorAll('.filter-option.hidden');
            
            hiddenOptions.forEach(option => {
                option.classList.remove('hidden');
            });
            
            this.style.display = 'none';
        });
    });
    
    // Bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            toggleBookmark(bookId, this);
        });
    });
    
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            showQuickView(bookId);
        });
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            addToCart(bookId);
        });
    });
    
    // Helper function to check URL parameters for pre-filtering
    function checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const author = urlParams.get('author');
        
        if (author) {
            // Filter books by author name
            bookItems.forEach(book => {
                const authorElement = book.querySelector('.book-author');
                if (authorElement && authorElement.textContent.includes(author)) {
                    book.style.display = 'block';
                } else {
                    book.style.display = 'none';
                }
            });
            
            // Update books count
            updateBooksCount();
        }
    }
    
    // Check URL parameters on page load
    checkUrlParameters();
    
    // Update books count
    function updateBooksCount() {
        const visibleBooks = document.querySelectorAll('.book-item[style="display: block"]').length;
        booksCount.textContent = visibleBooks;
    }
    
    // Sort books
    function sortBooks(sortBy) {
        const booksArray = Array.from(bookItems);
        
        booksArray.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return getPriceValue(a) - getPriceValue(b);
                case 'price-high':
                    return getPriceValue(b) - getPriceValue(a);
                case 'rating':
                    return getRatingValue(b) - getRatingValue(a);
                case 'newest':
                    // For demo purposes, we'll use a random sort for newest
                    return Math.random() - 0.5;
                default:
                    return 0;
            }
        });
        
        // Reappend sorted books
        booksArray.forEach(book => {
            searchResults.appendChild(book);
        });
    }
    
    // Helper function to get price value
    function getPriceValue(bookElement) {
        const priceElement = bookElement.querySelector('.book-price');
        return priceElement ? parseFloat(priceElement.textContent.replace('$', '')) : 0;
    }
    
    // Helper function to get rating value
    function getRatingValue(bookElement) {
        const ratingElement = bookElement.querySelector('.rating-count');
        return ratingElement ? parseFloat(ratingElement.textContent.replace(/[()]/g, '')) : 0;
    }
    
    // Toggle bookmark
    function toggleBookmark(bookId, button) {
        const icon = button.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            // Show notification
            showNotification('Book added to your bookmarks');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            // Show notification
            showNotification('Book removed from your bookmarks');
        }
    }
    
    // Show quick view
    function showQuickView(bookId) {
        // This would typically fetch book details and show a modal
        // For demo purposes, we'll just show a notification
        showNotification('Quick view not implemented in this demo');
    }
    
    // Add to cart function now uses the global CartUtils
    function addToCart(bookId) {
        // Use the global CartUtils to add to cart
        if (typeof CartUtils !== 'undefined') {
            CartUtils.addToCart(bookId);
        } else {
            console.error('Add to cart function not available');
        }
    }
    
    // Show notification
    function showNotification(message) {
        // Check if notification container exists, if not create it
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
