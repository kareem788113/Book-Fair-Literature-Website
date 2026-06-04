/**
 * Blog JavaScript for LitFest - Book Fair & Literature Website
 * Handles blog post display, filtering, and pagination
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check for hash in URL to open specific blog post
    if (window.location.hash) {
        const postId = parseInt(window.location.hash.replace('#post-', ''));
        if (!isNaN(postId)) {
            openBlogPostModal(postId);
        }
    }
    // Blog posts data
    const blogPosts = [
        {
            id: 1,
            title: "Top 10 Must-Read Books of 2025",
            excerpt: "Explore our curated list of the most anticipated and critically acclaimed books that are making waves in the literary world this year.",
            content: `<p>As we move through 2025, the literary landscape continues to evolve with exciting new releases across all genres. From thought-provoking literary fiction to escapist fantasy worlds, this year's top books offer something for every type of reader.</p>
                      <p>Here are our picks for the must-read books of 2025:</p>
                      <ol>
                        <li><strong>The Silent Echo</strong> by Maria Chen - A haunting tale of family secrets spanning three generations and two continents.</li>
                        <li><strong>Quantum Horizons</strong> by Neil Patel - This science fiction masterpiece explores the philosophical implications of parallel universes.</li>
                        <li><strong>The Last Garden</strong> by Sophia Williams - A moving post-apocalyptic story about hope and rebuilding society.</li>
                        <li><strong>Whispers in the Hallway</strong> by James Patterson - The latest thriller from the bestselling author will keep you on the edge of your seat.</li>
                        <li><strong>Cooking Through History</strong> by Chef Antonio Rossi - Part cookbook, part historical exploration of how food shaped civilization.</li>
                        <li><strong>The Forgotten Path</strong> by Emily Johnson - A fantasy adventure featuring a unique magic system based on forgotten languages.</li>
                        <li><strong>Corporate Shadows</strong> by Michael Bloomberg - This non-fiction exposé reveals the hidden practices of today's tech giants.</li>
                        <li><strong>The Art of Slow Living</strong> by Sarah Thompson - A timely guide to finding peace and purpose in our hyper-connected world.</li>
                        <li><strong>River of Memories</strong> by Toni Morrison - The posthumously published novel from the literary legend is already being hailed as a classic.</li>
                        <li><strong>The Astronomer's Daughter</strong> by David Mitchell - A genre-bending tale that combines historical fiction with elements of cosmic horror.</li>
                      </ol>
                      <p>Whether you're looking to be challenged intellectually, escape into another world, or simply enjoy a good story, these books deserve a place on your reading list this year.</p>`,
            author: "Emily Parker",
            date: "May 15, 2025",
            category: "Book Reviews",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            tags: ["Fiction", "Non-Fiction", "Fantasy", "Thriller", "Science Fiction"],
            comments: 24,
            likes: 156
        },
        {
            id: 2,
            title: "Interview with Bestselling Author Jane Smith",
            excerpt: "We sat down with Jane Smith, whose latest novel 'Echoes of Tomorrow' has topped the charts for six consecutive weeks, to discuss her writing process and inspirations.",
            content: `<p>Jane Smith has been captivating readers for over a decade with her unique blend of historical fiction and magical realism. Her latest novel, "Echoes of Tomorrow," has been praised by critics as "a masterful exploration of time, memory, and human connection." We had the privilege of speaking with Jane about her work, her process, and what's next for her.</p>
                      <h3>On her writing process</h3>
                      <p>"I'm very much a morning writer," Jane tells us, sipping her tea in a quiet café in downtown Portland. "I wake up at 5 AM, make a cup of coffee, and write for three hours before the rest of the world intrudes. There's something magical about those early morning hours when everything is still and quiet."</p>
                      <p>When asked about her research process, Jane laughs. "I'm a research junkie. For 'Echoes of Tomorrow,' I spent six months just studying quantum physics theories, even though only a fraction of that research made it into the book. But that's the thing about research—it informs the entire world of the story, even the parts that aren't explicitly mentioned."</p>
                      <h3>On her inspirations</h3>
                      <p>"I draw inspiration from everywhere," she explains. "Conversations overheard in coffee shops, dreams, scientific articles, old photographs. For 'Echoes of Tomorrow,' the initial spark came from an article I read about quantum entanglement and the idea that particles that have interacted continue to affect each other regardless of distance. I thought, what if human connections worked the same way?"</p>
                      <h3>On the success of "Echoes of Tomorrow"</h3>
                      <p>"The response has been overwhelming," Jane admits. "I knew this book was special to me, but I never expected it to resonate with so many readers. I've received letters from people saying the book helped them process grief, reconnect with estranged family members, or simply see the world differently. That's the greatest reward for any writer."</p>
                      <h3>What's next</h3>
                      <p>Jane is already working on her next novel, though she's tight-lipped about the details. "All I can say is that it explores the boundaries between reality and perception, and it's set in a small coastal town in Maine. And yes, there will be elements of magical realism, because I can't seem to help myself!"</p>
                      <p>Whatever Jane Smith writes next, one thing is certain: her growing legion of fans will be eagerly waiting to dive into the worlds she creates.</p>`,
            author: "Michael Johnson",
            date: "May 10, 2025",
            category: "Author Interviews",
            image: "https://images.unsplash.com/photo-1450107579224-2d9b2bf1adc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            tags: ["Fiction", "Interview", "Writing", "Authors"],
            comments: 18,
            likes: 132
        },
        {
            id: 3,
            title: "How to Create the Perfect Reading Nook",
            excerpt: "Transform any corner of your home into a cozy retreat for reading with these practical tips and design ideas.",
            content: `<p>There's nothing quite like having a dedicated space where you can escape into the pages of a good book. A well-designed reading nook can enhance your reading experience and encourage you to make more time for this rewarding activity. Here's how to create the perfect reading sanctuary in your home.</p>
                      <h3>Choose the Right Location</h3>
                      <p>The first step is finding the ideal spot for your reading nook. Look for a quiet corner away from high-traffic areas of your home. Window seats are perfect as they provide natural light, but any unused corner, alcove, or even a portion of a room can work. The key is to find a space where you can read with minimal distractions.</p>
                      <h3>Comfortable Seating is Non-Negotiable</h3>
                      <p>The centerpiece of any reading nook is comfortable seating. Whether you prefer an oversized armchair, a chaise lounge, a window bench with cushions, or even a hanging chair, choose something you can comfortably sit in for hours. Add plush pillows and a soft throw blanket for maximum coziness.</p>
                      <h3>Lighting Matters</h3>
                      <p>Good lighting is essential for a reading nook. Natural light is ideal for daytime reading, but you'll also need a good reading lamp for evenings or cloudy days. Consider adjustable floor lamps, wall-mounted reading lights, or table lamps that can be positioned to shine directly on your book without causing glare or eye strain.</p>
                      <h3>Storage Solutions</h3>
                      <p>Every reading nook needs somewhere to store books. This could be a small bookshelf, floating shelves, a side table with a built-in shelf, or even a basket for your current reads. Having your books visible not only makes them easily accessible but also adds to the literary atmosphere of your nook.</p>
                      <h3>Add Personal Touches</h3>
                      <p>Make your reading nook truly yours by adding personal touches. This could include artwork that inspires you, plants to add life and improve air quality, a small rug to define the space, or decorative items that bring you joy. Some readers like to include a small side table for a cup of tea or coffee.</p>
                      <h3>Minimize Distractions</h3>
                      <p>Consider what might distract you from reading and find ways to minimize these interruptions. This might mean positioning your nook away from the TV, keeping your phone in another room while reading, or using noise-cancelling headphones if you live in a noisy environment.</p>
                      <h3>Make it Multi-Seasonal</h3>
                      <p>Ensure your reading nook is comfortable year-round. If it's near a window, consider how the sun might affect the space in summer or how drafts might make it chilly in winter. Have light blankets available in summer and heavier ones in winter. You might even want to include a small fan or space heater depending on your climate.</p>
                      <p>Remember, the perfect reading nook is one that works for you and your reading habits. Whether you prefer minimalist design or a more eclectic, cozy aesthetic, the most important thing is that it's a space where you feel comfortable and inspired to read.</p>`,
            author: "Sarah Williams",
            date: "May 5, 2025",
            category: "Reading Tips",
            image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            tags: ["Reading", "Home Decor", "Lifestyle"],
            comments: 42,
            likes: 215
        },
        {
            id: 4,
            title: "The Evolution of Fantasy Literature",
            excerpt: "From J.R.R. Tolkien to modern fantasy authors, explore how the genre has evolved over the decades and continues to captivate readers worldwide.",
            content: `<p>Fantasy literature has undergone a remarkable evolution since its modern foundations were laid by authors like J.R.R. Tolkien and C.S. Lewis in the mid-20th century. What was once considered a niche genre has blossomed into one of the most popular and diverse categories in literature, encompassing everything from epic high fantasy to urban fantasy set in contemporary cities.</p>
                      <h3>The Foundations: Tolkien and Lewis</h3>
                      <p>Modern fantasy literature as we know it today was largely shaped by J.R.R. Tolkien's "The Lord of the Rings" and C.S. Lewis's "The Chronicles of Narnia." These works established many of the tropes and conventions that would define the genre for decades: elaborate world-building, the battle between good and evil, heroic quests, and magical systems. Tolkien's meticulous attention to creating languages, histories, and geographies for Middle-earth set a new standard for fantasy world-building.</p>
                      <h3>The Genre Expands: 1970s-1990s</h3>
                      <p>Following Tolkien and Lewis, authors like Ursula K. Le Guin ("Earthsea" series) and Terry Brooks ("Shannara" series) continued to develop the genre. Le Guin's work, in particular, brought more nuanced explorations of morality and identity to fantasy literature. The 1980s and 1990s saw further diversification with Terry Pratchett's satirical "Discworld" series and Robert Jordan's expansive "Wheel of Time" saga, which pushed the boundaries of epic fantasy with its complex political systems and extensive cast of characters.</p>
                      <h3>A New Wave: The 2000s</h3>
                      <p>The early 2000s marked another significant shift in fantasy literature. J.K. Rowling's "Harry Potter" series brought fantasy to mainstream audiences on an unprecedented scale, while George R.R. Martin's "A Song of Ice and Fire" (adapted as "Game of Thrones") introduced a grittier, more morally ambiguous approach to the genre. Martin's work, in particular, challenged the traditional good-versus-evil narrative by presenting complex characters operating in shades of gray rather than black and white.</p>
                      <h3>Diversity and Inclusion: Contemporary Fantasy</h3>
                      <p>In recent years, fantasy literature has become increasingly diverse, with authors from various backgrounds bringing new perspectives to the genre. Writers like N.K. Jemisin ("The Broken Earth" trilogy), Nnedi Okorafor ("Who Fears Death"), and Tomi Adeyemi ("Children of Blood and Bone") have incorporated elements from non-Western mythologies and addressed themes of colonialism, racism, and social justice. These works have expanded the boundaries of what fantasy literature can explore and who it can represent.</p>
                      <h3>Subgenres and Hybridization</h3>
                      <p>The fantasy genre has also splintered into numerous subgenres and hybrid forms. Urban fantasy places magical elements in contemporary settings, as seen in works by authors like Neil Gaiman and V.E. Schwab. Paranormal romance, exemplified by series like Charlaine Harris's "Sookie Stackhouse" novels, blends fantasy with romance. Meanwhile, "grimdark" fantasy, popularized by authors like Joe Abercrombie and Mark Lawrence, embraces darkness and moral ambiguity.</p>
                      <h3>The Future of Fantasy</h3>
                      <p>As we look to the future, fantasy literature continues to evolve. The rise of self-publishing has allowed for even greater diversity of voices and approaches. Fantasy elements are increasingly blending with other genres, from science fiction to literary fiction. And the global exchange of ideas means that fantasy traditions from around the world are influencing each other in exciting new ways.</p>
                      <p>What remains constant is fantasy's power to transport readers to other worlds, to explore complex ideas through metaphor and allegory, and to imagine possibilities beyond the constraints of our reality. As our world changes, so too will fantasy literature, reflecting our evolving hopes, fears, and dreams.</p>`,
            author: "Michael Johnson",
            date: "April 28, 2025",
            category: "Literary News",
            image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            tags: ["Fantasy", "Fiction", "Literary History", "Books"],
            comments: 31,
            likes: 178
        },
        {
            id: 5,
            title: "The Rise of Audiobooks: A New Way to Experience Literature",
            excerpt: "Discover how audiobooks are changing the way we consume literature and why more readers are adding listening to their reading habits.",
            content: `<p>In recent years, audiobooks have transformed from a niche format to a mainstream way of consuming literature. What was once primarily associated with commuters or the visually impaired has become a preferred method of "reading" for millions of people worldwide. This shift represents not just a change in format, but a fundamental evolution in how we experience and interact with books.</p>
                      <h3>The Audiobook Boom</h3>
                      <p>The statistics tell a compelling story: audiobook sales have shown double-digit growth year after year, outpacing both print and e-book formats in terms of growth rate. Major publishers report that audiobooks now account for up to 25% of their revenue for new titles. Platforms like Audible, Libro.fm, and library-connected apps like Libby have made thousands of titles accessible with just a few taps on a smartphone.</p>
                      <h3>Why Listeners Are Tuning In</h3>
                      <p>The appeal of audiobooks is multifaceted. For many, it's about multitasking—being able to "read" while driving, exercising, cooking, or doing household chores. For others, it's about accessibility, whether due to visual impairments or learning differences like dyslexia. And for an increasing number of listeners, it's about the unique experience that audio narration provides.</p>
                      <p>"Audiobooks aren't just books you listen to—they're performances," explains voice actor James Anderson, who has narrated over 50 titles. "A good narrator doesn't just read the text; they bring characters to life through voice, timing, and emotion. It's closer to radio drama than to silent reading."</p>
                      <h3>The Art of Narration</h3>
                      <p>Indeed, narration has evolved into an art form of its own. Top audiobook narrators like Julia Whelan, Simon Vance, and Bahni Turpin have developed devoted followings, with listeners seeking out books specifically because of who's reading them. Publishers now carefully match narrators to books based on character demographics, setting, and tone.</p>
                      <p>The production quality has also improved dramatically. While early audiobooks were often abridged and simply read aloud, today's productions frequently feature full casts, sound effects, and original music. Audiobook-first productions like "The Sandman" by Neil Gaiman have pushed the boundaries of what an audiobook can be, blurring the line between audiobook and audio drama.</p>
                      <h3>Different Brain, Different Experience</h3>
                      <p>Neuroscience research suggests that listening to a book activates different neural pathways than visual reading. Dr. Melissa Wong, a cognitive neuroscientist, explains: "When we read visually, we're decoding symbols into meaning. When we listen, we're processing language more directly. Neither is inherently better, but they are different experiences that engage different parts of the brain."</p>
                      <p>These differences can affect comprehension and retention. Some studies suggest that visual reading may lead to better retention of specific details, while listening might enhance understanding of emotional content and narrative flow. Many readers report that certain genres work better in audio format for them, while others are better experienced on the page.</p>
                      <h3>The Social Dimension</h3>
                      <p>Audiobooks have also created new social dimensions for reading. Book clubs now sometimes offer "read or listen" options, acknowledging that members might experience the same book in different ways. Family listening has become popular for road trips, with parents and children enjoying stories together. And the intimate experience of having a story whispered directly into one's ears creates a unique connection between narrator and listener.</p>
                      <h3>Print vs. Audio: Not an Either/Or</h3>
                      <p>Despite early concerns that audiobooks might replace traditional reading, the reality has proven more nuanced. Many avid readers have simply added audiobooks to their reading diet, using different formats for different situations or types of books. The "format flexibility" offered by publishers—where purchasing a book gives access to it in multiple formats—has encouraged this hybrid approach to reading.</p>
                      <p>"I listen to nonfiction and lighter fiction while I'm doing other things," says Maria Chen, a self-described "reading omnivore." "But for complex literary fiction or books with lots of visual elements, I still prefer print. It's not about which is better—it's about which works better for what I'm reading and what I'm doing."</p>
                      <h3>The Future of Listening</h3>
                      <p>As technology continues to evolve, so too will audiobooks. AI-generated narration is improving rapidly, potentially making audiobook production more affordable and accessible for indie authors. Augmented reality could create new hybrid experiences that combine visual and audio elements. And as our lives become increasingly busy and screen-saturated, the ability to experience literature through listening rather than viewing may become even more valuable.</p>
                      <p>What's clear is that audiobooks aren't just a passing trend but a fundamental shift in how we interact with literature—one that expands access, creates new artistic possibilities, and allows us to incorporate books into more moments of our daily lives. Whether you're a dedicated listener, a print purist, or someone who enjoys both, the audiobook revolution has undeniably enriched the literary landscape.</p>`,
            author: "Sarah Williams",
            date: "April 20, 2025",
            category: "Reading Tips",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            tags: ["Audiobooks", "Reading", "Technology", "Literature"],
            comments: 27,
            likes: 143
        }
    ];

    // Variables
    let currentPage = 1;
    const postsPerPage = 6;
    let filteredPosts = [...blogPosts];
    let activeCategoryFilter = '';
    let activeSortFilter = 'newest';

    // DOM elements
    const postsContainer = document.getElementById('posts-container');
    const blogPagination = document.getElementById('blog-pagination');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchForm = document.getElementById('blog-search-form');
    const searchInput = document.getElementById('blog-search-input');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const tagLinks = document.querySelectorAll('.tag');

    // Initialize the blog
    filterPosts();
    
    // Add event listeners to Read More buttons
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const postId = parseInt(this.getAttribute('data-post-id'));
            openBlogPostModal(postId);
        });
    });

    /**
     * Open blog post modal with full content
     */
    function openBlogPostModal(postId) {
        const modal = document.getElementById('blog-post-modal');
        const modalContent = document.getElementById('blog-post-modal-content');
        
        // Find the post by ID
        const post = blogPosts.find(post => post.id === postId);
        
        if (!post) {
            console.error('Post not found with ID:', postId);
            return;
        }
        
        // Create modal content
        let modalHTML = `
            <div class="blog-post-full">
                <div class="blog-post-header">
                    <div class="blog-category">${post.category}</div>
                    <h2 class="blog-title">${post.title}</h2>
                    <div class="blog-meta">
                        <span class="blog-date"><i class="far fa-calendar-alt"></i> ${post.date}</span>
                        <span class="blog-author"><i class="far fa-user"></i> ${post.author}</span>
                    </div>
                </div>
                <div class="blog-post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-post-content">
                    ${post.content}
                </div>
                <div class="blog-post-tags">
                    <span><i class="fas fa-tags"></i> Tags:</span>
                    ${post.tags.map(tag => `<a href="#" class="tag">${tag}</a>`).join('')}
                </div>
                <div class="blog-post-actions">
                    <div class="social-share">
                        <span>Share this post:</span>
                        <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-pinterest"></i></a>
                    </div>
                    <div class="post-reactions">
                        <button class="reaction-btn"><i class="far fa-heart"></i> Like (${post.likes})</button>
                        <button class="reaction-btn"><i class="far fa-comment"></i> Comments (${post.comments})</button>
                    </div>
                </div>
            </div>
        `;
        
        // Set modal content
        modalContent.innerHTML = modalHTML;
        
        // Show modal
        modal.style.display = 'block';
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close blog post modal
     */
    function closeBlogPostModal() {
        const modal = document.getElementById('blog-post-modal');
        modal.style.display = 'none';
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Category filter change
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                activeCategoryFilter = this.value;
                currentPage = 1;
                filterPosts();
            });
        }

        // Category links in sidebar
        const categoryLinks = document.querySelectorAll('.category-list a');
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                activeCategoryFilter = this.getAttribute('data-category');
                // Update the dropdown to match
                if (categoryFilter) {
                    categoryFilter.value = activeCategoryFilter;
                }
                currentPage = 1;
                filterPosts();
            });
        });

        // Sort filter
        const sortFilter = document.getElementById('sort-filter');
        if (sortFilter) {
            sortFilter.addEventListener('change', function() {
                activeSortFilter = this.value;
                filterPosts();
            });
        }

        // Tag links in sidebar
        const tagLinks = document.querySelectorAll('.tag-list a');
        tagLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                activeTag = this.getAttribute('data-tag');
                currentPage = 1;
                filterPosts();
            });
        });
        
        // Read More buttons
        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const postId = parseInt(this.getAttribute('data-post-id'));
                openBlogPostModal(postId);
            });
        });
        
        // Close modal
        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeBlogPostModal);
        }
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('blog-post-modal');
            if (event.target === modal) {
                closeBlogPostModal();
            }
        });
    }

    /**
     * Filter posts based on active filters
     */
    function filterPosts() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        filteredPosts = blogPosts.filter(post => {
            // Filter by search term
            if (searchTerm && !post.title.toLowerCase().includes(searchTerm) && 
                !post.excerpt.toLowerCase().includes(searchTerm) && 
                !post.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                return false;
            }

            // Filter by category
            if (activeCategoryFilter && post.category !== activeCategoryFilter) {
                return false;
            }

            return true;
        });

        // Sort posts
        sortPosts();

        // Render posts
        renderPosts();
    }

    /**
     * Sort posts based on active sort filter
     */
    function sortPosts() {
        switch (activeSortFilter) {
            case 'newest':
                // Assuming the posts are already sorted by date in the array
                // If they weren't, we would need to parse the date strings and sort
                break;
            case 'oldest':
                filteredPosts.reverse();
                break;
            case 'popular':
                filteredPosts.sort((a, b) => b.likes - a.likes);
                break;
        }
    }

    /**
     * Render posts
     */
    function renderPosts() {
        // Calculate pagination
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);

        // Clear posts container
        postsContainer.innerHTML = '';

        // Add posts to container
        postsToShow.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-content">
                    <div class="post-category">${post.category}</div>
                    <h3><a href="blog-post.html?id=${post.id}">${post.title}</a></h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="post-date">${post.date}</span>
                        <span class="post-author">by ${post.author}</span>
                    </div>
                    <div class="post-stats">
                        <span><i class="fas fa-heart"></i> ${post.likes}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments}</span>
                    </div>
                    <a href="blog-post.html?id=${post.id}" class="btn btn-outline">Read More</a>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });

        // If no posts match the filters
        if (postsToShow.length === 0) {
            postsContainer.innerHTML = `
                <div class="no-results">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
        }

        // Render pagination
        renderPagination(totalPages);
    }

    /**
     * Render pagination
     */
    function renderPagination(totalPages) {
        // Clear pagination
        blogPagination.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.className = `page-link ${currentPage === 1 ? 'disabled' : ''}`;
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        if (currentPage > 1) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage--;
                renderPosts();
            });
        }
        
        blogPagination.appendChild(prevButton);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `page-link ${i === currentPage ? 'active' : ''}`;
            pageLink.textContent = i;
            
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                renderPosts();
            });
            
            blogPagination.appendChild(pageLink);
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
                renderPosts();
            });
        }
        
        blogPagination.appendChild(nextButton);
    }

    // Handle newsletter form submission
    const newsletterForm = document.getElementById('sidebar-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest blog updates.`);
            this.reset();
        });
    }

    // Handle main newsletter form submission
    const mainNewsletterForm = document.getElementById('newsletter-form');
    if (mainNewsletterForm) {
        mainNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
            this.reset();
        });
    }
});
