export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: 'Wildlife' | 'Landscapes' | 'Culture' | 'Accommodation' | 'Food & Cuisine' | 'City & Architecture' | 'Events' | 'Transportation';
  alt?: string;
  description?: string;
  
  // Dashboard-specific fields
  size?: number;
  width?: number;
  height?: number;
  uploadedAt: string;
  uploadedBy?: string;
  tags?: string[];
  featured: boolean;
  active: boolean;
}

export const galleryImages: GalleryImage[] = [
  // Wildlife
  { id: 'img-1', src: 'Lake-Kivu-Kayak-Phto-from-Arcadiasafaris-1024x552.jpg', title: 'Lake Kivu Kayaking', category: 'Wildlife', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-2', src: 'giraffe-at-akagera-national-park_Photo-from-Getty-Images.jpg', title: 'Giraffe at Akagera', category: 'Wildlife', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-3', src: 'COPYRIGHT_HoneyTrek_20230901-6_Kwita.jpg', title: 'Wildlife Encounter', category: 'Wildlife', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-4', src: 'Sun-bird-rwanda-750x450.jpg', title: 'Sun Bird', category: 'Wildlife', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-5', src: 'volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg', title: 'Mountain Gorilla', category: 'Wildlife', uploadedAt: '2024-01-15', featured: true, active: true },
  
  // Landscapes
  { id: 'img-6', src: 'nyungwe_national_park.jpg', title: 'Nyungwe National Park', category: 'Landscapes', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-7', src: 'nyungwe-forests.jpg', title: 'Nyungwe Forests', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-8', src: 'Landscape-of-the-Virunga-Mountains-in-Rwanda.jpg', title: 'Virunga Mountains', category: 'Landscapes', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-9', src: 'landscape-on-edge-of-lake-kivu-rwanda-east-africa.jpg', title: 'Lake Kivu Landscape', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-10', src: 'Visit-Rwanda-Crater-Lake-Volcanoes-e1533416621808-1920x1267.jpg', title: 'Crater Lake', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-11', src: 'green-hills-of-rwanda.jpg', title: 'Green Hills of Rwanda', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-12', src: 'lake-kivu_Photo-from-Getty-Images.jpg', title: 'Lake Kivu View', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-13', src: 'photo-1551632811-561732d1e306.avif', title: 'Rwanda Countryside', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-14', src: 'photo-1517457373958-b7bdd4587205.jpg', title: 'Mountain Vista', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-15', src: 'photo-1566073771259-6a8506099945.jpg', title: 'Scenic Valley', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-16', src: 'photo-1516426122078-c23e76319801.jpg', title: 'Rolling Hills', category: 'Landscapes', uploadedAt: '2024-01-15', featured: false, active: true },
  
  // Culture
  { id: 'img-17', src: 'Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg', title: 'Traditional Ceremony', category: 'Culture', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-18', src: 'Nyanza-Traditional-Intore-Dancers-1650x1100.jpg', title: 'Traditional Dancers', category: 'Culture', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-19', src: 'IbyIwacu-Cultural-Village.jpg', title: 'Cultural Village', category: 'Culture', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-20', src: 'butare-museum-750x450.jpg', title: 'Butare Museum', category: 'Culture', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-21', src: 'Kandt-House-Museum-of-Natural-History-Photo-from-Arcadiasafaris1024x683.jpg', title: 'Kandt House Museum', category: 'Culture', uploadedAt: '2024-01-15', featured: false, active: true },
  
  // Accommodation
  { id: 'img-22', src: 'Bisate-Lodge-Image-from-Arcadiasafaris-1024x499.jpg', title: 'Bisate Lodge', category: 'Accommodation', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-23', src: 'kigali-serena-hotel.jpg', title: 'Kigali Serena Hotel', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-24', src: 'hotel-exterior.jpg', title: 'Unique Hotel', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-25', src: 'hotel-exterior-daytime.jpg', title: 'Hotel Exterior', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-26', src: 'm-hotel-kigali-is-located.jpg', title: 'M Hotel Kigali', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-27', src: 'park-inn-by-radisson.jpg', title: 'Park Inn by Radisson', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-28', src: 'onomo-pool-deck.jpg', title: 'Onomo Pool Deck', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-29', src: 'grand-legacy-hotel.jpg', title: 'Grand Legacy Hotel', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-30', src: 'heaven-restaurant-boutique.jpg', title: 'Heaven Restaurant', category: 'Accommodation', uploadedAt: '2024-01-15', featured: false, active: true },
  
  // Food & Cuisine
  { id: 'img-31', src: 'Foods-to-Try-in-Rwanda.jpg', title: 'Traditional Foods', category: 'Food & Cuisine', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-32', src: 'Local-cuisine.jpg', title: 'Local Cuisine', category: 'Food & Cuisine', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-33', src: 'rwandan-coffee_Image-from-getty-images.avif', title: 'Rwandan Coffee', category: 'Food & Cuisine', uploadedAt: '2024-01-15', featured: false, active: true },
  
  // City & Architecture
  { id: 'img-34', src: 'kigali.jpeg', title: 'Kigali City', category: 'City & Architecture', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-35', src: 'Kigali-Convention-Center-Credits-to-Arcadiasafaris.jpg', title: 'Convention Center', category: 'City & Architecture', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-36', src: 'image_750x_64fcd300a2a6e.jpg', title: 'City Architecture', category: 'City & Architecture', uploadedAt: '2024-01-15', featured: false, active: true },
  
  // Events
  { id: 'img-37', src: 'events.jpeg', title: 'Cultural Events', category: 'Events', uploadedAt: '2024-01-15', featured: true, active: true },
  
  // Transportation
  { id: 'img-38', src: 'pexels-mikebirdy-170811.jpg', title: 'Unique Vehicle', category: 'Transportation', uploadedAt: '2024-01-15', featured: true, active: true },
  { id: 'img-39', src: 'pexels-esmihel-20200900.jpg', title: 'Modern Car', category: 'Transportation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-40', src: 'pexels-kadiravsarr-20170205.jpg', title: 'SUV Vehicle', category: 'Transportation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-41', src: 'pexels-joshsorenson-976866.jpg', title: 'Premium Car', category: 'Transportation', uploadedAt: '2024-01-15', featured: false, active: true },
  { id: 'img-42', src: 'pexels-matoga-27982027.jpg', title: 'Unique Transport', category: 'Transportation', uploadedAt: '2024-01-15', featured: false, active: true }
];

export const getImageById = (id: string) => galleryImages.find(img => img.id === id);
export const getImagesByCategory = (category: GalleryImage['category']) => galleryImages.filter(img => img.category === category && img.active);
export const getAllImages = () => galleryImages;
export const getActiveImages = () => galleryImages.filter(img => img.active);
export const getFeaturedImages = () => galleryImages.filter(img => img.featured && img.active);
