import type { User, UserStats, UserFilterParams, PaginationParams } from '../types/user.types';
import { mockUsers, mockStats } from './mockData';

// simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class UsersAPI {
 
  static async getUsers(
    page: number = 1,
    limit: number = 10,
    filters?: UserFilterParams
  ): Promise<{ users: User[]; pagination: PaginationParams }> {
    await delay(300); 
    
    let filteredUsers = [...mockUsers];
    
    // Apply filters
    if (filters) {
      if (filters.organization) {
        filteredUsers = filteredUsers.filter(u => 
          u.organization.toLowerCase().includes(filters.organization!.toLowerCase())
        );
      }
      if (filters.username) {
        filteredUsers = filteredUsers.filter(u => 
          u.username.toLowerCase().includes(filters.username!.toLowerCase())
        );
      }
      if (filters.email) {
        filteredUsers = filteredUsers.filter(u => 
          u.email.toLowerCase().includes(filters.email!.toLowerCase())
        );
      }
      if (filters.phoneNumber) {
        filteredUsers = filteredUsers.filter(u => 
          u.phoneNumber.includes(filters.phoneNumber!)
        );
      }
      if (filters.status) {
        filteredUsers = filteredUsers.filter(u => u.status === filters.status);
      }
      if (filters.date) {
        filteredUsers = filteredUsers.filter(u => 
          u.dateJoined.includes(filters.date!)
        );
      }
    }
    
    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const users = filteredUsers.slice(startIndex, endIndex);
    
    return {
      users,
      pagination: {
        page,
        limit,
        total
      }
    };
  }
  
  /**
   * get single user by ID
   */
  static async getUserById(id: string): Promise<User | null> {
    await delay(200);
    return mockUsers.find(u => u.id === id) || null;
  }
  
  /**
   * get user statistics
   */
  static async getStats(): Promise<UserStats> {
    await delay(100);
    return mockStats;
  }
  
  /**
   * update user status (blacklist/activate)
   */
  static async updateUserStatus(id: string, status: User['status']): Promise<User | null> {
    await delay(300);
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      user.status = status;
    }
    return user || null;
  }
}