/**
 * Forms JavaScript for LitFest - Book Fair & Literature Website
 * Handles form validation, submission, and localStorage storage
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion functionality
    initFaqAccordion();
    
    // Initialize form validation and submission
    initContactForm();
    initFeedbackForm();
    initNewsletterForm();
    initFooterNewsletterForm();
});

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm(contactForm)) {
            // Get form data
            const formData = {
                name: contactForm.querySelector('#contact-name').value,
                email: contactForm.querySelector('#contact-email').value,
                phone: contactForm.querySelector('#contact-phone').value,
                subject: contactForm.querySelector('#contact-subject').value,
                message: contactForm.querySelector('#contact-message').value,
                newsletter: contactForm.querySelector('#contact-newsletter').checked,
                terms: contactForm.querySelector('#contact-terms').checked,
                date: new Date().toISOString(),
                type: 'contact'
            };
            
            // Save to localStorage
            saveFormSubmission(formData);
            
            // Show success message
            contactForm.style.display = 'none';
            document.getElementById('contact-success').style.display = 'block';
            
            // Reset form
            contactForm.reset();
        }
    });
    
    // Send another message button
    const sendAnotherBtn = document.getElementById('send-another');
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            document.getElementById('contact-success').style.display = 'none';
            contactForm.style.display = 'flex';
        });
    }
}

/**
 * Initialize feedback form
 */
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    if (!feedbackForm) return;
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm(feedbackForm)) {
            // Get selected aspects
            const aspectCheckboxes = feedbackForm.querySelectorAll('input[name="aspects"]:checked');
            const aspects = Array.from(aspectCheckboxes).map(checkbox => checkbox.value);
            
            // Get form data
            const formData = {
                name: feedbackForm.querySelector('#feedback-name').value,
                email: feedbackForm.querySelector('#feedback-email').value,
                feedbackType: feedbackForm.querySelector('#feedback-type').value,
                rating: feedbackForm.querySelector('input[name="rating"]:checked').value,
                aspects: aspects,
                comments: feedbackForm.querySelector('#feedback-comments').value,
                suggestions: feedbackForm.querySelector('#feedback-suggestions').value,
                contactConsent: feedbackForm.querySelector('#feedback-contact').checked,
                newsletter: feedbackForm.querySelector('#feedback-newsletter').checked,
                terms: feedbackForm.querySelector('#feedback-terms').checked,
                date: new Date().toISOString(),
                type: 'feedback'
            };
            
            // Save to localStorage
            saveFormSubmission(formData);
            
            // Show success message
            feedbackForm.style.display = 'none';
            document.getElementById('feedback-success').style.display = 'block';
            
            // Reset form
            feedbackForm.reset();
        }
    });
    
    // Submit another feedback button
    const sendAnotherBtn = document.getElementById('feedback-send-another');
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            document.getElementById('feedback-success').style.display = 'none';
            feedbackForm.style.display = 'flex';
        });
    }
}

/**
 * Initialize newsletter subscription form
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-subscription-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm(newsletterForm)) {
            // Get selected topics
            const topicCheckboxes = newsletterForm.querySelectorAll('input[name="topics"]:checked');
            const topics = Array.from(topicCheckboxes).map(checkbox => checkbox.value);
            
            // Get form data
            const formData = {
                name: newsletterForm.querySelector('#newsletter-name').value,
                email: newsletterForm.querySelector('#newsletter-email').value,
                format: newsletterForm.querySelector('input[name="format"]:checked').value,
                frequency: newsletterForm.querySelector('input[name="frequency"]:checked').value,
                topics: topics,
                referral: newsletterForm.querySelector('#newsletter-referral').value,
                comments: newsletterForm.querySelector('#newsletter-comments').value,
                specialOffers: newsletterForm.querySelector('#newsletter-special-offers').checked,
                terms: newsletterForm.querySelector('#newsletter-terms').checked,
                date: new Date().toISOString(),
                type: 'newsletter'
            };
            
            // Save to localStorage
            saveFormSubmission(formData);
            
            // Show success message
            newsletterForm.style.display = 'none';
            document.getElementById('newsletter-success').style.display = 'block';
            
            // Reset form
            newsletterForm.reset();
        }
    });
}

/**
 * Initialize footer newsletter form
 */
