import { HttpInterceptorFn } from '@angular/common/http';

const API_BASE_URL = 'http://localhost:3000';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const isAbsolute = req.url.startsWith('http://') || req.url.startsWith('https://');

  const apiReq = isAbsolute
    ? req
    : req.clone({ url: `${API_BASE_URL}${req.url}` });

  return next(apiReq);
};
