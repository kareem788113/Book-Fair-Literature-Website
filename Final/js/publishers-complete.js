/**
 * Publishers Page JavaScript
 * Handles all interactive functionality for the publishers page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const publishersTable = document.getElementById('publishers-table-body');
    const publisherSearchInput = document.getElementById('publisher-search');
    const countryFilter = document.getElementById('country-filter');
    const sortFilter = document.getElementById('sort-filter');
    const filterTags = document.getElementById('filter-tags');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const resultsCount = document.querySelector('.results-count');
    const regions = document.querySelectorAll('.region');
    const loadingAnimation = document.getElementById('loading-animation');
    
    // Initialize active filters
    let activeFilters = {
        region: null,
        country: '',
        search: '',
        sort: 'name'
    };
    
    // Add event listeners to regions
    regions.forEach(region => {
        region.addEventListener('click', function() {
            const regionName = this.getAttribute('data-region');
            
            // Toggle active class
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                activeFilters.region = null;
                removeFilterTag('region');
            } else {
                // Remove active class from all regions
                regions.forEach(r => r.classList.remove('active'));
                
                // Add active class to clicked region
                this.classList.add('active');
                activeFilters.region = regionName;
                addFilterTag('region', regionName);
            }
            
            // Filter publishers
            filterPublishers();
        });
    });
    
    // Add event listener to country filter
    if (countryFilter) {
        countryFilter.addEventListener('change', function() {
            const country = this.value;
            
            if (country) {
                activeFilters.country = country;
                addFilterTag('country', country);
            } else {
                activeFilters.country = '';
                removeFilterTag('country');
            }
            
            // Filter publishers
            filterPublishers();
        });
    }
    
    // Add event listener to sort filter
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            activeFilters.sort = this.value;
            filterPublishers();
        });
    }
    
    // Add event listener to search input
    if (publisherSearchInput) {
        publisherSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            
            if (searchTerm) {
                activeFilters.search = searchTerm;
                addFilterTag('search', searchTerm);
            } else {
                activeFilters.search = '';
                removeFilterTag('search');
            }
            
            // Filter publishers with a slight delay for better UX
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                filterPublishers();
            }, 300);
        });
    }
    
    // Add event listener to clear filters button
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Reset all filters
            activeFilters = {
                region: null,
                country: '',
                search: '',
                sort: 'name'
            };
            
            // Reset UI elements
            regions.forEach(r => r.classList.remove('active'));
            if (countryFilter) countryFilter.value = '';
            if (publisherSearchInput) publisherSearchInput.value = '';
            if (sortFilter) sortFilter.value = 'name';
            
            // Clear filter tags
            if (filterTags) filterTags.innerHTML = '';
            
            // Update results count
            updateResultsCount(getAllPublishers().length);
            
            // Show all publishers
            filterPublishers();
        });
    }
    
    // Function to add a filter tag
    function addFilterTag(type, value) {
        // Remove existing tag of the same type
        removeFilterTag(type);
        
        // Create new tag
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.setAttribute('data-type', type);
        
        let tagText = '';
        switch (type) {
            case 'region':
                tagText = `Region: ${value}`;
                break;
            case 'country':
                tagText = `Country: ${value}`;
                break;
            case 'search':
                tagText = `Search: ${value}`;
                break;
        }
        
        tag.innerHTML = `
            ${tagText}
            <span class="remove-tag"><i class="fas fa-times"></i></span>
        `;
        
        // Add click event to remove tag
        tag.querySelector('.remove-tag').addEventListener('click', function() {
            removeFilterTag(type);
            
            // Update filters
            switch (type) {
                case 'region':
                    activeFilters.region = null;
                    regions.forEach(r => r.classList.remove('active'));
                    break;
                case 'country':
                    activeFilters.country = '';
                    if (countryFilter) countryFilter.value = '';
                    break;
                case 'search':
                    activeFilters.search = '';
                    if (publisherSearchInput) publisherSearchInput.value = '';
                    break;
            }
            
            // Filter publishers
            filterPublishers();
        });
        
        // Add tag to filter tags container
        if (filterTags) {
            filterTags.appendChild(tag);
        }
    }
    
    // Function to remove a filter tag
    function removeFilterTag(type) {
        if (filterTags) {
            const existingTag = filterTags.querySelector(`.filter-tag[data-type="${type}"]`);
            if (existingTag) {
                existingTag.remove();
            }
        }
    }
    
    // Function to filter publishers
    function filterPublishers() {
        // Show loading animation
        if (loadingAnimation) {
            loadingAnimation.classList.add('show');
        }
        
        // Simulate delay for API call
        setTimeout(() => {
            // Get all publishers
            const allPublishers = getAllPublishers();
            
            // Filter publishers based on active filters
            let filteredPublishers = allPublishers.filter(publisher => {
                // Filter by region
                if (activeFilters.region && publisher.region !== activeFilters.region) {
                    return false;
                }
                
                // Filter by country
                if (activeFilters.country && publisher.country !== activeFilters.country) {
                    return false;
                }
                
                // Filter by search term
                if (activeFilters.search) {
                    const searchTerm = activeFilters.search.toLowerCase();
                    const publisherName = publisher.name.toLowerCase();
                    const publisherCountry = publisher.country.toLowerCase();
                    
                    if (!publisherName.includes(searchTerm) && !publisherCountry.includes(searchTerm)) {
                        return false;
                    }
                }
                
                return true;
            });
            
            // Sort publishers
            filteredPublishers = sortPublishers(filteredPublishers, activeFilters.sort);
            
            // Update UI
            displayPublishers(filteredPublishers);
            
            // Update results count
            updateResultsCount(filteredPublishers.length);
            
            // Hide loading animation
            if (loadingAnimation) {
                loadingAnimation.classList.remove('show');
            }
            
            // Reattach event listeners to publisher detail buttons
            attachPublisherDetailListeners();
        }, 500); // Simulate 500ms delay for API call
    }
    
    // Function to sort publishers
    function sortPublishers(publishers, sortBy) {
        return publishers.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'books':
                    return parseInt(b.booksCount.replace(/[^0-9]/g, '')) - parseInt(a.booksCount.replace(/[^0-9]/g, ''));
                case 'founded':
                    return a.founded - b.founded;
                default:
                    return 0;
            }
        });
    }
    
    // Function to display publishers
    function displayPublishers(publishers) {
        if (publishersTable) {
            publishersTable.innerHTML = '';
            
            if (publishers.length === 0) {
                // Display no results message
                publishersTable.innerHTML = `
                    <tr>
                        <td colspan="6" class="no-results">
                            <div class="no-results-message">
                                <i class="fas fa-search"></i>
                                <p>No publishers found matching your filters.</p>
                                <button class="btn btn-small btn-outline" onclick="document.getElementById('clear-filters').click()">Clear Filters</button>
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }
            
            // Display publishers
            publishers.forEach(publisher => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="publisher-cell">
                            <div class="publisher-logo-small">
                                <img src="${publisher.logo}" alt="${publisher.name}">
                            </div>
                            <span class="publisher-name">${publisher.name}</span>
                        </div>
                    </td>
                    <td class="publisher-founded">${publisher.founded}</td>
                    <td>
                        <div class="publisher-headquarters">
                            <img src="${publisher.flag}" alt="${publisher.country}" class="country-flag">
                            ${publisher.headquarters}
                        </div>
                    </td>
                    <td>
                        <div class="publisher-genres-list">
                            ${publisher.genres.slice(0, 3).map(genre => `<span class="genre-pill">${genre}</span>`).join('')}
                        </div>
                    </td>
                    <td class="publisher-books">${publisher.booksCount}</td>
                    <td>
                        <div class="publisher-actions table-actions">
                            <button class="btn btn-outline view-btn" data-publisher-id="${publisher.id}">
                                <i class="fas fa-info-circle"></i> View Details
                            </button>
                            <button class="btn btn-primary website-btn" data-url="${publisher.website}">
                                <i class="fas fa-globe"></i> Visit
                            </button>
                        </div>
                    </td>
                `;
                
                // Add event listener to view button
                const viewBtn = row.querySelector('.view-btn');
                viewBtn.addEventListener('click', function() {
                    const publisherId = this.getAttribute('data-publisher-id');
                    openPublisherModal(publisherId);
                });
                
                // Add event listener to website button
                const websiteBtn = row.querySelector('.website-btn');
                websiteBtn.addEventListener('click', function() {
                    const url = this.getAttribute('data-url');
                    window.open(url, '_blank');
                });
                
                publishersTable.appendChild(row);
            });
        }
    }
    
    // Function to update results count
    function updateResultsCount(count) {
        if (resultsCount) {
            if (count === getAllPublishers().length) {
                resultsCount.textContent = 'Showing all publishers';
            } else {
                resultsCount.textContent = `Showing ${count} publishers`;
            }
        }
    }
    
    // Function to get all publishers (simulated data)
    function getAllPublishers() {
        // In a real application, this data would come from an API
        return [
            {
                id: '1',
                name: 'Penguin Random House',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Penguin_Random_House_logo.svg/1200px-Penguin_Random_House_logo.svg.png',
                founded: 1935,
                headquarters: 'New York, USA',
                country: 'United States',
                region: 'North America',
                flag: 'https://flagcdn.com/w40/us.png',
                genres: ['Fiction', 'Non-Fiction', 'Children\'s'],
                booksCount: '15,000+',
                website: 'https://www.penguinrandomhouse.com/'
            },
            {
                id: '2',
                name: 'HarperCollins',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/HarperCollins_logo.svg/1200px-HarperCollins_logo.svg.png',
                founded: 1817,
                headquarters: 'New York, USA',
                country: 'United States',
                region: 'North America',
                flag: 'https://flagcdn.com/w40/us.png',
                genres: ['Fiction', 'Non-Fiction', 'Educational'],
                booksCount: '12,000+',
                website: 'https://www.harpercollins.com/'
            },
            {
                id: '3',
                name: 'Macmillan Publishers',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Macmillan_Publishers_logo.svg/1200px-Macmillan_Publishers_logo.svg.png',
                founded: 1843,
                headquarters: 'London, UK',
                country: 'United Kingdom',
                region: 'Europe',
                flag: 'https://flagcdn.com/w40/gb.png',
                genres: ['Fiction', 'Academic', 'Science'],
                booksCount: '10,500+',
                website: 'https://us.macmillan.com/'
            },
            {
                id: '4',
                name: 'Hachette Book Group',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Hachette_Book_Group_logo.svg/1200px-Hachette_Book_Group_logo.svg.png',
                founded: 1837,
                headquarters: 'Paris, France',
                country: 'France',
                region: 'Europe',
                flag: 'https://flagcdn.com/w40/fr.png',
                genres: ['Fiction', 'Non-Fiction', 'Literary'],
                booksCount: '11,200+',
                website: 'https://www.hachettebookgroup.com/'
            },
            {
                id: '5',
                name: 'Simon & Schuster',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Simon_%26_Schuster.svg/1200px-Simon_%26_Schuster.svg.png',
                founded: 1924,
                headquarters: 'New York, USA',
                country: 'United States',
                region: 'North America',
                flag: 'https://flagcdn.com/w40/us.png',
                genres: ['Fiction', 'Biography', 'Business'],
                booksCount: '9,200+',
                website: 'https://www.simonandschuster.com/'
            }
        ];
    }
    
    // Initialize the page
    filterPublishers();
    
    // Add event listeners to publisher detail buttons
    attachPublisherDetailListeners();
    
    // Function to attach event listeners to all publisher detail buttons
    function attachPublisherDetailListeners() {
        const publisherDetailBtns = document.querySelectorAll('.publisher-details-btn');
        publisherDetailBtns.forEach(btn => {
            // Remove any existing event listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Add new event listener
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const publisherId = this.getAttribute('data-publisher-id');
                console.log('Opening modal for publisher ID:', publisherId);
                openPublisherModal(publisherId);
            });
        });
    }
});

// Function to open publisher modal
function openPublisherModal(publisherId) {
    // Show loading animation
    const loadingAnimation = document.getElementById('loading-animation');
    if (loadingAnimation) {
        loadingAnimation.classList.add('show');
    }
    
    // In a real application, you would fetch the publisher data from an API
    // For this example, we'll simulate a delay and then show sample data
    setTimeout(() => {
        // Hide loading animation
        if (loadingAnimation) {
            loadingAnimation.classList.remove('show');
        }
        
        // Get the modal element
        const modal = document.getElementById('publisher-modal');
        
        // Sample publisher data based on ID (in a real app, this would come from the API)
        let publisher;
        
        // Different sample publishers based on ID
        switch(publisherId) {
            case '1':
                publisher = {
                    id: publisherId,
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
                break;
            case '2':
                publisher = {
                    id: publisherId,
                    name: "HarperCollins",
                    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/HarperCollins_logo.svg/1200px-HarperCollins_logo.svg.png",
                    bannerImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
                    description: "HarperCollins Publishers is one of the world's leading English-language publishers. Headquartered in New York, HarperCollins has publishing operations in 17 countries.",
                    location: "New York, USA",
                    founded: 1817,
                    booksCount: "12,000+",
                    authorsCount: "1,800+",
                    featured: true,
                    genres: ["Fiction", "Non-Fiction", "Children's", "Religious", "Educational"],
                    notableBooks: [
                        {
                            title: "The Alchemist",
                            author: "Paulo Coelho",
                            coverImage: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
                            awards: "International Bestseller"
                        },
                        {
                            title: "The Chronicles of Narnia",
                            author: "C.S. Lewis",
                            coverImage: "https://images-na.ssl-images-amazon.com/images/I/51HXhK3Jq3L.jpg"
                        }
                    ],
                    featuredAuthors: [
                        {
                            name: "Paulo Coelho",
                            photo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                            bio: "Brazilian novelist and lyricist"
                        }
                    ],
                    gallery: [
                        {
                            url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                            caption: "HarperCollins Headquarters"
                        }
                    ],
                    website: "https://www.harpercollins.com/",
                    socialMedia: {
                        twitter: "https://twitter.com/HarperCollins",
                        facebook: "https://www.facebook.com/HarperCollins/"
                    }
                };
                break;
            default:
                // Default publisher data if ID doesn't match
                publisher = {
                    id: publisherId,
                    name: "Publisher " + publisherId,
                    logo: "https://via.placeholder.com/150",
                    bannerImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
                    description: "This is a sample publisher description. In a real application, this data would come from an API.",
                    location: "Sample Location",
                    founded: 2000,
                    booksCount: "1,000+",
                    authorsCount: "100+",
                    featured: false,
                    genres: ["Fiction", "Non-Fiction"],
                    notableBooks: [],
                    featuredAuthors: [],
                    gallery: [],
                    website: "#",
                    socialMedia: {}
                };
        }
        
        // Create modal content using the template function
        modal.innerHTML = createPublisherModalContent(publisher);
        
        // Show the modal with animation
        modal.style.display = 'block';
        
        // Force a reflow to ensure the animation plays
        void modal.offsetWidth;
        
        // Add event listener to close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Add event listener to close button in actions
        const closeActionBtn = modal.querySelector('.publisher-modal-actions .btn-outline');
        if (closeActionBtn) {
            closeActionBtn.addEventListener('click', closeModal);
        }
        
        // Add animation classes to elements
        animateModalElements();
    }, 1000); // Simulate 1 second delay for API call
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('publisher-modal');
    if (modal) {
        // Add fade-out animation
        modal.classList.add('fade-out');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
        }, 300);
    }
}

// Function to add animations to modal elements
function animateModalElements() {
    // Add staggered animation to books
    const books = document.querySelectorAll('.notable-book');
    books.forEach((book, index) => {
        setTimeout(() => {
            book.style.opacity = '1';
            book.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Add staggered animation to authors
    const authors = document.querySelectorAll('.publisher-author');
    authors.forEach((author, index) => {
        setTimeout(() => {
            author.style.opacity = '1';
            author.style.transform = 'translateY(0)';
        }, 150 * index);
    });
    
    // Add staggered animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, 100 * index);
    });
}