function initFooterNewsletterForm() {
    const footerNewsletterForm = document.getElementById('footer-newsletter-form');
    if (!footerNewsletterForm) return;
    
    footerNewsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = footerNewsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Simple validation
        if (email === '') {
            alert('Please enter your email address.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Get form data
        const formData = {
            email: email,
            date: new Date().toISOString(),
            type: 'footer-newsletter'
        };
        
        // Save to localStorage
        saveFormSubmission(formData);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Reset form
        footerNewsletterForm.reset();
    });
}

/**
 * Validate form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    
    // Reset previous error states
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    });
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const fieldType = field.type;
        const fieldName = field.name;
        const fieldId = field.id;
        let errorElement;
        
        // Find the error message element
        if (fieldId) {
            errorElement = document.getElementById(`${fieldId}-error`);
            if (!errorElement) {
                // Try with the field name
                errorElement = document.getElementById(`${fieldName}-error`);
            }
        }
        
        // Get the parent form group
        const formGroup = field.closest('.form-group');
        
        // Check if field is empty
        if (fieldType === 'text' || fieldType === 'email' || fieldType === 'tel' || fieldType === 'password' || fieldType === 'textarea' || fieldType === 'select-one') {
            if (field.value.trim() === '') {
                isValid = false;
                if (formGroup) formGroup.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'This field is required.';
                    errorElement.style.display = 'block';
                }
            }
        }
        
        // Check if email is valid
        if (fieldType === 'email' && field.value.trim() !== '') {
            if (!isValidEmail(field.value.trim())) {
                isValid = false;
                if (formGroup) formGroup.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address.';
                    errorElement.style.display = 'block';
                }
            }
        }
        
        // Check if phone is valid
        if (fieldType === 'tel' && field.value.trim() !== '') {
            if (!isValidPhone(field.value.trim())) {
                isValid = false;
                if (formGroup) formGroup.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid phone number.';
                    errorElement.style.display = 'block';
                }
            }
        }
        
        // Check if checkbox is checked
        if (fieldType === 'checkbox') {
            if (!field.checked) {
                isValid = false;
                if (formGroup) formGroup.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'You must accept the terms and conditions.';
                    errorElement.style.display = 'block';
                }
            }
        }
        
        // Check if radio button group has a selection
        if (fieldType === 'radio') {
            const radioGroup = form.querySelectorAll(`input[name="${fieldName}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            
            if (!isChecked) {
                isValid = false;
                if (formGroup) formGroup.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Please select an option.';
                    errorElement.style.display = 'block';
                }
            }
        }
    });
    
    return isValid;
}

/**
 * Check if email is valid
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check if phone number is valid
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function isValidPhone(phone) {
    // Simple regex for phone validation (allows various formats)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

/**
 * Save form submission to localStorage
 * @param {Object} formData - The form data to save
 */
function saveFormSubmission(formData) {
    // Get existing submissions or initialize empty array
    let submissions = JSON.parse(localStorage.getItem('litfest_form_submissions')) || [];
    
    // Add new submission with unique ID
    formData.id = generateUniqueId();
    submissions.push(formData);
    
    // Save back to localStorage
    localStorage.setItem('litfest_form_submissions', JSON.stringify(submissions));
    
    // Log for debugging
    console.log('Form submission saved:', formData);
}

/**
 * Generate a unique ID
 * @returns {string} - A unique ID
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * Get form submissions from localStorage
 * @param {string} type - The type of submissions to get (optional)
 * @returns {Array} - Array of form submissions
 */
function getFormSubmissions(type = null) {
    // Get all submissions
    const submissions = JSON.parse(localStorage.getItem('litfest_form_submissions')) || [];
    
    // Filter by type if specified
    if (type) {
        return submissions.filter(submission => submission.type === type);
    }
    
    return submissions;
}

/**
 * Delete a form submission from localStorage
 * @param {string} id - The ID of the submission to delete
 * @returns {boolean} - Whether the deletion was successful
 */
function deleteFormSubmission(id) {
    // Get existing submissions
    let submissions = JSON.parse(localStorage.getItem('litfest_form_submissions')) || [];
    
    // Find the submission index
    const index = submissions.findIndex(submission => submission.id === id);
    
    // If found, remove it
    if (index !== -1) {
        submissions.splice(index, 1);
        localStorage.setItem('litfest_form_submissions', JSON.stringify(submissions));
        return true;
    }
    
    return false;
}
