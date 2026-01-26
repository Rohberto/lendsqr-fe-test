// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
//import Dashboard from './pages/Dashboard'; // placeholder for now
//import Users from './pages/Users'; // placeholder
// ... other pages later

function App() {
  // Mock auth state (later use context or zustand)
  const isAuthenticated = false; // change to true for testing protected routes

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - redirect if not auth *
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />}
        />
        /}

        {/* Redirect root to login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* For Missing Pages - 404 error*/}
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;