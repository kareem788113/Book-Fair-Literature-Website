/**
 * Book data for LitFest - Book Fair & Literature Website
 * Contains mock data for books including title, author, price, cover image, and description
 */

const booksData = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        publisher: "Penguin Random House",
        year: 2020,
        price: 16.99,
        rating: 4.5,
        genres: ["Fiction", "Fantasy", "Contemporary"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81XR+8rPjnL.jpg",
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
        featured: true,
        badge: "Bestseller"
    },
    {
        id: 2,
        title: "A Gentleman in Moscow",
        author: "Amor Towles",
        publisher: "Penguin Random House",
        year: 2019,
        price: 18.99,
        rating: 5.0,
        genres: ["Historical Fiction", "Literary Fiction"],
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "In 1922, Count Alexander Rostov is deemed an unrepentant aristocrat by a Bolshevik tribunal, and is sentenced to house arrest in the Metropol, a grand hotel across the street from the Kremlin. Rostov, an indomitable man of erudition and wit, has never worked a day in his life, and must now live in an attic room while some of the most tumultuous decades in Russian history are unfolding outside the hotel's doors.",
        featured: true
    },
    {
        id: 3,
        title: "Educated",
        author: "Tara Westover",
        publisher: "Random House",
        year: 2018,
        price: 14.99,
        rating: 4.7,
        genres: ["Memoir", "Biography", "Non-Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
        description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom.",
        featured: true,
        badge: "New"
    },
    {
        id: 4,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        publisher: "G.P. Putnam's Sons",
        year: 2018,
        price: 15.99,
        rating: 4.8,
        genres: ["Fiction", "Mystery", "Literary Fiction"],
        coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say.",
        featured: true
    },
    {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        publisher: "Avery",
        year: 2018,
        price: 19.99,
        rating: 4.9,
        genres: ["Self-Help", "Non-Fiction", "Psychology"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
        description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        featured: true,
        badge: "Popular"
    },
    {
        id: 6,
        title: "The Alchemist",
        author: "Paulo Coelho",
        publisher: "HarperOne",
        year: 2014,
        price: 12.99,
        rating: 4.6,
        genres: ["Fiction", "Fantasy", "Philosophy"],
        coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago's journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life's path, and, most importantly, to follow our dreams.",
        featured: true
    },
    {
        id: 7,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        publisher: "Celadon Books",
        year: 2019,
        price: 14.99,
        rating: 4.5,
        genres: ["Thriller", "Mystery", "Psychological Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81Lq-JzM5xL.jpg",
        description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
        featured: false
    },
    {
        id: 8,
        title: "Becoming",
        author: "Michelle Obama",
        publisher: "Crown",
        year: 2018,
        price: 17.99,
        rating: 4.8,
        genres: ["Memoir", "Biography", "Non-Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
        description: "In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era. As First Lady of the United States of America—the first African American to serve in that role—she helped create the most welcoming and inclusive White House in history.",
        featured: false
    },
    {
        id: 9,
        title: "The Vanishing Half",
        author: "Brit Bennett",
        publisher: "Riverhead Books",
        year: 2020,
        price: 16.99,
        rating: 4.6,
        genres: ["Fiction", "Historical Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81xXDgV1f1L.jpg",
        description: "The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities.",
        featured: false,
        badge: "Award Winner"
    },
    {
        id: 10,
        title: "The Four Winds",
        author: "Kristin Hannah",
        publisher: "St. Martin's Press",
        year: 2021,
        price: 18.99,
        rating: 4.5,
        genres: ["Historical Fiction", "Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91vkOuo1wFL.jpg",
        description: "Texas, 1934. Millions are out of work and a drought has broken the Great Plains. Farmers are fighting to keep their land and their livelihoods as the crops are failing, the water is drying up, and dust threatens to bury them all. One of the darkest periods of the Great Depression, the Dust Bowl era, has arrived with a vengeance.",
        featured: false
    },
    {
        id: 11,
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        publisher: "Tor Books",
        year: 2020,
        price: 16.99,
        rating: 4.4,
        genres: ["Fantasy", "Historical Fiction", "Romance"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91HDbhwevDL.jpg",
        description: "France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a dazzling adventure that will play out across centuries and continents, across history and art, as a young woman learns how far she will go to leave her mark on the world.",
        featured: false
    },
    {
        id: 12,
        title: "Project Hail Mary",
        author: "Andy Weir",
        publisher: "Ballantine Books",
        year: 2021,
        price: 19.99,
        rating: 4.8,
        genres: ["Science Fiction", "Adventure"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91vkOuo1wFL.jpg",
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
        featured: false,
        badge: "New Release"
    },
    {
        id: 13,
        title: "The Guest List",
        author: "Lucy Foley",
        publisher: "William Morrow",
        year: 2020,
        price: 14.99,
        rating: 4.2,
        genres: ["Mystery", "Thriller", "Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81yfsIOijJL.jpg",
        description: "On an island off the coast of Ireland, guests gather to celebrate two people joining their lives together as one. The groom: handsome and charming, a rising television star. The bride: smart and ambitious, a magazine publisher. It's a wedding for a magazine, or for a celebrity: the designer dress, the remote location, the luxe party favors, the boutique whiskey. The cell phone service may be spotty and the waves may be rough, but every detail has been expertly planned and will be expertly executed.",
        featured: false
    },
    {
        id: 14,
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        publisher: "Tor Books",
        year: 2020,
        price: 15.99,
        rating: 4.7,
        genres: ["Fantasy", "Fiction", "LGBT"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81wFMY9OAGL.jpg",
        description: "Linus Baker leads a quiet, solitary life. At forty, he lives in a tiny house with a devious cat and his old records. As a Case Worker at the Department in Charge Of Magical Youth, he spends his days overseeing the well-being of children in government-sanctioned orphanages. When Linus is unexpectedly summoned by Extremely Upper Management he's given a curious and highly classified assignment: travel to Marsyas Island Orphanage, where six dangerous children reside.",
        featured: false
    },
    {
        id: 15,
        title: "The Nightingale",
        author: "Kristin Hannah",
        publisher: "St. Martin's Press",
        year: 2015,
        price: 13.99,
        rating: 4.8,
        genres: ["Historical Fiction", "Fiction", "War"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91eopoUQC1L.jpg",
        description: "In love we find out who we want to be. In war we find out who we are. France, 1939. In the quiet village of Carriveau, Vianne Mauriac says goodbye to her husband, Antoine, as he heads for the Front. She doesn't believe that the Nazis will invade France...but invade they do, in droves of marching soldiers, in caravans of trucks and tanks, in planes that fill the skies and drop bombs upon the innocent.",
        featured: false
    },
    {
        id: 16,
        title: "Circe",
        author: "Madeline Miller",
        publisher: "Little, Brown and Company",
        year: 2018,
        price: 15.99,
        rating: 4.6,
        genres: ["Fantasy", "Mythology", "Historical Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81XR+8rPjnL.jpg",
        description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power—the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.",
        featured: false
    },
    {
        id: 17,
        title: "The Dutch House",
        author: "Ann Patchett",
        publisher: "Harper",
        year: 2019,
        price: 14.99,
        rating: 4.3,
        genres: ["Fiction", "Historical Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81UXPgGAUdL.jpg",
        description: "At the end of the Second World War, Cyril Conroy combines luck and a single canny investment to begin an enormous real estate empire, propelling his family from poverty to enormous wealth. His first order of business is to buy the Dutch House, a lavish estate in the suburbs outside of Philadelphia. Meant as a surprise for his wife, the house sets in motion the undoing of everyone he loves.",
        featured: false
    },
    {
        id: 18,
        title: "The Overstory",
        author: "Richard Powers",
        publisher: "W. W. Norton & Company",
        year: 2018,
        price: 17.99,
        rating: 4.4,
        genres: ["Fiction", "Environment", "Literary Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
        description: "The Overstory is a sweeping, impassioned work of activism and resistance that is also a stunning evocation of—and paean to—the natural world. From the roots to the crown and back to the seeds, Richard Powers's twelfth novel unfolds in concentric rings of interlocking fables that range from antebellum New York to the late twentieth-century Timber Wars of the Pacific Northwest and beyond.",
        featured: false,
        badge: "Award Winner"
    },
    {
        id: 19,
        title: "The Song of Achilles",
        author: "Madeline Miller",
        publisher: "Ecco",
        year: 2012,
        price: 13.99,
        rating: 4.7,
        genres: ["Fantasy", "Historical Fiction", "Mythology"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71XCLyCjJJL.jpg",
        description: "Achilles, 'the best of all the Greeks,' son of the cruel sea goddess Thetis and the legendary king Peleus, is strong, swift, and beautiful, irresistible to all who meet him. Patroclus is an awkward young prince, exiled from his homeland after an act of shocking violence. Brought together by chance, they forge an inseparable bond, despite risking the gods' wrath.",
        featured: false
    },
    {
        id: 20,
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        publisher: "Knopf",
        year: 2021,
        price: 18.99,
        rating: 4.2,
        genres: ["Science Fiction", "Literary Fiction"],
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71XCLyCjJJL.jpg",
        description: "From the bestselling author of Never Let Me Go and The Remains of the Day, a stunning new novel that asks, what does it mean to love? A thrilling feat of world-building, a novel of exquisite tenderness and impeccable restraint, Klara and the Sun is a magnificent achievement, and an international literary event.",
        featured: false,
        badge: "New Release"
    }
];

// Extract unique values for filters
const extractUniqueValues = (data, property) => {
    if (property === 'genres') {
        // Flatten the array of arrays and then get unique values
        const allGenres = data.reduce((acc, book) => [...acc, ...book.genres], []);
        return [...new Set(allGenres)].sort();
    }
    return [...new Set(data.map(book => book[property]))].sort();
};

// Get unique values for filters
const genres = extractUniqueValues(booksData, 'genres');
const authors = extractUniqueValues(booksData, 'author');
const publishers = extractUniqueValues(booksData, 'publisher');
const years = extractUniqueValues(booksData, 'year');
const ratings = [5, 4, 3, 2, 1]; // Predefined ratings

// Export the data and filter values
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        booksData,
        genres,
        authors,
        publishers,
        years,
        ratings
    };
}
