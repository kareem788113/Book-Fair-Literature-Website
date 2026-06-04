// Header Icons JavaScript - Ensures profile icon appears on all pages

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (would normally use a proper auth check)
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    // Get all navigation menus across the site
    const navMenus = document.querySelectorAll('.nav-menu');
    
    navMenus.forEach(menu => {
        // Check if the menu already has a user-actions item
        let userActionsItem = menu.querySelector('.user-actions');
        
        // If no user actions item exists, create one
        if (!userActionsItem) {
            userActionsItem = document.createElement('li');
            userActionsItem.className = 'user-actions';
            menu.appendChild(userActionsItem);
        }
        
        // Clear existing content to avoid duplicates
        userActionsItem.innerHTML = '';
        
        // Add appropriate links based on login status
        if (isLoggedIn) {
            // User is logged in, show profile link
            const profileLink = document.createElement('a');
            profileLink.href = 'profile.html';
            profileLink.id = 'profileBtn';
            profileLink.innerHTML = '<i class="fas fa-user"></i> Profile';
            
            // Check if we're on the profile page
            if (window.location.pathname.includes('profile.html')) {
                profileLink.classList.add('active');
            }
            
            userActionsItem.appendChild(profileLink);
            
            // Add logout link
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.id = 'logoutBtn';
            logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                // Simulate logout
                localStorage.setItem('userLoggedIn', 'false');
                window.location.reload();
            });
            
            userActionsItem.appendChild(logoutLink);
        } else {
            // User is not logged in, show login and register links
            const loginLink = document.createElement('a');
            loginLink.href = 'login.html';
            loginLink.id = 'loginBtn';
            loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            
            // Check if we're on the login page
            if (window.location.pathname.includes('login.html')) {
                loginLink.classList.add('active');
            }
            
            userActionsItem.appendChild(loginLink);
            
            // Add register link
            const registerLink = document.createElement('a');
            registerLink.href = 'register.html';
            registerLink.id = 'registerBtn';
            registerLink.innerHTML = '<i class="fas fa-user-plus"></i> Register';
            
            // Check if we're on the register page
            if (window.location.pathname.includes('register.html')) {
                registerLink.classList.add('active');
            }
            
            userActionsItem.appendChild(registerLink);
        }
    });
    
    // Add event listeners for login/register simulation
    const loginButtons = document.querySelectorAll('#loginBtn');
    loginButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only prevent default if it's a simulation link (href="#")
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                localStorage.setItem('userLoggedIn', 'true');
                window.location.href = 'profile.html';
            }
        });
    });
    
    // Demo login/logout toggle has been removed
});
