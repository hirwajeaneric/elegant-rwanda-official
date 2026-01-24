# Authentication Flow Debugging Guide

## Issue: Users Not Being Created in Database

### Root Cause
The registration flow requires **two steps**:
1. **Registration** (`POST /api/auth/register`) - Creates OTP, sends email
2. **OTP Verification** (`POST /api/auth/verify-otp`) - Verifies OTP **AND creates the user**

The user is only created in step 2, not step 1.

### Current Flow

#### Step 1: Registration
- User submits: name, email, password
- API creates OTP verification record
- API sends OTP email
- **User is NOT created yet**

#### Step 2: OTP Verification  
- User submits: email, OTP
- API verifies OTP
- **If name and password are provided**, API creates user
- **If name and password are missing**, API returns error but user is not created

### The Problem
The `confirm-otp` page was only passing `email` and `otp` to `verifyOTP()`, but the API requires `name` and `password` to create the user during registration.

### The Fix
1. Store registration data (name, password) in `sessionStorage` during registration
2. Retrieve and pass this data during OTP verification
3. Clear sessionStorage after successful verification

### How to Verify It's Working

1. **Check OTP Verification Records:**
   ```sql
   SELECT * FROM "OTPVerification" WHERE purpose = 'REGISTRATION' ORDER BY "createdAt" DESC;
   ```

2. **Check Users Table:**
   ```sql
   SELECT * FROM "User" ORDER BY "createdAt" DESC;
   ```

3. **Check Server Logs:**
   - Look for "User created successfully" message
   - Check for any database errors

### Testing the Flow

1. Register a new account:
   - Go to `/auth/create-account`
   - Fill in name, email, password
   - Submit

2. Verify OTP:
   - Check email for OTP code
   - Go to `/auth/confirm-otp?email=your@email.com`
   - Enter OTP code
   - Submit

3. Check Database:
   - User should now exist in the `User` table
   - OTP verification should be marked as `verified: true`
   - Session should be created

### Common Issues

1. **SessionStorage cleared**: If user closes browser or clears storage, registration data is lost
   - **Solution**: User needs to register again

2. **OTP expired**: OTP expires after 10 minutes
   - **Solution**: Request new OTP

3. **Database connection**: If Prisma can't connect to database
   - **Check**: `DATABASE_URL` in `.env`
   - **Check**: Database is accessible
   - **Check**: Prisma client is generated (`npx prisma generate`)

4. **Silent failures**: Errors might be caught and not logged
   - **Check**: Server console logs
   - **Check**: Network tab in browser dev tools

### Debugging Steps

1. **Check if OTP is being created:**
   ```bash
   # In your database
   SELECT * FROM "OTPVerification" WHERE email = 'your@email.com';
   ```

2. **Check if verify-otp is being called:**
   - Open browser dev tools → Network tab
   - Look for POST request to `/api/auth/verify-otp`
   - Check request payload (should include name and password)
   - Check response

3. **Check server logs:**
   - Look for "User created successfully" or error messages
   - Check for Prisma errors

4. **Test database connection:**
   ```typescript
   // In a test file or API route
   import { prisma } from "@/lib/prisma";
   const users = await prisma.user.findMany();
   console.log("Users:", users);
   ```
