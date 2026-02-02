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
  
  // Dashboard-specific fields
  phone?: string;
  department: string;
  location: string;
  hireDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  rating?: number;
  toursCompleted?: number;
  languages?: string[];
}

export const team: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Aime Yves Ngirimana',
    role: 'Founder & CEO',
    bio: 'A passionate tourism professional with over 15 years of experience in Unique travel across East Africa. Aime Yves founded Elegant Travel & Tours with a vision to showcase Rwanda\'s beauty through exceptional service and sustainable tourism practices.',
    image: '/images/team/jean-pierre.jpg',
    experience: '15+ years in Unique tourism',
    specialties: ['Unique tour planning', 'Sustainable tourism', 'Business development', 'Cultural experiences'],
    email: 'jean-pierre@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/jean-pierre-uwimana',
    metaTitle: 'Jean-Pierre Uwimana - Founder & CEO | Elegant Travel & Tours',
    metaDescription: 'Meet Jean-Pierre Uwimana, Founder & CEO of Elegant Travel & Tours. A passionate tourism professional with over 15 years of experience in Unique travel across East Africa.',
    
    // Dashboard-specific fields
    phone: '+250 788 123 456',
    department: 'Management',
    location: 'Kigali',
    hireDate: '2020-01-15',
    status: 'active',
    avatar: '/images/team/jean-pierre.jpg',
    rating: 4.9,
    toursCompleted: 0,
    languages: ['English', 'French', 'Kinyarwanda']
  },
  {
    id: 'team-2',
    name: 'John Doe',
    role: 'Senior Tour Guide',
    bio: 'An experienced wildlife guide with extensive knowledge of Rwanda\'s national parks and conservation efforts.',
    image: '/images/team/john-doe.jpg',
    experience: '8+ years in wildlife guiding',
    specialties: ['Wildlife tours', 'Gorilla trekking', 'Photography', 'Conservation'],
    email: 'john@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/john-doe-guide',
    metaTitle: 'John Doe - Senior Tour Guide | Elegant Travel & Tours',
    metaDescription: 'Meet John Doe, our experienced wildlife guide specializing in gorilla trekking and wildlife photography.',
    
    // Dashboard-specific fields
    phone: '+250 788 234 567',
    department: 'Operations',
    location: 'Kigali',
    hireDate: '2022-01-15',
    status: 'active',
    avatar: '/images/team/john-doe.jpg',
    rating: 4.8,
    toursCompleted: 156,
    languages: ['English', 'French', 'Kinyarwanda']
  },
  {
    id: 'team-3',
    name: 'Jane Smith',
    role: 'Operations Manager',
    bio: 'A dedicated operations professional ensuring smooth tour operations and exceptional customer service.',
    image: '/images/team/jane-smith.jpg',
    experience: '6+ years in tourism operations',
    specialties: ['Operations management', 'Customer service', 'Logistics', 'Quality control'],
    email: 'jane@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/jane-smith-operations',
    metaTitle: 'Jane Smith - Operations Manager | Elegant Travel & Tours',
    metaDescription: 'Meet Jane Smith, our Operations Manager ensuring smooth tour operations and exceptional customer service.',
    
    // Dashboard-specific fields
    phone: '+250 788 345 678',
    department: 'Management',
    location: 'Kigali',
    hireDate: '2021-06-10',
    status: 'active',
    avatar: '/images/team/jane-smith.jpg',
    rating: 4.7,
    toursCompleted: 0,
    languages: ['English', 'French', 'Kinyarwanda']
  },
  {
    id: 'team-4',
    name: 'Mike Johnson',
    role: 'Cultural Guide',
    bio: 'A passionate cultural guide specializing in Rwanda\'s rich heritage and traditional experiences.',
    image: '/images/team/mike-johnson.jpg',
    experience: '5+ years in cultural tourism',
    specialties: ['Cultural tours', 'Traditional villages', 'Art and crafts', 'Local experiences'],
    email: 'mike@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/mike-johnson-cultural',
    metaTitle: 'Mike Johnson - Cultural Guide | Elegant Travel & Tours',
    metaDescription: 'Meet Mike Johnson, our cultural guide specializing in Rwanda\'s rich heritage and traditional experiences.',
    
    // Dashboard-specific fields
    phone: '+250 788 456 789',
    department: 'Operations',
    location: 'Kigali',
    hireDate: '2022-03-20',
    status: 'active',
    avatar: '/images/team/mike-johnson.jpg',
    rating: 4.6,
    toursCompleted: 89,
    languages: ['English', 'Kinyarwanda']
  },
  {
    id: 'team-5',
    name: 'Sarah Wilson',
    role: 'Customer Relations Specialist',
    bio: 'A dedicated customer relations professional ensuring every client has an exceptional experience.',
    image: '/images/team/sarah-wilson.jpg',
    experience: '4+ years in customer service',
    specialties: ['Customer relations', 'Booking management', 'Client support', 'Feedback collection'],
    email: 'sarah@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/sarah-wilson-customer',
    metaTitle: 'Sarah Wilson - Customer Relations Specialist | Elegant Travel & Tours',
    metaDescription: 'Meet Sarah Wilson, our Customer Relations Specialist ensuring every client has an exceptional experience.',
    
    // Dashboard-specific fields
    phone: '+250 788 567 890',
    department: 'Customer Service',
    location: 'Kigali',
    hireDate: '2023-01-10',
    status: 'active',
    avatar: '/images/team/sarah-wilson.jpg',
    rating: 4.8,
    toursCompleted: 0,
    languages: ['English', 'French', 'Kinyarwanda']
  }
];

export const getTeamMemberById = (id: string) => team.find(member => member.id === id);
export const getLeadershipTeam = () => team.filter(member => ['Founder & CEO', 'Head of Operations'].includes(member.role));
export const getGuides = () => team.filter(member => member.role.includes('Guide'));
