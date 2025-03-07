// Mock data for the application
export const mockUsers = [
  { id: '1', name: 'John Admin', email: 'john@admin.com', role: 'admin', department: 'IT' },
  { id: '2', name: 'Sarah User', email: 'sarah@user.com', role: 'user', department: 'Marketing' },
  { id: '3', name: 'Mike Admin', email: 'mike@admin.com', role: 'admin', department: 'Finance' },
];

export const mockApprovals = [
  {
    id: '1',
    title: 'Marketing Campaign Budget',
    description: 'Approval needed for Q2 marketing campaign budget allocation',
    requestedBy: '2',
    amount: 50000,
    department: 'Marketing',
    status: 'pending',
    createdAt: '2024-02-15T10:30:00Z',
    documents: ['budget.pdf', 'timeline.pdf'],
    approvalFlow: [
      { step: 1, role: 'manager', status: 'approved', approvedBy: 'Jane Manager', approvedAt: '2024-02-16T14:20:00Z' },
      { step: 2, role: 'director', status: 'pending', approvedBy: null, approvedAt: null }
    ]
  },
  {
    id: '2',
    title: 'New Software License',
    description: 'Request for development team software licenses',
    requestedBy: '1',
    amount: 12000,
    department: 'IT',
    status: 'approved',
    createdAt: '2024-02-10T08:15:00Z',
    documents: ['quote.pdf'],
    approvalFlow: [
      { step: 1, role: 'manager', status: 'approved', approvedBy: 'John Manager', approvedAt: '2024-02-11T09:00:00Z' },
      { step: 2, role: 'director', status: 'approved', approvedBy: 'Sarah Director', approvedAt: '2024-02-12T11:30:00Z' }
    ]
  },
  {
    id: '3',
    title: 'Office Equipment',
    description: 'New monitors and keyboards for the design team',
    requestedBy: '2',
    amount: 8000,
    department: 'Design',
    status: 'rejected',
    createdAt: '2024-02-08T15:45:00Z',
    documents: ['equipment_list.pdf', 'quotation.pdf'],
    approvalFlow: [
      { step: 1, role: 'manager', status: 'rejected', approvedBy: 'Mike Manager', approvedAt: '2024-02-09T10:20:00Z' }
    ]
  }
];

export const mockNotifications = [
  {
    id: '1',
    userId: '1',
    title: 'New Approval Request',
    message: 'Marketing Campaign Budget needs your approval',
    type: 'approval_request',
    read: false,
    createdAt: '2024-02-15T10:31:00Z',
    relatedId: '1'
  },
  {
    id: '2',
    userId: '2',
    title: 'Request Approved',
    message: 'Your software license request has been approved',
    type: 'approval_complete',
    read: true,
    createdAt: '2024-02-12T11:31:00Z',
    relatedId: '2'
  }
];

export const mockFlowTemplates = [
  {
    id: '1',
    name: 'Standard Two-Level Approval',
    description: 'Basic approval flow with manager and director approval',
    steps: [
      { level: 1, role: 'manager', name: 'Manager Approval' },
      { level: 2, role: 'director', name: 'Director Approval' }
    ]
  },
  {
    id: '2',
    name: 'High-Value Purchase Approval',
    description: 'Extended approval flow for high-value purchases',
    steps: [
      { level: 1, role: 'manager', name: 'Manager Review' },
      { level: 2, role: 'finance', name: 'Finance Review' },
      { level: 3, role: 'director', name: 'Director Approval' },
      { level: 4, role: 'cfo', name: 'CFO Approval' }
    ]
  }
];