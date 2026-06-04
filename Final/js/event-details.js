/**
 * Event Details JavaScript for LitFest - Book Fair & Literature Website
 * Handles event details page functionality, registration forms, and calendar integration
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    // Elements
    const eventHero = document.getElementById('event-hero');
    const eventMainContent = document.getElementById('event-main-content');
    const eventInfoCard = document.getElementById('event-info-card');
    const eventOrganizerCard = document.getElementById('event-organizer-card');
    const eventScheduleSection = document.getElementById('event-schedule-section');
    const eventSpeakersSection = document.getElementById('event-speakers-section');
    const eventLocationInfo = document.getElementById('event-location-info');
    const similarEventsGrid = document.getElementById('similar-events-grid');
    const registrationModal = document.getElementById('registration-modal');
    const calendarModal = document.getElementById('calendar-modal');
    const successModal = document.getElementById('success-modal');
    const eventRegistrationTitle = document.getElementById('event-registration-title');
    const registrationForm = document.getElementById('event-registration-form');
    const registerBtn = document.getElementById('register-btn');
    const addToCalendarBtn = document.getElementById('add-to-calendar-btn');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const cancelRegistrationBtn = document.getElementById('cancel-registration-btn');
    const closeSuccessBtn = document.getElementById('close-success-btn');
    
    // Event data (in a real application, this would be fetched from a server)
    const eventData = [
        {
            id: 1,
            title: "Author Meet & Greet: J.K. Rowling",
            date: "June 15, 2025",
            time: "2:00 PM - 5:00 PM",
            location: "Central Library, New York",
            address: "455 5th Ave, New York, NY 10016",
            type: "Author Signing",
            description: "Meet the bestselling author of the Harry Potter series and get your books signed. Limited tickets available.",
            fullDescription: `<p>Join us for an exclusive meet and greet with J.K. Rowling, the acclaimed author of the Harry Potter series. This rare opportunity allows fans to meet the author in person, have their books signed, and participate in a Q&A session.</p>
                             <p>The event will begin with a reading from Rowling's latest work, followed by an interview conducted by literary critic Michael Johnson. Attendees will then have the opportunity to ask questions and get their books signed.</p>
                             <p>Due to high demand, tickets are limited and must be purchased in advance. Each ticket includes entry to the event and the opportunity to have one book signed. Additional book signings may be available at the author's discretion.</p>`,
            organizer: "Central Library Literary Society",
            organizerLogo: "https://randomuser.me/api/portraits/women/65.jpg",
            organizerDescription: "The Central Library Literary Society is dedicated to promoting literature and supporting authors through events, workshops, and community engagement.",
            organizerEmail: "events@centrallibrary.org",
            organizerPhone: "+1 (212) 555-7890",
            ticketInfo: "Tickets: $25 - $50 (VIP includes priority signing and exclusive merchandise)",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            featured: false,
            locationFeatures: ["Wheelchair Accessible", "Air Conditioned", "Restrooms", "Cafe on Premises"],
            transportation: [
                {
                    type: "Subway",
                    icon: "fas fa-subway",
                    info: "42nd Street-Bryant Park Station (B, D, F, M lines) - 2 minute walk"
                },
                {
                    type: "Bus",
                    icon: "fas fa-bus",
                    info: "M1, M2, M3, M4, M5, M42, M55 buses stop within 2 blocks"
                },
                {
                    type: "Parking",
                    icon: "fas fa-parking",
                    info: "Paid parking available at 38 W 43rd St (5 minute walk)"
                }
            ],
            schedule: [
                {
                    time: "2:00 PM",
                    title: "Doors Open",
                    description: "Check-in and seating"
                },
                {
                    time: "2:30 PM",
                    title: "Welcome and Introduction",
                    description: "Opening remarks by Library Director"
                },
                {
                    time: "2:45 PM",
                    title: "Reading by J.K. Rowling",
                    description: "Author will read excerpts from her latest work",
                    speaker: {
                        name: "J.K. Rowling",
                        image: "https://randomuser.me/api/portraits/women/65.jpg"
                    }
                },
                {
                    time: "3:15 PM",
                    title: "Interview and Discussion",
                    description: "Moderated conversation about writing and the Harry Potter series",
                    speaker: {
                        name: "Michael Johnson",
                        image: "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                },
                {
                    time: "3:45 PM",
                    title: "Audience Q&A",
                    description: "Selected questions from attendees"
                },
                {
                    time: "4:15 PM",
                    title: "Book Signing",
                    description: "Get your books signed by the author"
                },
                {
                    time: "5:00 PM",
                    title: "Event Concludes",
                    description: ""
                }
            ],
            speakers: [
                {
                    name: "J.K. Rowling",
                    title: "Author, Harry Potter Series",
                    image: "https://randomuser.me/api/portraits/women/65.jpg",
                    social: {
                        twitter: "#",
                        facebook: "#",
                        instagram: "#"
                    }
                },
                {
                    name: "Michael Johnson",
                    title: "Literary Critic, The New York Times",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    social: {
                        twitter: "#",
                        linkedin: "#"
                    }
                }
            ]
        },
        {
            id: 2,
            title: "Book Launch: The Midnight Library",
            date: "June 22, 2025",
            time: "6:30 PM - 8:30 PM",
            location: "Barnes & Noble, Boston",
            address: "800 Boylston St, Boston, MA 02199",
            type: "Book Launch",
            description: "Join Matt Haig for the launch of his new novel exploring the possibilities of life and regret. Reading and Q&A session included.",
            fullDescription: `<p>Barnes & Noble is proud to host the official launch of Matt Haig's highly anticipated new novel, "The Midnight Library." This thought-provoking story explores the infinite possibilities of life through the lens of a magical library that exists between life and death.</p>
                             <p>The evening will begin with a welcome reception featuring light refreshments, followed by a reading from the author. Matt will then engage in a conversation about the themes of the book, his writing process, and the inspiration behind the story. The event will conclude with an audience Q&A and book signing session.</p>
                             <p>Each ticket includes a hardcover copy of "The Midnight Library" and entry to the event. Don't miss this opportunity to be among the first to experience this remarkable new work and meet the author in person.</p>`,
            organizer: "Barnes & Noble Boston",
            organizerLogo: "https://randomuser.me/api/portraits/men/41.jpg",
            organizerDescription: "Barnes & Noble Boston hosts over 100 author events annually, bringing readers face-to-face with their favorite writers and introducing them to new voices in literature.",
            organizerEmail: "events@bn-boston.com",
            organizerPhone: "+1 (617) 555-1234",
            ticketInfo: "Tickets: $30 (includes hardcover copy of the book)",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            featured: false,
            locationFeatures: ["Wheelchair Accessible", "Air Conditioned", "Restrooms", "Cafe on Premises", "Bookstore"],
            transportation: [
                {
                    type: "Subway",
                    icon: "fas fa-subway",
                    info: "Copley Station (Green Line) - 5 minute walk"
                },
                {
                    type: "Bus",
                    icon: "fas fa-bus",
                    info: "Routes 9, 39, 55 stop nearby"
                },
                {
                    type: "Parking",
                    icon: "fas fa-parking",
                    info: "Prudential Center Garage - connected to the building"
                }
            ],
            schedule: [
                {
                    time: "6:30 PM",
                    title: "Doors Open & Welcome Reception",
                    description: "Light refreshments served"
                },
                {
                    time: "7:00 PM",
                    title: "Introduction",
                    description: "Welcome by Barnes & Noble Events Coordinator"
                },
                {
                    time: "7:10 PM",
                    title: "Reading by Matt Haig",
                    description: "Author will read selected passages from The Midnight Library",
                    speaker: {
                        name: "Matt Haig",
                        image: "https://randomuser.me/api/portraits/men/41.jpg"
                    }
                },
                {
                    time: "7:30 PM",
                    title: "Author Interview",
                    description: "Discussion about the book's themes and writing process",
                    speaker: {
                        name: "Sarah Chen",
                        image: "https://randomuser.me/api/portraits/women/44.jpg"
                    }
                },
                {
                    time: "8:00 PM",
                    title: "Audience Q&A",
                    description: "Open questions from attendees"
                },
                {
                    time: "8:20 PM",
                    title: "Book Signing",
                    description: "Meet the author and get your book signed"
                }
            ],
            speakers: [
                {
                    name: "Matt Haig",
                    title: "Author, The Midnight Library",
                    image: "https://randomuser.me/api/portraits/men/41.jpg",
                    social: {
                        twitter: "#",
                        instagram: "#",
                        website: "#"
                    }
                },
                {
                    name: "Sarah Chen",
                    title: "Literary Editor, Boston Review",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    social: {
                        twitter: "#",
                        linkedin: "#"
                    }
                }
            ]
        }
    ];
    
    // Load event details if ID is provided
    if (eventId) {
        const event = eventData.find(e => e.id === parseInt(eventId));
        
        if (event) {
            loadEventDetails(event);
        } else {
            // Handle event not found
            window.location.href = 'events.html';
        }
    } else {
        // Redirect to events page if no ID provided
        window.location.href = 'events.html';
    }
    
    // Event Listeners
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            openRegistrationModal();
        });
    }
    
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() {
            openCalendarModal();
        });
    }
    
    // Close modal buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            registrationModal.style.display = 'none';
            calendarModal.style.display = 'none';
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === registrationModal) {
            registrationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === calendarModal) {
            calendarModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    if (cancelRegistrationBtn) {
        cancelRegistrationBtn.addEventListener('click', function() {
            registrationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, this would submit the form data to a server
            // For this demo, we'll just show the success modal
            
            registrationModal.style.display = 'none';
            successModal.style.display = 'block';
            
            // Generate a random registration ID
            document.getElementById('registration-id').textContent = 'REG-' + Math.floor(100000 + Math.random() * 900000);
        });
    }
    
    // Calendar options
    const calendarOptions = document.querySelectorAll('.calendar-option');
    calendarOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real application, this would generate calendar links
            alert('Calendar event would be added to ' + this.textContent.trim());
            calendarModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Functions
    function loadEventDetails(event) {
        // Set page title
        document.title = event.title + ' - LitFest';
        
        // Load hero section
        if (eventHero) {
            eventHero.style.backgroundImage = `url('${event.image}')`;
            eventHero.innerHTML = `
                <div class="event-hero-content">
                    <div class="event-type-badge">${event.type}</div>
                    <h1>${event.title}</h1>
                    <div class="event-hero-meta">
                        <div class="event-hero-meta-item">
                            <i class="far fa-calendar-alt"></i>
                            <span>${event.date}</span>
                        </div>
                        <div class="event-hero-meta-item">
                            <i class="far fa-clock"></i>
                            <span>${event.time}</span>
                        </div>
                        <div class="event-hero-meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Load main content
        if (eventMainContent) {
            eventMainContent.innerHTML = `
                <div class="event-description">
                    <h2>About This Event</h2>
                    ${event.fullDescription}
                </div>
                
                <div class="event-highlights">
                    <h3>Event Highlights</h3>
                    <div class="highlights-grid">
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-book"></i>
                            </div>
                            <h4 class="highlight-title">Meet the Author</h4>
                            <p class="highlight-text">Get up close and personal with your favorite author and hear about their creative process.</p>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-signature"></i>
                            </div>
                            <h4 class="highlight-title">Book Signing</h4>
                            <p class="highlight-text">Have your books signed and personalized by the author.</p>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-comments"></i>
                            </div>
                            <h4 class="highlight-title">Q&A Session</h4>
                            <p class="highlight-text">Ask questions and engage in discussion with the author and other attendees.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Load info card
        if (eventInfoCard) {
            eventInfoCard.innerHTML = `
                <h3>Event Information</h3>
                <ul class="event-info-list">
                    <li class="event-info-item">
                        <div class="event-info-icon">
                            <i class="far fa-calendar-alt"></i>
                        </div>
                        <div class="event-info-content">
                            <div class="event-info-label">Date</div>
                            <div class="event-info-value">${event.date}</div>
                        </div>
                    </li>
                    <li class="event-info-item">
                        <div class="event-info-icon">
                            <i class="far fa-clock"></i>
                        </div>
                        <div class="event-info-content">
                            <div class="event-info-label">Time</div>
                            <div class="event-info-value">${event.time}</div>
                        </div>
                    </li>
                    <li class="event-info-item">
                        <div class="event-info-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="event-info-content">
                            <div class="event-info-label">Location</div>
                            <div class="event-info-value">${event.location}</div>
                        </div>
                    </li>
                    <li class="event-info-item">
                        <div class="event-info-icon">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="event-info-content">
                            <div class="event-info-label">Ticket Information</div>
                            <div class="event-info-value">${event.ticketInfo}</div>
                        </div>
                    </li>
                </ul>
            `;
        }
        
        // Load organizer card
        if (eventOrganizerCard) {
            eventOrganizerCard.innerHTML = `
                <h3>Event Organizer</h3>
                <div class="organizer-info">
                    <div class="organizer-logo">
                        <img src="${event.organizerLogo}" alt="${event.organizer}">
                    </div>
                    <div class="organizer-name">${event.organizer}</div>
                </div>
                <p class="organizer-description">${event.organizerDescription}</p>
                <div class="organizer-contact">
                    <a href="mailto:${event.organizerEmail}"><i class="fas fa-envelope"></i> ${event.organizerEmail}</a>
                    <a href="tel:${event.organizerPhone}"><i class="fas fa-phone"></i> ${event.organizerPhone}</a>
                </div>
            `;
        }
        
        // Load schedule section
        if (eventScheduleSection && event.schedule) {
            let scheduleHTML = `
                <div class="container">
                    <h2 class="section-title">Event Schedule</h2>
                    <div class="schedule-content">
                        <div class="schedule-day active">
            `;
            
            event.schedule.forEach(item => {
                scheduleHTML += `
                    <div class="schedule-item">
                        <div class="schedule-time">${item.time}</div>
                        <div class="schedule-details">
                            <h3 class="schedule-title">${item.title}</h3>
                            ${item.speaker ? `
                                <div class="schedule-speaker">
                                    <div class="schedule-speaker-image">
                                        <img src="${item.speaker.image}" alt="${item.speaker.name}">
                                    </div>
                                    <div class="schedule-speaker-name">${item.speaker.name}</div>
                                </div>
                            ` : ''}
                            <p class="schedule-description">${item.description}</p>
                        </div>
                    </div>
                `;
            });
            
            scheduleHTML += `
                        </div>
                    </div>
                </div>
            `;
            
            eventScheduleSection.innerHTML = scheduleHTML;
        } else if (eventScheduleSection) {
            eventScheduleSection.style.display = 'none';
        }
        
        // Load speakers section
        if (eventSpeakersSection && event.speakers && event.speakers.length > 0) {
            let speakersHTML = `
                <div class="container">
                    <h2 class="section-title">Featured Speakers</h2>
                    <div class="speakers-grid">
            `;
            
            event.speakers.forEach(speaker => {
                speakersHTML += `
                    <div class="speaker-card">
                        <div class="speaker-image">
                            <img src="${speaker.image}" alt="${speaker.name}">
                        </div>
                        <div class="speaker-info">
                            <h3 class="speaker-name">${speaker.name}</h3>
                            <p class="speaker-title">${speaker.title}</p>
                            <div class="speaker-social">
                                ${speaker.social.twitter ? `<a href="${speaker.social.twitter}"><i class="fab fa-twitter"></i></a>` : ''}
                                ${speaker.social.facebook ? `<a href="${speaker.social.facebook}"><i class="fab fa-facebook-f"></i></a>` : ''}
                                ${speaker.social.instagram ? `<a href="${speaker.social.instagram}"><i class="fab fa-instagram"></i></a>` : ''}
                                ${speaker.social.linkedin ? `<a href="${speaker.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>` : ''}
                                ${speaker.social.website ? `<a href="${speaker.social.website}"><i class="fas fa-globe"></i></a>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            speakersHTML += `
                    </div>
                </div>
            `;
            
            eventSpeakersSection.innerHTML = speakersHTML;
        } else if (eventSpeakersSection) {
            eventSpeakersSection.style.display = 'none';
        }
        
        // Load location info
        if (eventLocationInfo) {
            let locationHTML = `
                <h3>${event.location}</h3>
                <div class="location-details">
                    <p class="location-address">${event.address}</p>
                    <ul class="location-features">
            `;
            
            event.locationFeatures.forEach(feature => {
                locationHTML += `<li class="location-feature"><i class="fas fa-check-circle"></i> ${feature}</li>`;
            });
            
            locationHTML += `
                    </ul>
                </div>
                <div class="transportation-options">
                    <h4>Getting There</h4>
                    <ul class="transportation-list">
            `;
            
            event.transportation.forEach(transport => {
                locationHTML += `
                    <li class="transportation-item">
                        <div class="transportation-icon">
                            <i class="${transport.icon}"></i>
                        </div>
                        <div class="transportation-details">
                            <div class="transportation-type">${transport.type}</div>
                            <div class="transportation-info">${transport.info}</div>
                        </div>
                    </li>
                `;
            });
            
            locationHTML += `
                    </ul>
                </div>
            `;
            
            eventLocationInfo.innerHTML = locationHTML;
        }
        
        // Load similar events
        if (similarEventsGrid) {
            let similarEvents = eventData.filter(e => e.id !== event.id).slice(0, 3);
            let similarEventsHTML = '';
            
            similarEvents.forEach(similarEvent => {
                similarEventsHTML += `
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">${similarEvent.date.split(' ')[1].replace(',', '')}</span>
                            <span class="month">${similarEvent.date.split(' ')[0].substring(0, 3)}</span>
                        </div>
                        <div class="event-details">
                            <div class="event-type">${similarEvent.type}</div>
                            <h3>${similarEvent.title}</h3>
                            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${similarEvent.location}</p>
                            <p class="event-time"><i class="far fa-clock"></i> ${similarEvent.time}</p>
                            <div class="event-actions">
                                <a href="event-details.html?id=${similarEvent.id}" class="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            similarEventsGrid.innerHTML = similarEventsHTML;
        }
        
        // Set registration modal title
        if (eventRegistrationTitle) {
            eventRegistrationTitle.textContent = event.title;
        }
    }
    
    function openRegistrationModal() {
        registrationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function openCalendarModal() {
        calendarModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
});
