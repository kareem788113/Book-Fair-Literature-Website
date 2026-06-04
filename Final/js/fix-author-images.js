/**
 * Fix Author Images JavaScript for LitFest - Book Fair & Literature Website
 * Ensures all author images are displayed correctly
 */

document.addEventListener('DOMContentLoaded', function() {
    // Reliable image URLs for authors
    const reliableAuthorImages = {
        'J.K. Rowling': 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Stephen King': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Agatha Christie': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'James Patterson': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Jane Austen': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Ernest Hemingway': 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Mark Twain': 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'George Orwell': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Charles Dickens': 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'William Shakespeare': 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
    
    // Default image if author name not found
    const defaultAuthorImage = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    
    // Get all author images
    const authorImages = document.querySelectorAll('.author-image img');
    
    // Process each author image
    authorImages.forEach(img => {
        // Get author name from alt attribute
        const authorName = img.alt;
        
        // Check if image is broken or using randomuser URL
        if (!img.complete || img.naturalWidth === 0 || 
            img.src.includes('randomuser.me') || img.src.includes('placeholder')) {
            
            // Set reliable image URL based on author name
            if (reliableAuthorImages[authorName]) {
                img.src = reliableAuthorImages[authorName];
            } else {
                img.src = defaultAuthorImage;
            }
        }
        
        // Add error handler for images
        img.onerror = function() {
            // If image fails to load, use default image
            this.src = defaultAuthorImage;
        };
    });
    
    // Fix author books images
    const authorBooksImages = document.querySelectorAll('.author-book img');
    
    // Process each author book image
    authorBooksImages.forEach(img => {
        // Check if image is broken or using Amazon URL
        if (!img.complete || img.naturalWidth === 0 || 
            img.src.includes('amazon') || img.src.includes('goodreads')) {
            
            // Set a reliable book image
            img.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        }
        
        // Add error handler for images
        img.onerror = function() {
            // If image fails to load, use default image
            this.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        };
    });
});
