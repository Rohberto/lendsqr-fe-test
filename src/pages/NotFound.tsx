import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from '../assets/Images/404.svg'; 

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard/users');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page">
        <div className="not-found-content">
          <div className="error-code">404</div>
          
          <div className="illustration">
            <img src={NotFoundImg} alt="Page not found illustration" />
          </div>
          
          <h1 className="error-title">Oops! Page Not Found</h1>
          
          <p className="error-message">
            The page you're looking for seems to have wandered off. 
            It might have been moved, deleted, or never existed in the first place.
          </p>
          
          <div className="action-buttons">
            <button className="btn-primary" onClick={handleGoHome}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Go to Dashboard
            </button>
            
            <button className="btn-secondary" onClick={handleGoBack}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go Back
            </button>
          </div>
          
          <div className="helpful-links">
            <p className="links-title">You might want to check:</p>
            <ul className="links-list">
              <li><a href="/dashboard/users">Users</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>

      </div>
    </div>
  );
};

export default NotFound;