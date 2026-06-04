/**
 * Book Details JavaScript for LitFest - Book Fair & Literature Website
 * Handles book details display, Google Books preview, ratings, and bookmarks
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get book ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    
    // Check if book ID exists
    if (!bookId) {
        window.location.href = 'books.html';
        return;
    }
    
    // Find book in data
    const book = booksData.find(b => b.id.toString() === bookId);
    if (!book) {
        window.location.href = 'books.html';
        return;
    }
    
    // Load book details
    loadBookDetails(book);
    
    // Load Google Books preview
    loadGoogleBooksPreview(book);
    
    // Load price comparison
    loadPriceComparison(book);
    
    // Load author info
    loadAuthorInfo(book);
    
    // Load reviews
    loadReviews(book);
    
    // Set up tabs
    setupTabs();
    
    // Set up format buttons
    setupFormatButtons();
    
    // Set up user rating
    setupUserRating();
    
    // Set up review form
    setupReviewForm(book);
    
    // Set up bookmark button
    setupBookmarkButton(book);
    
    // Set up share button
    setupShareButton(book);
    
    // Set up add to cart button
    setupAddToCartButton(book);
    
    // Check login status
    checkLoginStatus();
});

/**
 * Load book details into the page
 */
function loadBookDetails(book) {
    // Set page title
    document.title = `${book.title} - LitFest`;
    
    // Set book cover
    const bookCover = document.getElementById('book-cover');
    bookCover.src = book.coverImage;
    bookCover.alt = book.title;
    
    // Set book badge
    const bookBadge = document.getElementById('book-badge');
    if (book.badge) {
        bookBadge.textContent = book.badge;
        bookBadge.style.display = 'block';
    } else {
        bookBadge.style.display = 'none';
    }
    
    // Set book title
    document.getElementById('book-title').textContent = book.title;
    
    // Set author link
    const authorLink = document.getElementById('author-link');
    authorLink.textContent = book.author;
    authorLink.href = `authors.html?name=${encodeURIComponent(book.author)}`;
    
    // Set rating
    document.getElementById('rating-stars').innerHTML = generateStarRating(book.rating);
    document.getElementById('rating-value').textContent = book.rating.toFixed(1);
    
    // Set publisher and year
    document.getElementById('publisher').textContent = book.publisher;
    document.getElementById('publish-year').textContent = book.year;
    
    // Set price
    document.getElementById('book-price').textContent = `$${book.price.toFixed(2)}`;
    
    // Set description
    document.getElementById('book-description').textContent = book.description;
    
    // Set details
    document.getElementById('publisher-detail').textContent = book.publisher;
    document.getElementById('publish-date').textContent = `${getMonthName(Math.floor(Math.random() * 12))} ${book.year}`;
    
    // Set genres
    const genresContainer = document.getElementById('book-genres');
    book.genres.forEach(genre => {
        const genreTag = document.createElement('a');
        genreTag.href = `books.html?genre=${encodeURIComponent(genre)}`;
        genreTag.className = 'genre-tag';
        genreTag.textContent = genre;
        genresContainer.appendChild(genreTag);
    });
    
    // Set average rating in reviews tab
    document.getElementById('average-rating').textContent = book.rating.toFixed(1);
    document.getElementById('average-rating-stars').innerHTML = generateStarRating(book.rating);
}

/**
 * Load Google Books preview
 */
