import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StorageService } from './storage.service';
import type { User } from '../types/user.types';

const mockUser: User = {
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
};

describe('StorageService - Positive Scenarios', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should save a user to localStorage', () => {
    StorageService.saveUser(mockUser);

    const savedData = localStorage.getItem('lendsqr_user_details');
    expect(savedData).not.toBeNull();

    const parsedData = JSON.parse(savedData!);
    expect(parsedData['user_1']).toEqual(mockUser);
  });

  it('should retrieve a saved user from localStorage', () => {
    StorageService.saveUser(mockUser);

    const retrievedUser = StorageService.getUser('user_1');
    expect(retrievedUser).toEqual(mockUser);
  });

  it('should save multiple users to localStorage', () => {
    const user2: User = { ...mockUser, id: 'user_2', username: 'janedoe' };
    const user3: User = { ...mockUser, id: 'user_3', username: 'bobsmith' };

    StorageService.saveUser(mockUser);
    StorageService.saveUser(user2);
    StorageService.saveUser(user3);

    const allUsers = StorageService.getAllUsers();
    expect(Object.keys(allUsers).length).toBe(3);
    expect(allUsers['user_1']).toEqual(mockUser);
    expect(allUsers['user_2']).toEqual(user2);
    expect(allUsers['user_3']).toEqual(user3);
  });

  it('should update existing user when saved again', () => {
    StorageService.saveUser(mockUser);

    const updatedUser = { ...mockUser, status: 'Inactive' as const };
    StorageService.saveUser(updatedUser);

    const retrievedUser = StorageService.getUser('user_1');
    expect(retrievedUser?.status).toBe('Inactive');
  });

  it('should remove a user from localStorage', () => {
    StorageService.saveUser(mockUser);
    expect(StorageService.getUser('user_1')).not.toBeNull();

    StorageService.removeUser('user_1');
    expect(StorageService.getUser('user_1')).toBeNull();
  });

  it('should clear all users from localStorage', () => {
    const user2: User = { ...mockUser, id: 'user_2' };
    StorageService.saveUser(mockUser);
    StorageService.saveUser(user2);

    StorageService.clearAll();

    const allUsers = StorageService.getAllUsers();
    expect(Object.keys(allUsers).length).toBe(0);
  });

  it('should return all users as an object', () => {
    const user2: User = { ...mockUser, id: 'user_2', username: 'janedoe' };
    StorageService.saveUser(mockUser);
    StorageService.saveUser(user2);

    const allUsers = StorageService.getAllUsers();
    expect(allUsers).toBeInstanceOf(Object);
    expect(allUsers['user_1']).toBeDefined();
    expect(allUsers['user_2']).toBeDefined();
  });

  it('should preserve user data structure when saving and retrieving', () => {
    StorageService.saveUser(mockUser);
    const retrievedUser = StorageService.getUser('user_1');

    expect(retrievedUser).toEqual(mockUser);
    expect(retrievedUser?.guarantor).toEqual(mockUser.guarantor);
    expect(retrievedUser?.tier).toBe(mockUser.tier);
  });
});

describe('StorageService - Negative Scenarios', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should return null when user does not exist', () => {
    const user = StorageService.getUser('non_existent_user');
    expect(user).toBeNull();
  });

  it('should return empty object when no users are stored', () => {
    const allUsers = StorageService.getAllUsers();
    expect(allUsers).toEqual({});
    expect(Object.keys(allUsers).length).toBe(0);
  });

  it('should handle localStorage errors gracefully when saving', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock localStorage.setItem to throw error
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    StorageService.saveUser(mockUser);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error saving user to localStorage:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should handle localStorage errors gracefully when getting', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock localStorage.getItem to throw error
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });

    const user = StorageService.getUser('user_1');

    expect(user).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should handle corrupted localStorage data gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Set invalid JSON in localStorage
    localStorage.setItem('lendsqr_user_details', 'invalid json {]');

    const allUsers = StorageService.getAllUsers();

    expect(allUsers).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error parsing localStorage data:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should handle removing non-existent user gracefully', () => {
    StorageService.removeUser('non_existent_user');

    // Should not throw error
    const allUsers = StorageService.getAllUsers();
    expect(allUsers).toEqual({});
  });

  it('should handle clearing empty localStorage gracefully', () => {
    StorageService.clearAll();

    // Should not throw error
    const allUsers = StorageService.getAllUsers();
    expect(allUsers).toEqual({});
  });

  it('should handle localStorage quota exceeded error', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock setItem to simulate quota exceeded
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      const error = new Error('QuotaExceededError');
      error.name = 'QuotaExceededError';
      throw error;
    });

    StorageService.saveUser(mockUser);

    expect(consoleSpy).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  it('should handle null or undefined user data', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Try to save null/undefined
    StorageService.saveUser(null as any);

    // Should handle gracefully (might error, but shouldn't crash)
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should return null for empty string userId', () => {
    const user = StorageService.getUser('');
    expect(user).toBeNull();
  });

  it('should handle special characters in userId', () => {
    const specialUser = { ...mockUser, id: 'user@#$%^&*()' };
    
    StorageService.saveUser(specialUser);
    const retrievedUser = StorageService.getUser('user@#$%^&*()');

    expect(retrievedUser).toEqual(specialUser);
  });
});