# Onboarding Flow - Complete Implementation Guide

## Overview
The onboarding flow ensures users complete their profile setup before accessing the dashboard. This document explains how the flow works and the recent improvements.

## Changes Made

### 1. **Auto-redirect if Already Onboarded**
Users who have already completed onboarding are automatically redirected to the dashboard.

**Implementation:**
```typescript
// Check onboarding status on page load
useEffect(() => {
  const checkOnboardingStatus = async () => {
    if (status === "authenticated" && session?.user) {
      try {
        const response = await api.get("/api/v1/onboarding/status");
        
        if (response.data.onboardingCompleted) {
          toast.info("You've already completed onboarding!");
          router.replace("/dashboard");
        }
      } catch (error) {
        // Handle error
      }
    }
  };

  if (status === "authenticated") {
    checkOnboardingStatus();
  }
}, [status, session, router]);
```

### 2. **Immediate Redirect After Completion**
After successfully completing onboarding, users are immediately redirected to the dashboard.

**Before:**
- 1.5 second delay before redirect
- Used `router.push()` which allows going back

**After:**
- Immediate redirect
- Uses `router.replace()` to prevent going back to onboarding
- Cleaner user experience

### 3. **Loading States**
Added proper loading indicators while checking onboarding status.

**States:**
1. **Session Loading:** "Loading..."
2. **Checking Status:** "Checking your onboarding status..."
3. **Already Completed:** Auto-redirect with toast notification
4. **Not Completed:** Show onboarding form

### 4. **Sign Out Button**
Added a prominent sign-out button for when sessions expire.

**Location:** Top-right corner
**Style:** Red button with shadow
**Purpose:** Allow users to sign out and log in with a fresh token

---

## Complete User Flow

### Scenario 1: New User (First Time)
```
1. User registers/logs in
   ↓
2. Middleware detects: onboardingCompleted = false
   ↓
3. Redirects to /onboarding
   ↓
4. Frontend checks: GET /api/v1/onboarding/status
   ↓
5. Response: onboardingCompleted = false
   ↓
6. Show onboarding form
   ↓
7. User fills form and submits
   ↓
8. POST /api/v1/onboarding/complete
   ↓
9. Backend updates user: onboardingCompleted = true
   ↓
10. Frontend redirects: router.replace("/dashboard")
   ↓
11. User lands on dashboard ✅
```

### Scenario 2: Returning User (Already Onboarded)
```
1. User logs in
   ↓
2. Tries to access /onboarding
   ↓
3. Frontend checks: GET /api/v1/onboarding/status
   ↓
4. Response: onboardingCompleted = true
   ↓
5. Toast: "You've already completed onboarding!"
   ↓
6. Auto-redirect: router.replace("/dashboard")
   ↓
7. User lands on dashboard ✅
```

### Scenario 3: User Completes Onboarding, Then Hits Back Button
```
1. User completes onboarding
   ↓
2. router.replace("/dashboard") executed
   ↓
3. User arrives at dashboard
   ↓
4. User presses browser back button
   ↓
5. Browser tries to navigate to previous page
   ↓
6. Because we used replace(), back button goes to page BEFORE onboarding
   ↓
7. User does NOT return to onboarding page ✅
```

### Scenario 4: Session Token Expired
```
1. User tries to submit onboarding
   ↓
2. Backend returns: 403 "Invalid token"
   ↓
3. Frontend shows error: "Your session has expired..."
   ↓
4. User clicks "Sign Out" button
   ↓
5. Redirects to /requests/login
   ↓
6. User logs in with fresh token
   ↓
7. Redirected to /onboarding
   ↓
8. Completes onboarding successfully ✅
```

---

## API Endpoints Used

### GET /api/v1/onboarding/status
**Purpose:** Check if user has completed onboarding

**Request:**
```http
GET /api/v1/onboarding/status
Authorization: Bearer <token>
```

