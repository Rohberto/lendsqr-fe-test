import React, { useState } from 'react';
import type { User } from '../../types/user.types';
import ActionMenu from './ActionMenu';
import FilterPopup from './FilterPopup';
import type { UserFilterParams } from '../../types/user.types';

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onUserClick: (userId: string) => void;
  onFilterClick: () => void;
  showFilterPopup: boolean;
  filters: UserFilterParams;
  onApply: (filters: UserFilterParams) => void;
  onReset: () => void;
  onClose: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  onUserClick,
  onFilterClick,
  showFilterPopup,
  filters,
  onApply,
  onReset,
  onClose
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getStatusClass = (status: User['status']) => {
    return status.toLowerCase().replace(' ', '-');
  };

  const toggleMenu = (userId: string) => {
    setActiveMenuId(activeMenuId === userId ? null : userId);
  };

  return (
    <div className="table-container">
      {/* Mobile Filter Button */}
      <div className="mobile-filter-header">
        <button className="mobile-filter-button" onClick={onFilterClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.22222 13.0001H9.77778V11.2223H6.22222V13.0001ZM0 3.00006V4.77784H16V3.00006H0ZM2.66667 8.44450H13.3333V6.66672H2.66667V8.44450Z" fill="#545F7D"/>
          </svg>
          <span>Filter Users</span>
        </button>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  ORGANIZATION
                  <button className="filter-button" onClick={onFilterClick}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.22222 13.0001H9.77778V11.2223H6.22222V13.0001ZM0 3.00006V4.77784H16V3.00006H0ZM2.66667 8.44450H13.3333V6.66672H2.66667V8.44450Z" fill="#545F7D"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  USERNAME
                  <button className="filter-button" onClick={onFilterClick}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.22222 13.0001H9.77778V11.2223H6.22222V13.0001ZM0 3.00006V4.77784H16V3.00006H0ZM2.66667 8.44450H13.3333V6.66672H2.66667V8.44450Z" fill="#545F7D"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  EMAIL
                  <button className="filter-button" onClick={onFilterClick}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.22222 13.0001H9.77778V11.2223H6.22222V13.0001ZM0 3.00006V4.77784H16V3.00006H0ZM2.66667 8.44450H13.3333V6.66672H2.66667V8.44450Z" fill="#545F7D"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  PHONE NUMBER
                  <button className="filter-button" onClick={onFilterClick}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.22222 13.0001H9.77778V11.2223H6.22222V13.0001ZM0 3.00006V4.77784H16V3.00006H0ZM2.66667 8.44450H13.3333V6.66672H2.66667V8.44450Z" fill="#545F7D"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  DATE JOINED
                  <button className="filter-button" onClick={onFilterClick}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.22222 13.0001H9.77778V11.2223H6.22222V13.0001ZM0 3.00006V4.77784H16V3.00006H0ZM2.66667 8.44450H13.3333V6.66672H2.66667V8.44450Z" fill="#545F7D"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  STATUS
                  <button className="filter-button" onClick={onFilterClick}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.22222 13.0001H9.77778V11.2223H6.22222V13.0001ZM0 3.00006V4.77784H16V3.00006H0ZM2.66667 8.44450H13.3333V6.66672H2.66667V8.44450Z" fill="#545F7D"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading users...</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td data-label="Organization" onClick={() => onUserClick(user.id)}>
                    {user.organization}
                  </td>
                  <td data-label="Username" onClick={() => onUserClick(user.id)}>
                    {user.username}
                  </td>
                  <td data-label="Email" onClick={() => onUserClick(user.id)}>
                    {user.email}
                  </td>
                  <td data-label="Phone Number" onClick={() => onUserClick(user.id)}>
                    {user.phoneNumber}
                  </td>
                  <td data-label="Date Joined" onClick={() => onUserClick(user.id)}>
                    {user.dateJoined}
                  </td>
                  <td data-label="Status" onClick={() => onUserClick(user.id)}>
                    <span className={`status-badge ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button
                        className="action-trigger"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          toggleMenu(user.id);
                        }}
                        aria-label="More actions"
                      >
                        <svg width="3" height="14" viewBox="0 0 4 18" fill="none">
                          <circle cx="2" cy="2" r="2" fill="#545F7D"/>
                          <circle cx="2" cy="9" r="2" fill="#545F7D"/>
                          <circle cx="2" cy="16" r="2" fill="#545F7D"/>
                        </svg>
                      </button>
                      {activeMenuId === user.id && (
                        <ActionMenu
                          userId={user.id}
                          onClose={() => setActiveMenuId(null)}
                          onViewDetails={() => onUserClick(user.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
         {showFilterPopup && (
          <FilterPopup
            filters={filters}
            onApply={onApply}
            onReset={onReset}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default UsersTable;