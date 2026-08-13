/**
 * Determines the appropriate navigation path based on user role
 * @param role - The user's role (office_admin, hr_admin, super_admin)
 * @returns The path where the user should be navigated after login
 */
export const getRoleBasedNavigationPath = (role: string): string => {
  switch (role) {
    case 'super_admin':
      return '/admin/overview'
    case 'hr_admin':
      return '/admin/queue/monitor'
    case 'office_admin':
      return '/admin/queue/monitor'
    default:
      // Safe fallback for unknown roles
      return '/admin/queue/monitor'
  }
}