function loadGoogleBooksPreview(book) {
    const googlePreviewContainer = document.getElementById('google-preview');
    
    // Create iframe for Google Books preview
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/books/jsapi.js?id=${getGoogleBooksId(book.title, book.author)}`;
    iframe.title = `${book.title} preview`;
    iframe.allowfullscreen = true;
    
    googlePreviewContainer.appendChild(iframe);
    
    // Fallback if Google Books API doesn't load
    setTimeout(() => {
        if (iframe.contentDocument && iframe.contentDocument.body.innerHTML === '') {
            googlePreviewContainer.innerHTML = `
                <div class="preview-fallback">
                    <img src="${book.coverImage}" alt="${book.title}">
                    <p>Preview not available for this book.</p>
                    <p>You can search for this book on <a href="https://books.google.com/books?q=${encodeURIComponent(book.title + ' ' + book.author)}" target="_blank">Google Books</a>.</p>
                </div>
            `;
        }
    }, 3000);
}

/**
 * Get Google Books ID for a book (mock function)
 */
function getGoogleBooksId(title, author) {
    // In a real application, you would use the Google Books API to get the actual ID
    // For this demo, we'll generate a mock ID based on the title and author
    const combinedString = title + author;
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        hash = ((hash << 5) - hash) + combinedString.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
}

/**
 * Load price comparison data
 */
function loadPriceComparison(book) {
    const priceComparisonBody = document.getElementById('price-comparison-body');
    
    // Only Amazon retailer
    const retailer = {
        name: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
        prices: {
            hardcover: (book.price * 1).toFixed(2),
            paperback: (book.price * 0.8).toFixed(2),
            ebook: (book.price * 0.6).toFixed(2),
            audiobook: (book.price * 1.2).toFixed(2)
        }
    };
    
    // Clear existing rows
    priceComparisonBody.innerHTML = '';
    
    // Add hardcover row
    if (retailer.prices.hardcover) {
        addPriceRow(priceComparisonBody, retailer, 'Hardcover', retailer.prices.hardcover);
    }
    
    // Add paperback row
    if (retailer.prices.paperback) {
        addPriceRow(priceComparisonBody, retailer, 'Paperback', retailer.prices.paperback);
    }
    
    // Add ebook row
    if (retailer.prices.ebook) {
        addPriceRow(priceComparisonBody, retailer, 'eBook', retailer.prices.ebook);
    }
    
    // Add audiobook row
    if (retailer.prices.audiobook) {
        addPriceRow(priceComparisonBody, retailer, 'Audiobook', retailer.prices.audiobook);
    }
}

/**
 * Add a row to the price comparison table
 */
function addPriceRow(container, retailer, format, price) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <div class="retailer-info">
                <div class="retailer-logo">
                    <img src="${retailer.logo}" alt="${retailer.name}">
                </div>
                <span>${retailer.name}</span>
            </div>
        </td>
        <td>${format}</td>
        <td class="price-value">$${price}</td>
        <td>
            <a href="#" class="btn btn-primary btn-small"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
        </td>
    `;
    container.appendChild(row);
}

/**
 * Load author information
 */
