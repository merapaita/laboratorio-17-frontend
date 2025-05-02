import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ServerErrorsInterceptorFn } from './shared/server-errors.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { variables } from './variables';
import { AuthInterceptorFn } from './shared/auth.interceptor';

export function tokenGetter() {
  return sessionStorage.getItem(variables.TOKEN_NAME);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([ServerErrorsInterceptorFn, AuthInterceptorFn])),
    // importProvidersFrom(
    //   HttpClientModule,
    //   JwtModule.forRoot({
    //     config: {
    //       tokenGetter: tokenGetter,
    //       allowedDomains: [`${variables.HOST.substring(7)}`],
    //       disallowedRoutes: [`http://${variables.HOST.substring(7)}/login/enviarCorreo`, `http://${variables.HOST.substring(7)}/oauth/token`],
    //     },
    //   }),
  ],
};
