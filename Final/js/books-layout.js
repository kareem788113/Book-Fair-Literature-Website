/**
 * Books Layout JavaScript for LitFest - Book Fair & Literature Website
 * Improves the organization of books, ensures all images are displayed properly,
 * and provides sorting functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
    // Reliable image URLs for books
    const reliableBookImages = {
        'The Silent Patient': 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Where the Crawdads Sing': 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Educated': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Becoming': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'The Midnight Library': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Atomic Habits': 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'The Alchemist': 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'A Gentleman in Moscow': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
    
    // Default image if book title not found
    const defaultBookImage = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    
    // Get all book items
    const bookItems = document.querySelectorAll('.book-item');
    
    // Process each book item
    bookItems.forEach(bookItem => {
        // Get book title and image elements
        const bookTitle = bookItem.querySelector('.book-title').textContent;
        const bookImage = bookItem.querySelector('.book-cover img');
        const bookId = bookItem.querySelector('.bookmark-btn')?.getAttribute('data-book-id');
        
        // Check if image is broken or using Amazon URL
        if (!bookImage.complete || bookImage.naturalWidth === 0 || 
            bookImage.src.includes('amazon') || bookImage.src.includes('goodreads')) {
            
            // Set reliable image URL based on book title
            if (reliableBookImages[bookTitle]) {
                bookImage.src = reliableBookImages[bookTitle];
            } else {
                bookImage.src = defaultBookImage;
            }
        }
        
        // Add error handler for images
        bookImage.onerror = function() {
            // If image fails to load, use default image
            this.src = defaultBookImage;
        };
        
        // Set up bookmark button
        const bookmarkBtn = bookItem.querySelector('.bookmark-btn');
        if (bookmarkBtn && bookId) {
            // Check if book is already bookmarked
            if (bookmarks.includes(bookId)) {
                bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
                bookmarkBtn.classList.add('bookmarked');
            }
            
            // Add click event to bookmark button
            bookmarkBtn.addEventListener('click', function() {
                const id = this.getAttribute('data-book-id');
                toggleBookmark(id, this);
            });
        }
    });
    
    // Improve organization of book items
    function organizeBooks() {
        const searchResults = document.querySelector('.search-results');
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        const sortSelect = document.createElement('select');
        sortSelect.id = 'sort-books';
        sortSelect.className = 'sort-select';
        
        // Create sort options
        const sortOptions = [
            { value: 'title-asc', text: 'Title (A-Z)' },
            { value: 'title-desc', text: 'Title (Z-A)' },
            { value: 'price-asc', text: 'Price (Low to High)' },
            { value: 'price-desc', text: 'Price (High to Low)' },
            { value: 'rating-desc', text: 'Rating (High to Low)' },
            { value: 'popular', text: 'Most Popular' }
        ];
        
        // Add sort label and dropdown to header
        const booksHeader = document.querySelector('.books-header');
        if (booksHeader) {
            const sortContainer = document.createElement('div');
            sortContainer.className = 'books-sort';
            
            const sortLabel = document.createElement('label');
            sortLabel.htmlFor = 'sort-books';
            sortLabel.textContent = 'Sort by:';
            
            sortOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                sortSelect.appendChild(optionElement);
            });
            
            sortContainer.appendChild(sortLabel);
            sortContainer.appendChild(sortSelect);
            booksHeader.appendChild(sortContainer);
            
            // Add event listener for sorting
            sortSelect.addEventListener('change', function() {
                sortBooks(this.value);
            });
        }
        
        // Set up view switching
        if (gridView && listView) {
            gridView.addEventListener('click', function() {
                searchResults.classList.remove('list-view');
                searchResults.classList.add('grid-view');
                gridView.classList.add('active');
                listView.classList.remove('active');
            });
            
            listView.addEventListener('click', function() {
                searchResults.classList.remove('grid-view');
                searchResults.classList.add('list-view');
                listView.classList.add('active');
                gridView.classList.remove('active');
            });
        }
        
        // Initial sort by title
        sortBooks('title-asc');
        
        // Add animation delay to book items for staggered appearance
        bookItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.05}s`;
            item.classList.add('animate-in');
        });
    }
    
    // Sort books based on selected criteria
    function sortBooks(sortBy) {
        const searchResults = document.querySelector('.search-results');
        const bookItemsArray = Array.from(bookItems);
        
        // Sort the books based on the selected criteria
        bookItemsArray.sort((a, b) => {
            switch(sortBy) {
                case 'title-asc':
                    return a.querySelector('.book-title').textContent.localeCompare(
                        b.querySelector('.book-title').textContent
                    );
                case 'title-desc':
                    return b.querySelector('.book-title').textContent.localeCompare(
                        a.querySelector('.book-title').textContent
                    );
                case 'price-asc':
                    return parseFloat(a.querySelector('.book-price').textContent.replace('$', '')) -
                           parseFloat(b.querySelector('.book-price').textContent.replace('$', ''));
                case 'price-desc':
                    return parseFloat(b.querySelector('.book-price').textContent.replace('$', '')) -
                           parseFloat(a.querySelector('.book-price').textContent.replace('$', ''));
                case 'rating-desc':
                    const ratingA = parseFloat(a.querySelector('.rating-count').textContent.replace('(', '').split('/')[0]);
                    const ratingB = parseFloat(b.querySelector('.rating-count').textContent.replace('(', '').split('/')[0]);
                    return ratingB - ratingA;
                case 'popular':
                    const reviewsA = parseInt(a.querySelector('.reviews-count').textContent.split(' ')[0].replace(',', ''));
                    const reviewsB = parseInt(b.querySelector('.reviews-count').textContent.split(' ')[0].replace(',', ''));
                    return reviewsB - reviewsA;
                default:
                    return 0;
            }
        });
        
        // Reorder the DOM elements
        bookItemsArray.forEach(item => {
            searchResults.appendChild(item);
        });
    }
    
    // Call organize function
    organizeBooks();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .book-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .book-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .search-results {
            min-height: 400px;
        }
    `;
    document.head.appendChild(style);
    
    // Update book count
    const booksCount = document.getElementById('books-count');
    if (booksCount) {
        booksCount.textContent = bookItems.length;
    }
    
    // Toggle bookmark function
    function toggleBookmark(bookId, buttonElement) {
        const index = bookmarks.indexOf(bookId);
        
        if (index === -1) {
            // Add to bookmarks
            bookmarks.push(bookId);
            buttonElement.innerHTML = '<i class="fas fa-bookmark"></i>';
            buttonElement.classList.add('bookmarked');
            buttonElement.setAttribute('title', 'Remove from bookmarks');
            showToast('Book added to bookmarks');
        } else {
            // Remove from bookmarks
            bookmarks.splice(index, 1);
            buttonElement.innerHTML = '<i class="far fa-bookmark"></i>';
            buttonElement.classList.remove('bookmarked');
            buttonElement.setAttribute('title', 'Add to bookmarks');
            showToast('Book removed from bookmarks');
        }
        
        // Save to localStorage
        localStorage.setItem('bookmarkedBooks', JSON.stringify(bookmarks));
        
        // If on bookmarks page, remove the book item
        if (window.location.pathname.includes('bookmarks.html') && index !== -1) {
            const bookItem = buttonElement.closest('.book-item');
            bookItem.style.opacity = '0';
            bookItem.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                bookItem.remove();
                
                // Update count
                const remainingBooks = document.querySelectorAll('.book-item').length;
                if (booksCount) {
                    booksCount.textContent = remainingBooks;
                }
                
                // Show message if no bookmarks
                if (remainingBooks === 0) {
                    const searchResults = document.querySelector('.search-results');
                    if (searchResults) {
                        searchResults.innerHTML = `
                            <div class="no-bookmarks">
                                <i class="far fa-bookmark"></i>
                                <h3>No Bookmarked Books</h3>
                                <p>You haven't bookmarked any books yet. Browse our collection and bookmark your favorites!</p>
                                <a href="books.html" class="btn btn-primary">Browse Books</a>
                            </div>
                        `;
                    }
                }
            }, 300);
        }
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
});
