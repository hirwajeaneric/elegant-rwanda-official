export interface Tour {
    id: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    title: string;
    description: string;
    duration: string;
    price: string;
    difficulty: 'Easy' | 'Moderate' | 'Challenging';
    maxGroupSize: number;
    highlights: string[];
    itinerary: Day[];
    inclusions: string[];
    exclusions: string[];
    images: string[];
    category: 'Wildlife' | 'Cultural' | 'Adventure' | 'Luxury' | 'Nature';
    featured: boolean;
    availableDates: string[];
}

export interface Day {
    day: number;
    title: string;
    description: string;
    activities: string[];
    accommodation?: string;
    meals: string[];
}

export const tours: Tour[] = [
    {
        id: 'gorilla-trekking-adventure',
        slug: 'gorilla-trekking-adventure',
        metaTitle: 'Gorilla Trekking Adventure - Luxury Rwanda Tours | Elegant Rwanda',
        metaDescription: 'Experience the magic of encountering mountain gorillas in their natural habitat. Book your luxury gorilla trekking adventure in Rwanda with Elegant Rwanda.',
        title: 'Gorilla Trekking Adventure',
        description: 'Experience the magic of encountering mountain gorillas in their natural habitat. This exclusive tour takes you deep into the misty forests of Volcanoes National Park for an unforgettable wildlife encounter.',
        duration: '3 Days / 2 Nights',
        price: 'From $1,500',
        difficulty: 'Moderate',
        maxGroupSize: 8,
        highlights: [
            'Gorilla trekking permit included',
            'Expert local guides',
            'Luxury lodge accommodation',
            'Cultural village visit',
            'Scenic mountain views'
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Welcome',
                description: 'Arrive in Kigali and transfer to Volcanoes National Park area',
                activities: ['Airport pickup', 'Scenic drive to Musanze', 'Lodge check-in', 'Welcome dinner'],
                accommodation: 'Luxury Lodge',
                meals: ['Dinner']
            },
            {
                day: 2,
                title: 'Gorilla Trekking',
                description: 'Early morning trek to find and observe mountain gorillas',
                activities: ['Gorilla trekking', 'Photography', 'Lodge relaxation', 'Optional cultural visit'],
                accommodation: 'Luxury Lodge',
                meals: ['Breakfast', 'Lunch', 'Dinner']
            },
            {
                day: 3,
                title: 'Departure',
                description: 'Morning at leisure before return to Kigali',
                activities: ['Optional activities', 'Return to Kigali', 'Airport drop-off'],
                meals: ['Breakfast']
            }
        ],
        inclusions: [
            'Gorilla trekking permit',
            'All accommodation',
            'Meals as specified',
            'Professional guide',
            'Transportation',
            'Park fees'
        ],
        exclusions: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Tips for guides'
        ],
        images: [
            '/images/tours/gorilla-1.jpg',
            '/images/tours/gorilla-2.jpg',
            '/images/tours/gorilla-3.jpg'
        ],
        category: 'Wildlife',
        featured: true,
        availableDates: ['2025-01-15', '2025-02-20', '2025-03-25']
    },
    {
        id: 'lake-kivu-retreat',
        slug: 'lake-kivu-retreat',
        metaTitle: 'Lake Kivu Luxury Retreat - Premium Rwanda Tours | Elegant Rwanda',
        metaDescription: 'Unwind in the serene beauty of Lake Kivu with our exclusive lakeside retreat. Experience luxury accommodation and water activities in Rwanda.',
        title: 'Lake Kivu Luxury Retreat',
        description: 'Unwind in the serene beauty of Lake Kivu with this exclusive lakeside retreat. Enjoy water activities, spa treatments, and breathtaking sunset views.',
        duration: '4 Days / 3 Nights',
        price: 'From $1,200',
        difficulty: 'Easy',
        maxGroupSize: 12,
        highlights: [
            'Lakeside luxury resort',
            'Water activities',
            'Spa treatments',
            'Sunset boat cruises',
            'Gourmet dining'
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Relaxation',
                description: 'Arrive at Lake Kivu and settle into your luxury accommodation',
                activities: ['Resort check-in', 'Welcome drink', 'Lakeside dinner', 'Spa session'],
                accommodation: 'Luxury Lakeside Resort',
                meals: ['Dinner']
            },
            {
                day: 2,
                title: 'Water Activities',
                description: 'Full day of water activities and relaxation',
                activities: ['Swimming', 'Kayaking', 'Fishing', 'Beach relaxation', 'Sunset cruise'],
                accommodation: 'Luxury Lakeside Resort',
                meals: ['Breakfast', 'Lunch', 'Dinner']
            },
            {
                day: 3,
                title: 'Cultural Experience',
                description: 'Explore local culture and enjoy resort amenities',
                activities: ['Village visit', 'Cooking class', 'Spa treatments', 'Evening entertainment'],
                accommodation: 'Luxury Lakeside Resort',
                meals: ['Breakfast', 'Lunch', 'Dinner']
            },
            {
                day: 4,
                title: 'Departure',
                description: 'Morning at leisure before departure',
                activities: ['Final relaxation', 'Check-out', 'Return to Kigali'],
                meals: ['Breakfast']
            }
        ],
        inclusions: [
            'Luxury resort accommodation',
            'All meals',
            'Water activities',
            'Spa treatments',
            'Transportation',
            'Cultural activities'
        ],
        exclusions: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Optional activities'
        ],
        images: [
            '/images/tours/lake-kivu-1.jpg',
            '/images/tours/lake-kivu-2.jpg',
            '/images/tours/lake-kivu-3.jpg'
        ],
        category: 'Luxury',
        featured: true,
        availableDates: ['2025-01-20', '2025-02-25', '2025-03-30']
    },
    {
        id: 'cultural-heritage-tour',
        slug: 'cultural-heritage-tour',
        metaTitle: 'Cultural Heritage Tour - Rwanda Cultural Experiences | Elegant Rwanda',
        metaDescription: 'Immerse yourself in Rwanda\'s rich cultural heritage with visits to historical sites, traditional villages, and cultural performances.',
        title: 'Cultural Heritage Tour',
        description: 'Immerse yourself in Rwanda\'s rich cultural heritage with visits to historical sites, traditional villages, and cultural performances.',
        duration: '5 Days / 4 Nights',
        price: 'From $1,800',
        difficulty: 'Easy',
        maxGroupSize: 10,
        highlights: [
            'Kigali Genocide Memorial',
            'Traditional dance performances',
            'Craft workshops',
            'Historical site visits',
            'Local cuisine tasting'
        ],
        itinerary: [
            {
                day: 1,
                title: 'Kigali Introduction',
                description: 'Explore the capital city and its history',
                activities: ['City tour', 'Kigali Genocide Memorial', 'Local market visit', 'Traditional dinner'],
                accommodation: 'Boutique Hotel',
                meals: ['Dinner']
            },
            {
                day: 2,
                title: 'Cultural Villages',
                description: 'Visit traditional villages and learn local customs',
                activities: ['Village tours', 'Craft demonstrations', 'Traditional dance', 'Local lunch'],
                accommodation: 'Cultural Lodge',
                meals: ['Breakfast', 'Lunch', 'Dinner']
            },
            {
                day: 3,
                title: 'Historical Sites',
                description: 'Explore Rwanda\'s historical landmarks',
                activities: ['Palace visits', 'Museum tours', 'Historical walks', 'Cultural dinner'],
                accommodation: 'Cultural Lodge',
                meals: ['Breakfast', 'Lunch', 'Dinner']
            },
            {
                day: 4,
                title: 'Art & Craft',
                description: 'Participate in traditional arts and crafts',
                activities: ['Pottery workshop', 'Basket weaving', 'Art gallery visit', 'Farewell celebration'],
                accommodation: 'Cultural Lodge',
                meals: ['Breakfast', 'Lunch', 'Dinner']
            },
            {
                day: 5,
                title: 'Departure',
                description: 'Return to Kigali with cultural memories',
                activities: ['Final cultural activities', 'Return to Kigali', 'Airport drop-off'],
                meals: ['Breakfast']
            }
        ],
        inclusions: [
            'All accommodation',
            'Cultural activities',
            'Workshop materials',
            'Professional guide',
            'Transportation',
            'Entrance fees'
        ],
        exclusions: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Optional activities'
        ],
        images: [
            '/images/tours/cultural-1.jpg',
            '/images/tours/cultural-2.jpg',
            '/images/tours/cultural-3.jpg'
        ],
        category: 'Cultural',
        featured: false,
        availableDates: ['2025-01-25', '2025-02-28', '2025-04-05']
    }
];

export const getFeaturedTours = () => tours.filter(tour => tour.featured);
export const getTourById = (id: string) => tours.find(tour => tour.id === id);
export const getTourBySlug = (slug: string) => tours.find(tour => tour.slug === slug);
export const getToursByCategory = (category: Tour['category']) => tours.filter(tour => tour.category === category);
