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
    name: 'Aime Yves Ngirimana',
    role: 'Founder & CEO',
    bio: 'A passionate tourism professional with over 15 years of experience in Unique travel across East Africa. Aime Yves founded Elegant Travel and Tours with a vision to showcase Rwanda\'s beauty through exceptional service and sustainable tourism practices.',
    image: '/images/team/jean-pierre.jpg',
    experience: '15+ years in Unique tourism',
    specialties: ['Unique tour planning', 'Sustainable tourism', 'Business development', 'Cultural experiences'],
    email: 'jean-pierre@elegantrwanda.com',
    linkedin: 'https://linkedin.com/in/jean-pierre-uwimana',
    metaTitle: 'Jean-Pierre Uwimana - Founder & CEO | Elegant Travel and Tours',
    metaDescription: 'Meet Jean-Pierre Uwimana, Founder & CEO of Elegant Travel and Tours. A passionate tourism professional with over 15 years of experience in Unique travel across East Africa.'
  }
];

export const getTeamMemberById = (id: string) => team.find(member => member.id === id);
export const getLeadershipTeam = () => team.filter(member => ['Founder & CEO', 'Head of Operations'].includes(member.role));
export const getGuides = () => team.filter(member => member.role.includes('Guide'));
