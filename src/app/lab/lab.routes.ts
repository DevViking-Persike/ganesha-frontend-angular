import { Routes } from '@angular/router';

/**
 * Lazy routes for the Design Lab showcase. Paths mirror the @page routes of
 * the Blazor Lab pages (LabHome → '/lab', LabColors → '/lab/colors', ...).
 * Cada página vive em pages/<kebab>/gns-lab-<kebab>.ts.
 */
export const LAB_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/lab-layout').then((m) => m.LabLayout),
    children: [
      { path: '', loadComponent: () => import('./pages/lab-home/gns-lab-home').then((m) => m.LabHome) },
      { path: 'colors', loadComponent: () => import('./pages/lab-colors/gns-lab-colors').then((m) => m.LabColors) },
      {
        path: 'typography',
        loadComponent: () => import('./pages/lab-typography/gns-lab-typography').then((m) => m.LabTypography),
      },
      { path: 'spacing', loadComponent: () => import('./pages/lab-spacing/gns-lab-spacing').then((m) => m.LabSpacing) },
      { path: 'shadows', loadComponent: () => import('./pages/lab-shadows/gns-lab-shadows').then((m) => m.LabShadows) },
      { path: 'buttons', loadComponent: () => import('./pages/lab-buttons/gns-lab-buttons').then((m) => m.LabButtons) },
      { path: 'forms', loadComponent: () => import('./pages/lab-forms/gns-lab-forms').then((m) => m.LabForms) },
      {
        path: 'data-display',
        loadComponent: () => import('./pages/lab-data-display/gns-lab-data-display').then((m) => m.LabDataDisplay),
      },
      { path: 'feedback', loadComponent: () => import('./pages/lab-feedback/gns-lab-feedback').then((m) => m.LabFeedback) },
      {
        path: 'navigation',
        loadComponent: () => import('./pages/lab-navigation/gns-lab-navigation').then((m) => m.LabNavigation),
      },
      { path: 'surfaces', loadComponent: () => import('./pages/lab-surfaces/gns-lab-surfaces').then((m) => m.LabSurfaces) },
      { path: 'overlays', loadComponent: () => import('./pages/lab-overlays/gns-lab-overlays').then((m) => m.LabOverlays) },
      { path: 'charts', loadComponent: () => import('./pages/lab-charts/gns-lab-charts').then((m) => m.LabCharts) },
      { path: 'grid', loadComponent: () => import('./pages/lab-grid/gns-lab-grid').then((m) => m.LabGrid) },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/lab-dashboard/gns-lab-dashboard').then((m) => m.LabDashboard),
      },
      {
        path: 'table',
        loadComponent: () => import('./pages/lab-table-page/gns-lab-table-page').then((m) => m.LabTablePage),
      },
      { path: 'table-page', redirectTo: 'table' },
      {
        path: 'form-page',
        loadComponent: () => import('./pages/lab-form-page/gns-lab-form-page').then((m) => m.LabFormPage),
      },
      { path: 'profile', loadComponent: () => import('./pages/lab-profile/gns-lab-profile').then((m) => m.LabProfile) },
      { path: 'auth', loadComponent: () => import('./pages/lab-auth/gns-lab-auth').then((m) => m.LabAuth) },
    ],
  },
];
