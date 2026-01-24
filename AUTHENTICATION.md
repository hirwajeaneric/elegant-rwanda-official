# Authentication & RBAC System

This document describes the authentication and Role-Based Access Control (RBAC) system implemented in the Elegant Rwanda application.

## Overview

The system implements a comprehensive authentication system with three distinct user roles, each with specific permissions and access levels.

## User Roles

### 1. ADMIN
- **Full Access**: Complete access to all features and resources
- **User Management**: Can create, edit, and manage all users
- **Access Control**: Can assign roles and manage permissions
- **All Resources**: Full CRUD access to all content types

**Accessible Routes:**
- `/admin/dashboard`
- `/admin/users` (exclusive)
- `/admin/services`
- `/admin/tours`
- `/admin/car-rental`
- `/admin/events`
- `/admin/blogs`
- `/admin/testimonials`
- `/admin/team`
- `/admin/faqs`
- `/admin/categories`
- `/admin/gallery`
- `/admin/settings`

### 2. CONTENT_MANAGER
- **Content Management**: Full CRUD access to all content except user management
- **No User Management**: Cannot access user management pages
- **Settings Access**: Can view and update settings

**Accessible Routes:**
- `/admin/dashboard`
- `/admin/services`
- `/admin/tours`
- `/admin/car-rental`
- `/admin/events`
- `/admin/blogs`
- `/admin/testimonials`
- `/admin/team`
- `/admin/faqs`
- `/admin/categories`
- `/admin/gallery`
- `/admin/settings`

**Restricted:**
- `/admin/users` (Admin only)

### 3. EDITOR
- **Limited Content**: Can only manage Blog, Categories, FAQs, and Gallery
- **Read-Only Dashboard**: Can view dashboard but limited editing capabilities
- **No User Management**: Cannot access user management or other content types

**Accessible Routes:**
- `/admin/dashboard` (read-only)
- `/admin/blogs`
- `/admin/categories`
- `/admin/faqs`
- `/admin/gallery`

**Restricted:**
- `/admin/users` (Admin only)
- `/admin/services` (Content Manager+)
- `/admin/tours` (Content Manager+)
- `/admin/car-rental` (Content Manager+)
- `/admin/events` (Content Manager+)
- `/admin/testimonials` (Content Manager+)
- `/admin/team` (Content Manager+)
- `/admin/settings` (Content Manager+)

## Test Accounts

For development and testing, the following accounts are available:

1. **Admin**
   - Email: `admin@elegantrwanda.com`
   - Password: `admin123`
   - Role: ADMIN

2. **Content Manager**
   - Email: `content@elegantrwanda.com`
   - Password: `content123`
   - Role: CONTENT_MANAGER

3. **Editor**
   - Email: `editor@elegantrwanda.com`
   - Password: `editor123`
   - Role: EDITOR

## Implementation Details

### Database Schema

The Prisma schema includes a `User` model with the following structure:

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  password      String   // Hashed password
  role          UserRole @default(EDITOR)
  active        Boolean  @default(true)
  lastLogin     DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  createdBy     String?
  updatedBy     String?
}

