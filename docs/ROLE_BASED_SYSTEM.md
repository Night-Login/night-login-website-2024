# Role-Based Dashboard System Documentation

## Overview

The Night Login platform now features a comprehensive role-based access control (RBAC) system with 5 distinct user roles, each with customized dashboards and onboarding flows.

---

## 🎭 User Roles

### 1. **Member** 👨‍🎓

**Purpose:** Students or community members who participate in projects

**Dashboard Features:**

- Active projects tracking
- Completed tasks counter
- Team member connections
- Hours contributed metrics
- Quick access to submit requests
- Learning resources

**Onboarding Fields:**

- Phone number
- Bio
- Student ID
- University
- Major
- Graduation year

---

### 2. **University Lecturer** 👨‍🏫

**Purpose:** Academic staff who supervise students and projects

**Dashboard Features:**

- Students supervised count
- Active academic projects
- Pending reviews queue
- Semester overview
- Student project management
- Supervision schedule
- Resource sharing
- Academic reports

**Onboarding Fields:**

- Phone number
- Bio
- Lecturer ID
- Department
- Specialization
- Office room

---

### 3. **Admin/Staff** 👨‍💼

**Purpose:** Organization administrators managing operations

**Dashboard Features:**

- Total members overview
- Active projects monitoring
- Pending requests queue
- Completion metrics
- Member management tools
- Request approval system
- System settings
- Analytics dashboard

**Onboarding Fields:**

- Phone number
- Bio
- Employee ID
- Position
- Department

---

### 4. **Leader/Superadmin** 👨‍💻

**Purpose:** Organization leaders with strategic oversight

**Dashboard Features:**

- Revenue tracking
- Strategic metrics
- Team overview
- Client satisfaction scores
- High-level organizational metrics
- Financial reports access
- Team management tools
- Strategic decision portal

**Onboarding Fields:**

- Phone number
- Bio
- Title (CEO, Director, President, etc.)

---

### 5. **Client/External** 🤝

**Purpose:** External clients or partners requesting services

**Dashboard Features:**

- Active project tracking
- Completed projects history
- Pending requests monitoring
- Support ticket system
- Project progress views
- Team communication
- Invoice management
- New request submission

**Onboarding Fields:**

- Phone number
- Bio
- Company name
- Company website
- Position
- Industry

---

## 🔄 User Flow

### New User Registration Flow

```bash
1. Register/OAuth Login
   ↓
2. Check onboarding status
   ↓
3a. If onboarding NOT complete:
   → Redirect to /onboarding
   → Select role (5 options)
   → Fill role-specific profile data
   → Submit onboarding
   → Redirect to role-based dashboard
   
3b. If onboarding IS complete:
   → Redirect to role-based dashboard
```

### Login Flow

```bash
1. User logs in (credentials or OAuth)
   ↓
2. Backend returns user data with:
   - role
   - onboardingCompleted status
   ↓
3. Middleware checks onboarding status
   ↓
4a. If NOT complete → /onboarding
4b. If complete → /dashboard (role-based)
```

---

## 🛠️ Technical Implementation

### Backend API Endpoints

#### **Authentication Endpoints**

```bash
POST /api/v1/user/register
POST /api/v1/user/login
POST /api/v1/user/oauth-login
```

