import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersAPI } from '../../services/users.api';
import type { User, UserStats, UserFilterParams } from '../../types/user.types';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import StatsCard from '../../components/Dashboard/Statscard';
import UsersTable from '../../components/Users/UsersTable';
import ActiveUsersIcon from "../../assets/Icons/users1.svg";
import UsersIcon from "../../assets/Icons/users.svg";
import LoanIcon from "../../assets/Icons/loan.svg";
import MoneyIcon from "../../assets/Icons/money.svg";
import Pagination from '../../components/Users/Pagination';

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers]=useState(0);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<UserFilterParams>({});
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  
  useEffect(() => {
    fetchData();
    fetchStats();
  }, [currentPage, itemsPerPage, filters]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await UsersAPI.getUsers(currentPage, itemsPerPage, filters);
      setUsers(response.users);
      setTotalUsers(response.pagination.total);
      setTotalPages(Math.ceil(response.pagination.total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchStats = async () => {
    try {
      const statsData = await UsersAPI.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  
  const handleFilterApply = (newFilters: UserFilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setShowFilterPopup(false);
  };
  
  const handleFilterReset = () => {
    setFilters({});
    setCurrentPage(1);
    setShowFilterPopup(false);
  };
  
  const handleUserClick = (userId: string) => {
    navigate(`/dashboard/users/${userId}`);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };
  
  return (
    <DashboardLayout>
      <div className="users-page">
        <h1 className="page-title">Users</h1>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <StatsCard
            icon={UsersIcon}
            title="USERS"
            value={stats?.totalUsers.toLocaleString() || '0'}
            color="pink"
          />
          <StatsCard
            icon={ActiveUsersIcon}
            title="ACTIVE USERS"
            value={stats?.activeUsers.toLocaleString() || '0'}
            color="purple"
          />
          <StatsCard
            icon={LoanIcon}
            title="USERS WITH LOANS"
            value={stats?.usersWithLoans.toLocaleString() || '0'}
            color="orange"
          />
          <StatsCard
            icon={MoneyIcon}
            title="USERS WITH SAVINGS"
            value={stats?.usersWithSavings.toLocaleString() || '0'}
            color="red"
          />
        </div>
        
        {/* Users Table   */}
        <UsersTable
          users={users}
          loading={loading}
          onUserClick={handleUserClick}
          onFilterClick={() => setShowFilterPopup(prev => !prev)}
          showFilterPopup={showFilterPopup}
            filters={filters}
            onApply={handleFilterApply}
            onReset={handleFilterReset}
            onClose={() => setShowFilterPopup(false)}
        />

        <Pagination 
        currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          totalUsers={totalUsers}
        onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Users;