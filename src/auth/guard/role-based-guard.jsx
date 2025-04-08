export function RoleBasedGuard({children, currentRole, acceptRoles }) {
  if (typeof acceptRoles !== 'undefined' && acceptRoles.includes(currentRole)) return children;
}
