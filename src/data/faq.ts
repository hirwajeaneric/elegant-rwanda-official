export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General Travel' | 'Gorilla Trekking' | 'Tours & Packages' | 'Transportation' | 'Accommodation';
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is the best time to visit Rwanda?',
    answer: "The best time to visit Rwanda is during the dry seasons: June to September and December to February. These periods offer the best conditions for gorilla trekking, wildlife viewing, and outdoor activities. However, Rwanda's pleasant climate makes it a year-round destination.",
    category: 'General Travel',
    order: 1,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'faq-2',
    question: 'Do I need a visa to visit Rwanda?',
    answer: "Most nationalities require a visa to enter Rwanda. You can apply for an e-visa online through the Rwanda Immigration website or obtain one upon arrival at Kigali International Airport. The process is straightforward and typically takes 1-3 business days for approval.",
    category: 'General Travel',
    order: 2,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10'
  },
  {
    id: 'faq-3',
    question: 'What currency is used in Rwanda?',
    answer: "The official currency of Rwanda is the Rwandan Franc (RWF). US Dollars are also widely accepted in major tourist areas, hotels, and for tour payments. We recommend carrying some local currency for smaller purchases and tips.",
    category: 'General Travel',
    order: 3,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-08'
  },
  {
    id: 'faq-4',
    question: 'Is Rwanda safe for tourists?',
    answer: "Yes, Rwanda is one of the safest countries in Africa for tourists. The country has low crime rates, excellent healthcare, and a strong focus on tourism safety. Our team provides 24/7 support throughout your journey to ensure a secure and enjoyable experience.",
    category: 'General Travel',
    order: 4,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-05'
  },
  {
    id: 'faq-5',
    question: 'How far in advance should I book gorilla trekking?',
    answer: "Gorilla trekking permits are limited and in high demand. We recommend booking at least 6-12 months in advance, especially for peak season (July-August). Last-minute bookings are possible but subject to availability.",
    category: 'Gorilla Trekking',
    order: 1,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'faq-6',
    question: 'What should I pack for gorilla trekking?',
    answer: "Essential items include: sturdy hiking boots, long pants and long-sleeved shirts, rain gear, insect repellent, sunscreen, hat, gloves, and a camera. We provide a detailed packing list upon booking confirmation.",
    category: 'Gorilla Trekking',
    order: 2,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10'
  },
  {
    id: 'faq-7',
    question: 'How physically demanding is gorilla trekking?',
    answer: "Gorilla trekking can be moderately challenging. Treks typically last 2-8 hours depending on gorilla location. Terrain varies from gentle slopes to steep hills. We offer different difficulty levels and can arrange porter services for those who need assistance.",
    category: 'Gorilla Trekking',
    order: 3,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-08'
  },
  {
    id: 'faq-8',
    question: 'What is the minimum age for gorilla trekking?',
    answer: "The minimum age for gorilla trekking in Rwanda is 15 years old. This is strictly enforced by the park authorities. Children under 15 can participate in other activities like cultural visits and nature walks.",
    category: 'Gorilla Trekking',
    order: 4,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-05'
  },
  {
    id: 'faq-9',
    question: 'What is included in your tour packages?',
    answer: "Our tour packages typically include: accommodation, meals as specified, transportation, professional guides, park fees, and activities listed in the itinerary. We provide detailed inclusions and exclusions for each tour package.",
    category: 'Tours & Packages',
    order: 1,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'faq-10',
    question: 'Can I customize a tour package?',
    answer: "Absolutely! We specialize in creating personalized itineraries. You can modify existing packages or request a completely custom tour based on your interests, schedule, and budget. Our travel experts will work with you to design the perfect experience.",
    category: 'Tours & Packages',
    order: 2,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10'
  },
  {
    id: 'faq-11',
    question: 'What is your cancellation policy?',
    answer: "Our cancellation policy varies by tour type and timing. Generally, cancellations made 30+ days before departure receive a full refund, 15-29 days receive 75% refund, and 14 days or less receive 50% refund. We recommend travel insurance for additional protection.",
    category: 'Tours & Packages',
    order: 3,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-08'
  },
  {
    id: 'faq-12',
    question: 'Do you offer group discounts?',
    answer: "Yes, we offer attractive group discounts for bookings of 4 or more people. Group rates vary by tour type and group size. Contact us for a personalized group quote and special group arrangements.",
    category: 'Tours & Packages',
    order: 4,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-05'
  },
  {
    id: 'faq-13',
    question: 'What types of vehicles do you use for tours?',
    answer: "We use modern, well-maintained vehicles including 4x4 Land Cruisers for safari tours, comfortable minibuses for group tours, and Unique sedans for private transfers. All vehicles are equipped with air conditioning and safety features.",
    category: 'Transportation',
    order: 1,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'faq-14',
    question: 'Do you provide airport transfers?',
    answer: "Yes, we provide airport transfers from Kigali International Airport to your hotel or tour starting point. Transfers can be arranged for arrival and departure. We recommend booking transfers in advance to ensure smooth arrival.",
    category: 'Transportation',
    order: 2,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10'
  },
  {
    id: 'faq-15',
    question: 'Can I rent a car and drive myself?',
    answer: "Yes, we offer both self-drive and chauffeur-driven car rental options. Self-drive requires a valid international driving permit and experience with left-hand driving. We recommend chauffeur service for first-time visitors to Rwanda.",
    category: 'Transportation',
    order: 3,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-08'
  },
  {
    id: 'faq-16',
    question: 'What are your cab booking rates?',
    answer: "Our cab rates are competitive and transparent. Rates vary by distance, vehicle type, and service level. We offer fixed rates for airport transfers and hourly rates for city tours. Contact us for specific pricing.",
    category: 'Transportation',
    order: 4,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-05'
  },
  {
    id: 'faq-17',
    question: 'What types of accommodation do you offer?',
    answer: "We offer a range of accommodation options from Unique lodges and boutique hotels to comfortable mid-range hotels. All accommodations are carefully selected for quality, location, and service standards. We can arrange accommodation to match your preferences and budget.",
    category: 'Accommodation',
    order: 1,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'faq-18',
    question: 'Are meals included in accommodation?',
    answer: "Meal inclusion varies by tour package and accommodation type. Most Unique lodges include full board (breakfast, lunch, dinner), while city hotels typically include breakfast. We clearly specify meal inclusions in all tour packages.",
    category: 'Accommodation',
    order: 2,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10'
  },
  {
    id: 'faq-19',
    question: 'Can you accommodate dietary restrictions?',
    answer: "Yes, we can accommodate various dietary restrictions including vegetarian, vegan, gluten-free, and other special dietary needs. Please inform us of any requirements when booking, and we'll ensure your needs are met throughout your stay.",
    category: 'Accommodation',
    order: 3,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-08'
  },
  {
    id: 'faq-20',
    question: 'What is the accommodation quality like?',
    answer: "We partner with the finest accommodations in Rwanda, ensuring high standards of comfort, cleanliness, and service. Our Unique options include 5-star lodges with world-class amenities, while mid-range options offer excellent value and comfort.",
    category: 'Accommodation',
    order: 4,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-05'
  }
];

export const getFAQById = (id: string) => faqs.find(faq => faq.id === id);
export const getFAQsByCategory = (category: FAQ['category']) => faqs.filter(faq => faq.category === category && faq.active);
export const getAllFAQs = () => faqs;
export const getActiveFAQs = () => faqs.filter(faq => faq.active);
