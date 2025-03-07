import { mockUsers } from './mockData';

export const userService = {
  // Get user by ID
  getUserById: async (id) => {
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  // Get user by email
  getUserByEmail: async (email) => {
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error('User not found');
    return user;
  },

  // Get all users
  getUsers: async () => {
    return mockUsers;
  },

  // Get users by role
  getUsersByRole: async (role) => {
    return mockUsers.filter(u => u.role === role);
  },

  // Get users by department
  getUsersByDepartment: async (department) => {
    return mockUsers.filter(u => u.department === department);
  },

  // Update user profile
  updateUserProfile: async (userId, updateData) => {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    Object.assign(user, updateData);
    return user;
  }
};