# Lendsqr Frontend Engineer Assessment

A modern admin dashboard application built with React, TypeScript, and SCSS for managing users and financial operations.

## 🔗 Links

- **Live Demo**: [https://robert-oluwaseun-lendsqr-fe-test.vercel.app/](https://robert-oluwaseun-lendsqr-fe-test.vercel.app)
- **GitHub Repository**: [https://github.com/Rohberto/lendsqr-fe-test/tree/main](https://github.com/Rohberto/lendsqr-fe-test/tree/main)
- **Loom Video**: [Your 3-minute walkthrough video](https://www.loom.com/share/b9582eea3c064f429cab6332215e5460)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)

## ✨ Features

### Authentication
- Secure login with email and password validation
- Form validation with real-time error messages
- Session persistence using localStorage
- Protected routes for authenticated users

### User Management Dashboard
- Display of 500+ users from mock API
- Statistics cards showing key metrics (Total Users, Active Users, Users with Loans, Users with Savings)
- Sortable and filterable user table
- Advanced filtering by organization, username, email, phone, date, and status
- Pagination with customizable page size (10, 20, 50, 100 per page)
- User status badges (Active, Inactive, Pending, Blacklisted)

### User Details
- Comprehensive user profile view
- Multiple information tabs (General Details, Documents, Bank Details, Loans, Savings, App & System)
- User action buttons (Blacklist/Activate)
- Data persistence with localStorage
- Navigation back to users list

### Responsive Design
- Mobile-first approach
- Fully responsive across all devices (mobile, tablet, desktop)
- Collapsible sidebar navigation on mobile
- Touch-friendly interface elements

## 🛠 Tech Stack

- **React 18.2** - JavaScript library for building user interfaces
- **TypeScript 5.2** - Typed superset of JavaScript
- **Vite 5.0** - Next-generation frontend build tool
- **SCSS** - CSS preprocessor for advanced styling
- **React Router 6** - Client-side routing
- **Vitest** - Unit testing framework
- **React Testing Library** - Testing utilities for React

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lendsqr-fe-test.git
cd lendsqr-fe-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── assets/              # Images, icons, and static files
├── components/          # Reusable components
│   ├── Dashboard/      # Dashboard-specific components
│   ├── Navbar/         # Navigation bar
│   ├── Sidebar/        # Sidebar navigation
│   └── Users/          # User-related components
├── context/            # React Context providers
├── pages/              # Page components
│   ├── Login/         # Login page
│   ├── Users/         # Users list page
│   └── UserDetails/   # User details page
|   
├── services/           # API services and utilities
├── types/              # TypeScript type definitions
├── abstracts/          # SCSS variables and mixins
└── App.tsx            # Main application component
```

## 🧪 Testing

This project includes comprehensive unit tests covering positive and negative scenarios.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- **37 unit tests** covering critical functionality
- **19 positive scenario tests** - Testing expected behavior
- **18 negative scenario tests** - Testing error handling and edge cases

Test files:
- `src/services/storage.service.test.ts` - LocalStorage operations
- `src/pages/Login/Login.test.tsx` - Login form validation
- `src/pages/Users/Users.test.tsx` - Users page functionality

## 🎨 Design Decisions

### Architecture
- **Component-based architecture** - Modular and reusable components
- **Feature-based folder structure** - Related files grouped together
- **Separation of concerns** - Business logic in services, UI in components

### Styling
- **SCSS with BEM methodology** - Scalable and maintainable CSS
- **Design tokens** - Consistent colors, spacing, and typography
- **Mobile-first responsive design** - Optimized for all screen sizes

### State Management
- **Component state** - Using React hooks (useState, useEffect)
- **Context API** - For authentication state
- **localStorage** - For data persistence (as required)

### Data Flow
- **Mock API** - 500 users generated with realistic data
- **Service layer** - Centralized API calls and data operations
- **Type safety** - Full TypeScript coverage for data structures

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

Alternatively, use Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

1. Push your code to GitHub
2. Create a new site on [Netlify](https://netlify.com)
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy!

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## ✅ Assessment Requirements

This project fulfills all requirements:

- ✅ Built with React and TypeScript (mandatory)
- ✅ Styled with SCSS (mandatory)
- ✅ Four pages: Login, Dashboard/Users, User Details
- ✅ Mock API with 500 users
- ✅ localStorage for data persistence
- ✅ Fully responsive design
- ✅ Advanced filtering and pagination
- ✅ Comprehensive unit tests with positive and negative scenarios
- ✅ Clean code architecture
- ✅ Professional documentation

## 📝 Features Implementation

### Login Page
- Email and password validation
- Password visibility toggle
- Error handling and display
- Session management

### Users Page
- Statistics cards with key metrics
- Data table with all user information
- Multi-field filtering
- Pagination controls
- Status badges
- Action menu (View, Blacklist, Activate)

### User Details Page
- Complete user profile information
- Tabbed interface for different data sections
- User action buttons
- localStorage integration
- Back navigation

## 🔧 Development Notes

### Key Technologies
- **Vite** - Chosen for fast build times and excellent developer experience
- **TypeScript** - Ensures type safety and better code quality
- **SCSS** - Provides powerful styling capabilities with variables and mixins
- **Vitest** - Modern testing framework with great TypeScript support

### Design System
- Colors extracted from Figma design specifications
- Consistent spacing using SCSS variables
- Reusable SCSS mixins for common patterns
- Mobile-first responsive breakpoints

## 👤 Author

**Oluwaseun Robert**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: oluwaseunrobert44@gmail.com

## 📄 License

This project was created for the Lendsqr Frontend Engineer assessment.

## 🙏 Acknowledgments

- Lendsqr for the opportunity and design specifications

---

**Note**: This project demonstrates modern React development practices, clean code architecture, and comprehensive testing. All features are fully functional and tested.