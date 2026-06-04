/**
 * Book Categories JavaScript for LitFest - Book Fair & Literature Website
 * Organizes books by categories and provides filtering functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only run on books page
    if (!window.location.pathname.includes('books.html')) {
        return;
    }
    
    // Book categories
    const categories = [
        { id: 'all', name: 'All Books', icon: 'fas fa-book' },
        { id: 'fiction', name: 'Fiction', icon: 'fas fa-book-open' },
        { id: 'non-fiction', name: 'Non-Fiction', icon: 'fas fa-landmark' },
        { id: 'mystery', name: 'Mystery & Thriller', icon: 'fas fa-search' },
        { id: 'romance', name: 'Romance', icon: 'fas fa-heart' },
        { id: 'sci-fi', name: 'Sci-Fi & Fantasy', icon: 'fas fa-rocket' },
        { id: 'biography', name: 'Biography', icon: 'fas fa-user-tie' },
        { id: 'self-help', name: 'Self-Help', icon: 'fas fa-hand-holding-heart' },
        { id: 'history', name: 'History', icon: 'fas fa-history' },
        { id: 'children', name: 'Children\'s Books', icon: 'fas fa-child' }
    ];
    
    // Get books container
    const booksContainer = document.querySelector('.books-container');
    
    // Create categories section
    function createCategoriesSection() {
        // Create categories container
        const categoriesSection = document.createElement('div');
        categoriesSection.className = 'categories-section';
        
        // Create categories header
        const categoriesHeader = document.createElement('h3');
        categoriesHeader.textContent = 'Categories';
        categoriesSection.appendChild(categoriesHeader);
        
        // Create categories list
        const categoriesList = document.createElement('ul');
        categoriesList.className = 'categories-list';
        
        // Add categories to list
        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.innerHTML = `
                <a href="#" class="category-item" data-category="${category.id}">
                    <i class="${category.icon}"></i>
                    <span>${category.name}</span>
                    <span class="category-count" id="count-${category.id}">0</span>
                </a>
            `;
            categoriesList.appendChild(categoryItem);
        });
        
        // Add categories list to section
        categoriesSection.appendChild(categoriesList);
        
        // Add categories section to books container
        if (booksContainer) {
            booksContainer.insertBefore(categoriesSection, booksContainer.firstChild);
        }
        
        // Add event listeners to category items
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all category items
                categoryItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Filter books by category
                const category = this.getAttribute('data-category');
                filterBooksByCategory(category);
            });
        });
        
        // Set 'All Books' as active by default
        const allBooksCategory = document.querySelector('.category-item[data-category="all"]');
        if (allBooksCategory) {
            allBooksCategory.classList.add('active');
        }
    }
    
    // Filter books by category
    function filterBooksByCategory(category) {
        const bookItems = document.querySelectorAll('.book-item');
        const booksCount = document.getElementById('books-count');
        let visibleCount = 0;
        
        bookItems.forEach(item => {
            if (category === 'all') {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                const bookBadges = item.querySelectorAll('.book-badge');
                let matchesCategory = false;
                
                bookBadges.forEach(badge => {
                    const badgeText = badge.textContent.toLowerCase();
                    
                    if (badgeText === category || 
                        (category === 'non-fiction' && (
                            badgeText === 'biography' || 
                            badgeText === 'self-help' || 
                            badgeText === 'history'
                        )) ||
                        (category === 'mystery' && (
                            badgeText === 'thriller' || 
                            badgeText === 'mystery'
                        )) ||
                        (category === 'sci-fi' && (
                            badgeText === 'fantasy' || 
                            badgeText === 'sci-fi' ||
                            badgeText === 'science fiction'
                        ))) {
                        matchesCategory = true;
                    }
                });
                
                if (matchesCategory) {
                    item.style.display = 'flex';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            }
        });
        
        // Update books count
        if (booksCount) {
            booksCount.textContent = visibleCount;
        }
    }
    
    // Count books in each category
    function countBooksByCategory() {
        const bookItems = document.querySelectorAll('.book-item');
        
        // Initialize counts
        const categoryCounts = {};
        categories.forEach(category => {
            categoryCounts[category.id] = 0;
        });
        
        // Count total books
        categoryCounts['all'] = bookItems.length;
        
        // Count books in each category
        bookItems.forEach(item => {
            const bookBadges = item.querySelectorAll('.book-badge');
            
            bookBadges.forEach(badge => {
                const badgeText = badge.textContent.toLowerCase();
                
                categories.forEach(category => {
                    if (category.id !== 'all') {
                        if (badgeText === category.id || 
                            (category.id === 'non-fiction' && (
                                badgeText === 'biography' || 
                                badgeText === 'self-help' || 
                                badgeText === 'history'
                            )) ||
                            (category.id === 'mystery' && (
                                badgeText === 'thriller' || 
                                badgeText === 'mystery'
                            )) ||
                            (category.id === 'sci-fi' && (
                                badgeText === 'fantasy' || 
                                badgeText === 'sci-fi' ||
                                badgeText === 'science fiction'
                            ))) {
                            categoryCounts[category.id]++;
                        }
                    }
                });
            });
        });
        
        // Update category counts in UI
        categories.forEach(category => {
            const countElement = document.getElementById(`count-${category.id}`);
            if (countElement) {
                countElement.textContent = categoryCounts[category.id];
            }
        });
    }
    
    // Create categories section
    createCategoriesSection();
    
    // Count books in each category
    countBooksByCategory();
});
