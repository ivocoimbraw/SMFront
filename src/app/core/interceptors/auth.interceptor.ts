import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Si recibimos un 401, redirigimos al usuario al login
          router.navigate(['/login']);
        }
        return throwError(() => new Error(error));
      })
    );
  }

  return next(req);
};
