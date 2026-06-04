/**
 * Enhanced Newsletter JavaScript
 * Handles functionality for the enhanced newsletter subscription
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all newsletter forms on the page
    const newsletterForms = document.querySelectorAll('#newsletter-form');
    
    newsletterForms.forEach(form => {
        const formContainer = form.closest('.newsletter-content');
        const successMessage = formContainer ? formContainer.querySelector('.newsletter-success-message') : null;
        const emailInput = form.querySelector('input[type="email"]');
        const subscribeButton = form.querySelector('button[type="submit"]');
        
        // Add pulse animation to subscribe button on hover
        if (subscribeButton && subscribeButton.classList.contains('pulse-button')) {
            subscribeButton.addEventListener('mouseenter', function() {
                this.classList.add('pulsing');
            });
            
            subscribeButton.addEventListener('mouseleave', function() {
                this.classList.remove('pulsing');
            });
        }
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!emailInput) return;
            
            const email = emailInput.value.trim();
            const preferences = [];
            
            // Collect checkbox preferences
            const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach(checkbox => {
                const label = checkbox.closest('.checkbox-container');
                if (label) {
                    const text = label.querySelector('.checkbox-text');
                    if (text) {
                        preferences.push(text.textContent.trim());
                    }
                }
            });
            
            if (validateEmail(email)) {
                // Simulate form submission
                simulateFormSubmission(email, emailInput, successMessage, preferences, form);
            } else {
                // Show error for invalid email
                showInputError(emailInput, 'Please enter a valid email address');
            }
        });
        
        // Add input focus event to remove error styling
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                this.classList.remove('input-error');
                const formGroup = this.closest('.form-group');
                if (formGroup) {
                    const errorMessage = formGroup.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
        }
    });
    
    // Initialize any existing subscribers from localStorage
    initializeSubscriberStatus();
});

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/**
 * Shows error message for input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showInputError(input, message) {
    input.classList.add('input-error');
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    input.parentElement.appendChild(errorMessage);
}

/**
 * Simulates form submission with loading state and success message
 * @param {string} email - The email being submitted
 * @param {HTMLElement} inputElement - The email input element
 * @param {HTMLElement} successElement - The success message element
 * @param {Array} preferences - The selected preferences
 * @param {HTMLElement} formElement - The form element
 */
function simulateFormSubmission(email, inputElement, successElement, preferences, formElement) {
    // Get the form group containing the input
    const formGroup = inputElement.closest('.form-group') || inputElement.parentElement;
    
    // Disable input and show loading state
    inputElement.disabled = true;
    formGroup.classList.add('loading');
    
    // Change button text to loading
    const submitButton = formGroup.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Subscribing...';
        submitButton.disabled = true;
    }
    
    // Simulate API call delay
    setTimeout(() => {
        // Remove loading state
        formGroup.classList.remove('loading');
        
        // Store subscription in localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];
        const subscriberData = {
            email: email,
            preferences: preferences,
            date: new Date().toISOString()
        };
        
        // Check if email already exists
        const existingIndex = subscribers.findIndex(s => typeof s === 'object' ? s.email === email : s === email);
        
        if (existingIndex === -1) {
            subscribers.push(subscriberData);
        } else {
            // Update existing subscriber
            subscribers[existingIndex] = subscriberData;
        }
        
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        
        // Show success message
        if (successElement) {
            successElement.style.display = 'flex';
            
            // Hide the form
            if (formElement) {
                formElement.style.display = 'none';
            }
        }
        
        // Reset button
        if (submitButton) {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
                submitButton.disabled = false;
            }, 3000);
        }
        
        // Clear and re-enable input
        inputElement.value = '';
        inputElement.disabled = false;
    }, 1500); // Simulate 1.5s API call
}

/**
 * Initialize subscriber status from localStorage
 */
function initializeSubscriberStatus() {
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];
    const currentUserEmail = localStorage.getItem('current_user_email');
    
    // Check if current user is already subscribed
    if (currentUserEmail) {
        const isSubscribed = subscribers.some(s => {
            return typeof s === 'object' ? s.email === currentUserEmail : s === currentUserEmail;
        });
        
        if (isSubscribed) {
            // Find all newsletter forms
            const newsletterForms = document.querySelectorAll('#newsletter-form');
            
            newsletterForms.forEach(form => {
                const formContainer = form.closest('.newsletter-content');
                const successMessage = formContainer ? formContainer.querySelector('.newsletter-success-message') : null;
                
                if (successMessage) {
                    // Show success message and hide form
                    successMessage.style.display = 'flex';
                    form.style.display = 'none';
                }
            });
        }
    }
}

// Add CSS for error styling
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .input-error {
            border-color: #e74c3c !important;
            background-color: rgba(231, 76, 60, 0.05) !important;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 5px;
            animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
