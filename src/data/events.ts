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
  category: 'Group Tour' | 'Cultural Event' | 'Adventure' | 'Luxury Experience';
  highlights: string[];
  activities: string[];
  images: string[];
  featured: boolean;
  registrationDeadline: string;
  status: 'Open' | 'Filling Fast' | 'Waitlist' | 'Closed';
}

export const events: Event[] = [
  {
    id: 'group-gorilla-trek-2025',
    slug: 'group-gorilla-trek-2025',
    metaTitle: 'Group Gorilla Trek Adventure 2025 - Rwanda Wildlife Tours | Elegant Rwanda',
    metaDescription: 'Join like-minded adventurers for an exclusive group gorilla trekking experience in Rwanda. Limited to 8 participants for an intimate adventure.',
    title: 'Group Gorilla Trek Adventure',
    description: 'Join like-minded adventurers for an exclusive group gorilla trekking experience. Limited to 8 participants for an intimate and personalized adventure.',
    date: '2025-02-15',
    endDate: '2025-02-18',
    location: 'Volcanoes National Park',
    maxParticipants: 8,
    currentParticipants: 6,

    category: 'Group Tour',
    highlights: [
      'Exclusive group experience',
      'Professional photography guide',
      'Luxury lodge accommodation',
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
      '/Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg',
      '/Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg',
    ],
    featured: true,
    registrationDeadline: '2025-01-15',
    status: 'Filling Fast'
  },
  {
    id: 'rwanda-culture-festival',
    slug: 'rwanda-culture-festival',
    metaTitle: 'Rwanda Cultural Festival 2025 - Traditional Arts & Culture | Elegant Rwanda',
    metaDescription: 'Celebrate Rwanda\'s rich cultural heritage with traditional performances, craft workshops, and authentic cuisine experiences in March 2025.',
    title: 'Rwanda Cultural Festival',
    description: 'Celebrate Rwanda\'s rich cultural heritage with traditional performances, craft workshops, and authentic cuisine experiences.',
    date: '2025-03-20',
    endDate: '2025-03-22',
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
      '/Nyanza-Traditional-Intore-Dancers-1650x1100.jpg',
    ],
    featured: true,
    registrationDeadline: '2025-02-20',
    status: 'Open'
  },
  {
    id: 'lake-kivu-luxury-retreat',
    slug: 'lake-kivu-luxury-retreat',
    metaTitle: 'Lake Kivu Luxury Group Retreat 2025 - Premium Rwanda Tours | Elegant Rwanda',
    metaDescription: 'Experience the ultimate luxury retreat with a select group of travelers. Enjoy exclusive access to premium amenities and personalized services at Lake Kivu.',
    title: 'Lake Kivu Luxury Group Retreat',
    description: 'Experience the ultimate luxury retreat with a select group of travelers. Enjoy exclusive access to premium amenities and personalized services.',
    date: '2025-04-10',
    endDate: '2025-04-14',
    location: 'Lake Kivu',
    maxParticipants: 12,
    currentParticipants: 8,

    category: 'Luxury Experience',
    highlights: [
      'Exclusive resort access',
      'Private beach areas',
      'Personalized spa treatments',
      'Gourmet dining experiences',
      'Water sports activities'
    ],
    activities: [
      'Luxury spa treatments',
      'Water sports',
      'Sunset cruises',
      'Gourmet cooking classes',
      'Wellness sessions'
    ],
    images: [
      '/images/events/luxury-retreat-1.jpg',
      '/images/events/luxury-retreat-2.jpg'
    ],
    featured: true,
    registrationDeadline: '2025-03-10',
    status: 'Open'
  },
  {
    id: 'adventure-challenge-2025',
    slug: 'adventure-challenge-2025',
    metaTitle: 'Rwanda Adventure Challenge 2025 - Multi-Activity Tours | Elegant Rwanda',
    metaDescription: 'Push your limits with this multi-day adventure challenge featuring hiking, cycling, and water activities across Rwanda\'s diverse landscapes.',
    title: 'Rwanda Adventure Challenge',
    description: 'Push your limits with this multi-day adventure challenge featuring hiking, cycling, and water activities across Rwanda\'s diverse landscapes.',
    date: '2025-05-05',
    endDate: '2025-05-08',
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
      '/images/events/adventure-challenge-1.jpg',
      '/images/events/adventure-challenge-2.jpg'
    ],
    featured: false,
    registrationDeadline: '2025-04-05',
    status: 'Filling Fast'
  }
];

export const getFeaturedEvents = () => events.filter(event => event.featured);
export const getEventById = (id: string) => events.find(event => event.id === id);
export const getEventBySlug = (slug: string) => events.find(event => event.slug === slug);
export const getEventsByCategory = (category: Event['category']) => events.filter(event => event.category === category);
export const getUpcomingEvents = () => events.filter(event => new Date(event.date) > new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
