export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
  specialties: string[];
  email?: string;
  linkedin?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const team: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Jean-Pierre Uwimana',
    role: 'Founder & CEO',
    bio: 'A passionate tourism professional with over 15 years of experience in luxury travel across East Africa. Jean-Pierre founded Elegant Travel and Tours with a vision to showcase Rwanda\'s beauty through exceptional service and sustainable tourism practices.',
    image: '/images/team/jean-pierre.jpg',
    experience: '15+ years in luxury tourism',
    specialties: ['Luxury tour planning', 'Sustainable tourism', 'Business development', 'Cultural experiences'],
    email: 'jean-pierre@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/jean-pierre-uwimana',
    metaTitle: 'Jean-Pierre Uwimana - Founder & CEO | Elegant Travel and Tours',
    metaDescription: 'Meet Jean-Pierre Uwimana, Founder & CEO of Elegant Travel and Tours. A passionate tourism professional with over 15 years of experience in luxury travel across East Africa.'
  },
  {
    id: 'team-2',
    name: 'Grace Mukamurenzi',
    role: 'Head of Operations',
    bio: 'Grace ensures every detail of our tours and services meets the highest standards. With her background in hospitality management, she oversees all operational aspects to guarantee seamless guest experiences.',
    image: '/images/team/grace.jpg',
    experience: '12+ years in hospitality',
    specialties: ['Tour operations', 'Quality assurance', 'Guest relations', 'Logistics management'],
    email: 'grace@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/grace-mukamurenzi',
    metaTitle: 'Grace Mukamurenzi - Head of Operations | Elegant Travel and Tours',
    metaDescription: 'Meet Grace Mukamurenzi, Head of Operations at Elegant Travel and Tours. She ensures every detail of our tours and services meets the highest standards.'
  },
  {
    id: 'team-3',
    name: 'Emmanuel Niyonsenga',
    role: 'Lead Tour Guide',
    bio: 'Emmanuel is our most experienced guide, specializing in wildlife tours and cultural experiences. His deep knowledge of Rwanda\'s history, wildlife, and culture makes every tour an educational and memorable experience.',
    image: '/images/team/emmanuel.jpg',
    experience: '10+ years in tour guiding',
    specialties: ['Gorilla trekking', 'Wildlife tours', 'Cultural tours', 'Photography guidance'],
    email: 'emmanuel@elegantrwanda.com',
    metaTitle: 'Emmanuel Niyonsenga - Lead Tour Guide | Elegant Travel and Tours',
    metaDescription: 'Meet Emmanuel Niyonsenga, Lead Tour Guide at Elegant Travel and Tours. Specializing in wildlife tours and cultural experiences with 10+ years of experience.'
  },
  {
    id: 'team-4',
    name: 'Sarah Uwase',
    role: 'Customer Experience Manager',
    bio: 'Sarah is dedicated to ensuring every client receives personalized attention and exceptional service. She works closely with guests to understand their preferences and create tailored experiences.',
    image: '/images/team/sarah.jpg',
    experience: '8+ years in customer service',
    specialties: ['Customer relations', 'Tour customization', 'Client communication', 'Service excellence'],
    email: 'sarah@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/sarah-uwase',
    metaTitle: 'Sarah Uwase - Customer Experience Manager | Elegant Travel and Tours',
    metaDescription: 'Meet Sarah Uwase, Customer Experience Manager at Elegant Travel and Tours. Dedicated to ensuring every client receives personalized attention and exceptional service.'
  },
  {
    id: 'team-5',
    name: 'David Mutabazi',
    role: 'Transportation Manager',
    bio: 'David oversees our fleet of luxury vehicles and ensures all transportation services meet our high standards. His expertise in logistics and vehicle maintenance guarantees safe and comfortable travel.',
    image: '/images/team/david.jpg',
    experience: '9+ years in transportation',
    specialties: ['Fleet management', 'Driver training', 'Safety protocols', 'Route optimization'],
    email: 'david@elegantrwanda.com',
    metaTitle: 'David Mutabazi - Transportation Manager | Elegant Travel and Tours',
    metaDescription: 'Meet David Mutabazi, Transportation Manager at Elegant Travel and Tours. He oversees our fleet of luxury vehicles and ensures all transportation services meet our high standards.'
  },
  {
    id: 'team-6',
    name: 'Marie Claire Ingabire',
    role: 'Marketing & Partnerships',
    bio: 'Marie Claire develops strategic partnerships and creates compelling marketing campaigns that showcase Rwanda\'s beauty and our luxury services to the world.',
    image: '/images/team/marie-claire.jpg',
    experience: '7+ years in marketing',
    specialties: ['Digital marketing', 'Partnership development', 'Brand strategy', 'Content creation'],
    email: 'marie-claire@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/marie-claire-ingabire',
    metaTitle: 'Marie Claire Ingabire - Marketing & Partnerships | Elegant Travel and Tours',
    metaDescription: 'Meet Marie Claire Ingabire, Marketing & Partnerships Manager at Elegant Travel and Tours. She develops strategic partnerships and creates compelling marketing campaigns.'
  }
];

export const getTeamMemberById = (id: string) => team.find(member => member.id === id);
export const getLeadershipTeam = () => team.filter(member => ['Founder & CEO', 'Head of Operations'].includes(member.role));
export const getGuides = () => team.filter(member => member.role.includes('Guide'));
