import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersAPI } from '../../services/users.api';
import  type { User } from '../../types/user.types';
import { StorageService } from '../../services/storage.service';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';


type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('general');

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // First check localStorage
      let userData = StorageService.getUser(userId);
      
      // If not in localStorage, fetch from API
      if (!userData) {
        userData = await UsersAPI.getUserById(userId);
        if (userData) {
          StorageService.saveUser(userData);
        }
      }
      
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlacklist = async () => {
    if (!user) return;
    try {
      await UsersAPI.updateUserStatus(user.id, 'Blacklisted');
      const updatedUser = { ...user, status: 'Blacklisted' as const };
      setUser(updatedUser);
      StorageService.saveUser(updatedUser);
    } catch (error) {
      console.error('Error blacklisting user:', error);
    }
  };

  const handleActivate = async () => {
    if (!user) return;
    try {
      await UsersAPI.updateUserStatus(user.id, 'Active');
      const updatedUser = { ...user, status: 'Active' as const };
      setUser(updatedUser);
      StorageService.saveUser(updatedUser);
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const renderStars = (tier: number) => {
    return (
      <div className="stars">
        {[1, 2, 3].map((star) => (
          <span key={star} className={star <= tier ? 'filled' : 'empty'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="user-details-page">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading user details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="user-details-page">
          <div className="error-state">
            <p>User not found</p>
            <button onClick={() => navigate('/users')} className="back-button">
              Back to Users
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="user-details-page">
        {/* Back Button */}
        <button className="back-link" onClick={() => navigate('/dashboard/users')}>
          <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
            <path d="M0.94997 5.35639C0.994502 5.47123 1.0613 5.57594 1.14684 5.66498L4.89684 9.41498C5.07263 9.5908 5.31285 9.68946 5.56248 9.68946C5.81211 9.68946 6.05233 9.5908 6.22812 9.41498C6.40394 9.23919 6.50259 8.99897 6.50259 8.74934C6.50259 8.49971 6.40394 8.25949 6.22812 8.0837L3.6278 5.49935H26.5312C27.0767 5.49935 27.5312 5.04479 27.5312 4.49935C27.5312 3.95392 27.0767 3.49935 26.5312 3.49935H3.6278L6.22812 0.915038C6.40394 0.739251 6.50259 0.499034 6.50259 0.249403C6.50259 -0.000227984 6.40394 -0.240445 6.22812 -0.416231C6.05233 -0.592017 5.81211 -0.690674 5.56248 -0.690674C5.31285 -0.690674 5.07263 -0.592017 4.89684 -0.416231L1.14684 3.33377C1.0613 3.42281 0.994502 3.52751 0.94997 3.64236C0.901939 3.75818 0.876627 3.88202 0.874989 4.00721C0.873351 4.1324 0.895405 4.25689 0.94997 4.37639Z" fill="#545F7D"/>
          </svg>
          Back to Users
        </button>

        {/* Header Section */}
        <div className="user-header">
          <h1 className="page-title">User Details</h1>
          <div className="action-buttons">
            <button className="blacklist-btn" onClick={handleBlacklist}>
              BLACKLIST USER
            </button>
            <button className="activate-btn" onClick={handleActivate}>
              ACTIVATE USER
            </button>
          </div>
        </div>

        {/* User Summary Card */}
        <div className="user-summary-card">
          <div className="user-info-section">
            <div className="user-avatar-section">
              <div className="user-avatar">
                <img 
                 src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'default')}&size=128&background=random&rounded=true&bold=true`}
                  alt={user.fullName}
                />
              </div>
              <div className="user-name-section">
                <h2 className="user-full-name">{user.fullName}</h2>
                <p className="user-id">{user.username}</p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="user-tier-section">
              <p className="tier-label">User's Tier</p>
              {renderStars(user.tier)}
            </div>

            <div className="divider"></div>

            <div className="user-bank-section">
              <h3 className="bank-balance">{user.accountBalance}</h3>
              <p className="bank-details">{user.accountNumber}/{user.bankName}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <button 
              className={`tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General Details
            </button>
            <button 
              className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button 
              className={`tab ${activeTab === 'bank' ? 'active' : ''}`}
              onClick={() => setActiveTab('bank')}
            >
              Bank Details
            </button>
            <button 
              className={`tab ${activeTab === 'loans' ? 'active' : ''}`}
              onClick={() => setActiveTab('loans')}
            >
              Loans
            </button>
            <button 
              className={`tab ${activeTab === 'savings' ? 'active' : ''}`}
              onClick={() => setActiveTab('savings')}
            >
              Savings
            </button>
            <button 
              className={`tab ${activeTab === 'app' ? 'active' : ''}`}
              onClick={() => setActiveTab('app')}
            >
              App and System
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className="user-details-content">
            {/* Personal Information */}
            <div className="info-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>FULL NAME</label>
                  <p>{user.fullName}</p>
                </div>
                <div className="info-item">
                  <label>PHONE NUMBER</label>
                  <p>{user.phoneNumber}</p>
                </div>
                <div className="info-item">
                  <label>EMAIL ADDRESS</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>BVN</label>
                  <p>{user.bvn}</p>
                </div>
                <div className="info-item">
                  <label>GENDER</label>
                  <p>{user.gender}</p>
                </div>
                <div className="info-item">
                  <label>MARITAL STATUS</label>
                  <p>{user.maritalStatus}</p>
                </div>
                <div className="info-item">
                  <label>CHILDREN</label>
                  <p>{user.children}</p>
                </div>
                <div className="info-item">
                  <label>TYPE OF RESIDENCE</label>
                  <p>{user.typeOfResidence}</p>
                </div>
              </div>
            </div>

            {/* Education and Employment */}
            <div className="info-section">
              <h3 className="section-title">Education and Employment</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>LEVEL OF EDUCATION</label>
                  <p>{user.levelOfEducation}</p>
                </div>
                <div className="info-item">
                  <label>EMPLOYMENT STATUS</label>
                  <p>{user.employmentStatus}</p>
                </div>
                <div className="info-item">
                  <label>SECTOR OF EMPLOYMENT</label>
                  <p>{user.sectorOfEmployment}</p>
                </div>
                <div className="info-item">
                  <label>DURATION OF EMPLOYMENT</label>
                  <p>{user.durationOfEmployment}</p>
                </div>
                <div className="info-item">
                  <label>OFFICE EMAIL</label>
                  <p>{user.officeEmail}</p>
                </div>
                <div className="info-item">
                  <label>MONTHLY INCOME</label>
                  <p>{user.monthlyIncome}</p>
                </div>
                <div className="info-item">
                  <label>LOAN REPAYMENT</label>
                  <p>{user.loanRepayment}</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="info-section">
              <h3 className="section-title">Socials</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>TWITTER</label>
                  <p>{user.twitter}</p>
                </div>
                <div className="info-item">
                  <label>FACEBOOK</label>
                  <p>{user.facebook}</p>
                </div>
                <div className="info-item">
                  <label>INSTAGRAM</label>
                  <p>{user.instagram}</p>
                </div>
              </div>
            </div>

            {/* Guarantor */}
            <div className="info-section">
              <h3 className="section-title">Guarantor</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>FULL NAME</label>
                  <p>{user.guarantor.fullName}</p>
                </div>
                <div className="info-item">
                  <label>PHONE NUMBER</label>
                  <p>{user.guarantor.phoneNumber}</p>
                </div>
                <div className="info-item">
                  <label>EMAIL ADDRESS</label>
                  <p>{user.guarantor.email}</p>
                </div>
                <div className="info-item">
                  <label>RELATIONSHIP</label>
                  <p>{user.guarantor.relationship}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="user-details-content">
            <div className="empty-state">
              <p>No documents available</p>
            </div>
          </div>
        )}

        {activeTab === 'bank' && (
          <div className="user-details-content">
            <div className="info-section">
              <h3 className="section-title">Bank Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>BANK NAME</label>
                  <p>{user.bankName}</p>
                </div>
                <div className="info-item">
                  <label>ACCOUNT NUMBER</label>
                  <p>{user.accountNumber}</p>
                </div>
                <div className="info-item">
                  <label>ACCOUNT BALANCE</label>
                  <p>{user.accountBalance}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="user-details-content">
            <div className="empty-state">
              <p>No loan information available</p>
            </div>
          </div>
        )}

        {activeTab === 'savings' && (
          <div className="user-details-content">
            <div className="empty-state">
              <p>No savings information available</p>
            </div>
          </div>
        )}

        {activeTab === 'app' && (
          <div className="user-details-content">
            <div className="empty-state">
              <p>No app and system information available</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;