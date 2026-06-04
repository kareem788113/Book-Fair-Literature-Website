/**
 * Dashboard JavaScript for LitFest - Book Fair & Literature Website
 * Author: Cascade AI
 * Date: May 20, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
    
    // Setup dashboard tabs
    setupDashboardTabs();
    
    // Load user data
    loadUserData();
    
    // Setup admin panel if user is admin
    setupAdminPanel();
    
    // Setup settings forms
    setupSettingsForms();
});

/**
 * Initialize dashboard
 */
function initDashboard() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!isLoggedIn || !currentUser) {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
        return;
    }
    
    // Update user information
    updateUserInfo(currentUser);
    
    // Load user stats
    loadUserStats(currentUser);
    
    // Load bookmarks
    loadBookmarks(currentUser);
    
    // Load reviews
    loadReviews(currentUser);
    
    // Load reading history
    loadReadingHistory(currentUser);
}

/**
 * Update user information in the dashboard
 */
function updateUserInfo(user) {
    // Update user name
    const userNameElements = document.querySelectorAll('#user-name, #dashboard-user-name, #sidebar-user-name');
    userNameElements.forEach(element => {
        if (element) element.textContent = user.name;
    });
    
    // Update user role
    const userRoleElement = document.getElementById('user-role');
    if (userRoleElement) {
        userRoleElement.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    }
    
    // Update join date
    const joinDateElement = document.getElementById('join-date');
    if (joinDateElement && user.registeredDate) {
        const date = new Date(user.registeredDate);
        joinDateElement.textContent = `Joined: ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
    
    // Show admin panel link if user is admin
    const adminPanelLink = document.getElementById('admin-panel-link');
    if (adminPanelLink && user.role === 'admin') {
        adminPanelLink.style.display = 'block';
    }
}

/**
 * Load user statistics
 */
function loadUserStats(user) {
    // Get stats elements
    const bookmarksCountElement = document.getElementById('bookmarks-count');
    const reviewsCountElement = document.getElementById('reviews-count');
    const booksReadCountElement = document.getElementById('books-read-count');
    const eventsCountElement = document.getElementById('events-count');
    
    // Get user data from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    const userBookmarks = bookmarks[user.id] || [];
    
    const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    const userReviews = reviews[user.id] || [];
    
    const readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '{}');
    const userReadingHistory = readingHistory[user.id] || [];
    
    const userEvents = JSON.parse(localStorage.getItem('userEvents') || '{}');
    const attendingEvents = userEvents[user.id] || [];
    
    // Update stats
    if (bookmarksCountElement) bookmarksCountElement.textContent = userBookmarks.length;
    if (reviewsCountElement) reviewsCountElement.textContent = userReviews.length;
    if (booksReadCountElement) booksReadCountElement.textContent = userReadingHistory.length;
    if (eventsCountElement) eventsCountElement.textContent = attendingEvents.length;
    
    // Add recent activity
    addRecentActivity(user, userBookmarks, userReviews, userReadingHistory, attendingEvents);
}

/**
 * Add recent activity to the dashboard
 */
function addRecentActivity(user, bookmarks, reviews, readingHistory, events) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    // Clear existing activities except the welcome message
    const welcomeActivity = activityList.querySelector('.activity-item');
    activityList.innerHTML = '';
    activityList.appendChild(welcomeActivity);
    
    // Combine all activities
    const activities = [];
    
    // Add bookmark activities
    bookmarks.forEach(bookmark => {
        activities.push({
            type: 'bookmark',
            date: bookmark.date,
            bookId: bookmark.bookId,
            bookTitle: bookmark.bookTitle
        });
    });
    
    // Add review activities
    reviews.forEach(review => {
        activities.push({
            type: 'review',
            date: review.date,
            bookId: review.bookId,
            bookTitle: review.bookTitle,
            rating: review.rating
        });
    });
    
    // Add reading history activities
    readingHistory.forEach(book => {
        activities.push({
            type: 'read',
            date: book.date,
            bookId: book.bookId,
            bookTitle: book.bookTitle
        });
    });
    
    // Add event activities
    events.forEach(event => {
        activities.push({
            type: 'event',
            date: event.date,
            eventId: event.eventId,
            eventTitle: event.eventTitle
        });
    });
    
    // Sort activities by date (newest first)
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Add activities to the list (max 5)
    const maxActivities = 5;
    activities.slice(0, maxActivities).forEach(activity => {
        let icon, text;
        
        switch (activity.type) {
            case 'bookmark':
                icon = 'bookmark';
                text = `You bookmarked <a href="book-details.html?id=${activity.bookId}">${activity.bookTitle}</a>`;
                break;
            case 'review':
                icon = 'star';
                text = `You rated <a href="book-details.html?id=${activity.bookId}">${activity.bookTitle}</a> ${activity.rating} stars`;
                break;
            case 'read':
                icon = 'book';
                text = `You marked <a href="book-details.html?id=${activity.bookId}">${activity.bookTitle}</a> as read`;
                break;
            case 'event':
                icon = 'calendar-check';
                text = `You registered for <a href="event-details.html?id=${activity.eventId}">${activity.eventTitle}</a>`;
                break;
        }
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="activity-details">
                <p>${text}</p>
                <span class="activity-time">${formatDate(activity.date)}</span>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}

/**
 * Load user bookmarks
 */
function loadBookmarks(user) {
    const bookmarksContainer = document.getElementById('bookmarks-container');
    const emptyBookmarks = document.getElementById('empty-bookmarks');
    
    if (!bookmarksContainer) return;
    
    // Get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    const userBookmarks = bookmarks[user.id] || [];
    
    // Show empty state if no bookmarks
    if (userBookmarks.length === 0) {
        if (emptyBookmarks) emptyBookmarks.style.display = 'block';
        return;
    }
    
    // Hide empty state
    if (emptyBookmarks) emptyBookmarks.style.display = 'none';
    
    // Get books data
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    
    // Create bookmarks list
    const bookmarksList = document.createElement('div');
    bookmarksList.className = 'bookmarks-list';
    
    userBookmarks.forEach(bookmark => {
        const book = books.find(b => b.id === bookmark.bookId);
        if (!book) return;
        
        const bookmarkItem = document.createElement('div');
        bookmarkItem.className = 'bookmark-item';
        bookmarkItem.innerHTML = `
            <div class="bookmark-cover">
                <img src="${book.coverImage}" alt="${book.title}">
            </div>
            <div class="bookmark-info">
                <h3><a href="book-details.html?id=${book.id}">${book.title}</a></h3>
                <p class="author">${book.author}</p>
                <div class="book-rating">
                    ${generateStarRating(book.rating)}
                    <span>(${book.rating})</span>
                </div>
                <p class="date">Bookmarked on ${new Date(bookmark.date).toLocaleDateString()}</p>
                <div class="bookmark-actions">
                    <a href="book-details.html?id=${book.id}" class="btn btn-small">View Details</a>
                    <button class="btn btn-small btn-outline remove-bookmark" data-id="${book.id}">Remove</button>
                </div>
            </div>
        `;
        
        bookmarksList.appendChild(bookmarkItem);
    });
    
    // Add bookmarks list to container
    bookmarksContainer.innerHTML = '';
    bookmarksContainer.appendChild(bookmarksList);
    
    // Add event listeners for remove buttons
    const removeButtons = bookmarksContainer.querySelectorAll('.remove-bookmark');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            removeBookmark(user.id, bookId);
            
            // Remove the bookmark item from the UI
            const bookmarkItem = this.closest('.bookmark-item');
            bookmarkItem.remove();
            
            // Show empty state if no bookmarks left
            if (bookmarksContainer.querySelectorAll('.bookmark-item').length === 0) {
                if (emptyBookmarks) emptyBookmarks.style.display = 'block';
            }
            
            // Update bookmarks count
            const bookmarksCountElement = document.getElementById('bookmarks-count');
            if (bookmarksCountElement) {
                const currentCount = parseInt(bookmarksCountElement.textContent);
                bookmarksCountElement.textContent = currentCount - 1;
            }
        });
    });
}

/**
 * Remove a bookmark
 */
function removeBookmark(userId, bookId) {
    // Get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    const userBookmarks = bookmarks[userId] || [];
    
    // Remove the bookmark
    const updatedBookmarks = userBookmarks.filter(bookmark => bookmark.bookId !== bookId);
    
    // Update localStorage
    bookmarks[userId] = updatedBookmarks;
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
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
 * Load user reviews
 */
function loadReviews(user) {
    // Similar implementation to loadBookmarks
    // Not fully implemented for brevity
}

/**
 * Load reading history
 */
function loadReadingHistory(user) {
    // Similar implementation to loadBookmarks
    // Not fully implemented for brevity
}

/**
 * Setup dashboard tabs
 */
function setupDashboardTabs() {
    const tabLinks = document.querySelectorAll('.dashboard-nav a');
    const tabContents = document.querySelectorAll('.dashboard-tab');
    
    if (tabLinks.length === 0 || tabContents.length === 0) return;
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all links and contents
            tabLinks.forEach(link => {
                link.parentElement.classList.remove('active');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to current link and content
            this.parentElement.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Update URL hash
            window.location.hash = tabId;
        });
    });
    
    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        const activeTab = document.querySelector(`.dashboard-nav a[data-tab="${hash}"]`);
        if (activeTab) {
            activeTab.click();
        }
    }
}

/**
 * Setup admin panel
 */
function setupAdminPanel() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Only proceed if user is admin
    if (currentUser.role !== 'admin') return;
    
    // Setup admin tabs
    setupAdminTabs();
    
    // Load admin data
    loadAdminData();
}

/**
 * Setup admin tabs
 */
function setupAdminTabs() {
    const tabLinks = document.querySelectorAll('.admin-tab-link');
    const tabContents = document.querySelectorAll('.admin-tab-pane');
    
    if (tabLinks.length === 0 || tabContents.length === 0) return;
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all links and contents
            tabLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to current link and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Load admin data
 */
function loadAdminData() {
    // Load users
    loadAdminUsers();
    
    // Load books
    loadAdminBooks();
    
    // Load events
    loadAdminEvents();
    
    // Load reviews
    loadAdminReviews();
    
    // Update admin stats
    updateAdminStats();
}

/**
 * Load admin users
 */
function loadAdminUsers() {
    const usersTableBody = document.getElementById('users-table-body');
    if (!usersTableBody) return;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Clear table
    usersTableBody.innerHTML = '';
    
    // Add users to table
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${new Date(user.registeredDate).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit" title="Edit User"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete" title="Delete User"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        
        usersTableBody.appendChild(row);
    });
    
    // Update total users count
    const totalUsersElement = document.getElementById('total-users');
    if (totalUsersElement) {
        totalUsersElement.textContent = users.length;
    }
}

/**
 * Load admin books
 */
function loadAdminBooks() {
    // Similar implementation to loadAdminUsers
    // Not fully implemented for brevity
}

/**
 * Load admin events
 */
function loadAdminEvents() {
    // Similar implementation to loadAdminUsers
    // Not fully implemented for brevity
}

/**
 * Load admin reviews
 */
function loadAdminReviews() {
    // Similar implementation to loadAdminUsers
    // Not fully implemented for brevity
}

/**
 * Update admin stats
 */
function updateAdminStats() {
    // Get stats elements
    const totalUsersElement = document.getElementById('total-users');
    const totalBooksElement = document.getElementById('total-books');
    const totalReviewsElement = document.getElementById('total-reviews');
    const totalEventsElement = document.getElementById('total-events');
    
    // Get data from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Get all reviews
    const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    let totalReviews = 0;
    
    for (const userId in reviews) {
        totalReviews += reviews[userId].length;
    }
    
    // Update stats
    if (totalUsersElement) totalUsersElement.textContent = users.length;
    if (totalBooksElement) totalBooksElement.textContent = books.length;
    if (totalReviewsElement) totalReviewsElement.textContent = totalReviews;
    if (totalEventsElement) totalEventsElement.textContent = events.length;
}

/**
 * Setup settings forms
 */
function setupSettingsForms() {
    // Profile settings form
    const profileSettingsForm = document.getElementById('profile-settings-form');
    if (profileSettingsForm) {
        profileSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('settings-name');
            const username = document.getElementById('settings-username');
            const email = document.getElementById('settings-email');
            const bio = document.getElementById('settings-bio');
            
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            
            // Update user data
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            
            if (userIndex !== -1) {
                users[userIndex].name = name.value;
                users[userIndex].username = username.value;
                users[userIndex].email = email.value;
                users[userIndex].bio = bio.value;
                
                // Update localStorage
                localStorage.setItem('users', JSON.stringify(users));
                
                // Update current user
                currentUser.name = name.value;
                currentUser.username = username.value;
                currentUser.email = email.value;
                currentUser.bio = bio.value;
                
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Show success message
                alert('Profile updated successfully');
                
                // Update user info in the dashboard
                updateUserInfo(currentUser);
            }
        });
    }
    
    // Password settings form
    const passwordSettingsForm = document.getElementById('password-settings-form');
    if (passwordSettingsForm) {
        passwordSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const currentPassword = document.getElementById('current-password');
            const newPassword = document.getElementById('new-password');
            const confirmNewPassword = document.getElementById('confirm-new-password');
            
            // Validate inputs
            if (newPassword.value !== confirmNewPassword.value) {
                alert('New passwords do not match');
                return;
            }
            
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            
            // Update user data
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            
            if (userIndex !== -1) {
                // Check if current password is correct
                if (users[userIndex].password !== currentPassword.value) {
                    alert('Current password is incorrect');
                    return;
                }
                
                // Update password
                users[userIndex].password = newPassword.value;
                
                // Update localStorage
                localStorage.setItem('users', JSON.stringify(users));
                
                // Show success message
                alert('Password updated successfully');
                
                // Clear form
                passwordSettingsForm.reset();
            }
        });
    }
    
    // Delete account button
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                // Get current user
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                
                // Remove user from localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const updatedUsers = users.filter(user => user.id !== currentUser.id);
                
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                
                // Clear login status
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                
                // Redirect to home page
                window.location.href = 'index.html';
            }
        });
    }
}
