/*
 * API KEYS UTILS
 */
export const REQUIRED_PERMISSIONS = [
  'characters',
  'account',
  'progression'
];

export function validatePermissions(permissions) {
  toastr.info('Checking key permissions');

  let hasRequiredPermissions = true;

  REQUIRED_PERMISSIONS.forEach(function(perm) {
    if(permissions.indexOf(perm) == -1) {
      hasRequiredPermissions = false;
    }
  });

  return hasRequiredPermissions;
}