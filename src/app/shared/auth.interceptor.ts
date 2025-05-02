import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { variables } from '../variables';

export function tokenGetter() {
  return sessionStorage.getItem(variables.TOKEN_NAME);
}

export const AuthInterceptorFn: HttpInterceptorFn = (request, next) => {
  const token = tokenGetter(); // o donde almacenes el token

  if (token) {
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }
  return next(request);
};