function loadAuthorInfo(book) {
    // Set author name
    document.getElementById('author-name').textContent = book.author;
    
    // Set author image (using a placeholder)
    document.getElementById('author-image').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(book.author)}&size=200&background=random`;
    
    // Set author bio (mock data)
    document.getElementById('author-bio').textContent = generateAuthorBio(book.author);
    
    // Set author link
    document.getElementById('author-more').href = `authors.html?name=${encodeURIComponent(book.author)}`;
}

/**
 * Generate a mock author bio
 */
function generateAuthorBio(authorName) {
    const bios = [
        `${authorName} is a bestselling author known for creating captivating stories that resonate with readers around the world. With a background in literature and a passion for storytelling, ${authorName.split(' ')[0]} has published numerous acclaimed works that explore the depths of human experience.`,
        `Born in a small town, ${authorName} discovered a love for writing at an early age. After studying at university, ${authorName.split(' ')[0]} embarked on a writing career that has spanned over a decade, producing works that have been translated into multiple languages and adapted for the screen.`,
        `${authorName} lives with family in a coastal town where much of the inspiration for the vivid settings in the books comes from. When not writing, ${authorName.split(' ')[0]} enjoys hiking, photography, and collecting rare books.`,
        `Award-winning author ${authorName} has captivated readers with a unique storytelling style that blends literary fiction with elements of suspense and deep character development. A graduate of creative writing, ${authorName.split(' ')[0]} has taught at several prestigious universities while continuing to produce critically acclaimed novels.`
    ];
    
    return bios[Math.floor(Math.random() * bios.length)];
}

/**
 * Load similar books
 */
function loadSimilarBooks(book) {
    const similarBooksContainer = document.getElementById('similar-books-container');
    
    // Find books with similar genres
    const similarBooks = booksData
        .filter(b => b.id !== book.id && b.genres.some(genre => book.genres.includes(genre)))
        .slice(0, 4);
    
    // Clear container
    similarBooksContainer.innerHTML = '';
    
    // Add similar books
    similarBooks.forEach(similarBook => {
        const bookElement = document.createElement('div');
        bookElement.className = 'similar-book';
        bookElement.innerHTML = `
            <div class="similar-book-cover">
                <img src="${similarBook.coverImage}" alt="${similarBook.title}">
            </div>
            <div class="similar-book-info">
                <h3 class="similar-book-title">
                    <a href="book-details.html?id=${similarBook.id}">${similarBook.title}</a>
                </h3>
                <p class="similar-book-author">by ${similarBook.author}</p>
                <div class="similar-book-rating">
                    ${generateStarRating(similarBook.rating)}
                    <span>(${similarBook.rating})</span>
                </div>
            </div>
        `;
        similarBooksContainer.appendChild(bookElement);
    });
    
    // If no similar books found
    if (similarBooks.length === 0) {
        similarBooksContainer.innerHTML = '<p>No similar books found.</p>';
    }
}

/**
 * Load reviews
 */
function loadReviews(book) {
    const reviewsContainer = document.getElementById('reviews-container');
    
    // Mock reviews
    const reviews = [
        {
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
            date: '2025-05-10',
            rating: 5,
            title: 'Absolutely captivating!',
            content: 'I couldn\'t put this book down! The characters are so well-developed and the plot kept me guessing until the very end. Definitely one of my favorite reads this year.'
        },
        {
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
            date: '2025-05-05',
            rating: 4,
            title: 'Engaging and thought-provoking',
            content: 'The author does a fantastic job of weaving complex themes throughout the narrative. While some parts felt a bit slow, the overall story was engaging and left me thinking about it for days afterward.'
        },
        {
            name: 'Emily Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            date: '2025-04-28',
            rating: 5,
            title: 'A masterpiece of storytelling',
            content: 'This book exceeded all my expectations. The prose is beautiful, the characters feel like real people, and the story is both heartbreaking and uplifting. I\'ve already recommended it to all my friends.'
        },
        {
            name: 'David Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
            date: '2025-04-15',
            rating: 3,
            title: 'Good but not great',
            content: 'While I enjoyed the premise and some of the characters, I felt the middle section dragged a bit. The ending was satisfying though, and I would still recommend it to fans of the genre.'
        }
    ];
    
    // Clear container
    reviewsContainer.innerHTML = '';
    
    // Add reviews
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <img src="${review.avatar}" alt="${review.name}">
                    </div>
                    <div>
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-date">${formatDate(review.date)}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStarRating(review.rating)}
                </div>
            </div>
            <h4 class="review-title">${review.title}</h4>
            <p class="review-content">${review.content}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

/**
 * Set up tabs
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Set up format buttons
 */
function setupFormatButtons() {
    const formatButtons = document.querySelectorAll('.format-btn');
    const priceElement = document.getElementById('book-price');
    const bookId = new URLSearchParams(window.location.search).get('id');
    const book = booksData.find(b => b.id.toString() === bookId);
    
    formatButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            formatButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Get format
            const format = this.getAttribute('data-format');
            
            // Update price based on format
            let price = book.price;
            switch (format) {
                case 'hardcover':
                    price = book.price;
                    break;
                case 'paperback':
                    price = book.price * 0.8;
                    break;
                case 'ebook':
                    price = book.price * 0.6;
                    break;
                case 'audiobook':
                    price = book.price * 1.2;
                    break;
            }
            
            // Update price display
            priceElement.textContent = `$${price.toFixed(2)}`;
        });
    });
}

/**
 * Set up user rating
 */
function setupUserRating() {
    const stars = document.querySelectorAll('.user-stars i');
    let selectedRating = 0;
    
    stars.forEach(star => {
        // Hover effect
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateStars(rating);
        });
        
        // Click to select
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            updateStars(selectedRating);
        });
    });
    
    // Reset on mouseout if no rating selected
    document.querySelector('.user-stars').addEventListener('mouseout', function() {
        updateStars(selectedRating);
    });
    
    // Function to update stars display
    function updateStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
}

/**
 * Set up review form
 */
function setupReviewForm(book) {
    const reviewForm = document.getElementById('review-form');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Please log in to submit a review');
            return;
        }
        
        // Get form values
        const title = document.getElementById('review-title').value;
        const content = document.getElementById('review-content').value;
        
        // Get selected rating
        const selectedRating = document.querySelectorAll('.user-stars .fas').length;
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // Create new review
        const newReview = {
            name: currentUser.name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&size=200&background=random`,
            date: new Date().toISOString().split('T')[0],
            rating: selectedRating,
            title: title,
            content: content
        };
        
        // Add review to page
        const reviewsContainer = document.getElementById('reviews-container');
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <img src="${newReview.avatar}" alt="${newReview.name}">
                    </div>
                    <div>
                        <div class="reviewer-name">${newReview.name}</div>
                        <div class="review-date">${formatDate(newReview.date)}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStarRating(newReview.rating)}
                </div>
            </div>
            <h4 class="review-title">${newReview.title}</h4>
            <p class="review-content">${newReview.content}</p>
        `;
        
        // Add new review at the top
        reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);
        
        // Reset form
        reviewForm.reset();
        
        // Reset stars
        document.querySelectorAll('.user-stars i').forEach(star => {
            star.className = 'far fa-star';
        });
        
        // Show success message
        alert('Your review has been submitted');
    });
}

/**
 * Set up bookmark button
 */
function setupBookmarkButton(book) {
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const bookmarkIcon = bookmarkBtn.querySelector('i');
    const bookmarkText = bookmarkBtn.querySelector('span');
    
    // Check if book is already bookmarked
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
        const userBookmarks = bookmarks[currentUser.id] || [];
        
        const isBookmarked = userBookmarks.some(bookmark => bookmark.bookId === book.id.toString());
        if (isBookmarked) {
            bookmarkIcon.className = 'fas fa-bookmark';
            bookmarkText.textContent = 'Bookmarked';
        }
    }
    
    // Add click event
    bookmarkBtn.addEventListener('click', function() {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Please log in to bookmark books');
            return;
        }
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userId = currentUser.id;
        
        // Get bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
        
        // Initialize user's bookmarks if not exists
        if (!bookmarks[userId]) {
            bookmarks[userId] = [];
        }
        
        // Check if book is already bookmarked
        const bookmarkIndex = bookmarks[userId].findIndex(bookmark => bookmark.bookId === book.id.toString());
        
        if (bookmarkIndex === -1) {
            // Add bookmark
            bookmarks[userId].push({
                bookId: book.id.toString(),
                bookTitle: book.title,
                date: new Date().toISOString()
            });
            
            // Update button
            bookmarkIcon.className = 'fas fa-bookmark';
            bookmarkText.textContent = 'Bookmarked';
            
            // Show success message
            alert('Book added to your bookmarks');
        } else {
            // Remove bookmark
            bookmarks[userId].splice(bookmarkIndex, 1);
            
            // Update button
            bookmarkIcon.className = 'far fa-bookmark';
            bookmarkText.textContent = 'Bookmark this Book';
            
            // Show success message
            alert('Book removed from your bookmarks');
        }
        
        // Save bookmarks to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    });
}

/**
 * Set up share button
 */
function setupShareButton(book) {
    const shareBtn = document.getElementById('share-btn');
    
    shareBtn.addEventListener('click', function() {
        // Create share data
        const shareData = {
            title: book.title,
            text: `Check out "${book.title}" by ${book.author} on LitFest`,
            url: window.location.href
        };
        
        // Check if Web Share API is supported
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Shared successfully'))
                .catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback for browsers that don't support Web Share API
            prompt('Copy this link to share:', window.location.href);
        }
    });
}

/**
 * Set up add to cart button
 */
function setupAddToCartButton(book) {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    // Make sure the button has the book ID as a data attribute
    addToCartBtn.setAttribute('data-book-id', book.id);
    
    addToCartBtn.addEventListener('click', function() {
        // Get the book ID from the button
        const bookId = this.getAttribute('data-book-id');
        
        // Add to cart using the global CartUtils
        CartUtils.addToCart(bookId);
    });
}

/**
 * Check login status
 */
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        profileBtn.style.display = 'inline-block';
    } else {
        loginBtn.style.display = 'inline-block';
        profileBtn.style.display = 'none';
    }
}

/**
 * Generate star rating HTML
 */
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

/**
 * Format date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Get month name
 */
function getMonthName(monthIndex) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
}
