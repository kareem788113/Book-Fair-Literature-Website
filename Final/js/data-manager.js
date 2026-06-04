/**
 * Data Management JavaScript for LitFest - Book Fair & Literature Website
 * Author: Cascade AI
 * Date: May 20, 2025
 */

// Book data manager
const BookManager = {
    // Get all books from localStorage or return default data
    getAllBooks: function() {
        const books = JSON.parse(localStorage.getItem('books'));
        if (books) return books;
        return this.getDefaultBooks();
    },
    
    // Get book by ID
    getBookById: function(id) {
        const books = this.getAllBooks();
        return books.find(book => book.id === id);
    },
    
    // Search books by query
    searchBooks: function(query, filters = {}) {
        if (!query && Object.keys(filters).length === 0) return this.getAllBooks();
        
        query = query.toLowerCase();
        const books = this.getAllBooks();
        
        return books.filter(book => {
            // Search by query
            const matchesQuery = !query || 
                book.title.toLowerCase().includes(query) || 
                book.author.toLowerCase().includes(query) || 
                book.publisher.toLowerCase().includes(query) ||
                book.description.toLowerCase().includes(query) ||
                book.genres.some(genre => genre.toLowerCase().includes(query));
            
            // Apply filters
            const matchesGenre = !filters.genre || book.genres.includes(filters.genre);
            const matchesAuthor = !filters.author || book.author === filters.author;
            const matchesPublisher = !filters.publisher || book.publisher === filters.publisher;
            const matchesYear = !filters.year || book.publishYear === filters.year;
            
            return matchesQuery && matchesGenre && matchesAuthor && matchesPublisher && matchesYear;
        });
    },
    
    // Get default books data
    getDefaultBooks: function() {
        return [
            {
                id: "1",
                title: "The Silent Patient",
                author: "Alex Michaelides",
                publisher: "Celadon Books",
                publishYear: "2019",
                isbn: "9781250301697",
                price: 24.99,
                rating: 4.5,
                genres: ["Thriller", "Mystery", "Psychological Fiction"],
                coverImage: "images/book1.jpg",
                description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word."
            },
            {
                id: "2",
                title: "Where the Crawdads Sing",
                author: "Delia Owens",
                publisher: "G.P. Putnam's Sons",
                publishYear: "2018",
                isbn: "9780735219090",
                price: 22.95,
                rating: 5.0,
                genres: ["Literary Fiction", "Coming-of-age", "Mystery"],
                coverImage: "images/book2.jpg",
                description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand."
            },
            {
                id: "3",
                title: "Educated",
                author: "Tara Westover",
                publisher: "Random House",
                publishYear: "2018",
                isbn: "9780399590504",
                price: 28.00,
                rating: 4.0,
                genres: ["Memoir", "Biography", "Autobiography"],
                coverImage: "images/book3.jpg",
                description: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent. When another brother got himself into college, Tara decided to try a new kind of life."
            },
            {
                id: "4",
                title: "Becoming",
                author: "Michelle Obama",
                publisher: "Crown Publishing",
                publishYear: "2018",
                isbn: "9781524763138",
                price: 32.50,
                rating: 4.5,
                genres: ["Memoir", "Autobiography", "Politics"],
                coverImage: "images/book4.jpg",
                description: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address."
            },
            {
                id: "5",
                title: "The Midnight Library",
                author: "Matt Haig",
                publisher: "Viking",
                publishYear: "2020",
                isbn: "9780525559474",
                price: 26.00,
                rating: 4.2,
                genres: ["Fiction", "Fantasy", "Contemporary"],
                coverImage: "images/book5.jpg",
                description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?"
            }
        ];
    },
    
    // Initialize books in localStorage if not already present
    initBooks: function() {
        if (!localStorage.getItem('books')) {
            localStorage.setItem('books', JSON.stringify(this.getDefaultBooks()));
        }
    }
};

