/**
 * Publisher Modal Template
 * Provides a template for displaying publisher details in a modal
 */

function createPublisherModalContent(publisher) {
    return `
    <div class="modal-content publisher-modal">
        <span class="modal-close">&times;</span>
        
        <!-- Publisher Header -->
        <div class="publisher-modal-header" style="background-image: url('${publisher.bannerImage || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'}')">
            <div class="publisher-modal-overlay"></div>
            <div class="publisher-modal-logo">
                <img src="${publisher.logo || 'https://via.placeholder.com/150'}" alt="${publisher.name}">
            </div>
            <h2 class="publisher-modal-title">${publisher.name}</h2>
            ${publisher.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>
        
        <!-- Publisher Details -->
        <div class="publisher-modal-body">
            <div class="publisher-modal-section">
                <h3><i class="fas fa-info-circle"></i> About</h3>
                <p>${publisher.description || 'No description available.'}</p>
            </div>
            
            <div class="publisher-modal-info-grid">
                <div class="publisher-modal-info-item">
                    <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                    <div class="info-content">
                        <h4>Headquarters</h4>
                        <p>${publisher.location || 'Not specified'}</p>
                    </div>
                </div>
                <div class="publisher-modal-info-item">
                    <div class="info-icon"><i class="fas fa-calendar-alt"></i></div>
                    <div class="info-content">
                        <h4>Founded</h4>
                        <p>${publisher.founded || 'Not specified'}</p>
                    </div>
                </div>
                <div class="publisher-modal-info-item">
                    <div class="info-icon"><i class="fas fa-book"></i></div>
                    <div class="info-content">
                        <h4>Books Published</h4>
                        <p>${publisher.booksCount || 'Not specified'}</p>
                    </div>
                </div>
                <div class="publisher-modal-info-item">
                    <div class="info-icon"><i class="fas fa-users"></i></div>
                    <div class="info-content">
                        <h4>Authors</h4>
                        <p>${publisher.authorsCount || 'Not specified'}</p>
                    </div>
                </div>
            </div>
            
            <!-- Publisher Genres -->
            <div class="publisher-modal-section">
                <h3><i class="fas fa-tags"></i> Genres</h3>
                <div class="publisher-modal-genres">
                    ${(publisher.genres || ['No genres specified']).map(genre => 
                        `<span class="genre-pill">${genre}</span>`
                    ).join('')}
                </div>
            </div>
            
            <!-- Publisher Notable Books -->
            <div class="publisher-modal-section">
                <h3><i class="fas fa-star"></i> Notable Books</h3>
                <div class="publisher-modal-books">
                    ${(publisher.notableBooks || []).length > 0 ? 
                        publisher.notableBooks.map(book => `
                            <div class="notable-book">
                                <div class="notable-book-cover">
                                    <img src="${book.coverImage || 'https://via.placeholder.com/150x200?text=Book+Cover'}" alt="${book.title}">
                                </div>
                                <div class="notable-book-info">
                                    <h4>${book.title}</h4>
                                    <p>by ${book.author}</p>
                                    ${book.awards ? `<span class="book-award"><i class="fas fa-award"></i> ${book.awards}</span>` : ''}
                                </div>
                            </div>
                        `).join('') : 
                        '<p class="no-content">No notable books available.</p>'
                    }
                </div>
            </div>
            
            <!-- Publisher Authors -->
            <div class="publisher-modal-section">
                <h3><i class="fas fa-feather-alt"></i> Featured Authors</h3>
                <div class="publisher-modal-authors">
                    ${(publisher.featuredAuthors || []).length > 0 ? 
                        publisher.featuredAuthors.map(author => `
                            <div class="publisher-author">
                                <div class="publisher-author-avatar">
                                    <img src="${author.photo || 'https://via.placeholder.com/100?text=Author'}" alt="${author.name}">
                                </div>
                                <div class="publisher-author-info">
                                    <h4 class="publisher-author-name">${author.name}</h4>
                                    <p>${author.bio || ''}</p>
                                </div>
                            </div>
                        `).join('') : 
                        '<p class="no-content">No featured authors available.</p>'
                    }
                </div>
            </div>
            
            <!-- Publisher Gallery -->
            <div class="publisher-modal-section">
                <h3><i class="fas fa-images"></i> Gallery</h3>
                <div class="publisher-modal-gallery">
                    ${(publisher.gallery || []).length > 0 ? 
                        publisher.gallery.map(image => `
                            <div class="gallery-item">
                                <img src="${image.url || 'https://via.placeholder.com/300x200?text=Gallery+Image'}" alt="${image.caption || 'Gallery image'}">
                                ${image.caption ? `<div class="gallery-caption">${image.caption}</div>` : ''}
                            </div>
                        `).join('') : 
                        '<p class="no-content">No gallery images available.</p>'
                    }
                </div>
            </div>
            
            <!-- Publisher Links -->
            <div class="publisher-modal-section">
                <h3><i class="fas fa-link"></i> Links</h3>
                <div class="publisher-modal-links">
                    ${publisher.website ? 
                        `<a href="${publisher.website}" target="_blank" class="publisher-modal-link">
                            <i class="fas fa-globe"></i> Official Website
                        </a>` : ''
                    }
                    ${publisher.socialMedia && publisher.socialMedia.twitter ? 
                        `<a href="${publisher.socialMedia.twitter}" target="_blank" class="publisher-modal-link">
                            <i class="fab fa-twitter"></i> Twitter
                        </a>` : ''
                    }
                    ${publisher.socialMedia && publisher.socialMedia.facebook ? 
                        `<a href="${publisher.socialMedia.facebook}" target="_blank" class="publisher-modal-link">
                            <i class="fab fa-facebook"></i> Facebook
                        </a>` : ''
                    }
                    ${publisher.socialMedia && publisher.socialMedia.instagram ? 
                        `<a href="${publisher.socialMedia.instagram}" target="_blank" class="publisher-modal-link">
                            <i class="fab fa-instagram"></i> Instagram
                        </a>` : ''
                    }
                </div>
            </div>
            
            <!-- Publisher Actions -->
            <div class="publisher-modal-actions">
                <a href="${publisher.website || '#'}" target="_blank" class="btn btn-primary"><i class="fas fa-globe"></i> Visit Website</a>
                <button class="btn btn-outline" onclick="closeModal()"><i class="fas fa-times"></i> Close</button>
            </div>
        </div>
    </div>
    `;
}

