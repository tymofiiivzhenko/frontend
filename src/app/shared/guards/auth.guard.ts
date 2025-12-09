import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  alert('Будь ласка, увійдіть до системи, щоб отримати доступ до цієї сторінки');
  router.navigate(['/login']);
  return false;
};
