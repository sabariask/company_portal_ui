import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const role = authService.getRole();
  const allowed = route.data['roles'];

  if(allowed?.includes(role)) return true;
  
  router.navigate(['/unauthorized']);
  return false;
};
