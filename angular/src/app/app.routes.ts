import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home ('/') redirects to the lab showcase, mirroring Blazor Home.razor.
  { path: '', pathMatch: 'full', redirectTo: 'lab' },
  { path: 'lab', loadChildren: () => import('./lab/lab.routes').then((m) => m.LAB_ROUTES) },
  { path: 'not-found', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
  { path: '**', redirectTo: 'not-found' },
];
