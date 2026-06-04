/**
 * Forum JavaScript for LitFest - Book Fair & Literature Website
 * Handles forum discussions, replies, and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = checkLoginStatus();
    
    // Elements
    const newTopicBtn = document.getElementById('new-topic-btn');
    const newDiscussionForm = document.getElementById('new-discussion-form');
    const discussionForm = document.getElementById('discussion-form');
    const cancelDiscussionBtn = document.getElementById('cancel-discussion-btn');
    const discussionsContainer = document.getElementById('discussions-container');
    
    // Load discussions from localStorage
    loadDiscussions();
    
    // Event listeners
    if (newTopicBtn) {
        newTopicBtn.addEventListener('click', function() {
            if (!isLoggedIn) {
                showLoginPrompt();
                return;
            }
            
            newDiscussionForm.style.display = 'block';
            newTopicBtn.style.display = 'none';
            
            // Scroll to form
            newDiscussionForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (cancelDiscussionBtn) {
        cancelDiscussionBtn.addEventListener('click', function() {
            newDiscussionForm.style.display = 'none';
            newTopicBtn.style.display = 'block';
        });
    }
    
    if (discussionForm) {
        discussionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!isLoggedIn) {
                showLoginPrompt();
                return;
            }
            
            // Get form values
            const title = document.getElementById('discussion-title').value;
            const topic = document.getElementById('discussion-topic').value;
            const content = document.getElementById('discussion-content').value;
            
            // Create new discussion
            const newDiscussion = {
                id: generateId(),
                userId: 'current-user',
                author: 'John Doe (You)',
                title: title,
                content: content,
                topic: topic,
                date: formatDate(new Date()),
                replies: [],
                timestamp: new Date().getTime()
            };
            
            // Save to localStorage
            saveDiscussion(newDiscussion);
            
            // Reset form
            discussionForm.reset();
            newDiscussionForm.style.display = 'none';
            newTopicBtn.style.display = 'block';
            
            // Add to page
            addDiscussionToPage(newDiscussion);
            
            // Show success message
            showNotification('Your discussion has been posted successfully!');
        });
    }
    
    // Handle reply buttons
    document.addEventListener('click', function(e) {
        // Reply to discussion
        if (e.target.classList.contains('btn-reply') || e.target.parentElement.classList.contains('btn-reply')) {
            const button = e.target.classList.contains('btn-reply') ? e.target : e.target.parentElement;
            const discussionId = button.getAttribute('data-discussion-id');
            
            if (!isLoggedIn) {
                showLoginPrompt();
                return;
            }
            
            // Hide all other reply forms
            document.querySelectorAll('.reply-form').forEach(form => {
                form.style.display = 'none';
            });
            
            // Show this reply form
            const replyForm = document.getElementById(`reply-form-${discussionId}`);
            if (replyForm) {
                replyForm.style.display = 'flex';
                replyForm.querySelector('textarea').focus();
            }
        }
        
        // Reply to a reply
        if (e.target.classList.contains('btn-reply-to-reply') || e.target.parentElement.classList.contains('btn-reply-to-reply')) {
            const button = e.target.classList.contains('btn-reply-to-reply') ? e.target : e.target.parentElement;
            const replyId = button.getAttribute('data-reply-id');
            const discussionItem = button.closest('.discussion-item');
            const discussionId = discussionItem.getAttribute('data-discussion-id');
            
            if (!isLoggedIn) {
                showLoginPrompt();
                return;
            }
            
            // Hide all reply forms
            document.querySelectorAll('.reply-form').forEach(form => {
                form.style.display = 'none';
            });
            
            // Show the discussion's reply form
            const replyForm = document.getElementById(`reply-form-${discussionId}`);
            if (replyForm) {
                replyForm.style.display = 'flex';
                const textarea = replyForm.querySelector('textarea');
                const replyAuthor = button.closest('.reply-item').querySelector('.reply-author').textContent;
                textarea.value = `@${replyAuthor} `;
                textarea.focus();
            }
        }
        
        // Cancel reply
        if (e.target.classList.contains('cancel-reply-btn')) {
            const replyForm = e.target.closest('.reply-form');
            if (replyForm) {
                replyForm.style.display = 'none';
                replyForm.querySelector('textarea').value = '';
            }
        }
        
        // Submit reply
        if (e.target.classList.contains('submit-reply-btn')) {
            const button = e.target;
            const discussionId = button.getAttribute('data-discussion-id');
            const replyForm = button.closest('.reply-form');
            const textarea = replyForm.querySelector('textarea');
            const content = textarea.value.trim();
            
            if (!content) {
                showNotification('Please enter a reply.', 'error');
                return;
            }
            
            // Create new reply
            const newReply = {
                id: generateId(),
                userId: 'current-user',
                author: 'John Doe (You)',
                content: content,
                date: formatDate(new Date()),
                timestamp: new Date().getTime()
            };
            
            // Add reply to discussion
            addReplyToDiscussion(discussionId, newReply);
            
            // Reset form
            textarea.value = '';
            replyForm.style.display = 'none';
            
            // Show success message
            showNotification('Your reply has been posted successfully!');
        }
        
        // Edit discussion
        if (e.target.classList.contains('btn-edit') || e.target.parentElement.classList.contains('btn-edit')) {
            const button = e.target.classList.contains('btn-edit') ? e.target : e.target.parentElement;
            const discussionId = button.getAttribute('data-discussion-id');
            const discussionItem = button.closest('.discussion-item');
            const contentElement = discussionItem.querySelector('.discussion-content');
            const editForm = document.getElementById(`edit-form-${discussionId}`);
            
            // Hide content, show edit form
            contentElement.style.display = 'none';
            editForm.style.display = 'block';
            editForm.querySelector('textarea').focus();
        }
        
        // Cancel edit
        if (e.target.classList.contains('cancel-edit-btn')) {
            const editForm = e.target.closest('.edit-form');
            const discussionItem = editForm.closest('.discussion-item');
            const contentElement = discussionItem.querySelector('.discussion-content');
            
            // Show content, hide edit form
            contentElement.style.display = 'block';
            editForm.style.display = 'none';
        }
        
        // Save edit
        if (e.target.classList.contains('save-edit-btn')) {
            const button = e.target;
            const discussionId = button.getAttribute('data-discussion-id');
            const editForm = button.closest('.edit-form');
            const textarea = editForm.querySelector('textarea');
            const content = textarea.value.trim();
            
            if (!content) {
                showNotification('Please enter content for your discussion.', 'error');
                return;
            }
            
            // Update discussion
            updateDiscussion(discussionId, content);
            
            // Update UI
            const discussionItem = editForm.closest('.discussion-item');
            const contentElement = discussionItem.querySelector('.discussion-content');
            contentElement.innerHTML = `<p>${content}</p>`;
            
            // Show content, hide edit form
            contentElement.style.display = 'block';
            editForm.style.display = 'none';
            
            // Show success message
            showNotification('Your discussion has been updated successfully!');
        }
        
        // Delete discussion
        if (e.target.classList.contains('btn-delete') || e.target.parentElement.classList.contains('btn-delete')) {
            const button = e.target.classList.contains('btn-delete') ? e.target : e.target.parentElement;
            const discussionId = button.getAttribute('data-discussion-id');
            
            if (confirm('Are you sure you want to delete this discussion? This action cannot be undone.')) {
                deleteDiscussion(discussionId);
                
                // Remove from UI
                const discussionItem = button.closest('.discussion-item');
                discussionItem.remove();
                
                // Show success message
                showNotification('Your discussion has been deleted successfully!');
            }
        }
    });
    
    /**
     * Check if user is logged in
     */
    function checkLoginStatus() {
        // For demo purposes, we'll use localStorage to simulate login status
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        // Update UI based on login status
        const loginBtn = document.getElementById('loginBtn');
        const profileBtn = document.getElementById('profileBtn');
        
        if (isLoggedIn === 'true') {
            if (loginBtn) loginBtn.style.display = 'none';
            if (profileBtn) profileBtn.style.display = 'block';
            return true;
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (profileBtn) profileBtn.style.display = 'none';
            
            // For demo purposes, set logged in to true
            localStorage.setItem('isLoggedIn', 'true');
            return true;
        }
    }
    
    /**
     * Show login prompt
     */
    function showLoginPrompt() {
        alert('Please log in to participate in discussions.');
    }
    
    /**
     * Load discussions from localStorage
     */
    function loadDiscussions() {
        let discussions = JSON.parse(localStorage.getItem('forumDiscussions')) || [];
        
        // Sort by timestamp (newest first)
        discussions.sort((a, b) => b.timestamp - a.timestamp);
        
        // Add to page
        discussions.forEach(discussion => {
            addDiscussionToPage(discussion);
        });
    }
    
    /**
     * Add discussion to page
     */
    function addDiscussionToPage(discussion) {
        const isCurrentUser = discussion.userId === 'current-user';
        
        // Create discussion element
        const discussionElement = document.createElement('div');
        discussionElement.className = `discussion-item${isCurrentUser ? ' current-user-post' : ''}`;
        discussionElement.setAttribute('data-discussion-id', discussion.id);
        discussionElement.setAttribute('data-user-id', discussion.userId);
        
        // Create discussion HTML
        let discussionHTML = `
            <div class="discussion-header">
                <div class="user-avatar">
                    <img src="${isCurrentUser ? 'https://randomuser.me/api/portraits/men/41.jpg' : 'https://randomuser.me/api/portraits/women/65.jpg'}" alt="${discussion.author}">
                </div>
                <div class="discussion-meta">
                    <h3 class="discussion-title">${discussion.title}</h3>
                    <div class="discussion-info">
                        <span class="discussion-author">${discussion.author}</span>
                        <span class="discussion-date">${discussion.date}</span>
                        <span class="discussion-topic">${discussion.topic}</span>
                    </div>
                </div>
            </div>
            <div class="discussion-content">
                <p>${discussion.content}</p>
            </div>
            <div class="discussion-actions">
                <button class="btn-reply" data-discussion-id="${discussion.id}"><i class="fas fa-reply"></i> Reply</button>
                ${isCurrentUser ? `
                    <button class="btn-edit" data-discussion-id="${discussion.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-delete" data-discussion-id="${discussion.id}"><i class="fas fa-trash"></i> Delete</button>
                ` : ''}
                <span class="discussion-stats"><i class="fas fa-comment"></i> ${discussion.replies.length} ${discussion.replies.length === 1 ? 'reply' : 'replies'}</span>
            </div>
            
            <!-- Replies -->
            <div class="replies-container">
                ${discussion.replies.map(reply => `
                    <div class="reply-item" data-reply-id="${reply.id}" data-user-id="${reply.userId}">
                        <div class="user-avatar">
                            <img src="${reply.userId === 'current-user' ? 'https://randomuser.me/api/portraits/men/41.jpg' : 'https://randomuser.me/api/portraits/women/65.jpg'}" alt="${reply.author}">
                        </div>
                        <div class="reply-content">
                            <div class="reply-meta">
                                <span class="reply-author">${reply.author}</span>
                                <span class="reply-date">${reply.date}</span>
                            </div>
                            <p>${reply.content}</p>
                            <div class="reply-actions">
                                <button class="btn-reply-to-reply" data-reply-id="${reply.id}"><i class="fas fa-reply"></i> Reply</button>
                                ${reply.userId === 'current-user' ? `
                                    <button class="btn-edit-reply" data-reply-id="${reply.id}"><i class="fas fa-edit"></i> Edit</button>
                                    <button class="btn-delete-reply" data-reply-id="${reply.id}"><i class="fas fa-trash"></i> Delete</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
                
                <!-- Reply Form (Hidden by default) -->
                <div class="reply-form" id="reply-form-${discussion.id}" style="display: none;">
                    <div class="user-avatar">
                        <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Current User">
                    </div>
                    <div class="reply-input-container">
                        <textarea placeholder="Write your reply here..."></textarea>
                        <div class="reply-form-actions">
                            <button class="btn btn-outline cancel-reply-btn">Cancel</button>
                            <button class="btn btn-primary submit-reply-btn" data-discussion-id="${discussion.id}">Post Reply</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Edit Form (Hidden by default) -->
            <div class="edit-form" id="edit-form-${discussion.id}" style="display: none;">
                <textarea>${discussion.content}</textarea>
                <div class="edit-form-actions">
                    <button class="btn btn-outline cancel-edit-btn">Cancel</button>
                    <button class="btn btn-primary save-edit-btn" data-discussion-id="${discussion.id}">Save Changes</button>
                </div>
            </div>
        `;
        
        // Set HTML and add to container
        discussionElement.innerHTML = discussionHTML;
        discussionsContainer.prepend(discussionElement);
    }
    
    /**
     * Save discussion to localStorage
     */
    function saveDiscussion(discussion) {
        let discussions = JSON.parse(localStorage.getItem('forumDiscussions')) || [];
        discussions.push(discussion);
        localStorage.setItem('forumDiscussions', JSON.stringify(discussions));
    }
    
    /**
     * Add reply to discussion
     */
    function addReplyToDiscussion(discussionId, reply) {
        let discussions = JSON.parse(localStorage.getItem('forumDiscussions')) || [];
        const discussionIndex = discussions.findIndex(d => d.id === discussionId);
        
        if (discussionIndex !== -1) {
            discussions[discussionIndex].replies.push(reply);
            localStorage.setItem('forumDiscussions', JSON.stringify(discussions));
            
            // Update UI
            const discussionItem = document.querySelector(`.discussion-item[data-discussion-id="${discussionId}"]`);
            const repliesContainer = discussionItem.querySelector('.replies-container');
            const replyStats = discussionItem.querySelector('.discussion-stats');
            
            // Create reply element
            const replyElement = document.createElement('div');
            replyElement.className = 'reply-item';
            replyElement.setAttribute('data-reply-id', reply.id);
            replyElement.setAttribute('data-user-id', reply.userId);
            
            replyElement.innerHTML = `
                <div class="user-avatar">
                    <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="${reply.author}">
                </div>
                <div class="reply-content">
                    <div class="reply-meta">
                        <span class="reply-author">${reply.author}</span>
                        <span class="reply-date">${reply.date}</span>
                    </div>
                    <p>${reply.content}</p>
                    <div class="reply-actions">
                        <button class="btn-reply-to-reply" data-reply-id="${reply.id}"><i class="fas fa-reply"></i> Reply</button>
                        <button class="btn-edit-reply" data-reply-id="${reply.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn-delete-reply" data-reply-id="${reply.id}"><i class="fas fa-trash"></i> Delete</button>
                    </div>
                </div>
            `;
            
            // Add before the reply form
            const replyForm = repliesContainer.querySelector('.reply-form');
            repliesContainer.insertBefore(replyElement, replyForm);
            
            // Update reply count
            const replyCount = discussions[discussionIndex].replies.length;
            replyStats.innerHTML = `<i class="fas fa-comment"></i> ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`;
        }
    }
    
    /**
     * Update discussion
     */
    function updateDiscussion(discussionId, content) {
        let discussions = JSON.parse(localStorage.getItem('forumDiscussions')) || [];
        const discussionIndex = discussions.findIndex(d => d.id === discussionId);
        
        if (discussionIndex !== -1) {
            discussions[discussionIndex].content = content;
            localStorage.setItem('forumDiscussions', JSON.stringify(discussions));
        }
    }
    
    /**
     * Delete discussion
     */
    function deleteDiscussion(discussionId) {
        let discussions = JSON.parse(localStorage.getItem('forumDiscussions')) || [];
        discussions = discussions.filter(d => d.id !== discussionId);
        localStorage.setItem('forumDiscussions', JSON.stringify(discussions));
    }
    
    /**
     * Generate unique ID
     */
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
    
    /**
     * Format date
     */
    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${month} ${day}, ${year} at ${formattedHours}:${formattedMinutes} ${ampm}`;
    }
    
    /**
     * Show notification
     */
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
