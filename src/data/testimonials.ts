export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  service: 'Tour' | 'Cab Booking' | 'Car Rental' | 'Air Travel Assistance' | 'Event';
  image: string;
  date: string;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    review: 'The gorilla trekking experience was absolutely incredible! Elegant Travel and Tours handled everything perfectly - from airport pickup to the final goodbye. Our guide was knowledgeable and the lodge was luxurious. Worth every penny!',
    service: 'Tour',
    image: '/images/testimonials/sarah-johnson.jpg',
    date: '2024-12-15',
    featured: true,
    metaTitle: 'Sarah Johnson - Gorilla Trekking Review | Elegant Travel and Tours',
    metaDescription: 'Read Sarah Johnson\'s 5-star review of her gorilla trekking experience with Elegant Travel and Tours. Perfect service from airport pickup to final goodbye.'
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    location: 'London, UK',
    rating: 5,
    review: 'Outstanding service for our cab booking needs. Professional drivers, clean vehicles, and punctual pickups throughout our stay in Rwanda. Highly recommend for anyone visiting Kigali.',
    service: 'Cab Booking',
    image: '/images/testimonials/michael-chen.jpg',
    date: '2024-12-10',
    featured: true,
    metaTitle: 'Michael Chen - Cab Booking Review | Elegant Travel and Tours',
    metaDescription: 'Read Michael Chen\'s 5-star review of Elegant Travel and Tours\'s cab booking service. Professional drivers and punctual pickups throughout Rwanda.'
  },
  {
    id: 'testimonial-3',
    name: 'Emma Rodriguez',
    location: 'Toronto, Canada',
    rating: 5,
    review: 'The Lake Kivu retreat exceeded all expectations. The team at Elegant Travel and Tours created a perfect blend of Unique and adventure. The spa treatments and water activities were world-class.',
    service: 'Tour',
    image: '/images/testimonials/emma-rodriguez.jpg',
    date: '2024-12-08',
    featured: true,
    metaTitle: 'Emma Rodriguez - Lake Kivu Retreat Review | Elegant Travel and Tours',
    metaDescription: 'Read Emma Rodriguez\'s 5-star review of the Lake Kivu retreat. Perfect blend of Unique and adventure with world-class spa treatments.'
  },
  {
    id: 'testimonial-4',
    name: 'David Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    review: 'Car rental service was seamless. They provided a perfect 4x4 for our safari adventure. The vehicle was in excellent condition and the support team was always available when needed.',
    service: 'Car Rental',
    image: '/images/testimonials/david-thompson.jpg',
    date: '2024-12-05',
    featured: true,
    metaTitle: 'David Thompson - Car Rental Review | Elegant Travel and Tours',
    metaDescription: 'Read David Thompson\'s 5-star review of Elegant Travel and Tours\'s car rental service. Perfect 4x4 for safari adventures with excellent support.'
  },
  {
    id: 'testimonial-5',
    name: 'Lisa Wang',
    location: 'Singapore',
    rating: 5,
    review: 'Air travel assistance was invaluable. They handled our visa applications and airport transfers perfectly. Made our arrival in Rwanda stress-free and enjoyable.',
    service: 'Air Travel Assistance',
    image: '/images/testimonials/lisa-wang.jpg',
    date: '2024-12-01',
    featured: false,
    metaTitle: 'Lisa Wang - Air Travel Assistance Review | Elegant Travel and Tours',
    metaDescription: 'Read Lisa Wang\'s 5-star review of Elegant Travel and Tours\'s air travel assistance. Perfect visa handling and stress-free airport transfers.'
  },
  {
    id: 'testimonial-6',
    name: 'James Wilson',
    location: 'Dublin, Ireland',
    rating: 5,
    review: 'Attended the cultural festival and it was an amazing experience. Elegant Travel and Tours organized everything flawlessly. The traditional performances and workshops were authentic and engaging.',
    service: 'Event',
    image: '/images/testimonials/james-wilson.jpg',
    date: '2024-11-28',
    featured: false,
    metaTitle: 'James Wilson - Cultural Festival Review | Elegant Travel and Tours',
    metaDescription: 'Read James Wilson\'s 5-star review of the cultural festival organized by Elegant Travel and Tours. Authentic performances and engaging workshops.'
  },
  {
    id: 'testimonial-7',
    name: 'Maria Garcia',
    location: 'Madrid, Spain',
    rating: 5,
    review: 'Our family tour was perfectly tailored to our needs. The kids loved the cultural activities and we appreciated the Unique accommodations. Professional service from start to finish.',
    service: 'Tour',
    image: '/images/testimonials/maria-garcia.jpg',
    date: '2024-11-25',
    featured: false,
    metaTitle: 'Maria Garcia - Family Tour Review | Elegant Travel and Tours',
    metaDescription: 'Read Maria Garcia\'s 5-star review of their family tour with Elegant Travel and Tours. Perfectly tailored experiences for all ages.'
  },
  {
    id: 'testimonial-8',
    name: 'Robert Kim',
    location: 'Seoul, South Korea',
    rating: 5,
    review: 'Exceptional cab service during our business trip. The drivers were professional and the vehicles were always clean and comfortable. Perfect for corporate travel needs.',
    service: 'Cab Booking',
    image: '/images/testimonials/robert-kim.jpg',
    date: '2024-11-20',
    featured: false,
    metaTitle: 'Robert Kim - Business Travel Review | Elegant Travel and Tours',
    metaDescription: 'Read Robert Kim\'s 5-star review of Elegant Travel and Tours\'s cab service for business travel. Professional drivers and clean vehicles.'
  }
];

export const getFeaturedTestimonials = () => testimonials.filter(testimonial => testimonial.featured);
export const getTestimonialsByService = (service: Testimonial['service']) => testimonials.filter(testimonial => testimonial.service === service);
export const getTestimonialById = (id: string) => testimonials.find(testimonial => testimonial.id === id);
