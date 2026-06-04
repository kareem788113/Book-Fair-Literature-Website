/**
 * Authentication JavaScript for LitFest - Book Fair & Literature Website
 * Author: Cascade AI
 * Date: May 20, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the authentication system
    initAuth();
    
    // Check if user is logged in
    checkAuthStatus();
    
    // Setup event listeners for auth forms
    setupAuthForms();
    
    // Setup logout functionality
    setupLogout();
    
    // Setup demo account buttons
    setupDemoAccounts();
});

/**
 * Initialize authentication system
 */
function initAuth() {
    // Create default users if they don't exist
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: '1',
                name: 'Demo User',
                username: 'user',
                email: 'user@example.com',
                password: 'password123',
                role: 'user',
                registeredDate: new Date().toISOString(),
                bio: 'I love reading fiction and mystery novels.'
            },
            {
                id: '2',
                name: 'Admin User',
                username: 'admin',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin',
                registeredDate: new Date().toISOString(),
                bio: 'Website administrator and book enthusiast.'
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

/**
 * Check if user is logged in and update UI accordingly
 */
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    
    if (isLoggedIn && currentUser) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileBtn) profileBtn.style.display = 'inline-block';
        
        // Update user dropdown if it exists
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = currentUser.username || currentUser.name;
        }
        
        // Update dashboard elements if on dashboard page
        updateDashboardInfo(currentUser);
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (profileBtn) profileBtn.style.display = 'none';
        
        // Redirect to login if trying to access protected pages
        const protectedPages = ['dashboard.html', 'profile.html', 'bookmarks.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
}

/**
 * Update dashboard information with user data
 */
