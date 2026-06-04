// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Reading list tab switching
    const listTabs = document.querySelectorAll('.list-tab');
    
    listTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all list tabs
            listTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would normally filter the book list based on the selected tab
            // For now, we'll just log which list was selected
            const listType = this.getAttribute('data-list');
            console.log(`Selected list: ${listType}`);
        });
    });
    
    // Update reading progress functionality
    const updateProgressBtn = document.querySelector('.currently-reading .btn-primary');
    
    if (updateProgressBtn) {
        updateProgressBtn.addEventListener('click', function() {
            // In a real application, this would open a modal to update progress
            // For now, we'll just simulate updating the progress
            const progressBar = document.querySelector('.progress');
            const progressText = document.querySelector('.progress-text');
            
            // Simulate progress update (increase by 5%)
            let currentProgress = parseInt(progressBar.style.width);
            if (isNaN(currentProgress)) currentProgress = 65; // Default from HTML
            
            const newProgress = Math.min(currentProgress + 5, 100);
            progressBar.style.width = `${newProgress}%`;
            
            // Update text
            const totalPages = 300;
            const currentPage = Math.round(totalPages * (newProgress / 100));
            progressText.textContent = `${newProgress}% Complete (Page ${currentPage} of ${totalPages})`;
        });
    }
    
    // Profile avatar change functionality
    const changeAvatarBtn = document.querySelector('.change-avatar');
    const profileImage = document.getElementById('profile-image');
    
    if (changeAvatarBtn && profileImage) {
        changeAvatarBtn.addEventListener('click', function() {
            // In a real application, this would open a file picker
            // For now, we'll just simulate changing the avatar with a random image
            const randomId = Math.floor(Math.random() * 1000);
            profileImage.src = `https://randomuser.me/api/portraits/men/${randomId}.jpg`;
        });
    }
    
    // Simulate loading data
    setTimeout(function() {
        // This would normally be replaced with actual API calls to fetch user data
        console.log('User profile data loaded');
    }, 1000);
});
