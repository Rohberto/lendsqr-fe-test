import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Users from './pages/Users/Users';
import UserDetails from './pages/UserDetails/UserDetails';

// protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// public Route wrapper (redirect to dashboard if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard/users" replace /> : <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* public routes */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      {/* protected dashboard routes */}
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      
      {/* User Details Route - NEW */}
      <Route
        path="/dashboard/users/:userId"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      
      {/* Redirect /dashboard to /dashboard/users */}
      <Route
        path="/dashboard"
        element={<Navigate to="/dashboard/users" replace />}
      />
      
      {/* 404 - Not Found */}
      <Route 
        path="*" 
        element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            404 - Page Not Found
          </div>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;