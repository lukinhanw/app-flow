import { mockNotifications } from './mockData';

export const notificationService = {
  // Get user notifications
  getUserNotifications: async (userId) => {
    return mockNotifications.filter(n => n.userId === userId);
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      return notification;
    }
    throw new Error('Notification not found');
  },

  // Create new notification
  createNotification: async (notificationData) => {
    const newNotification = {
      id: String(mockNotifications.length + 1),
      read: false,
      createdAt: new Date().toISOString(),
      ...notificationData
    };
    mockNotifications.push(newNotification);
    return newNotification;
  },

  // Get unread count
  getUnreadCount: async (userId) => {
    return mockNotifications.filter(n => n.userId === userId && !n.read).length;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const index = mockNotifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      mockNotifications.splice(index, 1);
      return true;
    }
    return false;
  }
};