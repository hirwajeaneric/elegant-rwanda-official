# Newsletter Subscription - Duplicate Prevention Test Cases

This document outlines test cases for the duplicate email prevention in the newsletter subscription system.

## Test Scenarios

### 1. ✅ First-Time Subscription

**Request:**

```json
POST /api/newsletter
{
  "email": "newuser@example.com",
  "firstName": "John",
  "source": "home-newsletter"
}
```

**Expected Response:**

```json
Status: 201 Created
{
  "message": "Successfully subscribed to newsletter!"
}
```

---

### 2. ❌ Duplicate Active Subscription

**Request:**

```json
POST /api/newsletter
{
  "email": "newuser@example.com",
  "firstName": "John",
  "source": "home-newsletter"
}
```

_(Same email as test case 1, which is still active)_

**Expected Response:**

```json
Status: 409 Conflict
{
  "message": "This email address is already subscribed to our newsletter!",
  "isSubscribed": true
}
```

---

### 3. ✅ Reactivate Inactive Subscription

**Prerequisites:** User previously unsubscribed (active = false)

**Request:**

```json
POST /api/newsletter
{
  "email": "inactive@example.com",
  "firstName": "Jane",
  "source": "events-newsletter"
}
```

**Expected Response:**

```json
Status: 200 OK
{
  "message": "Welcome back! Your subscription has been reactivated.",
  "wasReactivated": true
}
```

---

### 4. ❌ Invalid Email Format

**Request:**

```json
POST /api/newsletter
{
  "email": "not-an-email",
  "source": "home-newsletter"
}
```

**Expected Response:**

```json
Status: 400 Bad Request
{
  "error": "Invalid input",
  "details": {
    "email": ["Please enter a valid email address"]
  }
}
```

---

## Protection Mechanisms

### 1. Database-Level Protection

The `email` field in the `NewsletterSubscriber` model has a `@unique` constraint:

```prisma
model NewsletterSubscriber {
  id    String @id @default(cuid())
  email String @unique  // ← Database-level unique constraint
  ...
}
```

This ensures that even if the application logic fails, the database will reject duplicate emails.

### 2. Application-Level Logic

The API route checks for existing subscribers before creating new ones:

```typescript
// Check if email already exists
const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
  where: { email: validatedData.email },
});

if (existingSubscriber) {
  // Prevent duplicate active subscriptions
  if (existingSubscriber.active) {
    return 409 Conflict
  }

  // Allow reactivation of inactive subscribers
  return 200 OK (reactivated)
}
```

### 3. HTTP Status Codes

- **201 Created**: New subscription successful
- **200 OK**: Subscription reactivated
- **409 Conflict**: Already subscribed (duplicate prevention)
- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Server/database error

## Frontend Handling Recommendations

```typescript
async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "home-newsletter" }),
    });

    const data = await response.json();

    if (response.status === 201) {
      // Success: New subscription
      showSuccessMessage(data.message);
    } else if (response.status === 200 && data.wasReactivated) {
      // Success: Reactivated subscription
      showSuccessMessage(data.message);
    } else if (response.status === 409) {
      // Already subscribed
      showInfoMessage(data.message);
    } else if (response.status === 400) {
      // Validation error
      showErrorMessage(data.error);
    } else {
      // Server error
      showErrorMessage("Something went wrong. Please try again.");
    }
  } catch (error) {
    showErrorMessage("Network error. Please try again.");
  }
}
```

## Testing Checklist

- [ ] Can subscribe with a new email address
- [ ] Cannot subscribe twice with the same email
- [ ] Get appropriate error message for duplicate subscription
- [ ] Can reactivate an inactive subscription
- [ ] Email validation works (rejects invalid formats)
- [ ] Database constraint prevents duplicates at DB level
- [ ] Appropriate HTTP status codes are returned
- [ ] Error responses are user-friendly

## Notes

- The `@unique` constraint on the email field provides a final safety net at the database level
- The API returns different status codes (200 vs 201 vs 409) to help the frontend provide better UX
- Inactive subscribers can reactivate their subscription, preserving their original preferences
- Email addresses are case-sensitive in the current implementation (consider adding `.toLowerCase()` for case-insensitive matching)
