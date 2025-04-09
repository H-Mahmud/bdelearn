export function RoleBasedGuard({children, currentRole, acceptRoles }) {
   return acceptRoles !== undefined && Object.values(acceptRoles).includes(currentRole) ? children : null;
}
