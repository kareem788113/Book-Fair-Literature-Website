/**
 * Publisher Modal Fix
 * Disabled view details functionality and image deletion for publishers
 */

document.addEventListener('DOMContentLoaded', function() {
    // Disable all view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
        button.setAttribute('title', 'View details functionality is disabled');
        
        // Remove existing event listeners by cloning and replacing
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    
    // Disable featured publisher buttons
    const featuredPublisherButtons = document.querySelectorAll('.publisher-details-btn');
    featuredPublisherButtons.forEach(button => {
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
        button.setAttribute('title', 'View details functionality is disabled');
        
        // Remove existing event listeners by cloning and replacing
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    
    // Function to display a message when view details is attempted
    function showDisabledMessage() {
        alert('The view details functionality has been disabled.');
    }
});
