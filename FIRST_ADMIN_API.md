# First Admin User API Endpoint

## Overview

The `/api/admin/create-first-admin` endpoint is used to create the initial admin user account during system setup. This endpoint should only be called **once** during initial deployment, before any admin users exist in the system.

## Endpoint

```
POST /api/admin/create-first-admin
```

## Authentication

**No authentication required** - This endpoint is intentionally unauthenticated to allow initial setup. However, it will reject requests if an admin user already exists.

## Request Body

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "SecurePassword123!"
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name of the admin user (min 2 characters) |
| `email` | string | Yes | Email address (must be valid email format) |
| `password` | string | Yes | Password (min 8 characters) |

## Success Response

**Status Code:** `201 Created`

```json
{
  "success": true,
  "user": {
    "id": "clx1234567890",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN",
    "active": true,
    "emailVerified": true,
    "requirePasswordReset": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "First admin user created successfully"
}
```

## Error Responses

### 400 Bad Request - Validation Error

```json
{
  "error": "Validation error",
  "details": [
    {
      "path": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### 409 Conflict - Admin Already Exists

```json
{
  "error": "Admin user already exists. Use the admin dashboard to create additional users."
}
```

### 409 Conflict - Email Already Exists

```json
{
  "error": "User with this email already exists"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## Default User Properties

When created via this endpoint, the admin user will have:

- **role**: `ADMIN` (full access to all features)
- **active**: `true` (account is enabled)
- **emailVerified**: `true` (email verification is bypassed for admin-created users)
- **requirePasswordReset**: `false` (can be changed in code if you want to force password reset on first login)

## Usage Example

### Using cURL

```bash
curl -X POST http://localhost:3000/api/admin/create-first-admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "System Administrator",
    "email": "admin@elegantrwanda.com",
    "password": "SecureAdminPassword123!"
  }'
```

### Using JavaScript/TypeScript

```javascript
const response = await fetch('http://localhost:3000/api/admin/create-first-admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'System Administrator',
    email: 'admin@elegantrwanda.com',
    password: 'SecureAdminPassword123!'
  })
});

const data = await response.json();

if (response.ok) {
  console.log('Admin user created:', data.user);
} else {
  console.error('Error:', data.error);
}
```

### Using Postman

1. Set method to `POST`
2. Set URL to `http://localhost:3000/api/admin/create-first-admin`
3. In Headers, add `Content-Type: application/json`
4. In Body, select "raw" and "JSON", then enter:
   ```json
   {
     "name": "System Administrator",
     "email": "admin@elegantrwanda.com",
     "password": "SecureAdminPassword123!"
   }
   ```
5. Click "Send"

## Security Notes

1. **One-time use**: This endpoint will reject requests if an admin user already exists
2. **No authentication**: Intentionally unauthenticated for initial setup
3. **Password requirements**: Minimum 8 characters (enforced by validation)
4. **Email normalization**: Email addresses are normalized (lowercased, trimmed)
5. **Input sanitization**: All inputs are sanitized to prevent XSS attacks

## After Creating the First Admin

Once the first admin user is created:

1. Log in at `/auth/login` using the credentials you provided
2. Access the admin dashboard at `/admin/dashboard`
3. Create additional users via `/admin/users/new` (requires admin authentication)
4. All subsequent users created through the admin dashboard will have:
   - `emailVerified: true` (automatically verified)
   - `requirePasswordReset: false` (unless explicitly set during creation)

## Troubleshooting

### "Admin user already exists" error

If you receive this error, it means an admin user has already been created. You should:
- Use the existing admin credentials to log in
- Create additional users through the admin dashboard
- If you've forgotten the password, use the password reset flow

### "User with this email already exists" error

The email address you're trying to use is already registered. Try:
- Using a different email address
- Logging in with the existing account
- Resetting the password if you own the account

## Related Endpoints

- `POST /api/auth/login` - Login with admin credentials
- `POST /api/auth/users` - Create additional users (requires admin auth)
- `GET /api/auth/users` - List all users (requires admin auth)