**Response (Not Completed):**
```json
{
  "status": 200,
  "message": "Onboarding status retrieved successfully",
  "data": {
    "onboardingCompleted": false,
    "role": null,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Response (Already Completed):**
```json
{
  "status": 200,
  "message": "Onboarding status retrieved successfully",
  "data": {
    "onboardingCompleted": true,
    "role": "member",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### POST /api/v1/onboarding/complete
**Purpose:** Complete user onboarding and update profile

**Request:**
```http
POST /api/v1/onboarding/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "member",
  "profileData": {
    "phone": "081234567890",
    "bio": "Student at XYZ University",
    "studentId": "12345",
    "university": "XYZ University",
    "major": "Computer Science",
    "graduationYear": 2025
  }
}
```

**Response (Success):**
```json
{
  "status": 200,
  "message": "Onboarding completed successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "User Name",
      "role": "member",
      "onboardingCompleted": true,
      "profileData": {...}
    }
  }
}
```

---

## Frontend State Management

### State Variables
```typescript
const [step, setStep] = useState(1);                    // Current step (1 or 2)
const [selectedRole, setSelectedRole] = useState(null); // Selected role
const [profileData, setProfileData] = useState({});     // Form data
const [verificationCode, setVerificationCode] = useState(""); // Admin/Leader code
const [isSubmitting, setIsSubmitting] = useState(false); // Submitting form
const [isCheckingStatus, setIsCheckingStatus] = useState(true); // Checking if already onboarded
```

### Loading State Priority
1. `status === "loading"` → Show "Loading..." (session loading)
2. `isCheckingStatus === true` → Show "Checking your onboarding status..."
3. Both false → Show onboarding form

---

## Middleware Configuration

### Protected Routes
```typescript
const protectedRoutes = [
  "/dashboard",
  "/dashboard/request",
  "/dashboard/history",
  "/dashboard/guide",
  "/dashboard/faq",
];
```

### Middleware Logic
```typescript
if (isProtectedRoute) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) {
    // Not authenticated → redirect to login
    return NextResponse.redirect(new URL("/requests/login", request.url));
  }
  
  if (!token.onboardingCompleted && pathname !== "/onboarding") {
    // Not onboarded → redirect to onboarding
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }
  
  // All checks passed → allow access
  return NextResponse.next();
}
```

**Note:** The middleware checks the JWT token's `onboardingCompleted` field. This field is set during login and doesn't automatically update when onboarding is completed. The frontend handles the redirect after onboarding completion.

---

## Common Issues and Solutions

### Issue 1: User sees "You've already completed onboarding!" but gets redirected back
**Cause:** Middleware JWT token hasn't updated yet
**Solution:** The frontend now checks the backend directly and redirects before middleware kicks in

### Issue 2: After completing onboarding, clicking back returns to onboarding page
**Cause:** Using `router.push()` instead of `router.replace()`
**Solution:** Now uses `router.replace()` to replace history entry

### Issue 3: Redirect takes too long after completion
**Cause:** 1.5 second setTimeout delay
**Solution:** Removed delay, redirect is now immediate

### Issue 4: User stuck on onboarding with expired token
**Cause:** No way to sign out from onboarding page
**Solution:** Added prominent "Sign Out" button

---

## Testing Checklist

### Test 1: First-Time User
- [ ] Register/Login new account
- [ ] Automatically redirected to /onboarding
- [ ] Complete onboarding form
- [ ] Immediately redirected to /dashboard
- [ ] Cannot go back to onboarding using browser back button

### Test 2: Returning User
- [ ] Login with account that completed onboarding
- [ ] Try to access /onboarding directly
- [ ] Automatically redirected to /dashboard
- [ ] Toast shows "You've already completed onboarding!"

### Test 3: Token Expiration
- [ ] Start onboarding process
- [ ] Wait for token to expire OR manually invalidate
- [ ] Try to submit form
- [ ] See "Invalid token" error
- [ ] Click "Sign Out" button
- [ ] Log in again
- [ ] Complete onboarding successfully

### Test 4: Admin/Leader Verification
- [ ] Select Admin or Leader role
- [ ] See red verification code field
- [ ] Try to submit without code → Error
- [ ] Enter wrong code → 403 error
- [ ] Enter correct code (NightLogin123) → Success

### Test 5: Loading States
- [ ] Refresh onboarding page
- [ ] See "Checking your onboarding status..." message
- [ ] If already onboarded: Auto-redirect
- [ ] If not onboarded: Show form

---

## Code Locations

### Frontend
- **Onboarding Page:** `src/pages/onboarding.tsx`
- **Middleware:** `src/middleware.ts`
- **NextAuth Config:** `src/pages/api/auth/[...nextauth].ts`
- **API Helper:** `src/lib/api.ts`
- **Type Definitions:** `src/types/next-auth.d.ts`

### Backend
- **Onboarding Controller:** `src/controllers/onboardingControllers.js`
- **Onboarding Routes:** `src/routes/onboardingRoutes.js`
- **User Model:** `src/models/userModels.js`
- **Auth Middleware:** `src/middlewares/userMiddlewares.js`

---

## Summary of Improvements

✅ **Auto-redirect if already onboarded** - Prevents confusion
✅ **Immediate redirect after completion** - Better UX
✅ **Proper loading states** - User knows what's happening
✅ **Sign out button** - Handles token expiration gracefully
✅ **router.replace() instead of router.push()** - Prevents back button issues
✅ **Backend status check on mount** - Always accurate
✅ **Clear error messages** - User knows how to fix issues
✅ **Debug logging** - Easy troubleshooting

---

## Next Steps (Optional Enhancements)

1. **Session Token Update:** Modify NextAuth to update JWT token after onboarding
2. **Progress Persistence:** Save form progress to localStorage
3. **Field Validation:** Add real-time validation for form fields
4. **Profile Picture Upload:** Allow users to upload profile picture during onboarding
5. **Email Verification:** Require email verification before onboarding
6. **Onboarding Analytics:** Track completion rates and drop-off points

---

## Quick Reference

| Scenario | Expected Behavior |
|----------|------------------|
| New user logs in | Redirected to /onboarding |
| Completes onboarding | Immediately redirected to /dashboard |
| Already onboarded user visits /onboarding | Auto-redirected to /dashboard |
| Clicks back after onboarding | Goes to page BEFORE onboarding |
| Token expires during onboarding | Shows error + sign out button |
| Selects Admin/Leader role | Shows verification code field |
| Enters wrong verification code | 403 error with message |
| Dashboard accessed without onboarding | Redirected to /onboarding by middleware |
