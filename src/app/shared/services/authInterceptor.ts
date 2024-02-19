import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistanceService } from './persistance.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceServise = inject(PersistanceService);
  const token = persistanceServise.get('accessToken');
  const modifiedReq = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  })
  return next(modifiedReq)
};
