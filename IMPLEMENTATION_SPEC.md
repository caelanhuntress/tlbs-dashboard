# Tlbs Dashboard: Implementation Specification

## Overview

**Tlbs Dashboard** is a web application designed for professionals who offer workshops, coaching, and speaking services. Its primary purpose is to track sales and delivery events, categorize them, and present interactive visualizations that help users monitor performance, set goals, and identify trends.

This specification outlines the technical and functional requirements for building the application, guiding developers from initial setup to feature completion.

---

## Core Functional Requirements

### 1. User Authentication
- **Provider:** Firebase Authentication (email/password, OAuth providers as needed).
- **Features:**
  - User registration, login, password reset.
  - Session management (auto-login, token refresh).
  - Secure private data per user.

### 2. Data Model
- **Sales Entry**
  - Date
  - Amount
  - Category (Training, Coaching, Speaking)
  - User ID (for multi-user support)
- **Delivery Entry**
  - Date
  - Value
  - Category (Training, Coaching, Speaking)
  - User ID
- **Goals**
  - Sales Goal (per month, per user)
  - Delivery Goal (per month, per user)
- **Meta**
  - Timestamps (createdAt, updatedAt)
  - Optional notes or tags

### 3. Calendar UI
- **Month View:** Shows current month by default, navigation for previous/next months.
- **Daily Cells:**
  - Green number: Sales total
  - Red number: Delivery total
  - Two input fields: ‘Amount Sold’, ‘Amount Delivered’
  - Category dropdown for each entry (Training, Coaching, Speaking)
- **Weekly Column:** Aggregates weekly totals for sales and delivery.

### 4. Goals Interface
- **Location:** Above the calendar
- **Inputs:** Sales Goal and Delivery Goal (editable at any time, not persisted to backend)
- **Display:** Monthly totals (green/red numbers) next to goals

### 5. Dashboard Visualizations
- **Charts:**
  - Daily and weekly performance (line/bar chart)
  - Monthly sales and delivery totals (bar chart)
  - Pie charts: Sales and delivery by category, with dynamic date range filter
  - Last 12 months: Sales and delivery by category, with total, average, and running rate
- **Tables:**
  - Chronological entry table (editable, with sorting/filtering)
  - Summary statistics for last 12 months

### 6. Data Page
- **Table Listing:** All entries (sales and delivery), editable, chronologically sorted (latest first).
- **Editing:** Inline editing, delete/add entry, category reassignment.

### 7. Backend Services
- **Firebase Firestore:**
  - Store sales and delivery entries as documents per user
  - Real-time updates for UI
  - Support for CRUD operations
- **API (Express):**
  - Abstracts Firestore operations
  - Handles authentication, validation, error handling
  - Exposes RESTful endpoints for frontend

### 8. State Management
- **Frontend:** Use React Context or Redux for app-wide state (user, entries, filters, goals, etc.)
- **Sync:** Real-time sync with Firestore (listens to changes)

### 9. Responsiveness & Accessibility
- **Mobile-friendly:** Responsive calendar and charts
- **Accessible:** Keyboard navigation, color contrast, ARIA labels

### 10. Security
- **Data Privacy:** User data isolation
- **Validation:** Input validation (amounts, dates)
- **Secure API:** Authentication required for all data operations

---

## Technical Requirements

### Frontend
- **Framework:** React
- **Visualization:** Chart.js
- **Routing:** React Router (for navigation between calendar, dashboard, data page)
- **Styling:** CSS Modules and/or styled-components
- **Forms:** Controlled components for entry fields

### Backend
- **Platform:** Node.js with Express
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth middleware
- **Environment:** .env for sensitive config (Firebase keys, API endpoints)
- **Deployment:** Vercel, Netlify, or Firebase Hosting

### Integration
- **Firebase SDK:** For frontend and backend
- **Testing:** Jest, React Testing Library, Supertest for API
- **CI/CD:** GitHub Actions for lint/test/deploy

---

## UX Details

- **Entry Workflow:** Fast, minimal clicks for adding/editing sales or delivery.
- **Charts:** Smooth transitions, tooltips on hover, clear legends and labels.
- **Notifications:** Success/error messages for data actions.
- **User Onboarding:** Guided setup for new users (welcome tour or checklist).

---

## Extensibility

- **Categories:** Easy to add more (e.g., Consulting).
- **Multi-user:** Support for teams or organizations in future.
- **Export:** CSV/Excel export of data.
- **Integrations:** Connect with payment or CRM systems.

---

## Milestones

1. **Project Initialization:** Setup repo, configure Firebase, create React/Express boilerplate.
2. **Authentication:** Implement Firebase Auth and user management.
3. **Calendar & Data Model:** Build calendar UI, connect to Firestore.
4. **Dashboard & Charts:** Develop visualization components.
5. **Editing & Table:** Implement Data page with editable table.
6. **API Integration:** Connect frontend to backend API.
7. **Testing & QA:** Unit and integration tests, accessibility checks.
8. **Deployment:** Configure hosting, finalize environment variables.

---

## Documentation & Support

- **README:** Up-to-date with setup, usage, tech stack, and contact info.
- **Code Comments:** All modules well-documented.
- **Contribution Guide:** Instructions for future contributors.
- **Issue Tracker:** Use GitHub Issues for bugs and feature requests.

---

This spec provides a comprehensive blueprint for building the Tlbs Dashboard. Developers should refer to it throughout the development process and update it as features evolve.