// Sample publisher data for testing
const samplePublisher = {
    id: 1,
    name: "Penguin Random House",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Penguin_Random_House_logo.svg/1200px-Penguin_Random_House_logo.svg.png",
    bannerImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    description: "Penguin Random House is the international home to nearly 250 editorially and creatively independent publishing imprints. Together, their mission is to foster a universal passion for reading by partnering with authors to help create stories and communicate ideas that inform, entertain, and inspire, and to connect them with readers everywhere.",
    location: "New York, USA",
    founded: 1935,
    booksCount: "15,000+",
    authorsCount: "2,500+",
    featured: true,
    genres: ["Fiction", "Non-Fiction", "Children's", "Biography", "Science", "History"],
    notableBooks: [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            coverImage: "https://images-na.ssl-images-amazon.com/images/I/91dSMhdIzTL.jpg",
            awards: "Pulitzer Prize"
        },
        {
            title: "1984",
            author: "George Orwell",
            coverImage: "https://images-na.ssl-images-amazon.com/images/I/81gepf1eMqL.jpg"
        },
        {
            title: "Becoming",
            author: "Michelle Obama",
            coverImage: "https://images-na.ssl-images-amazon.com/images/I/71FTb9X6wsL.jpg"
        }
    ],
    featuredAuthors: [
        {
            name: "John Grisham",
            photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            bio: "Bestselling author of legal thrillers"
        },
        {
            name: "Michelle Obama",
            photo: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            bio: "Former First Lady and memoirist"
        }
    ],
    gallery: [
        {
            url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            caption: "Headquarters Library"
        },
        {
            url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            caption: "Book Printing Press"
        },
        {
            url: "https://images.unsplash.com/photo-1520694478166-daaaaec95b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            caption: "Author Event"
        }
    ],
    website: "https://www.penguinrandomhouse.com/",
    socialMedia: {
        twitter: "https://twitter.com/penguinrandom",
        facebook: "https://www.facebook.com/PenguinRandomHouse/",
        instagram: "https://www.instagram.com/penguinrandomhouse/"
    }
};
