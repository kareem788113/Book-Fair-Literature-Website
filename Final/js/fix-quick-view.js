/**
 * Fix Quick View Functionality
 * This script ensures the quick view buttons work correctly
 */

document.addEventListener('DOMContentLoaded', function() {
    // Direct approach to fix quick view buttons
    setTimeout(function() {
        console.log('Fixing quick view buttons...');
        
        // Get all quick view buttons
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        console.log('Found', quickViewButtons.length, 'quick view buttons');
        
        // Add click event listeners directly
        quickViewButtons.forEach(function(button) {
            // Remove existing listeners by cloning the button
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new click event listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const bookId = this.getAttribute('data-book-id');
                console.log('Quick view clicked for book ID:', bookId);
                
                // Create and show modal directly
                showQuickViewModal(bookId);
                
                return false;
            });
        });
    }, 500); // Small delay to ensure DOM is fully loaded
    
    // Function to show quick view modal
    function showQuickViewModal(bookId) {
        console.log('Showing quick view modal for book ID:', bookId);
        
        // Find book data
        if (typeof booksData === 'undefined') {
            console.error('Books data not loaded');
            alert('Error: Book data not available');
            return;
        }
        
        const book = booksData.find(b => b.id.toString() === bookId);
        if (!book) {
            console.error('Book not found:', bookId);
            return;
        }
        
        // Create modal if it doesn't exist
        let modal = document.getElementById('quick-view-modal');
        if (!modal) {
            modal = document.createElement('div');
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
            
            // Add CSS for modal if not already added
            if (!document.getElementById('quick-view-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'quick-view-modal-styles';
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
                    }
                    
                    .modal-content {
                        background-color: var(--bg-color, #fff);
                        margin: 5% auto;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                        max-width: 900px;
                        width: 90%;
                        position: relative;
                    }
                    
                    .close-modal {
                        position: absolute;
                        right: 20px;
                        top: 15px;
                        font-size: 28px;
                        font-weight: bold;
                        color: #aaa;
                        cursor: pointer;
                    }
                    
                    .close-modal:hover {
                        color: #333;
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
                    }
                    
                    .quick-view-author {
                        color: #666;
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
                        line-height: 1.6;
                    }
                    
                    .quick-view-price {
                        font-size: 1.2rem;
                        font-weight: 600;
                        color: #2ecc71;
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
        }
        
        // Get modal elements
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
        const closeBtn = modal.querySelector('.close-modal');
        
        // Set book data
        image.src = book.coverImage;
        image.alt = book.title;
        title.textContent = book.title;
        author.textContent = `By ${book.author}`;
        
        // Generate star rating
        let ratingHtml = '';
        const fullStars = Math.floor(book.rating);
        const halfStar = book.rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        for (let i = 0; i < fullStars; i++) {
            ratingHtml += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            ratingHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            ratingHtml += '<i class="far fa-star"></i>';
        }
        
        rating.innerHTML = ratingHtml + ` <span>(${book.rating}/5)</span>`;
        
        // Generate badges
        badges.innerHTML = '';
        if (book.categories) {
            book.categories.forEach(category => {
                const badge = document.createElement('span');
                badge.className = `book-badge ${category.toLowerCase()}`;
                badge.textContent = category;
                badges.appendChild(badge);
            });
        }
        
        // Set description
        description.textContent = book.description;
        
        // Set price
        const hasDiscount = book.originalPrice && book.originalPrice > book.price;
        price.innerHTML = `$${book.price.toFixed(2)}`;
        if (hasDiscount) {
            price.innerHTML += ` <span style="text-decoration: line-through; color: #999; font-size: 0.9rem;">$${book.originalPrice.toFixed(2)}</span>`;
        }
        
        // Set view details link
        viewDetailsBtn.href = `book-details.html?id=${book.id}`;
        
        // Set add to cart button
        addToCartBtn.setAttribute('data-book-id', book.id);
        addToCartBtn.onclick = function() {
            // Add to cart functionality
            let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            
            // Check if book is already in cart
            const existingItem = cart.find(item => item.id === bookId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
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
            
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            alert('Book added to cart');
            modal.style.display = 'none';
        };
        
        // Set bookmark button
        bookmarkBtn.setAttribute('data-book-id', book.id);
        
        // Check if book is already bookmarked
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
        if (bookmarks.includes(book.id.toString())) {
            bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.setAttribute('title', 'Remove from bookmarks');
        } else {
            bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            bookmarkBtn.classList.remove('bookmarked');
            bookmarkBtn.setAttribute('title', 'Add to bookmarks');
        }
        
        // Add event listener to bookmark button
        bookmarkBtn.onclick = function() {
            const bookId = this.getAttribute('data-book-id');
            const bookmarks = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
            const index = bookmarks.indexOf(bookId);
            
            if (index === -1) {
                bookmarks.push(bookId);
                this.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
                this.classList.add('bookmarked');
                alert('Book added to bookmarks');
            } else {
                bookmarks.splice(index, 1);
                this.innerHTML = '<i class="far fa-bookmark"></i> Bookmark';
                this.classList.remove('bookmarked');
                alert('Book removed from bookmarks');
            }
            
            localStorage.setItem('bookmarkedBooks', JSON.stringify(bookmarks));
        };
        
        // Add event listener to close button
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
        
        // Close when clicking outside the modal
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Show modal
        modal.style.display = 'block';
    }
});
