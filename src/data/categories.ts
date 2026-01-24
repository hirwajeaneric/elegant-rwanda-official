export type CategoryType = 'faq' | 'blog' | 'event' | 'tour' | 'image' | 'general';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: CategoryType[];
  color?: string;
  icon?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'General Travel',
    slug: 'general-travel',
    description: 'General travel information and tips',
    type: ['faq', 'blog', 'general'],
    color: '#3B82F6',
    order: 1,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-2',
    name: 'Gorilla Trekking',
    slug: 'gorilla-trekking',
    description: 'Gorilla trekking experiences and information',
    type: ['faq', 'blog', 'event', 'tour', 'image'],
    color: '#10B981',
    order: 2,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-3',
    name: 'Tours & Packages',
    slug: 'tours-packages',
    description: 'Tour packages and itineraries',
    type: ['faq', 'blog', 'tour'],
    color: '#8B5CF6',
    order: 3,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-4',
    name: 'Transportation',
    slug: 'transportation',
    description: 'Transportation services and information',
    type: ['faq', 'blog', 'general'],
    color: '#F59E0B',
    order: 4,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-5',
    name: 'Accommodation',
    slug: 'accommodation',
    description: 'Accommodation options and information',
    type: ['faq', 'blog', 'general'],
    color: '#EF4444',
    order: 5,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-6',
    name: 'Wildlife',
    slug: 'wildlife',
    description: 'Wildlife experiences and safaris',
    type: ['blog', 'event', 'tour', 'image'],
    color: '#14B8A6',
    order: 6,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-7',
    name: 'Cultural',
    slug: 'cultural',
    description: 'Cultural experiences and heritage',
    type: ['blog', 'event', 'tour', 'image'],
    color: '#EC4899',
    order: 7,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-8',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Adventure activities and experiences',
    type: ['blog', 'event', 'tour', 'image'],
    color: '#F97316',
    order: 8,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-9',
    name: 'Unique',
    slug: 'unique',
    description: 'Unique and premium experiences',
    type: ['blog', 'event', 'tour', 'image'],
    color: '#6366F1',
    order: 9,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-10',
    name: 'Nature',
    slug: 'nature',
    description: 'Nature and landscape experiences',
    type: ['blog', 'tour', 'image'],
    color: '#22C55E',
    order: 10,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-11',
    name: 'Group Tour',
    slug: 'group-tour',
    description: 'Group tour experiences',
    type: ['event'],
    color: '#06B6D4',
    order: 11,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-12',
    name: 'Cultural Event',
    slug: 'cultural-event',
    description: 'Cultural events and festivals',
    type: ['event'],
    color: '#A855F7',
    order: 12,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-13',
    name: 'Tips',
    slug: 'tips',
    description: 'Travel tips and advice',
    type: ['blog'],
    color: '#84CC16',
    order: 13,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  },
  {
    id: 'cat-14',
    name: 'News',
    slug: 'news',
    description: 'Travel news and updates',
    type: ['blog'],
    color: '#64748B',
    order: 14,
    active: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15'
  }
];

export const getCategoryById = (id: string) => categories.find(cat => cat.id === id);
export const getCategoryBySlug = (slug: string) => categories.find(cat => cat.slug === slug);
export const getCategoriesByType = (type: CategoryType) => categories.filter(cat => cat.type.includes(type) && cat.active);
export const getAllCategories = () => categories;
export const getActiveCategories = () => categories.filter(cat => cat.active);
export const getCategoriesForEntity = (types: CategoryType[]) => 
  categories.filter(cat => cat.active && types.some(type => cat.type.includes(type)));
