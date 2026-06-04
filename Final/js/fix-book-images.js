/**
 * Fix Book Images Script for LitFest - Book Fair & Literature Website
 * This script replaces problematic Amazon image URLs with reliable Unsplash images
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if booksData exists
    if (typeof booksData !== 'undefined') {
        // Replace problematic image URLs with reliable ones
        const imageReplacements = {
            // The Midnight Library
            "https://images-na.ssl-images-amazon.com/images/I/81XR+8rPjnL.jpg": 
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            
            // A Gentleman in Moscow
            "https://images-na.ssl-images-amazon.com/images/I/91uwocAMtSL.jpg": 
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            
            // Educated
            "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg": 
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            
            // Where the Crawdads Sing
            "https://images-na.ssl-images-amazon.com/images/I/91nTClkODkL.jpg": 
                "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            
            // Atomic Habits
            "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg": 
                "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            
            // The Alchemist
            "https://images-na.ssl-images-amazon.com/images/I/71aLultW5EL.jpg": 
                "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        };
        
        // Update all book cover images
        booksData.forEach(book => {
            if (imageReplacements[book.coverImage]) {
                book.coverImage = imageReplacements[book.coverImage];
            }
        });
        
        console.log('Book cover images have been updated with reliable URLs');
        
        // If we're on the book details page, update the image immediately
        const bookCover = document.getElementById('book-cover');
        if (bookCover && bookCover.src) {
            const urlParams = new URLSearchParams(window.location.search);
            const bookId = urlParams.get('id');
            
            if (bookId) {
                const book = booksData.find(b => b.id.toString() === bookId);
                if (book) {
                    bookCover.src = book.coverImage;
                }
            }
        }
    }
});
