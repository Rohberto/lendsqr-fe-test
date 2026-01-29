import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Users from './Users';
import { UsersAPI } from '../../services/users.api';
import type { User, UserStats } from '../../types/user.types';

// Mock the API
vi.mock('../../services/users.api');

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: true })
}));

// Mock DashboardLayout to avoid rendering Sidebar
vi.mock('../../components/Dashboard/DashboardLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Users Page - Positive Scenarios', () => {
  const mockUsers: User[] = [
    {
      id: 'user_1',
      organization: 'Lendsqr',
      username: 'johndoe',
      email: 'john@lendsqr.com',
      phoneNumber: '08012345678',
      dateJoined: 'May 15, 2020 10:00 AM',
      status: 'Active',
      fullName: 'John Doe',
      bvn: '12345678901',
      gender: 'Male',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: 'Own Apartment',
      levelOfEducation: 'B.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'FinTech',
      durationOfEmployment: '2 years',
      officeEmail: 'john@company.com',
      monthlyIncome: '₦200,000.00 - ₦400,000.00',
      loanRepayment: '40000',
      twitter: '@johndoe',
      facebook: 'John Doe',
      instagram: '@johndoe',
      guarantor: {
        fullName: 'Jane Doe',
        phoneNumber: '08087654321',
        email: 'jane@email.com',
        relationship: 'Sister'
      },
      tier: 2,
      bankName: 'GTBank',
      accountNumber: '0123456789',
      accountBalance: '₦500,000.00'
    }
  ];

  const mockStats: UserStats = {
    totalUsers: 500,
    activeUsers: 350,
    usersWithLoans: 125,
    usersWithSavings: 200
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default successful API responses
    vi.mocked(UsersAPI.getUsers).mockResolvedValue({
      users: mockUsers,
      pagination: { page: 1, limit: 10, total: 500 }
    });
    vi.mocked(UsersAPI.getStats).mockResolvedValue(mockStats);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the page title', async () => {
    renderWithRouter(<Users />);
    
    await waitFor(() => {
      const pageTitle = screen.getByRole('heading', { name: /users/i });
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('should display loading state initially', () => {
    renderWithRouter(<Users />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it('should fetch and display users after loading', async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(screen.getByText('johndoe')).toBeInTheDocument();
      expect(screen.getByText('john@lendsqr.com')).toBeInTheDocument();
    });
  });

  it('should display all four statistics cards', async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(screen.getByText('USERS')).toBeInTheDocument();
      expect(screen.getByText('ACTIVE USERS')).toBeInTheDocument();
      expect(screen.getByText('USERS WITH LOANS')).toBeInTheDocument();
      expect(screen.getByText('USERS WITH SAVINGS')).toBeInTheDocument();
    });
  });

  it('should display correct statistics values', async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('350')).toBeInTheDocument();
      expect(screen.getByText('125')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
    });
  });

  it('should display user status badge correctly', async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      const statusBadge = screen.getByText('Active');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('status-badge');
    });
  });

  it('should call API with correct parameters', async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(UsersAPI.getUsers).toHaveBeenCalledWith(1, 10, {});
      expect(UsersAPI.getStats).toHaveBeenCalled();
    });
  });
});

describe('Users Page - Negative Scenarios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle API error gracefully when fetching users fails', async () => {
    vi.mocked(UsersAPI.getUsers).mockRejectedValue(new Error('Network error'));
    vi.mocked(UsersAPI.getStats).mockResolvedValue({
      totalUsers: 0,
      activeUsers: 0,
      usersWithLoans: 0,
      usersWithSavings: 0
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching users:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('should handle empty users list', async () => {
    vi.mocked(UsersAPI.getUsers).mockResolvedValue({
      users: [],
      pagination: { page: 1, limit: 10, total: 0 }
    });
    vi.mocked(UsersAPI.getStats).mockResolvedValue({
      totalUsers: 0,
      activeUsers: 0,
      usersWithLoans: 0,
      usersWithSavings: 0
    });

    renderWithRouter(<Users />);

    await waitFor(() => {
      const statsCards = screen.getAllByText('0');
      expect(statsCards.length).toBeGreaterThan(0);
    });
  });

  it('should handle stats API failure', async () => {
    vi.mocked(UsersAPI.getUsers).mockResolvedValue({
      users: [],
      pagination: { page: 1, limit: 10, total: 0 }
    });
    vi.mocked(UsersAPI.getStats).mockRejectedValue(new Error('Stats API failed'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching stats:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});