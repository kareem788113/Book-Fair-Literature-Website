/**
 * Authors JavaScript for LitFest - Book Fair & Literature Website
 * Handles author data display, filtering, and modal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Author data
    const authorsData = [
        {
            id: 1,
            name: "J.K. Rowling",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            genres: ["Fantasy", "Children's Literature", "Mystery"],
            books: 15,
            awards: 12,
            country: "United Kingdom",
            bio: "J.K. Rowling is best known as the author of the seven Harry Potter books, which were published between 1997 and 2007. The enduringly popular adventures of Harry, Ron, and Hermione have sold over 500 million copies, been translated into over 80 languages, and made into eight blockbuster films. Alongside the Harry Potter series, she also wrote three short companion volumes for charity: Quidditch Through the Ages, Fantastic Beasts and Where to Find Them, and The Tales of Beedle the Bard. She followed these with a further two companion volumes: Fantastic Beasts and Where to Find Them: The Original Screenplay, and Fantastic Beasts: The Crimes of Grindelwald - The Original Screenplay.",
            yearsActive: "1997-Present",
            popularBooks: [
                { id: 101, title: "Harry Potter and the Philosopher's Stone", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg", author: "J.K. Rowling" },
                { id: 102, title: "Harry Potter and the Chamber of Secrets", coverImage: "https://images-na.ssl-images-amazon.com/images/I/91OINeHnJGL.jpg", author: "J.K. Rowling" },
                { id: 103, title: "Harry Potter and the Prisoner of Azkaban", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81lAPl9Fl0L.jpg", author: "J.K. Rowling" }
            ]
        },
        {
            id: 2,
            name: "Stephen King",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            genres: ["Horror", "Thriller", "Science Fiction", "Fantasy"],
            books: 61,
            awards: 15,
            country: "United States",
            bio: "Stephen King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. His books have sold more than 350 million copies, and many have been adapted into films, television series, miniseries, and comic books. King has published 61 novels, including seven under the pen name Richard Bachman, and five non-fiction books. He has also written approximately 200 short stories, most of which have been published in book collections.",
            yearsActive: "1974-Present",
            popularBooks: [
                { id: 201, title: "The Shining", coverImage: "https://images-na.ssl-images-amazon.com/images/I/91zqCX1wZUL.jpg", author: "Stephen King" },
                { id: 202, title: "It", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71tFhdcC0XL.jpg", author: "Stephen King" },
                { id: 203, title: "The Stand", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QckmGleYL.jpg", author: "Stephen King" }
            ]
        },
        {
            id: 3,
            name: "Agatha Christie",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            genres: ["Mystery", "Crime Fiction", "Detective Fiction"],
            books: 66,
            awards: 7,
            country: "United Kingdom",
            bio: "Agatha Christie is best known for her detective novels and short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple. She wrote more than 70 detective novels as well as short fiction. According to Index Translationum, she remains the most-translated individual author, having been translated into at least 103 languages. And Then There Were None is Christie's best-selling novel, with 100 million sales to date, making it the world's best-selling mystery ever, and one of the best-selling books of all time.",
            yearsActive: "1920-1976",
            popularBooks: [
                { id: 301, title: "Murder on the Orient Express", coverImage: "https://images-na.ssl-images-amazon.com/images/I/91dnlJuA0GL.jpg", author: "Agatha Christie" },
                { id: 302, title: "And Then There Were None", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81B9LhCS2AL.jpg", author: "Agatha Christie" },
                { id: 303, title: "Death on the Nile", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71+WD1DKwQL.jpg", author: "Agatha Christie" }
            ]
        },
        {
            id: 4,
            name: "George R.R. Martin",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            genres: ["Fantasy", "Science Fiction", "Horror"],
            books: 22,
            awards: 6,
            country: "United States",
            bio: "George R.R. Martin is an American novelist and short story writer in the fantasy, horror, and science fiction genres, screenwriter, and television producer. He is best known for his series of epic fantasy novels, A Song of Ice and Fire, which was adapted into the Emmy Award-winning HBO series Game of Thrones.",
            yearsActive: "1971-Present",
            popularBooks: [
                { id: 401, title: "A Game of Thrones", coverImage: "https://images-na.ssl-images-amazon.com/images/I/91dSMhdIzTL.jpg", author: "George R.R. Martin" },
                { id: 402, title: "A Clash of Kings", coverImage: "https://images-na.ssl-images-amazon.com/images/I/91Nl4RUsHoL.jpg", author: "George R.R. Martin" },
                { id: 403, title: "A Storm of Swords", coverImage: "https://images-na.ssl-images-amazon.com/images/I/91d0rVVMz+L.jpg", author: "George R.R. Martin" }
            ]
        },
        {
            id: 5,
            name: "Jane Austen",
            image: "https://randomuser.me/api/portraits/women/52.jpg",
            genres: ["Romance", "Literary Fiction"],
            books: 6,
            awards: 0,
            country: "United Kingdom",
            bio: "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. Austen's plots often explore the dependence of women on marriage in the pursuit of favorable social standing and economic security. Her works critique the novels of sensibility of the second half of the 18th century and are part of the transition to 19th-century literary realism.",
            yearsActive: "1811-1817",
            popularBooks: [
                { id: 501, title: "Pride and Prejudice", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg", author: "Jane Austen" },
                { id: 502, title: "Sense and Sensibility", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71KZzJlS8kL.jpg", author: "Jane Austen" },
                { id: 503, title: "Emma", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71ZL1n9YQL.jpg", author: "Jane Austen" }
            ]
        },
        {
            id: 6,
            name: "Ernest Hemingway",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            genres: ["Literary Fiction", "War Fiction"],
            books: 7,
            awards: 2,
            country: "United States",
            bio: "Ernest Hemingway was an American novelist, short-story writer, journalist, and sportsman. His economical and understated style—which he termed the iceberg theory—had a strong influence on 20th-century fiction, while his adventurous lifestyle and his public image brought him admiration from later generations. Hemingway produced most of his work between the mid-1920s and the mid-1950s, and he was awarded the Nobel Prize in Literature in 1954.",
            yearsActive: "1926-1952",
            popularBooks: [
                { id: 601, title: "The Old Man and the Sea", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71sBtM3Yi5L.jpg", author: "Ernest Hemingway" },
                { id: 602, title: "For Whom the Bell Tolls", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81OYCFvXwLL.jpg", author: "Ernest Hemingway" },
                { id: 603, title: "A Farewell to Arms", coverImage: "https://images-na.ssl-images-amazon.com/images/I/51RYAOGzjML.jpg", author: "Ernest Hemingway" }
            ]
        },
        {
            id: 7,
            name: "Toni Morrison",
            image: "https://randomuser.me/api/portraits/women/79.jpg",
            genres: ["Literary Fiction", "Historical Fiction"],
            books: 11,
            awards: 9,
            country: "United States",
            bio: "Toni Morrison was an American novelist, essayist, book editor, and college professor. Her first novel, The Bluest Eye, was published in 1970. The critically acclaimed Song of Solomon brought her national attention and won the National Book Critics Circle Award. In 1988, Morrison won the Pulitzer Prize for Beloved; she was awarded the Nobel Prize in Literature in 1993.",
            yearsActive: "1970-2019",
            popularBooks: [
                { id: 701, title: "Beloved", coverImage: "https://images-na.ssl-images-amazon.com/images/I/413t3edXNL.jpg", author: "Toni Morrison" },
                { id: 702, title: "Song of Solomon", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81vAhokSuQL.jpg", author: "Toni Morrison" },
                { id: 703, title: "The Bluest Eye", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Jk7xQOyML.jpg", author: "Toni Morrison" }
            ]
        },
        {
            id: 8,
            name: "Haruki Murakami",
            image: "https://randomuser.me/api/portraits/men/72.jpg",
            genres: ["Literary Fiction", "Magical Realism", "Surrealism"],
            books: 14,
            awards: 6,
            country: "Japan",
            bio: "Haruki Murakami is a Japanese writer. His books and stories have been bestsellers in Japan as well as internationally, with his work being translated into 50 languages and selling millions of copies outside his native country. His work has received numerous awards, including the World Fantasy Award, the Frank O'Connor International Short Story Award, the Franz Kafka Prize, and the Jerusalem Prize.",
            yearsActive: "1979-Present",
            popularBooks: [
                { id: 801, title: "Norwegian Wood", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81IbQOSAVL.jpg", author: "Haruki Murakami" },
                { id: 802, title: "Kafka on the Shore", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81xAPzN9YdL.jpg", author: "Haruki Murakami" },
                { id: 803, title: "1Q84", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71ksALFjuIL.jpg", author: "Haruki Murakami" }
            ]
        },
        {
            id: 9,
            name: "Gabriel García Márquez",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            genres: ["Magical Realism", "Literary Fiction"],
            books: 7,
            awards: 4,
            country: "Colombia",
            bio: "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, known affectionately as Gabo or Gabito throughout Latin America. Considered one of the most significant authors of the 20th century, particularly in the Spanish language, he was awarded the 1972 Neustadt International Prize for Literature and the 1982 Nobel Prize in Literature. He pursued a self-directed education that resulted in leaving law school for a career in journalism.",
            yearsActive: "1955-2004",
            popularBooks: [
                { id: 901, title: "One Hundred Years of Solitude", coverImage: "https://images-na.ssl-images-amazon.com/images/I/91mftQtgAkL.jpg", author: "Gabriel García Márquez" },
                { id: 902, title: "Love in the Time of Cholera", coverImage: "https://images-na.ssl-images-amazon.com/images/I/81WBJvTxTaL.jpg", author: "Gabriel García Márquez" },
                { id: 903, title: "Chronicle of a Death Foretold", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71CcO-jvRsL.jpg", author: "Gabriel García Márquez" }
            ]
        },
        {
            id: 10,
            name: "Virginia Woolf",
            image: "https://randomuser.me/api/portraits/women/82.jpg",
            genres: ["Modernism", "Literary Fiction"],
            books: 9,
            awards: 0,
            country: "United Kingdom",
            bio: "Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device. Woolf was a significant figure in London literary society and a central figure in the influential Bloomsbury Group of intellectuals. Her most famous works include the novels Mrs Dalloway, To the Lighthouse and Orlando, and the book-length essay A Room of One's Own, with its dictum, 'A woman must have money and a room of her own if she is to write fiction.'",
            yearsActive: "1915-1941",
            popularBooks: [
                { id: 1001, title: "Mrs Dalloway", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71s-XoWj6YL.jpg", author: "Virginia Woolf" },
                { id: 1002, title: "To the Lighthouse", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71SbR0YfbGL.jpg", author: "Virginia Woolf" },
                { id: 1003, title: "Orlando", coverImage: "https://images-na.ssl-images-amazon.com/images/I/71KxRKHq5yL.jpg", author: "Virginia Woolf" }
            ]
        }
    ];

    // Variables
    let currentPage = 1;
    const authorsPerPage = 5;
    let filteredAuthors = [...authorsData];
    let activeGenreFilter = '';
    let activeSortFilter = 'name';

    // DOM elements
    const authorsTableBody = document.getElementById('authors-table-body');
    const authorsPagination = document.getElementById('authors-pagination');
    const genreFilter = document.getElementById('genre-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchForm = document.getElementById('author-search-form');
    const searchInput = document.getElementById('author-search-input');
    const authorModal = document.getElementById('author-modal');
    const closeModal = document.querySelector('.close-modal');
    const authorDetailsBtns = document.querySelectorAll('.author-details-btn');

    // Initialize the page
    renderAuthorsTable();
    setupEventListeners();

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Genre filter change
        genreFilter.addEventListener('change', function() {
            activeGenreFilter = this.value;
            currentPage = 1;
            filterAuthors();
        });

        // Sort filter change
        sortFilter.addEventListener('change', function() {
            activeSortFilter = this.value;
            currentPage = 1;
            filterAuthors();
        });

        // Search form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            currentPage = 1;
            filterAuthors();
        });

        // Close modal
        closeModal.addEventListener('click', function() {
            authorModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === authorModal) {
                authorModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Featured author buttons
        authorDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const authorId = parseInt(this.getAttribute('data-author-id'));
                openAuthorModal(authorId);
            });
        });
    }

    /**
     * Filter authors based on active filters
     */
    function filterAuthors() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        filteredAuthors = authorsData.filter(author => {
            // Filter by search term
            if (searchTerm && !author.name.toLowerCase().includes(searchTerm) && 
                !author.country.toLowerCase().includes(searchTerm) && 
                !author.genres.some(genre => genre.toLowerCase().includes(searchTerm))) {
                return false;
            }

            // Filter by genre
            if (activeGenreFilter && !author.genres.includes(activeGenreFilter)) {
                return false;
            }

            return true;
        });

        // Sort authors
        sortAuthors();

        // Render table
        renderAuthorsTable();
    }

    /**
     * Sort authors based on active sort filter
     */
    function sortAuthors() {
        switch (activeSortFilter) {
            case 'name':
                filteredAuthors.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredAuthors.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'books':
                filteredAuthors.sort((a, b) => b.books - a.books);
                break;
            case 'popularity':
                // Sort by a combination of books and awards
                filteredAuthors.sort((a, b) => (b.books + b.awards) - (a.books + a.awards));
                break;
        }
    }

    /**
     * Render authors table
     */
    function renderAuthorsTable() {
        // Calculate pagination
        const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
        const startIndex = (currentPage - 1) * authorsPerPage;
        const endIndex = startIndex + authorsPerPage;
        const authorsToShow = filteredAuthors.slice(startIndex, endIndex);

        // Clear table body
        authorsTableBody.innerHTML = '';

        // Add authors to table
        authorsToShow.forEach(author => {
            const row = document.createElement('tr');
            
            // Author cell
            const authorCell = document.createElement('td');
            authorCell.innerHTML = `
                <div class="author-cell">
                    <div class="author-image-small">
                        <img src="${author.image}" alt="${author.name}">
                    </div>
                    <a href="#" class="author-name" data-author-id="${author.id}">${author.name}</a>
                </div>
            `;
            
            // Genres cell
            const genresCell = document.createElement('td');
            genresCell.innerHTML = `
                <div class="genres-cell">
                    ${author.genres.map(genre => `<span class="genre-badge">${genre}</span>`).join('')}
                </div>
            `;
            
            // Books cell
            const booksCell = document.createElement('td');
            booksCell.textContent = author.books;
            
            // Awards cell
            const awardsCell = document.createElement('td');
            awardsCell.textContent = author.awards;
            
            // Country cell
            const countryCell = document.createElement('td');
            countryCell.textContent = author.country;
            
            // Actions cell
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `
                <div class="actions-cell">
                    <button class="action-btn view-btn" title="View Author" data-author-id="${author.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn books-btn" title="View Books" data-author-id="${author.id}">
                        <i class="fas fa-book"></i>
                    </button>
                    <button class="action-btn share-btn" title="Share" data-author-id="${author.id}">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            `;
            
            // Add cells to row
            row.appendChild(authorCell);
            row.appendChild(genresCell);
            row.appendChild(booksCell);
            row.appendChild(awardsCell);
            row.appendChild(countryCell);
            row.appendChild(actionsCell);
            
            // Add row to table
            authorsTableBody.appendChild(row);
        });

        // Add event listeners to author links and buttons
        const authorLinks = document.querySelectorAll('.author-name');
        authorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const authorId = parseInt(this.getAttribute('data-author-id'));
                openAuthorModal(authorId);
            });
        });

        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const authorId = parseInt(this.getAttribute('data-author-id'));
                openAuthorModal(authorId);
            });
        });

        const booksButtons = document.querySelectorAll('.books-btn');
        booksButtons.forEach(button => {
            button.addEventListener('click', function() {
                const authorId = parseInt(this.getAttribute('data-author-id'));
                const author = authorsData.find(a => a.id === authorId);
                window.location.href = `books.html?author=${encodeURIComponent(author.name)}`;
            });
        });

        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const authorId = parseInt(this.getAttribute('data-author-id'));
                const author = authorsData.find(a => a.id === authorId);
                
                // Check if Web Share API is supported
                if (navigator.share) {
                    navigator.share({
                        title: author.name,
                        text: `Check out ${author.name} on LitFest!`,
                        url: window.location.href
                    })
                    .catch(err => console.log('Error sharing:', err));
                } else {
                    // Fallback for browsers that don't support Web Share API
                    alert(`Share ${author.name} with your friends!`);
                }
            });
        });

        // Render pagination
        renderPagination(totalPages);
    }

    /**
     * Render pagination
     */
    function renderPagination(totalPages) {
        // Clear pagination
        authorsPagination.innerHTML = '';

        // Previous button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.className = `page-link ${currentPage === 1 ? 'disabled' : ''}`;
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        if (currentPage > 1) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage--;
                renderAuthorsTable();
            });
        }
        
        authorsPagination.appendChild(prevButton);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `page-link ${i === currentPage ? 'active' : ''}`;
            pageLink.textContent = i;
            
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                renderAuthorsTable();
            });
            
            authorsPagination.appendChild(pageLink);
        }

        // Next button
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.className = `page-link ${currentPage === totalPages ? 'disabled' : ''}`;
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        if (currentPage < totalPages) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage++;
                renderAuthorsTable();
            });
        }
        
        authorsPagination.appendChild(nextButton);
    }

    /**
     * Open author modal
     */
    function openAuthorModal(authorId) {
        const author = authorsData.find(a => a.id === authorId);
        if (!author) return;

        // Set modal content
        document.getElementById('modal-author-image').src = author.image;
        document.getElementById('modal-author-name').textContent = author.name;
        document.getElementById('modal-author-genres').textContent = author.genres.join(', ');
        document.getElementById('modal-author-books').textContent = author.books;
        document.getElementById('modal-author-awards').textContent = author.awards;
        document.getElementById('modal-author-years').textContent = author.yearsActive;
        document.getElementById('modal-author-bio').textContent = author.bio;

        // No books section - removed as requested

        // Show modal
        authorModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});
