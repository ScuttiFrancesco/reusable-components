import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login.component').then((m) => m.LoginComponent),
        data: { breadcrumb: 'Login' },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register.component').then((m) => m.RegisterComponent),
        data: { breadcrumb: 'Register' },
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register.component').then((m) => m.RegisterComponent),
    data: { breadcrumb: 'Register' },
  },
];