enum UserRole {
  ADMIN
  CONTENT_MANAGER
  EDITOR
}
```

### Authentication Store

The authentication state is managed using Zustand (`src/lib/stores/auth-store.ts`):

- **State**: User information and authentication status
- **Methods**: Login, logout, register, password reset, etc.
- **Persistence**: Uses localStorage for client-side persistence

### RBAC Utilities

Role-based access control utilities are in `src/lib/rbac.ts`:

- `hasPermission(role, resource, action)`: Check if a role has permission for a resource/action
- `canAccessRoute(role, route)`: Check if a role can access a specific route
- `getAccessibleRoutes(role)`: Get all accessible routes for a role
- `hasMinimumRole(role, requiredRole)`: Check role hierarchy

### Route Protection

Routes are protected at multiple levels:

1. **Layout Level** (`src/app/(admin)/admin/layout.tsx`):
   - Checks authentication status
   - Validates route access based on user role
   - Redirects unauthorized users

2. **Component Level** (`src/components/auth/RoleGuard.tsx`):
   - Can be used to protect individual pages or sections
   - Supports role-based and permission-based protection
   - Shows access denied message for unauthorized access

3. **Sidebar Navigation** (`src/components/dashboard/DashboardSidebar.tsx`):
   - Dynamically filters navigation items based on user role
   - Only shows accessible routes to each user

### User Management

User management pages are located in `src/app/(admin)/admin/users/`:

- **List Page** (`page.tsx`): View all users with filtering and search
- **Create Page** (`new/page.tsx`): Create new users (Admin only)
- **Edit Page** (`[id]/page.tsx`): Edit user details and permissions

**Permissions:**
- Only ADMIN users can access user management
- Content Managers can edit Editor users (limited)
- Users cannot edit their own role (unless Admin)

### API Routes

Authentication API routes are in `src/app/api/auth/`:

- `POST /api/auth/login`: Authenticate user
- `GET /api/auth/users`: Get all users (Admin only)
- `POST /api/auth/users`: Create new user (Admin only)
- `GET /api/auth/users/[id]`: Get user by ID
- `PUT /api/auth/users/[id]`: Update user
- `DELETE /api/auth/users/[id]`: Delete/deactivate user

## Security Considerations

### Current Implementation (Development)
- Passwords are stored in plain text in mock data
- Authentication uses localStorage
- No JWT tokens or session management
- No password hashing

### Production Recommendations
1. **Password Security**:
   - Use bcrypt or Argon2 for password hashing
   - Implement password strength requirements
   - Add password reset functionality with secure tokens

2. **Session Management**:
   - Implement JWT tokens with HTTP-only cookies
   - Add token refresh mechanism
   - Implement session timeout

3. **API Security**:
   - Add rate limiting
   - Implement CSRF protection
   - Add request validation and sanitization

4. **Database**:
   - Use Prisma to interact with PostgreSQL
   - Implement proper indexes for performance
   - Add audit logging for user actions

5. **Access Control**:
   - Implement row-level security
   - Add activity logging
   - Implement two-factor authentication (2FA)

## Usage Examples

### Protecting a Page with RoleGuard

```tsx
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function AdminOnlyPage() {
  return (
    <RoleGuard requiredRole="ADMIN">
      <div>This content is only visible to admins</div>
    </RoleGuard>
  );
}
```

### Checking Permissions

```tsx
import { hasPermission } from "@/lib/rbac";
import { useAuthStore } from "@/lib/stores/auth-store";

function MyComponent() {
  const user = useAuthStore((state) => state.user);
  
  const canEdit = hasPermission(user?.role, "blogs", "update");
  
  return (
    <div>
      {canEdit && <button>Edit Blog</button>}
    </div>
  );
}
```

### Filtering Navigation

```tsx
import { canAccessRoute } from "@/lib/rbac";

const navigation = allItems.filter(item => 
  canAccessRoute(user.role, item.href)
);
```

## Migration to Production

When moving to production:

1. **Update Auth Store**: Replace mock authentication with API calls
2. **Implement Password Hashing**: Use bcrypt in API routes
3. **Add JWT Tokens**: Implement secure token-based authentication
4. **Database Integration**: Connect to PostgreSQL using Prisma
5. **Add Middleware**: Implement Next.js middleware for route protection
6. **Security Headers**: Add security headers and CSRF protection
7. **Audit Logging**: Log all authentication and authorization events

## Files Structure

```
src/
├── app/
│   ├── (admin)/admin/
│   │   ├── users/              # User management pages
│   │   │   ├── page.tsx        # Users list
│   │   │   ├── new/page.tsx    # Create user
│   │   │   └── [id]/page.tsx   # Edit user
│   │   └── layout.tsx          # Admin layout with route protection
│   ├── (auth)/auth/
│   │   └── login/page.tsx      # Login page
│   └── api/auth/               # Authentication API routes
│       ├── login/route.ts
│       └── users/
│           ├── route.ts
│           └── [id]/route.ts
├── components/
│   ├── auth/
│   │   └── RoleGuard.tsx       # Role-based protection component
│   └── dashboard/
│       ├── DashboardSidebar.tsx # Role-aware navigation
│       └── DashboardHeader.tsx  # User info display
├── data/
│   └── users.ts                # User data and types
├── lib/
│   ├── rbac.ts                 # RBAC utilities
│   └── stores/
│       └── auth-store.ts      # Authentication state management
└── prisma/
    └── schema.prisma           # Database schema with User model
```

## Testing

To test the authentication system:

1. **Login as Admin**: Access all features including user management
2. **Login as Content Manager**: Verify access to content but not users
3. **Login as Editor**: Verify limited access to blogs, categories, FAQs, and gallery
4. **Test Route Protection**: Try accessing restricted routes directly
5. **Test User Management**: Create, edit, and manage users (Admin only)

## Support

For issues or questions about the authentication system, refer to:
- RBAC utilities: `src/lib/rbac.ts`
- Auth store: `src/lib/stores/auth-store.ts`
- User management: `src/app/(admin)/admin/users/`


Now, proceed with development, implement all best authentication practices including rate-limiting, use bcrypt, proper token management, CSRF Protection, request validation and sanitization. In the models you have in prisma, you should add a session model to track user active and inactive sessions. The sessions should keep track of all possible information including the location, device, browser and all that can be tracked by a session in general. Try to immitate the logic of handling authentication used by better-auth if possible. After implementation, ensure the project runs properly, run prisma migrations, and pushes to ensure the database is updated with the needed tables for the project to run.
