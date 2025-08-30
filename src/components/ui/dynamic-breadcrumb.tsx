'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

// Define route configurations for better labels
const routeConfig: Record<string, string> = {
  'management': 'Dashboard',
  'users': 'Users',
  'courses': 'Courses',
  'blog': 'Blog',
  'events': 'Events',
  'communities': 'Communities',
  'careers': 'Careers',
  'orders': 'Orders',
  'products': 'Products',
  'quizzes': 'Quizzes',
  'sessions': 'Sessions',
  'streaks': 'Streaks',
  'team': 'Team',
  'templates': 'Templates',
  'testimonials': 'Testimonials',
  'subscribers': 'Subscribers',
  'reviews': 'Reviews',
  'notifications': 'Notifications',
  'messages': 'Messages',
  'media': 'Media',
  'gallery': 'Gallery',
  'analytics': 'Analytics',
  'settings': 'Settings',
  'account': 'Account',
  'pricing-table': 'Pricing',
  'create': 'Create',
  'edit': 'Edit',
  'applications': 'Applications',
  'applicants': 'Applicants',
  'learners': 'Learners',
  'students': 'Students',
  'categories': 'Categories',
  'tags': 'Tags',
  'results': 'Results',
  'availability': 'Availability',
  'calendar': 'Calendar',
  'scheduled': 'Scheduled',
  'respond': 'Respond',
};

// Special handling for dynamic routes
const getDynamicRouteLabel = (segment: string, pathSegments: string[], index: number): string => {
  // Handle ID-based routes (MongoDB ObjectId format)
  if (segment.match(/^[a-f0-9]{24}$/i)) {
    const parentSegment = pathSegments[index - 1];
    const parentLabel = routeConfig[parentSegment] || parentSegment;
    return `${parentLabel} Details`;
  }
  
  // Handle specific dynamic routes
  const specialRoutes: Record<string, string> = {
    'apply': 'Apply',
    'checkin': 'Check-in',
    'answering': 'Answering',
    'learning': 'Learning',
    'members': 'Members',
    'application': 'Application',
    'learner': 'Learner',
    'result': 'Result',
  };
  
  if (specialRoutes[segment]) {
    return specialRoutes[segment];
  }
  
  // Default to route config or capitalize
  return routeConfig[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
};

// Generate breadcrumb items from pathname
const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Always start with Dashboard for management routes
  if (segments[0] === 'management') {
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/management',
    });
  }
  
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Skip the management segment as it's already added
    if (segment === 'management') {
      return;
    }
    
    const isLast = index === segments.length - 1;
    const label = getDynamicRouteLabel(segment, segments, index);
    
    // Don't create links for the last item or for ID segments
    const shouldCreateLink = !isLast && !segment.match(/^[a-f0-9]{24}$/i);
    
    breadcrumbs.push({
      label,
      href: shouldCreateLink ? currentPath : undefined,
      isCurrent: isLast,
    });
  });
  
  return breadcrumbs;
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  
  // Don't show breadcrumbs for the root management page
  if (pathname === '/management') {
    return null;
  }
  
  // Don't show breadcrumbs if no breadcrumbs were generated
  if (breadcrumbs.length === 0) {
    return null;
  }
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem className="hidden md:block">
              {item.href ? (
                <BreadcrumbLink href={item.href}>
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
} 