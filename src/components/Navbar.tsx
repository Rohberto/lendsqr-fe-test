import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../assets/Images/logo.png';
import BellIcon from "../assets/Icons/bell.svg";
import Dp from "../assets/Images/dp.png";

interface NavbarProps {
  onMenuToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard/users" className="navbar-logo">
          <img src={LogoImg} alt="Lendsqr" />
        </Link>
      </div>

      <div className='navbar-center'>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11C6.74423 11 7.88126 10.5892 8.78779 9.89682L12.4458 13.5548C12.7386 13.8476 13.2115 13.8476 13.5043 13.5548C13.797 13.262 13.797 12.7892 13.5043 12.4964L9.84632 8.83839C10.5387 7.93186 10.9495 6.79483 10.9495 5.55061C10.9495 2.51304 8.48697 0.050598 5.44939 0.050598L5.5 0ZM5.5 1.5C7.71914 1.5 9.5 3.28086 9.5 5.5C9.5 7.71914 7.71914 9.5 5.5 9.5C3.28086 9.5 1.5 7.71914 1.5 5.5C1.5 3.28086 3.28086 1.5 5.5 1.5Z" fill="white"/>
            </svg>
          </button>
        </form>
      </div>
      
      <div className="navbar-right">
        <Link to="/docs" className="nav-link docs-link">
          Docs
        </Link>
        
        <button 
          className="notification-button"
          onClick={() => setShowNotifications(!showNotifications)}
          aria-label="Notifications"
        >
          <img src={BellIcon} alt='Bell Icon'/>
          {showNotifications && <span className="notification-badge">3</span>}
        </button>
        
        <div className="profile-section">
          <button
            className="profile-button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-avatar">
              <img src={Dp} alt="User avatar" />
            </div>
            <span className="profile-name">Adedeji</span>
            <svg className="dropdown-icon" width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M4 6L0.535898 0.75L7.4641 0.75L4 6Z" fill="#213F7D"/>
            </svg>
          </button>
          
          {showProfileMenu && (
            <div className="profile-dropdown">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <button className="dropdown-item logout">Logout</button>
            </div>
          )}
        </div>
        
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;