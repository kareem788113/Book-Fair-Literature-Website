/**
 * User Authentication Module
 * Handles user login, registration, and session management
 */

// User authentication state
let currentUser = null;

// Initialize the auth system
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    initializeAuth();
    
    // Set up login form listeners
    setupLoginForm();
    
    // Set up registration form listeners
    setupRegistrationForm();
    
    // Set up logout functionality
    setupLogout();
    
    // Update UI based on auth state
    updateAuthUI();
});

/**
 * Initialize the authentication system
 */
function initializeAuth() {
    // Try to get user data from localStorage
    const userData = localStorage.getItem('elite_readers_user');
    
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            console.log('User logged in:', currentUser.username);
        } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('elite_readers_user');
        }
    }
}

/**
 * Set up login form event listeners
 */
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('#username').value.trim();
            const password = this.querySelector('#password').value.trim();
            const rememberMe = this.querySelector('#remember-me')?.checked || false;
            
            if (username && password) {
                login(username, password, rememberMe);
            }
        });
    }
}

/**
 * Set up registration form event listeners
 */
function setupRegistrationForm() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('#new-username').value.trim();
            const email = this.querySelector('#new-email').value.trim();
            const password = this.querySelector('#new-password').value.trim();
            const confirmPassword = this.querySelector('#confirm-password').value.trim();
            
            if (username && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    showFormError(this, 'Passwords do not match');
                    return;
                }
                
                register(username, email, password);
            }
        });
    }
}

/**
 * Set up logout functionality
 */
function setupLogout() {
    const logoutButtons = document.querySelectorAll('.logout-btn');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
}

/**
 * Log in a user
 * @param {string} username - The username
 * @param {string} password - The password
 * @param {boolean} rememberMe - Whether to remember the login
 */
function login(username, password, rememberMe) {
    // In a real app, this would make an API call to verify credentials
    // For demo purposes, we'll simulate a successful login
    
    // Show loading state
    const loginForm = document.getElementById('login-form');
    const submitButton = loginForm?.querySelector('button[type="submit"]');
    
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitButton.disabled = true;
        
        // Simulate network delay
        setTimeout(() => {
            // Create user object
            currentUser = {
                username: username,
                email: `${username.toLowerCase()}@example.com`, // Simulated email
                displayName: username.charAt(0).toUpperCase() + username.slice(1),
                avatar: null, // No avatar by default
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe
            };
            
            // Save to localStorage
            localStorage.setItem('elite_readers_user', JSON.stringify(currentUser));
            
            // Update UI
            updateAuthUI();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Redirect to home or profile page
            window.location.href = 'profile.html';
        }, 1500);
    }
}

/**
 * Register a new user
 * @param {string} username - The username
 * @param {string} email - The email
 * @param {string} password - The password
 */
function register(username, email, password) {
    // In a real app, this would make an API call to create a new user
    // For demo purposes, we'll simulate a successful registration
    
    // Show loading state
    const registerForm = document.getElementById('register-form');
    const submitButton = registerForm?.querySelector('button[type="submit"]');
    
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        submitButton.disabled = true;
        
        // Simulate network delay
        setTimeout(() => {
            // Check if username exists in localStorage (simulated check)
            const existingUsers = JSON.parse(localStorage.getItem('elite_readers_users') || '[]');
            const userExists = existingUsers.some(user => user.username === username || user.email === email);
            
            if (userExists) {
                showFormError(registerForm, 'Username or email already exists');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Create user object
            const newUser = {
                username: username,
                email: email,
                displayName: username.charAt(0).toUpperCase() + username.slice(1),
                avatar: null, // No avatar by default
                registrationTime: new Date().toISOString()
            };
            
            // Add to users list
            existingUsers.push(newUser);
            localStorage.setItem('elite_readers_users', JSON.stringify(existingUsers));
            
            // Log in the new user
            currentUser = {
                ...newUser,
                loginTime: new Date().toISOString(),
                rememberMe: true
            };
            
            // Save to localStorage
            localStorage.setItem('elite_readers_user', JSON.stringify(currentUser));
            
            // Update UI
            updateAuthUI();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Redirect to profile page
            window.location.href = 'profile.html';
        }, 1500);
    }
}

/**
 * Log out the current user
 */
function logout() {
    // Clear user data
    currentUser = null;
    localStorage.removeItem('elite_readers_user');
    
    // Update UI
    updateAuthUI();
    
    // Redirect to home page
    window.location.href = 'index.html';
}

/**
 * Update UI elements based on authentication state
 */
function updateAuthUI() {
    // Update login/logout buttons
    const loginBtns = document.querySelectorAll('.login-btn, #loginBtn');
    const registerBtns = document.querySelectorAll('.register-btn');
    const profileLinks = document.querySelectorAll('.profile-link, .user-profile-link');
    const userDisplayNames = document.querySelectorAll('.user-display-name');
    const logoutBtns = document.querySelectorAll('.logout-btn');
    
    if (currentUser) {
        // User is logged in
        loginBtns.forEach(btn => {
            btn.style.display = 'none';
        });
        
        registerBtns.forEach(btn => {
            btn.style.display = 'none';
        });
        
        profileLinks.forEach(link => {
            link.style.display = 'flex';
            
            // Update profile link text if it has a span
            const span = link.querySelector('span');
            if (span) {
                span.textContent = currentUser.displayName;
            }
        });
        
        userDisplayNames.forEach(elem => {
            elem.textContent = currentUser.displayName;
        });
        
        logoutBtns.forEach(btn => {
            btn.style.display = 'block';
        });
        
        // Update any avatar images
        updateUserAvatars();
        
    } else {
        // User is logged out
        loginBtns.forEach(btn => {
            btn.style.display = 'inline-block';
        });
        
        registerBtns.forEach(btn => {
            btn.style.display = 'inline-block';
        });
        
        profileLinks.forEach(link => {
            link.style.display = 'none';
        });
        
        logoutBtns.forEach(btn => {
            btn.style.display = 'none';
        });
    }
}

/**
 * Update user avatars across the site
 */
function updateUserAvatars() {
    if (!currentUser) return;
    
    const avatarImages = document.querySelectorAll('.user-avatar');
    
    // Hide all user avatar images
    avatarImages.forEach(img => {
        // Hide the image by setting display to none
        img.style.display = 'none';
        
        // Also hide any parent containers that might be dedicated to the avatar
        const parent = img.parentElement;
        if (parent && (parent.classList.contains('avatar-container') || 
                      parent.classList.contains('user-avatar-container') || 
                      parent.classList.contains('profile-image-container'))) {
            parent.style.display = 'none';
        }
    });
}

/**
 * Show error message on a form
 * @param {HTMLElement} form - The form element
 * @param {string} message - The error message
 */
function showFormError(form, message) {
    // Remove any existing error messages
    const existingErrors = form.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Add to form
    form.insertBefore(errorElement, form.firstChild);
    
    // Add CSS if not already added
    if (!document.getElementById('auth-error-styles')) {
        const style = document.createElement('style');
        style.id = 'auth-error-styles';
        style.textContent = `
            .form-error {
                background-color: #f8d7da;
                color: #721c24;
                padding: 10px;
                margin-bottom: 15px;
                border-radius: 4px;
                animation: fadeIn 0.3s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export functions for use in other scripts
window.EliteReadersAuth = {
    getCurrentUser: () => currentUser,
    isLoggedIn: () => !!currentUser,
    login,
    register,
    logout,
    updateAuthUI
};
