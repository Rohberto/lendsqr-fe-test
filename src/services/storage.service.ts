import type { User } from '../types/user.types';

const STORAGE_KEY = 'lendsqr_user_details';

export class StorageService {

  static saveUser(user: User): void {
    try {
      const existingData = this.getAllUsers();
      existingData[user.id] = user;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }
  
  /**
   * get user details from localStorage
   */
  static getUser(userId: string): User | null {
    try {
      const data = this.getAllUsers();
      return data[userId] || null;
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
      return null;
    }
  }
  
  /**
   * get all users from localStorage
   */
  static getAllUsers(): Record<string, User> {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return {};
    }
  }
  
  /**
   * remove user from localStorage
   */
  static removeUser(userId: string): void {
    try {
      const data = this.getAllUsers();
      delete data[userId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  }
  
  /**
   * clear all users from localStorage
   */
  static clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}