// Author data manager
const AuthorManager = {
    // Get all authors from localStorage or return default data
    getAllAuthors: function() {
        const authors = JSON.parse(localStorage.getItem('authors'));
        if (authors) return authors;
        return this.getDefaultAuthors();
    },
    
    // Get author by ID
    getAuthorById: function(id) {
        const authors = this.getAllAuthors();
        return authors.find(author => author.id === id);
    },
    
    // Get default authors data
    getDefaultAuthors: function() {
        return [
            {
                id: "1",
                name: "Alex Michaelides",
                bio: "Alex Michaelides was born and raised in Cyprus. He has an MA in English Literature from Trinity College, Cambridge University, and an MA in Screenwriting from the American Film Institute in Los Angeles. The Silent Patient was his first novel.",
                photo: "images/author1.jpg",
                books: ["1"]
            },
            {
                id: "2",
                name: "Delia Owens",
                bio: "Delia Owens is the co-author of three internationally bestselling nonfiction books about her life as a wildlife scientist in Africa. She holds a BS in Zoology from the University of Georgia and a PhD in Animal Behavior from the University of California at Davis. She has won the John Burroughs Award for Nature Writing and has been published in Nature, The African Journal of Ecology, and International Wildlife, among many others. She currently lives in Idaho. Where the Crawdads Sing is her first novel.",
                photo: "images/author2.jpg",
                books: ["2"]
            },
            {
                id: "3",
                name: "Tara Westover",
                bio: "Tara Westover is an American author. Born in Idaho to a father opposed to public education, she never attended school. She spent her days working in her father's junkyard or stewing herbs for her mother, a self-taught herbalist and midwife. She was seventeen the first time she set foot in a classroom. After that first encounter with education, she pursued learning for a decade, graduating magna cum laude from Brigham Young University in 2008 and subsequently winning a Gates Cambridge Scholarship. She earned an MPhil from Trinity College, Cambridge in 2009, and in 2010 was a visiting fellow at Harvard University. She returned to Cambridge, where she was awarded a PhD in history in 2014.",
                photo: "images/author3.jpg",
                books: ["3"]
            },
            {
                id: "4",
                name: "Michelle Obama",
                bio: "Michelle Obama is an American attorney and author who served as the First Lady of the United States from 2009 to 2017. She is married to the 44th president of the United States, Barack Obama, and was the first African-American First Lady. Raised on the South Side of Chicago, Illinois, Obama is a graduate of Princeton University and Harvard Law School. In her early legal career, she worked at the law firm Sidley Austin, where she met Barack Obama. She subsequently worked in non-profits and as the Associate Dean of Student Services at the University of Chicago and the Vice President for Community and External Affairs of the University of Chicago Medical Center.",
                photo: "images/author4.jpg",
                books: ["4"]
            },
            {
                id: "5",
                name: "Matt Haig",
                bio: "Matt Haig is a British author for children and adults. His memoir Reasons to Stay Alive was a number one bestseller, staying in the British top ten for 46 weeks. His children's book A Boy Called Christmas was a runaway hit and is translated in over 40 languages. It is being made into a film by StudioCanal and Blueprint Pictures. His novels for adults include the award-winning The Radleys and The Humans.",
                photo: "images/author5.jpg",
                books: ["5"]
            }
        ];
    },
    
    // Initialize authors in localStorage if not already present
    initAuthors: function() {
        if (!localStorage.getItem('authors')) {
            localStorage.setItem('authors', JSON.stringify(this.getDefaultAuthors()));
        }
    }
};

// Event data manager
const EventManager = {
    // Get all events from localStorage or return default data
    getAllEvents: function() {
        const events = JSON.parse(localStorage.getItem('events'));
        if (events) return events;
        return this.getDefaultEvents();
    },
    
    // Get event by ID
    getEventById: function(id) {
        const events = this.getAllEvents();
        return events.find(event => event.id === id);
    },
    
    // Get upcoming events (events with date >= today)
    getUpcomingEvents: function() {
        const events = this.getAllEvents();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    
    // Get default events data
    getDefaultEvents: function() {
        return [
            {
                id: "1",
                title: "Author Meet & Greet: J.K. Rowling",
                date: "2025-06-15T14:00:00",
                endTime: "2025-06-15T17:00:00",
                location: "Central Library, New York",
                description: "Meet the bestselling author of the Harry Potter series and get your books signed. J.K. Rowling will also be discussing her latest work and answering questions from fans.",
                image: "images/event1.jpg",
                featured: true
            },
            {
                id: "2",
                title: "Book Launch: The Midnight Library",
                date: "2025-06-22T18:30:00",
                endTime: "2025-06-22T20:30:00",
                location: "Barnes & Noble, Boston",
                description: "Join us for the official launch of Matt Haig's new novel, The Midnight Library. The author will be reading excerpts, signing copies, and engaging in a Q&A session with attendees.",
                image: "images/event2.jpg",
                featured: true
            },
            {
                id: "3",
                title: "Literary Workshop: Creative Writing",
                date: "2025-06-30T10:00:00",
                endTime: "2025-06-30T13:00:00",
                location: "Writers Guild, Chicago",
                description: "A hands-on workshop for aspiring writers. Learn techniques for developing characters, crafting compelling plots, and refining your writing style. Bring your notebooks and ideas!",
                image: "images/event3.jpg",
                featured: true
            },
            {
                id: "4",
                title: "Poetry Reading Night",
                date: "2025-07-05T19:00:00",
                endTime: "2025-07-05T21:00:00",
                location: "The Literary Café, San Francisco",
                description: "An evening of poetry readings from both established and emerging poets. Open mic session available for attendees who wish to share their own work.",
                image: "images/event4.jpg",
                featured: false
            },
            {
                id: "5",
                title: "Children's Book Festival",
                date: "2025-07-12T09:00:00",
                endTime: "2025-07-12T16:00:00",
                location: "City Park, Seattle",
                description: "A day-long festival celebrating children's literature. Activities include storytelling sessions, character meet-and-greets, illustration workshops, and book sales from various publishers.",
                image: "images/event5.jpg",
                featured: false
            }
        ];
    },
    
    // Initialize events in localStorage if not already present
    initEvents: function() {
        if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify(this.getDefaultEvents()));
        }
    }
};

