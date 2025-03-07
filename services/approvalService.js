import { mockApprovals, mockFlowTemplates } from './mockData';

export const approvalService = {
  // Get all approvals with optional filters
  getApprovals: async (filters = {}) => {
    let approvals = [...mockApprovals];
    
    // Apply filters
    if (filters.status) {
      approvals = approvals.filter(a => a.status === filters.status);
    }
    if (filters.department) {
      approvals = approvals.filter(a => a.department === filters.department);
    }
    if (filters.requestedBy) {
      approvals = approvals.filter(a => a.requestedBy === filters.requestedBy);
    }

    return approvals;
  },

  // Get single approval by ID
  getApprovalById: async (id) => {
    const approval = mockApprovals.find(a => a.id === id);
    if (!approval) throw new Error('Approval not found');
    return approval;
  },

  // Create new approval request
  createApproval: async (approvalData) => {
    const newApproval = {
      id: String(mockApprovals.length + 1),
      status: 'pending',
      createdAt: new Date().toISOString(),
      approvalFlow: [],
      ...approvalData
    };
    mockApprovals.push(newApproval);
    return newApproval;
  },

  // Update approval status
  updateApprovalStatus: async (id, { status, comment, approvedBy }) => {
    const approval = mockApprovals.find(a => a.id === id);
    if (!approval) throw new Error('Approval not found');
    
    approval.status = status;
    approval.lastUpdatedAt = new Date().toISOString();
    
    if (approval.approvalFlow.length > 0) {
      const currentStep = approval.approvalFlow.find(step => step.status === 'pending');
      if (currentStep) {
        currentStep.status = status;
        currentStep.approvedBy = approvedBy;
        currentStep.approvedAt = new Date().toISOString();
        currentStep.comment = comment;
      }
    }

    return approval;
  },

  // Get available flow templates
  getFlowTemplates: async () => {
    return mockFlowTemplates;
  },

  // Get approval statistics
  getStatistics: async (userId = null) => {
    let approvals = mockApprovals;
    if (userId) {
      approvals = approvals.filter(a => a.requestedBy === userId);
    }

    return {
      total: approvals.length,
      pending: approvals.filter(a => a.status === 'pending').length,
      approved: approvals.filter(a => a.status === 'approved').length,
      rejected: approvals.filter(a => a.status === 'rejected').length,
    };
  }
};