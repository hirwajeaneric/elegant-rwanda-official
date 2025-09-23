export interface Event {
  id: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  category: 'Group Tour' | 'Cultural Event' | 'Adventure' | 'Unique Experience';
  highlights: string[];
  activities: string[];
  images: string[];
  featured: boolean;
  registrationDeadline: string;
  status: 'Open' | 'Filling Fast' | 'Waitlist' | 'Closed';
  
  // Dashboard-specific fields
  time: string;
  price: number;
  active: boolean;
}

export const events: Event[] = [
  // UPCOMING EVENTS
  {
    id: 'group-gorilla-trek-2025',
    slug: 'group-gorilla-trek-2025',
    metaTitle: 'Group Gorilla Trek Adventure 2025 - Rwanda Wildlife Tours | Elegant Travel and Tours',
    metaDescription: 'Join like-minded adventurers for an exclusive group gorilla trekking experience in Rwanda. Limited to 8 participants for an intimate adventure.',
    title: 'Group Gorilla Trek Adventure',
    description: 'Join like-minded adventurers for an exclusive group gorilla trekking experience. Limited to 8 participants for an intimate and personalized adventure.',
    date: '2025-10-15',
    endDate: '2025-10-18',
    location: 'Volcanoes National Park',
    maxParticipants: 8,
    currentParticipants: 6,
    category: 'Group Tour',
    highlights: [
      'Exclusive group experience',
      'Professional photography guide',
      'Unique lodge accommodation',
      'Cultural village visit',
      'Group bonding activities'
    ],
    activities: [
      'Gorilla trekking',
      'Photography workshops',
      'Cultural experiences',
      'Group dinners',
      'Nature walks'
    ],
    images: [
      '/volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg',
      '/Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg',
    ],
    featured: true,
    registrationDeadline: '2025-01-15',
    status: 'Filling Fast',
    
    // Dashboard-specific fields
    time: '08:00 AM',
    price: 1500,
    active: true
  },
  {
    id: 'rwanda-culture-festival',
    slug: 'rwanda-culture-festival',
    metaTitle: 'Rwanda Cultural Festival 2025 - Traditional Arts & Culture | Elegant Travel and Tours',
    metaDescription: 'Celebrate Rwanda\'s rich cultural heritage with traditional performances, craft workshops, and authentic cuisine experiences in March 2025.',
    title: 'Rwanda Cultural Festival',
    description: 'Celebrate Rwanda\'s rich cultural heritage with traditional performances, craft workshops, and authentic cuisine experiences.',
    date: '2025-09-20',
    endDate: '2025-09-22',
    location: 'Kigali & Surrounding Areas',
    maxParticipants: 25,
    currentParticipants: 18,
    category: 'Cultural Event',
    highlights: [
      'Traditional dance performances',
      'Craft workshops',
      'Local cuisine tasting',
      'Historical site visits',
      'Cultural exchange opportunities'
    ],
    activities: [
      'Dance performances',
      'Craft workshops',
      'Food tours',
      'Historical tours',
      'Cultural discussions'
    ],
    images: [
      '/Nyanza-Traditional-Intore-Dancers-1650x1100.jpg',
      '/Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg',
    ],
    featured: false,
    registrationDeadline: '2025-02-20',
    status: 'Open'
  },
  {
    id: 'lake-kivu-Unique-retreat',
    slug: 'lake-kivu-Unique-retreat',
    metaTitle: 'Lake Kivu Unique Group Retreat 2025 - Premium Rwanda Tours | Elegant Travel and Tours',
    metaDescription: 'Experience the ultimate Unique retreat with a select group of travelers. Enjoy exclusive access to premium amenities and personalized services at Lake Kivu.',
    title: 'Lake Kivu Unique Group Retreat',
    description: 'Experience the ultimate Unique retreat with a select group of travelers. Enjoy exclusive access to premium amenities and personalized services.',
    date: '2025-10-10',
    endDate: '2025-10-14',
    location: 'Lake Kivu',
    maxParticipants: 12,
    currentParticipants: 8,
    category: 'Unique Experience',
    highlights: [
      'Exclusive resort access',
      'Private beach areas',
      'Personalized spa treatments',
      'Gourmet dining experiences',
      'Water sports activities'
    ],
    activities: [
      'Unique spa treatments',
      'Water sports',
      'Sunset cruises',
      'Gourmet cooking classes',
      'Wellness sessions'
    ],
    images: [
      '/lake-kivu_Photo-from-Getty-Images.jpg',
      '/Lake-Kivu-Kayak-Phto-from-Arcadiasafaris-1024x552.jpg',
      '/lake-kivu_Photo-from-Getty-Images.jpg',
      '/Lake-Kivu-Kayak-Phto-from-Arcadiasafaris-1024x552.jpg',
      '/lake-kivu_Photo-from-Getty-Images.jpg',
      '/Lake-Kivu-Kayak-Phto-from-Arcadiasafaris-1024x552.jpg'
    ],
    featured: false,
    registrationDeadline: '2025-03-10',
    status: 'Open'
  },
  {
    id: 'adventure-challenge-2025',
    slug: 'adventure-challenge-2025',
    metaTitle: 'Rwanda Adventure Challenge 2025 - Multi-Activity Tours | Elegant Travel and Tours',
    metaDescription: 'Push your limits with this multi-day adventure challenge featuring hiking, cycling, and water activities across Rwanda\'s diverse landscapes.',
    title: 'Rwanda Adventure Challenge',
    description: 'Push your limits with this multi-day adventure challenge featuring hiking, cycling, and water activities across Rwanda\'s diverse landscapes.',
    date: '2025-09-20',
    endDate: '2025-09-22',
    location: 'Multiple Locations',
    maxParticipants: 20,
    currentParticipants: 15,
    category: 'Adventure',
    highlights: [
      'Multi-activity challenge',
      'Professional guides',
      'Equipment provided',
      'Accommodation included',
      'Achievement certificates'
    ],
    activities: [
      'Mountain hiking',
      'Cycling tours',
      'Water activities',
      'Team challenges',
      'Adventure races'
    ],
    images: [
      '/Landscape-of-the-Virunga-Mountains-in-Rwanda.jpg',
      '/Visit-Rwanda-Crater-Lake-Volcanoes-e1533416621808-1920x1267.jpg'
    ],
    featured: false,
    registrationDeadline: '2025-04-05',
    status: 'Filling Fast'
  },
  {
    id: 'coffee-tea-experience-2025',
    slug: 'coffee-tea-experience-2025',
    metaTitle: 'Coffee & Tea Experience 2025 - Rwanda Plantation Tours | Elegant Travel and Tours',
    metaDescription: 'Discover Rwanda\'s world-renowned tea and coffee production. Tour plantations, learn processing methods, and enjoy tastings.',
    title: 'Coffee & Tea Experience',
    description: 'Discover Rwanda\'s world-renowned tea and coffee production. Tour plantations, learn processing methods, and enjoy tastings.',
    date: '2025-06-15',
    endDate: '2025-06-16',
    location: 'Tea & Coffee Estates',
    maxParticipants: 12,
    currentParticipants: 8,
    category: 'Cultural Event',
    highlights: [
      'Plantation tours',
      'Processing demonstrations',
      'Tasting sessions',
      'Local market visits',
      'Expert guidance'
    ],
    activities: [
      'Coffee plantation tour',
      'Tea processing demo',
      'Tasting sessions',
      'Local market visit',
      'Cultural exchange'
    ],
    images: [
      '/rwandan-coffee_Image-from-getty-images.avif',
      '/Foods-to-Try-in-Rwanda.jpg'
    ],
    featured: false,
    registrationDeadline: '2025-05-15',
    status: 'Closed'
  },
  {
    id: 'bird-watching-expedition-2025',
    slug: 'bird-watching-expedition-2025',
    metaTitle: 'Bird Watching Expedition 2025 - Nyungwe Forest Rwanda | Elegant Travel and Tours',
    metaDescription: 'Explore Rwanda\'s diverse bird species in the pristine Nyungwe Forest. Perfect for bird enthusiasts and nature photographers.',
    title: 'Bird Watching Expedition',
    description: 'Explore Rwanda\'s diverse bird species in the pristine Nyungwe Forest. Perfect for bird enthusiasts and nature photographers.',
    date: '2025-07-10',
    endDate: '2025-07-12',
    location: 'Nyungwe Forest',
    maxParticipants: 10,
    currentParticipants: 6,
    category: 'Adventure',
    highlights: [
      'Diverse bird species',
      'Forest trail exploration',
      'Expert ornithologist guide',
      'Lodge accommodation',
      'Photography opportunities'
    ],
    activities: [
      'Bird watching',
      'Forest hiking',
      'Photography workshops',
      'Nature walks',
      'Wildlife spotting'
    ],
    images: [
      '/Sun-bird-rwanda-750x450.jpg',
      '/nyungwe_national_park.jpg'
    ],
    featured: false,
    registrationDeadline: '2025-06-10',
    status: 'Closed'
  },

  // PAST EVENTS
  {
    id: 'past-gorilla-trek-2024',
    slug: 'past-gorilla-trek-2024',
    metaTitle: 'Past Gorilla Trek Adventure 2024 - Rwanda Wildlife Tours | Elegant Travel and Tours',
    metaDescription: 'A completed group gorilla trekking experience in Rwanda that took place in 2024.',
    title: 'Gorilla Trek Adventure 2024',
    description: 'A completed group gorilla trekking experience that took place in 2024. Participants enjoyed an intimate and personalized adventure.',
    date: '2024-08-15',
    endDate: '2024-08-18',
    location: 'Volcanoes National Park',
    maxParticipants: 8,
    currentParticipants: 8,
    category: 'Group Tour',
    highlights: [
      'Exclusive group experience',
      'Professional photography guide',
      'Unique lodge accommodation',
      'Cultural village visit',
      'Group bonding activities'
    ],
    activities: [
      'Gorilla trekking',
      'Photography workshops',
      'Cultural experiences',
      'Group dinners',
      'Nature walks'
    ],
    images: [
      '/volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg',
      '/Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg',
    ],
    featured: false,
    registrationDeadline: '2024-07-15',
    status: 'Closed'
  },
  {
    id: 'past-culture-festival-2024',
    slug: 'past-culture-festival-2024',
    metaTitle: 'Past Rwanda Cultural Festival 2024 - Traditional Arts & Culture | Elegant Travel and Tours',
    metaDescription: 'A completed cultural festival that celebrated Rwanda\'s rich cultural heritage in 2024.',
    title: 'Rwanda Cultural Festival 2024',
    description: 'A completed celebration of Rwanda\'s rich cultural heritage with traditional performances, craft workshops, and authentic cuisine experiences.',
    date: '2024-06-20',
    endDate: '2024-06-22',
    location: 'Kigali & Surrounding Areas',
    maxParticipants: 25,
    currentParticipants: 25,
    category: 'Cultural Event',
    highlights: [
      'Traditional dance performances',
      'Craft workshops',
      'Local cuisine tasting',
      'Historical site visits',
      'Cultural exchange opportunities'
    ],
    activities: [
      'Dance performances',
      'Craft workshops',
      'Food tours',
      'Historical tours',
      'Cultural discussions'
    ],
    images: [
      '/Nyanza-Traditional-Intore-Dancers-1650x1100.jpg',
      '/Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg',
    ],
    featured: false,
    registrationDeadline: '2024-05-20',
    status: 'Closed'
  },
  {
    id: 'past-lake-kivu-retreat-2024',
    slug: 'past-lake-kivu-retreat-2024',
    metaTitle: 'Past Lake Kivu Retreat 2024 - Unique Rwanda Tours | Elegant Travel and Tours',
    metaDescription: 'A completed Unique retreat experience at Lake Kivu that took place in 2024.',
    title: 'Lake Kivu Unique Retreat 2024',
    description: 'A completed Unique retreat experience at Lake Kivu. Participants enjoyed exclusive access to premium amenities and personalized services.',
    date: '2024-09-10',
    endDate: '2024-09-14',
    location: 'Lake Kivu',
    maxParticipants: 12,
    currentParticipants: 12,
    category: 'Unique Experience',
    highlights: [
      'Exclusive resort access',
      'Private beach areas',
      'Personalized spa treatments',
      'Gourmet dining experiences',
      'Water sports activities'
    ],
    activities: [
      'Unique spa treatments',
      'Water sports',
      'Sunset cruises',
      'Gourmet cooking classes',
      'Wellness sessions'
    ],
    images: [
      '/lake-kivu_Photo-from-Getty-Images.jpg',
      '/Lake-Kivu-Kayak-Phto-from-Arcadiasafaris-1024x552.jpg'
    ],
    featured: false,
    registrationDeadline: '2024-08-10',
    status: 'Closed'
  },
  {
    id: 'past-adventure-challenge-2024',
    slug: 'past-adventure-challenge-2024',
    metaTitle: 'Past Adventure Challenge 2024 - Multi-Activity Rwanda Tours | Elegant Travel and Tours',
    metaDescription: 'A completed multi-day adventure challenge that took place in Rwanda in 2024.',
    title: 'Rwanda Adventure Challenge 2024',
    description: 'A completed multi-day adventure challenge featuring hiking, cycling, and water activities across Rwanda\'s diverse landscapes.',
    date: '2024-10-05',
    endDate: '2024-10-08',
    location: 'Multiple Locations',
    maxParticipants: 20,
    currentParticipants: 20,
    category: 'Adventure',
    highlights: [
      'Multi-activity challenge',
      'Professional guides',
      'Equipment provided',
      'Accommodation included',
      'Achievement certificates'
    ],
    activities: [
      'Mountain hiking',
      'Cycling tours',
      'Water activities',
      'Team challenges',
      'Adventure races'
    ],
    images: [
      '/Landscape-of-the-Virunga-Mountains-in-Rwanda.jpg',
      '/Visit-Rwanda-Crater-Lake-Volcanoes-e1533416621808-1920x1267.jpg'
    ],
    featured: false,
    registrationDeadline: '2024-09-05',
    status: 'Closed'
  }
];

export const getFeaturedEvents = () => events.filter(event => event.featured);
export const getEventById = (id: string) => events.find(event => event.id === id);
export const getEventBySlug = (slug: string) => events.find(event => event.slug === slug);
export const getEventsByCategory = (category: Event['category']) => events.filter(event => event.category === category);
export const getUpcomingEvents = () => events.filter(event => new Date(event.date) > new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
export const getPastEvents = () => events.filter(event => new Date(event.date) <= new Date()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const getAllEvents = () => events;
