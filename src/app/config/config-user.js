/**
 * @type {{ value: import('@prisma/client').Status, label: string }[]}
 */
export const USER_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'BLOCKED', label: 'Blocked' },
];
