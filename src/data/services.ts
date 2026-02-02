export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  image: string;
  icon: string;
  active: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  
  // Dashboard-specific fields
  status: 'active' | 'inactive' | 'draft';
  views: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export const services: Service[] = [
  {
    id: 'service-1',
    title: 'Unique Tours',
    description: "Custom itineraries for unforgettable adventures across Rwanda's most stunning landscapes.",
    features: ['Gorilla Trekking', 'Cultural Experiences', 'Unique Lodges', 'Expert Guides'],
    href: '/tours',
    image: '/pexels-isaac-mitchell-278678383-16884778.jpg',
    icon: 'Mountain',
    active: true,
    order: 1,
    metaTitle: 'Unique Tours Rwanda - Custom Itineraries | Elegant Travel & Tours',
    metaDescription: 'Experience Rwanda with custom itineraries for unforgettable adventures across stunning landscapes.',
    status: 'active',
    views: 1250,
    clicks: 320,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'service-2',
    title: 'Cab Booking',
    description: 'Premium cab services with professional drivers for seamless transfers across Rwanda.',
    features: ['Professional Drivers', '24/7 Availability', 'Unique Vehicles', 'Fixed Rates'],
    href: '/cab-booking',
    image: '/pexels-kadiravsarr-20170205.jpg',
    icon: 'Car',
    active: true,
    order: 2,
    metaTitle: 'Cab Booking Rwanda - Premium Transfer Services | Elegant Travel & Tours',
    metaDescription: 'Premium cab services with professional drivers for seamless transfers across Rwanda.',
    status: 'active',
    views: 980,
    clicks: 245,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10'
  },
  {
    id: 'service-3',
    title: 'Car Rental',
    description: 'Flexible car rental options from economy to Unique vehicles for your self-drive adventures.',
    features: ['Self-Drive Options', 'Chauffeur Service', '4x4 Vehicles', 'Insurance Included'],
    href: '/car-rental',
    image: '/pexels-mikebirdy-170811.jpg',
    icon: 'Car',
    active: true,
    order: 3,
    metaTitle: 'Car Rental Rwanda - Self-Drive & Chauffeur Services | Elegant Travel & Tours',
    metaDescription: 'Flexible car rental options from economy to Unique vehicles for your self-drive adventures.',
    status: 'active',
    views: 1100,
    clicks: 280,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-08'
  },
  {
    id: 'service-4',
    title: 'Air Travel Assistance',
    description: 'Comprehensive support for visa applications, airport pickups, and hotel bookings.',
    features: ['Visa Assistance', 'Airport Pickup', 'Hotel Booking', 'Travel Support'],
    href: '/air-travel-assistance',
    image: '/pexels-matoga-27982027.jpg',
    icon: 'Plane',
    active: true,
    order: 4,
    metaTitle: 'Air Travel Assistance Rwanda - Visa & Airport Services | Elegant Travel & Tours',
    metaDescription: 'Comprehensive support for visa applications, airport pickups, and hotel bookings.',
    status: 'active',
    views: 750,
    clicks: 180,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-05'
  },
  {
    id: 'service-5',
    title: 'Upcoming Events',
    description: 'Join exclusive group tours and cultural events for a shared adventure experience.',
    features: ['Group Tours', 'Cultural Events', 'Adventure Challenges', 'Unique Retreats'],
    href: '/events',
    image: '/events.jpeg',
    icon: 'Calendar',
    active: true,
    order: 5,
    metaTitle: 'Upcoming Events Rwanda - Group Tours & Cultural Events | Elegant Travel & Tours',
    metaDescription: 'Join exclusive group tours and cultural events for a shared adventure experience.',
    status: 'active',
    views: 890,
    clicks: 195,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-01'
  },
  {
    id: 'service-6',
    title: 'Custom Packages',
    description: 'Tailored travel packages designed around your specific interests and requirements.',
    features: ['Personalized Itineraries', 'Flexible Dates', 'Special Requests', 'VIP Service'],
    href: '/contact',
    image: '/photo-1516426122078-c23e76319801.jpg',
    icon: 'Star',
    active: true,
    order: 6,
    metaTitle: 'Custom Travel Packages Rwanda - Personalized Itineraries | Elegant Travel & Tours',
    metaDescription: 'Tailored travel packages designed around your specific interests and requirements.',
    status: 'active',
    views: 650,
    clicks: 150,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-28'
  }
];

export const getServiceById = (id: string) => services.find(service => service.id === id);
export const getActiveServices = () => services.filter(service => service.active && service.status === 'active');
export const getAllServices = () => services;
export const getServiceByHref = (href: string) => services.find(service => service.href === href);
