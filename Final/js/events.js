/**
 * Events JavaScript for LitFest - Book Fair & Literature Website
 * Handles event filtering, calendar navigation, and modal interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const eventTypeFilter = document.getElementById('event-type');
    const eventDateFilter = document.getElementById('event-date');
    const eventLocationFilter = document.getElementById('event-location');
    const filterResetBtn = document.getElementById('filter-reset');
    const eventSearchForm = document.getElementById('event-search-form');
    const eventSearch = document.getElementById('event-search');
    const eventCards = document.querySelectorAll('.event-card');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.getElementById('current-month');
    const calendarDays = document.querySelectorAll('.calendar-day');
    const eventModal = document.getElementById('event-modal');
    const calendarModal = document.getElementById('calendar-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const addToCalendarButtons = document.querySelectorAll('.add-to-calendar');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const paginationNext = document.querySelector('.pagination-next');
    
    // Variables
    let currentFilters = {
        type: 'all',
        date: 'all',
        location: 'all',
        search: ''
    };
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Event data for modals
    const eventData = [
        {
            id: 1,
            title: "Author Meet & Greet: J.K. Rowling",
            date: "June 15, 2025",
            time: "2:00 PM - 5:00 PM",
            location: "Central Library, New York",
            type: "Author Signing",
            description: "Meet the bestselling author of the Harry Potter series and get your books signed. Limited tickets available.",
            fullDescription: `<p>Join us for an exclusive meet and greet with J.K. Rowling, the acclaimed author of the Harry Potter series. This rare opportunity allows fans to meet the author in person, have their books signed, and participate in a Q&A session.</p>
                             <p>The event will begin with a reading from Rowling's latest work, followed by an interview conducted by literary critic Michael Johnson. Attendees will then have the opportunity to ask questions and get their books signed.</p>
                             <p>Due to high demand, tickets are limited and must be purchased in advance. Each ticket includes entry to the event and the opportunity to have one book signed. Additional book signings may be available at the author's discretion.</p>`,
            organizer: "Central Library Literary Society",
            ticketInfo: "Tickets: $25 - $50 (VIP includes priority signing and exclusive merchandise)",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            featured: false
        },
        {
            id: 2,
            title: "Book Launch: The Midnight Library",
            date: "June 22, 2025",
            time: "6:30 PM - 8:30 PM",
            location: "Barnes & Noble, Boston",
            type: "Book Launch",
            description: "Join Matt Haig for the launch of his new novel exploring the possibilities of life and regret. Reading and Q&A session included.",
            fullDescription: `<p>Barnes & Noble is proud to host the official launch of Matt Haig's highly anticipated new novel, "The Midnight Library." This thought-provoking story explores the infinite possibilities of life through the lens of a magical library that exists between life and death.</p>
                             <p>The evening will begin with a welcome reception featuring light refreshments, followed by a reading from the author. Matt will then engage in a conversation about the themes of the book, his writing process, and the inspiration behind the story. The event will conclude with an audience Q&A and book signing session.</p>
                             <p>Each ticket includes a hardcover copy of "The Midnight Library" and entry to the event. Don't miss this opportunity to be among the first to experience this remarkable new work and meet the author in person.</p>`,
            organizer: "Barnes & Noble Boston",
            ticketInfo: "Tickets: $30 (includes hardcover copy of the book)",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            featured: false
        },
        {
            id: 3,
            title: "Literary Workshop: Creative Writing",
            date: "June 30, 2025",
            time: "10:00 AM - 1:00 PM",
            location: "Writers Guild, Chicago",
            type: "Workshop",
            description: "A hands-on workshop for aspiring writers. Learn techniques for character development, plot structure, and dialogue from published authors.",
            fullDescription: `<p>Unlock your creative potential with our intensive Creative Writing Workshop led by award-winning authors Sarah Johnson and David Miller. This hands-on session is designed for writers of all levels who want to enhance their storytelling skills and develop their unique voice.</p>
                             <p>The workshop will cover essential elements of fiction writing, including:</p>
                             <ul>
                                <li>Character development and creating compelling protagonists</li>
                                <li>Plot structure and narrative arc</li>
                                <li>Dialogue techniques that advance the story and reveal character</li>
                                <li>World-building and setting</li>
                                <li>Point of view and narrative voice</li>
                             </ul>
                             <p>Participants will engage in writing exercises, receive constructive feedback, and learn practical techniques they can immediately apply to their work. All attendees will also receive a comprehensive workbook with additional resources and exercises to continue their writing journey.</p>
                             <p>Space is limited to ensure personalized attention for each participant. Please bring a notebook, writing utensils, and a laptop if you prefer to write digitally.</p>`,
            organizer: "Chicago Writers Guild",
            ticketInfo: "Registration Fee: $75 (Early Bird: $60 before June 15)",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            featured: false
        },
        {
            id: 5,
            title: "International Book Fair 2025",
            date: "July 10-15, 2025",
            time: "9:00 AM - 6:00 PM",
            location: "Frankfurt Exhibition Center, Germany",
            type: "Festival",
            description: "The world's largest trade fair for books featuring over 7,500 exhibitors from 100 countries, 300,000 visitors, and 4,000 events.",
            fullDescription: `<p>The International Book Fair returns to Frankfurt for its 77th edition, bringing together publishers, authors, agents, and book lovers from around the world. As the industry's premier global event, the fair offers unparalleled opportunities for networking, rights trading, and discovering the latest trends in publishing.</p>
                             <p>This year's fair will feature:</p>
                             <ul>
                                <li>Over 7,500 exhibitors from more than 100 countries</li>
                                <li>4,000+ events including readings, panel discussions, and workshops</li>
                                <li>Special focus on digital innovation in publishing</li>
                                <li>Guest of Honor Country: Japan - showcasing Japanese literature and culture</li>
                                <li>Literary Gala featuring award ceremonies and celebrity appearances</li>
                             </ul>
                             <p>Industry professionals can take advantage of specialized business areas, rights centers, and networking events, while general visitors can enjoy author signings, readings, and cultural performances throughout the exhibition halls.</p>
                             <p>The fair is open to industry professionals exclusively on the first three days, with public access available for the final three days. Various ticket options are available to suit different needs and interests.</p>`,
            organizer: "Frankfurt Book Fair Committee",
            ticketInfo: "Tickets: €25 (Day Pass), €65 (Full Event Pass), Special rates for students and industry professionals",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            featured: true
        },
        {
            id: 6,
            title: "Literary Festival 2025",
            date: "June 20-25, 2025",
            time: "Various Times (See Schedule)",
            location: "Central Park, New York",
            type: "Festival",
            description: "A week-long celebration of literature featuring readings, panel discussions, and workshops with renowned authors from around the world.",
            fullDescription: `<p>The 2025 Literary Festival transforms Central Park into a paradise for book lovers, with six days of literary events, performances, and activities for all ages. This year's theme, "Voices Across Borders," celebrates international literature and cultural exchange.</p>
                             <p>Festival highlights include:</p>
                             <ul>
                                <li>Main Stage: Featuring keynote addresses and conversations with literary stars including Salman Rushdie, Chimamanda Ngozi Adichie, and Haruki Murakami</li>
                                <li>Poetry Grove: Daily poetry readings and slam competitions</li>
                                <li>Writers' Workshop Tent: Craft sessions led by acclaimed authors and editors</li>
                                <li>Children's Corner: Storytelling, character meet-and-greets, and interactive activities</li>
                                <li>Literary Marketplace: Browse and purchase books from independent publishers and booksellers</li>
                                <li>Evening Events: Film screenings, musical performances, and literary-themed entertainment</li>
                             </ul>
                             <p>The festival grounds will feature food vendors, comfortable reading areas, and signing booths where attendees can meet their favorite authors. A detailed schedule of events will be available on our website and mobile app.</p>
                             <p>Most events are free and open to the public, though some special workshops and VIP events require advance registration or tickets.</p>`,
            organizer: "New York Literary Arts Council",
            ticketInfo: "General Admission: Free, Premium Pass (includes reserved seating and special events): $120",
            image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            featured: true
        }
    ];
    
    // Initialize
    updateCalendar();
    
    // Event Listeners
    if (eventTypeFilter) {
        eventTypeFilter.addEventListener('change', function() {
            currentFilters.type = this.value;
            filterEvents();
        });
    }
    
    if (eventDateFilter) {
        eventDateFilter.addEventListener('change', function() {
            currentFilters.date = this.value;
            filterEvents();
        });
    }
    
    if (eventLocationFilter) {
        eventLocationFilter.addEventListener('change', function() {
            currentFilters.location = this.value;
            filterEvents();
        });
    }
    
    if (filterResetBtn) {
        filterResetBtn.addEventListener('click', resetFilters);
    }
    
    if (eventSearchForm) {
        eventSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            currentFilters.search = eventSearch.value.toLowerCase().trim();
            filterEvents();
        });
    }
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
    }
    
    // Calendar day click events
    calendarDays.forEach(day => {
        if (day.classList.contains('has-event')) {
            day.addEventListener('click', function() {
                const eventId = this.querySelector('.event-indicator').getAttribute('data-event-id');
                openEventModal(eventId);
            });
        }
    });
    
    // Add to calendar buttons
    addToCalendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event-id');
            openCalendarModal(eventId);
        });
    });
    
    // Close modal buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            eventModal.style.display = 'none';
            calendarModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === eventModal) {
            eventModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === calendarModal) {
            calendarModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Pagination
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // In a real application, this would load the next page of events
        });
    });
    
    if (paginationNext) {
        paginationNext.addEventListener('click', function() {
            // Find the active button and activate the next one
            const activeButton = document.querySelector('.pagination-btn.active');
            if (activeButton && activeButton.nextElementSibling && activeButton.nextElementSibling.classList.contains('pagination-btn')) {
                activeButton.classList.remove('active');
                activeButton.nextElementSibling.classList.add('active');
            }
        });
    }
    
    // Functions
    function filterEvents() {
        eventCards.forEach(card => {
            let showCard = true;
            
            // Filter by type
            if (currentFilters.type !== 'all') {
                const cardType = card.getAttribute('data-event-type');
                if (cardType !== currentFilters.type) {
                    showCard = false;
                }
            }
            
            // Filter by location
            if (currentFilters.location !== 'all') {
                const cardLocation = card.getAttribute('data-event-location');
                if (cardLocation !== currentFilters.location) {
                    showCard = false;
                }
            }
            
            // Filter by search term
            if (currentFilters.search !== '') {
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                const cardDescription = card.querySelector('.event-description').textContent.toLowerCase();
                if (!cardTitle.includes(currentFilters.search) && !cardDescription.includes(currentFilters.search)) {
                    showCard = false;
                }
            }
            
            // Date filtering would require more complex logic with actual dates
            // This is a simplified version
            
            // Show or hide the card
            card.style.display = showCard ? 'flex' : 'none';
        });
    }
    
    function resetFilters() {
        currentFilters = {
            type: 'all',
            date: 'all',
            location: 'all',
            search: ''
        };
        
        if (eventTypeFilter) eventTypeFilter.value = 'all';
        if (eventDateFilter) eventDateFilter.value = 'all';
        if (eventLocationFilter) eventLocationFilter.value = 'all';
        if (eventSearch) eventSearch.value = '';
        
        eventCards.forEach(card => {
            card.style.display = 'flex';
        });
    }
    
    function updateCalendar() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        if (currentMonthEl) {
            currentMonthEl.textContent = `${months[currentMonth]} ${currentYear}`;
        }
        
        // In a real application, this would update the calendar days based on the current month
        // For this demo, we'll just keep the static calendar
    }
    
    function openEventModal(eventId) {
        const event = eventData.find(e => e.id === parseInt(eventId));
        
        if (!event) return;
        
        const modalContent = document.getElementById('event-modal-content');
        
        if (!modalContent) return;
        
        modalContent.innerHTML = `
            <div class="event-modal-header" style="background-image: url('${event.image}')">
                <div class="event-modal-overlay">
                    <div class="event-type-badge">${event.type}</div>
                    <h2>${event.title}</h2>
                    <div class="event-meta">
                        <p><i class="far fa-calendar-alt"></i> ${event.date}</p>
                        <p><i class="far fa-clock"></i> ${event.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    </div>
                </div>
            </div>
            <div class="event-modal-body">
                <div class="event-description">
                    ${event.fullDescription}
                </div>
                <div class="event-details">
                    <div class="event-detail-item">
                        <h4>Organizer</h4>
                        <p>${event.organizer}</p>
                    </div>
                    <div class="event-detail-item">
                        <h4>Ticket Information</h4>
                        <p>${event.ticketInfo}</p>
                    </div>
                </div>
                <div class="event-actions">
                    <button class="btn btn-primary">Register Now</button>
                    <button class="btn btn-outline add-to-calendar" data-event-id="${event.id}">
                        <i class="far fa-calendar-plus"></i> Add to Calendar
                    </button>
                    <button class="btn btn-outline">
                        <i class="fas fa-share-alt"></i> Share Event
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener to the new Add to Calendar button
        const addToCalBtn = modalContent.querySelector('.add-to-calendar');
        if (addToCalBtn) {
            addToCalBtn.addEventListener('click', function() {
                openCalendarModal(event.id);
            });
        }
        
        eventModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function openCalendarModal(eventId) {
        const event = eventData.find(e => e.id === parseInt(eventId));
        
        if (!event) return;
        
        // In a real application, this would generate calendar links for different platforms
        
        calendarModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add event listeners for calendar options
        const googleCalendar = document.getElementById('google-calendar');
        const appleCalendar = document.getElementById('apple-calendar');
        const outlookCalendar = document.getElementById('outlook-calendar');
        const yahooCalendar = document.getElementById('yahoo-calendar');
        
        if (googleCalendar) {
            googleCalendar.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real application, this would generate a Google Calendar link
                alert('Event would be added to Google Calendar');
            });
        }
        
        if (appleCalendar) {
            appleCalendar.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real application, this would generate an Apple Calendar link
                alert('Event would be added to Apple Calendar');
            });
        }
        
        if (outlookCalendar) {
            outlookCalendar.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real application, this would generate an Outlook Calendar link
                alert('Event would be added to Outlook Calendar');
            });
        }
        
        if (yahooCalendar) {
            yahooCalendar.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real application, this would generate a Yahoo Calendar link
                alert('Event would be added to Yahoo Calendar');
            });
        }
    }
});
