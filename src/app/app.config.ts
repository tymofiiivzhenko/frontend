import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { apiBaseUrlInterceptor } from './shared/interceptors/api-base-url.interceptor';
import { authTokenInterceptor } from './shared/interceptors/auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiBaseUrlInterceptor, authTokenInterceptor])
    )
  ]
};
