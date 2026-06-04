/**
 * Theme Switcher JavaScript for LitFest - Book Fair & Literature Website
 * Author: Cascade AI
 * Date: May 20, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.querySelector('.theme-options');
    const themeButtons = document.querySelectorAll('.theme-option');
    
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.body.className = 'theme-' + savedTheme;
    
    // Toggle theme options
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            themeOptions.classList.toggle('show');
        });
    }
    
    // Theme selection
    if (themeButtons) {
        themeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                document.body.className = 'theme-' + theme;
                localStorage.setItem('theme', theme);
                themeOptions.classList.remove('show');
                
                // Highlight active theme
                themeButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
            
            // Set active class for current theme
            if (button.getAttribute('data-theme') === savedTheme) {
                button.classList.add('active');
            }
        });
    }
    
    // Close theme options when clicking outside
    document.addEventListener('click', function(e) {
        if (themeOptions && themeToggle && 
            !themeToggle.contains(e.target) && 
            !themeOptions.contains(e.target)) {
            themeOptions.classList.remove('show');
        }
    });
});
