import React, { useEffect, useRef } from 'react';
import { UsersAPI } from '../../services/users.api';
import ViewIcon from "../../assets/Icons/view.svg";
import ActivateIcon from "../../assets/Icons/activate.svg";
import DeleteIcon from "../../assets/Icons/blacklist.svg";

interface ActionMenuProps {
  userId: string;
  onClose: () => void;
  onViewDetails: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ userId, onClose, onViewDetails }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add a small delay to prevent immediate closing on mobile
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleBlacklist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await UsersAPI.updateUserStatus(userId, 'Blacklisted');
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error blacklisting user:', error);
    }
  };

  const handleActivate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await UsersAPI.updateUserStatus(userId, 'Active');
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails();
  };

  return (
    <div className="action-menu" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button className="action-menu-close" onClick={onClose} aria-label="Close menu">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#545F7D"/>
        </svg>
      </button>
      
      <button className="action-menu-item" onClick={handleViewDetails}>
        <img className="action-icon" src={ViewIcon} alt="" aria-hidden="true" />
        View Details
      </button>
      
      <button className="action-menu-item" onClick={handleBlacklist}>
        <img className="action-icon" src={DeleteIcon} alt="" aria-hidden="true" />
        Blacklist User
      </button>
      
      <button className="action-menu-item" onClick={handleActivate}>
        <img className="action-icon" src={ActivateIcon} alt="" aria-hidden="true" />
        Activate User
      </button>
    </div>
  );
};

export default ActionMenu;