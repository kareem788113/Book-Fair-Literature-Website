/**
 * Main JavaScript file for LitFest - Book Fair & Literature Website
 * Author: Cascade AI
 * Date: May 20, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            // Simple validation
            if (email && validateEmail(email)) {
                newsletterMessage.textContent = 'Thank you for subscribing!';
                newsletterMessage.style.color = 'var(--success-color)';
                newsletterForm.reset();
                
                // Store subscription in localStorage
                const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
                subscriptions.push({ email: email, date: new Date().toISOString() });
                localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
            } else {
                newsletterMessage.textContent = 'Please enter a valid email.';
                newsletterMessage.style.color = 'var(--error-color)';
            }
        });
    }
    
    // Check if user is logged in
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    
    if (loginBtn && profileBtn) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (isLoggedIn === 'true') {
            loginBtn.style.display = 'none';
            profileBtn.style.display = 'inline-block';
        } else {
            loginBtn.style.display = 'inline-block';
            profileBtn.style.display = 'none';
        }
    }
    
    // Book search functionality
    const searchForm = document.querySelector('.search-container form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="query"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                alert('Please enter a search term');
            }
        });
    }
    
    // Bookmark functionality
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    if (bookmarkButtons.length > 0) {
        bookmarkButtons.forEach(btn => {
            const bookId = btn.getAttribute('data-book-id');
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            
            // Check if book is already bookmarked
            if (bookmarks.includes(bookId)) {
                btn.classList.add('bookmarked');
                btn.querySelector('i').classList.remove('far');
                btn.querySelector('i').classList.add('fas');
            }
            
            btn.addEventListener('click', function() {
                const bookId = this.getAttribute('data-book-id');
                const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
                
                if (bookmarks.includes(bookId)) {
                    // Remove bookmark
                    const index = bookmarks.indexOf(bookId);
                    bookmarks.splice(index, 1);
                    this.classList.remove('bookmarked');
                    this.querySelector('i').classList.add('far');
                    this.querySelector('i').classList.remove('fas');
                } else {
                    // Add bookmark
                    bookmarks.push(bookId);
                    this.classList.add('bookmarked');
                    this.querySelector('i').classList.remove('far');
                    this.querySelector('i').classList.add('fas');
                }
                
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            });
        });
    }
    
    // Initialize tabs if present
    initTabs();
    
    // Initialize view switcher if present
    initViewSwitcher();
    
    // Initialize pagination if present
    initPagination();
});

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Initialize tabs functionality
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    if (tabContainers.length > 0) {
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab-link');
            const tabContents = container.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to current tab and content
                    this.classList.add('active');
                    const target = this.getAttribute('data-tab');
                    document.getElementById(target).classList.add('active');
                });
            });
        });
    }
}

// Initialize view switcher (List/Grid view)
function initViewSwitcher() {
    const viewSwitcher = document.querySelector('.view-switcher');
    
    if (viewSwitcher) {
        const listViewBtn = viewSwitcher.querySelector('.list-view-btn');
        const gridViewBtn = viewSwitcher.querySelector('.grid-view-btn');
        const resultsContainer = document.querySelector('.search-results');
        
        // Set initial view from localStorage or default to grid
        const currentView = localStorage.getItem('view') || 'grid';
        resultsContainer.className = 'search-results ' + currentView + '-view';
        
        if (currentView === 'list') {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        } else {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        }
        
        listViewBtn.addEventListener('click', function() {
            resultsContainer.className = 'search-results list-view';
            this.classList.add('active');
            gridViewBtn.classList.remove('active');
            localStorage.setItem('view', 'list');
        });
        
        gridViewBtn.addEventListener('click', function() {
            resultsContainer.className = 'search-results grid-view';
            this.classList.add('active');
            listViewBtn.classList.remove('active');
            localStorage.setItem('view', 'grid');
        });
    }
}

// Initialize pagination
function initPagination() {
    const pagination = document.querySelector('.pagination');
    
    if (pagination) {
        const pageLinks = pagination.querySelectorAll('a');
        
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (!this.getAttribute('href')) {
                    e.preventDefault();
                }
            });
        });
    }
}

// Function to fetch book details from Google Books API
function fetchBookDetails(isbn) {
    if (!isbn) return;
    
    const detailsContainer = document.getElementById('google-books-details');
    if (!detailsContainer) return;
    
    detailsContainer.innerHTML = '<p>Loading book details...</p>';
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const book = data.items[0].volumeInfo;
                let html = `
                    <div class="google-book-details">
                        <h3>Google Books Information</h3>
                        <div class="google-book-content">
                `;
                
                if (book.imageLinks && book.imageLinks.thumbnail) {
                    html += `<img src="${book.imageLinks.thumbnail}" alt="${book.title}" class="google-book-cover">`;
                }
                
                html += `
                            <div class="google-book-info">
                                <p><strong>Title:</strong> ${book.title}</p>
                `;
                
                if (book.authors) {
                    html += `<p><strong>Authors:</strong> ${book.authors.join(', ')}</p>`;
                }
                
                if (book.publisher) {
                    html += `<p><strong>Publisher:</strong> ${book.publisher}</p>`;
                }
                
                if (book.publishedDate) {
                    html += `<p><strong>Published Date:</strong> ${book.publishedDate}</p>`;
                }
                
                if (book.pageCount) {
                    html += `<p><strong>Pages:</strong> ${book.pageCount}</p>`;
                }
                
                if (book.categories) {
                    html += `<p><strong>Categories:</strong> ${book.categories.join(', ')}</p>`;
                }
                
                if (book.averageRating) {
                    html += `<p><strong>Rating:</strong> ${book.averageRating}/5</p>`;
                }
                
                if (book.description) {
                    html += `<div class="google-book-description"><strong>Description:</strong> ${book.description}</div>`;
                }
                
                if (book.previewLink) {
                    html += `<a href="${book.previewLink}" target="_blank" class="btn btn-primary">Preview on Google Books</a>`;
                }
                
                html += `
                            </div>
                        </div>
                    </div>
                `;
                
                detailsContainer.innerHTML = html;
            } else {
                detailsContainer.innerHTML = '<p>No book details found on Google Books.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
            detailsContainer.innerHTML = '<p>Error loading book details. Please try again later.</p>';
        });
}