function updateDashboardInfo(user) {
    // Update user name in dashboard
    const dashboardUserName = document.getElementById('dashboard-user-name');
    const sidebarUserName = document.getElementById('sidebar-user-name');
    const userRole = document.getElementById('user-role');
    const joinDate = document.getElementById('join-date');
    const adminPanelLink = document.getElementById('admin-panel-link');
    
    if (dashboardUserName) dashboardUserName.textContent = user.name;
    if (sidebarUserName) sidebarUserName.textContent = user.name;
    
    if (userRole) userRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    
    if (joinDate) {
        const date = new Date(user.registeredDate);
        joinDate.textContent = `Joined: ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
    
    // Show admin panel link if user is admin
    if (adminPanelLink && user.role === 'admin') {
        adminPanelLink.style.display = 'block';
    }
    
    // Populate settings form if on settings tab
    populateSettingsForm(user);
}

/**
 * Populate settings form with user data
 */
function populateSettingsForm(user) {
    const settingsName = document.getElementById('settings-name');
    const settingsUsername = document.getElementById('settings-username');
    const settingsEmail = document.getElementById('settings-email');
    const settingsBio = document.getElementById('settings-bio');
    
    if (settingsName) settingsName.value = user.name || '';
    if (settingsUsername) settingsUsername.value = user.username || '';
    if (settingsEmail) settingsEmail.value = user.email || '';
    if (settingsBio) settingsBio.value = user.bio || '';
}

/**
 * Setup authentication forms (register and login)
 */
function setupAuthForms() {
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('register-name');
            const email = document.getElementById('register-email');
            const username = document.getElementById('register-username');
            const password = document.getElementById('register-password');
            const confirmPassword = document.getElementById('register-confirm-password');
            const roleInputs = document.getElementsByName('role');
            const termsAgreement = document.getElementById('terms-agreement');
            
            // Reset previous errors
            resetFormErrors(registerForm);
            
            // Validate inputs
            let isValid = true;
            
            // Validate name
            if (!validateName(name)) {
                isValid = false;
                showError(name, 'Please enter your full name (at least 3 characters)');
            }
            
            // Validate email
            if (!validateEmail(email)) {
                isValid = false;
                showError(email, 'Please enter a valid email address');
            }
            
            // Validate username
            if (!validateUsername(username)) {
                isValid = false;
                showError(username, 'Username must be 3-20 characters and contain only letters, numbers, and underscores');
            }
            
            // Validate password
            const passwordStrength = checkPasswordStrength(password.value);
            if (passwordStrength === 0) {
                isValid = false;
                showError(password, 'Password must be at least 6 characters');
            }
            
            // Validate confirm password
            if (!validateConfirmPassword(password, confirmPassword)) {
                isValid = false;
                showError(confirmPassword, 'Passwords do not match');
            }
            
            // Get selected role
            let selectedRole = 'user';
            for (const roleInput of roleInputs) {
                if (roleInput.checked) {
                    selectedRole = roleInput.value;
                    break;
                }
            }
            
            // Validate terms agreement
            if (!termsAgreement.checked) {
                isValid = false;
                showError(termsAgreement, 'You must agree to the Terms of Service and Privacy Policy');
            }
            
            // If all validations pass, register the user
            if (isValid) {
                // Check if email or username already exists
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const emailExists = users.some(user => user.email === email.value);
                const usernameExists = users.some(user => user.username === username.value);
                
                if (emailExists) {
                    showError(email, 'This email is already registered');
                    return;
                }
                
                if (usernameExists) {
                    showError(username, 'This username is already taken');
                    return;
                }
                
                // Create new user
                const newUser = {
                    id: Date.now().toString(),
                    name: name.value,
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    role: selectedRole,
                    registeredDate: new Date().toISOString(),
                    bio: ''
                };
                
                // Add user to localStorage
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                // Set user as logged in
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify({
                    id: newUser.id,
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                    registeredDate: newUser.registeredDate,
                    bio: newUser.bio
                }));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }
        });
        
        // Setup password strength meter
        const passwordInput = document.getElementById('register-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const identifier = document.getElementById('login-identifier');
            const password = document.getElementById('login-password');
            const rememberMe = document.getElementById('remember-me');
            
            // Reset previous errors
            resetFormErrors(loginForm);
            
            // Validate inputs
            let isValid = true;
            
            // Validate identifier (username or email)
            if (!identifier.value.trim()) {
                isValid = false;
                showError(identifier, 'Please enter your username or email');
            }
            
            // Validate password
            if (!password.value.trim()) {
                isValid = false;
                showError(password, 'Please enter your password');
            }
            
            // If all validations pass, attempt login
            if (isValid) {
                // Get users from localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Find user by username or email
                const user = users.find(user => 
                    user.username === identifier.value || 
                    user.email === identifier.value
                );
                
                // Check if user exists and password matches
                if (user && user.password === password.value) {
                    // Set user as logged in
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        registeredDate: user.registeredDate,
                        bio: user.bio
                    }));
                    
                    // Remember login if checked
                    if (rememberMe && rememberMe.checked) {
                        localStorage.setItem('rememberLogin', 'true');
                    } else {
                        localStorage.removeItem('rememberLogin');
                    }
                    
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    // Show error
                    const errorElement = document.getElementById('login-error');
                    errorElement.textContent = 'Invalid username/email or password';
                    errorElement.style.display = 'block';
                }
            }
        });
    }
}

/**
 * Setup logout functionality
 */
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear login status
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}

/**
 * Setup demo account buttons
 */
function setupDemoAccounts() {
    const demoButtons = document.querySelectorAll('.btn-demo');
    if (demoButtons.length > 0) {
        demoButtons.forEach(button => {
            button.addEventListener('click', function() {
                const username = this.getAttribute('data-username');
                const password = this.getAttribute('data-password');
                
                // Fill login form
                const identifierInput = document.getElementById('login-identifier');
                const passwordInput = document.getElementById('login-password');
                
                if (identifierInput && passwordInput) {
                    identifierInput.value = username;
                    passwordInput.value = password;
                    
                    // Submit form
                    const loginForm = document.getElementById('login-form');
                    if (loginForm) {
                        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                        loginForm.dispatchEvent(submitEvent);
                    }
                }
            });
        });
    }
}

/**
 * Validate name
 */
function validateName(nameInput) {
    const name = nameInput.value.trim();
    return name.length >= 3;
}

/**
 * Validate email
 */
function validateEmail(emailInput) {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate username
 */
function validateUsername(usernameInput) {
    const username = usernameInput.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

/**
 * Validate confirm password
 */
function validateConfirmPassword(passwordInput, confirmPasswordInput) {
    return passwordInput.value === confirmPasswordInput.value;
}

/**
 * Check password strength
 * Returns: 0 = weak, 1 = medium, 2 = strong, 3 = very strong
 */
function checkPasswordStrength(password) {
    if (!password || password.length < 6) {
        return 0; // Weak
    }
    
    let strength = 0;
    
    // Has lowercase letters
    if (password.match(/[a-z]+/)) {
        strength += 1;
    }
    
    // Has uppercase letters
    if (password.match(/[A-Z]+/)) {
        strength += 1;
    }
    
    // Has numbers
    if (password.match(/[0-9]+/)) {
        strength += 1;
    }
    
    // Has special characters
    if (password.match(/[$@#&!]+/)) {
        strength += 1;
    }
    
    // Determine strength level
    if (password.length < 8) {
        return 1; // Medium
    } else if (strength < 3) {
        return 2; // Strong
    } else {
        return 3; // Very strong
    }
}

/**
 * Update password strength meter
 */
function updatePasswordStrength(password) {
    const strengthMeter = document.getElementById('strength-meter-fill');
    const strengthText = document.getElementById('strength-text');
    
    if (!strengthMeter || !strengthText) {
        return;
    }
    
    const strength = checkPasswordStrength(password);
    
    // Remove all classes
    strengthMeter.classList.remove('weak', 'medium', 'strong', 'very-strong');
    
    // Add appropriate class based on strength
    if (password.length === 0) {
        strengthMeter.style.width = '0';
        strengthText.textContent = 'Password strength';
    } else if (strength === 0) {
        strengthMeter.classList.add('weak');
        strengthText.textContent = 'Weak - at least 6 characters required';
    } else if (strength === 1) {
        strengthMeter.classList.add('medium');
        strengthText.textContent = 'Medium - add uppercase letters, numbers or symbols';
    } else if (strength === 2) {
        strengthMeter.classList.add('strong');
        strengthText.textContent = 'Strong - good password';
    } else {
        strengthMeter.classList.add('very-strong');
        strengthText.textContent = 'Very Strong - excellent password';
    }
}

/**
 * Show error message for an input
 */
function showError(input, message) {
    // Find the error message element
    let errorElement;
    
    if (input.id === 'terms-agreement') {
        errorElement = document.getElementById('terms-error');
    } else {
        errorElement = document.getElementById(`${input.id.split('-')[1]}-error`);
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Add error class to input
    input.classList.add('error');
}

/**
 * Reset all form errors
 */
function resetFormErrors(form) {
    // Hide all error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    // Remove error class from inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    // Hide form error
    const formError = form.querySelector('.form-error');
    if (formError) {
        formError.textContent = '';
        formError.style.display = 'none';
    }
}