Response includes:

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "member|lecturer|admin|leader|client",
      "onboardingCompleted": boolean
    },
    "token": "string",
    "accessToken": "string"
  }
}
```

#### **Onboarding Endpoints**

Get Onboarding Status

```bash
GET /api/v1/onboarding/status
Headers: Authorization: Bearer <token>
```

Response:

```json
{
  "status": 200,
  "message": "Onboarding status retrieved successfully",
  "data": {
    "onboardingCompleted": false,
    "role": "member",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

Complete Onboarding

```bash
POST /api/v1/onboarding/complete
Headers: Authorization: Bearer <token>
```

Request:

```json
{
  "role": "member",
  "profileData": {
    "phone": "+1234567890",
    "bio": "I'm a computer science student",
    "studentId": "12345",
    "university": "University of Example",
    "major": "Computer Science",
    "graduationYear": 2025
  }
}
```

Get User Profile

```bash
GET /api/v1/onboarding/profile
Headers: Authorization: Bearer <token>
```

---

### Frontend Implementation

#### **Session Object Structure**

```typescript
interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: "member" | "lecturer" | "admin" | "leader" | "client";
    onboardingCompleted: boolean;
  };
  accessToken: string;
}
```

#### **Middleware Protection**

The Next.js middleware (`src/middleware.ts`) handles:

1. **Protected Route Access**
   - Checks authentication token
   - Verifies onboarding completion
   - Redirects to onboarding if incomplete

2. **Onboarding Route Access**
   - Prevents access if already completed
   - Redirects authenticated users appropriately

3. **Auth Route Access**
   - Redirects authenticated users to dashboard
   - Redirects incomplete onboarding to onboarding page

#### **Role-Based Dashboard Component**

Location: `src/components/Dashboard/RoleBasedDashboard.tsx`

Features:

- Dynamic stats based on role
- Role-specific quick actions
- Customized UI for each role
- Real-time session-based rendering

---

## 📊 Database Schema

### User Model

```javascript
{
  email: String (required, unique),
  name: String (required),
  password: String (required, hashed),
  salt: String (required),
  role: String (enum: ["member", "lecturer", "admin", "leader", "client"], default: "member"),
  onboardingCompleted: Boolean (default: false),
  
  profileData: {
    // Common fields
    phone: String,
    avatar: String,
    bio: String,
    
    // Member specific
    studentId: String,
    major: String,
    university: String,
    graduationYear: Number,
    
    // Lecturer specific
    lecturerId: String,
    department: String,
    specialization: String,
    officeRoom: String,
    
    // Admin specific
    employeeId: String,
    position: String,
    
    // Leader specific
    title: String,
    responsibilities: [String],
    
    // Client specific
    companyName: String,
    companyWebsite: String,
    industry: String
  },
  
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🎨 UI/UX Features

### Onboarding Page

#### Step 1: Role Selection

- Visual card-based selection
- 5 role options with icons and descriptions
- Hover effects and animations

#### Step 2: Profile Completion

- Dynamic form based on selected role
- Common fields (phone, bio) for all roles
- Role-specific fields
- Progress indicator
- Back button to change role

### Dashboard Features

Each dashboard includes:

- **Stats Grid**: 4 key metrics relevant to the role
- **Quick Actions**: 4 primary actions in card format
- **Recent Activity**: Timeline of recent events
- **Role Badge**: Visual indicator of current role
- **Responsive Design**: Mobile-friendly layout

---

## 🔐 Security Considerations

1. **Token-Based Authentication**
   - JWT tokens stored securely
   - 30-day expiration
   - Bearer token format

2. **Middleware Protection**
   - Server-side route protection
   - Automatic redirects for unauthorized access
   - Onboarding enforcement

3. **Role-Based Access**
   - Backend validates user role
   - Frontend conditionally renders based on role
   - API endpoints protected by authentication middleware

---

## 🚀 Deployment Checklist

### Backend

- [ ] MongoDB with updated User schema
- [ ] Environment variables configured (JWT_SECRET, MONGO_URI)
- [ ] All new routes registered in index.js
- [ ] Test authentication endpoints
- [ ] Test onboarding endpoints

### Frontend

- [ ] Environment variables (NEXTAUTH_SECRET, NEXT_PUBLIC_BACKEND_URL)
- [ ] OAuth credentials configured (Google, GitHub)
- [ ] Test onboarding flow for all roles
- [ ] Test middleware redirects
- [ ] Test dashboard rendering for each role

---

## 📝 Future Enhancements

1. **Permission System**
   - Granular permissions within roles
   - Custom role creation

2. **Role Switching**
   - Allow users to have multiple roles
   - Switch between roles dynamically

3. **Advanced Analytics**
   - Role-specific analytics
   - Cross-role reporting

4. **Notification System**
   - Role-based notifications
   - Custom notification preferences

5. **Audit Logging**
   - Track role changes
   - Monitor access patterns

---

## 🐛 Troubleshooting

### User stuck on onboarding page

**Solution:** Check if onboarding completion API call succeeded. Verify token includes updated `onboardingCompleted` status.

### Dashboard not showing role-specific content

**Solution:** Verify session includes `role` field. Check NextAuth configuration and type definitions.

### Middleware redirecting incorrectly

**Solution:** Check `getToken()` in middleware. Verify NEXTAUTH_SECRET matches between frontend and NextAuth config.

### OAuth users not getting onboarding flow

**Solution:** Verify OAuth callback includes role and onboarding status from backend `/oauth-login` endpoint.

---

## 📞 Support

For issues or questions:

1. Check backend logs for API errors
2. Check browser console for frontend errors
3. Verify environment variables are set correctly
4. Review middleware logic for redirect issues

---

**Last Updated:** October 3, 2025  
**Version:** 1.0.0