// Blog post data manager
const BlogManager = {
    // Get all blog posts from localStorage or return default data
    getAllPosts: function() {
        const posts = JSON.parse(localStorage.getItem('blogPosts'));
        if (posts) return posts;
        return this.getDefaultPosts();
    },
    
    // Get post by ID
    getPostById: function(id) {
        const posts = this.getAllPosts();
        return posts.find(post => post.id === id);
    },
    
    // Get latest posts
    getLatestPosts: function(limit = 3) {
        const posts = this.getAllPosts();
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
    },
    
    // Get default blog posts data
    getDefaultPosts: function() {
        return [
            {
                id: "1",
                title: "10 Must-Read Books of 2025",
                author: "John Doe",
                date: "2025-05-15T10:00:00",
                image: "images/blog1.jpg",
                excerpt: "Discover the most anticipated books that are making waves in the literary world this year.",
                content: `<p>As we move through 2025, the literary world continues to produce exceptional works across all genres. From thrilling mysteries to heartwarming romances, thought-provoking literary fiction to eye-opening non-fiction, this year's releases offer something for every type of reader.</p>
                <p>Here are our top 10 picks for the must-read books of 2025:</p>
                <ol>
                    <li><strong>The Silent Patient</strong> by Alex Michaelides - A psychological thriller that will keep you guessing until the very end.</li>
                    <li><strong>Where the Crawdads Sing</strong> by Delia Owens - A beautiful coming-of-age story set in the marshlands of North Carolina.</li>
                    <li><strong>Educated</strong> by Tara Westover - A powerful memoir about the transformative power of education.</li>
                    <li><strong>Becoming</strong> by Michelle Obama - An intimate and inspiring autobiography from the former First Lady.</li>
                    <li><strong>The Midnight Library</strong> by Matt Haig - A novel that explores the infinite possibilities of life through the lens of a magical library.</li>
                    <li><strong>Project Hail Mary</strong> by Andy Weir - An exciting science fiction adventure from the author of The Martian.</li>
                    <li><strong>The Four Winds</strong> by Kristin Hannah - A powerful historical fiction set during the Great Depression.</li>
                    <li><strong>Klara and the Sun</strong> by Kazuo Ishiguro - A thought-provoking look at artificial intelligence and what it means to be human.</li>
                    <li><strong>The Hill We Climb</strong> by Amanda Gorman - The powerful poem delivered at President Biden's inauguration, now in book form.</li>
                    <li><strong>Think Again</strong> by Adam Grant - A non-fiction work that challenges us to reconsider our opinions and embrace the joy of being wrong.</li>
                </ol>
                <p>Whether you're looking to escape into a different world, learn something new, or simply enjoy beautiful prose, these books are sure to satisfy your literary cravings in 2025.</p>`
            },
            {
                id: "2",
                title: "The Art of Storytelling",
                author: "Jane Smith",
                date: "2025-05-10T14:30:00",
                image: "images/blog2.jpg",
                excerpt: "Learn the essential elements that make a compelling narrative from award-winning authors.",
                content: `<p>Storytelling is one of humanity's oldest art forms, dating back to prehistoric cave paintings and oral traditions passed down through generations. Today, in our digital age, the ability to tell a compelling story remains as valuable as ever—whether you're a novelist, marketer, filmmaker, or simply someone who wants to engage an audience.</p>
                <h3>The Elements of Great Storytelling</h3>
                <p>What makes a story resonate with readers or listeners? According to award-winning authors, these are the key elements:</p>
                <h4>1. Compelling Characters</h4>
                <p>Characters are the heart of any story. They need to be relatable, complex, and have clear motivations. Even villains should have understandable reasons for their actions, even if those reasons are misguided.</p>
                <h4>2. Conflict and Tension</h4>
                <p>Without conflict, there is no story. Conflict creates tension, which keeps readers engaged. This doesn't always mean physical danger—it can be internal struggles, relationship tensions, or societal pressures.</p>
                <h4>3. A Well-Structured Plot</h4>
                <p>While there are many plot structures (three-act, hero's journey, etc.), all effective stories have a beginning that hooks the reader, a middle that develops the conflict, and an ending that provides resolution.</p>
                <h4>4. Vivid Setting</h4>
                <p>The world of your story should feel real and immersive. This doesn't mean pages of description, but rather selective details that engage the senses and establish atmosphere.</p>
                <h4>5. Authentic Dialogue</h4>
                <p>Dialogue should sound natural while still serving the story. It's a balancing act—real conversations include pauses, interruptions, and tangents, but too much realism can bog down your narrative.</p>
                <h4>6. Theme and Meaning</h4>
                <p>The best stories say something about the human condition. They explore themes like love, loss, redemption, or justice, giving readers something to ponder long after the story ends.</p>
                <p>By mastering these elements, you can craft stories that not only entertain but also resonate on a deeper level with your audience.</p>`
            },
            {
                id: "3",
                title: "From Page to Screen: Book Adaptations",
                author: "Robert Johnson",
                date: "2025-05-05T09:15:00",
                image: "images/blog3.jpg",
                excerpt: "Exploring how beloved books are transformed into successful film and television adaptations.",
                content: `<p>The relationship between books and their screen adaptations has always been complex. Readers often approach adaptations with a mix of excitement and trepidation: Will the filmmakers stay true to the source material? Can the actors capture the essence of beloved characters? Will the visual interpretation match what readers have imagined?</p>
                <h3>The Challenges of Adaptation</h3>
                <p>Adapting a book for film or television presents unique challenges:</p>
                <ul>
                    <li><strong>Condensing content:</strong> Even a short novel contains more detail than can fit in a two-hour film. Screenwriters must make difficult decisions about what to keep, what to cut, and what to combine.</li>
                    <li><strong>Visualizing the internal:</strong> Books can easily convey characters' thoughts and feelings. Films must find visual ways to express these internal states.</li>
                    <li><strong>Meeting expectations:</strong> Popular books come with passionate fan bases who have strong opinions about how the story should be portrayed.</li>
                </ul>
                <h3>Recent Successful Adaptations</h3>
                <p>Despite these challenges, recent years have seen many successful book-to-screen translations:</p>
                <h4>1. "Little Women" (2019)</h4>
                <p>Greta Gerwig's adaptation of Louisa May Alcott's classic novel brought fresh energy to a familiar story while honoring its themes and characters.</p>
                <h4>2. "The Queen's Gambit" (2020)</h4>
                <p>This Netflix miniseries based on Walter Tevis's novel became a cultural phenomenon, proving that chess could be visually compelling.</p>
                <h4>3. "Dune" (2021)</h4>
                <p>After previous unsuccessful attempts, Denis Villeneuve's adaptation of Frank Herbert's science fiction epic was praised for its visual grandeur and faithful interpretation.</p>
                <h3>The Future of Adaptations</h3>
                <p>With streaming platforms investing heavily in content, we're seeing more books adapted than ever before. This trend offers opportunities for lesser-known works to reach wider audiences and for complex novels to be adapted as series rather than films, allowing for more complete storytelling.</p>
                <p>Whether you're a purist who believes the book is always better or someone who appreciates seeing stories in different media, the conversation between page and screen continues to evolve and enrich our cultural landscape.</p>`
            }
        ];
    },
    
    // Initialize blog posts in localStorage if not already present
    initBlogPosts: function() {
        if (!localStorage.getItem('blogPosts')) {
            localStorage.setItem('blogPosts', JSON.stringify(this.getDefaultPosts()));
        }
    }
};

// Initialize all data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    BookManager.initBooks();
    AuthorManager.initAuthors();
    EventManager.initEvents();
    BlogManager.initBlogPosts();
});
