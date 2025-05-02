import { Routes } from '@angular/router';
import { Not404Component } from './pages/not404/not404.component';
//import { LayoutComponent } from './pages/layout/layout.component';
import { Layout2Component } from './pages/layout2/layout2.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { NuevoComponent } from './pages/login/nuevo/nuevo.component';

export const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'pages' },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    {
      path: 'recuperar',
      component: RecuperarComponent,
      // children: [{ path: ':token', component: TokenComponent }],
    },
    {
      //Keycloak
      path: 'nuevo-usuario',
      component: NuevoComponent,
    },
    {
      path: 'pages',
      component: Layout2Component,
      //      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      loadChildren: () =>
        import('./pages/pages-routes').then((m) => m.PagesRoutes),
    },
  
    { path: 'not-404', component: Not404Component },
    // {
    //   path: '**',
    //   redirectTo: 'not-404',
    // },  
];
