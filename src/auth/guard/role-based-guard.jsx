export function RoleBasedGuard({children, currentRole, acceptRoles }) {
   return Object.values(acceptRoles).includes(currentRole) ? children : null;
}
