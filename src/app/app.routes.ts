import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'finance',
    loadChildren: () => import('./finance/finance.routes').then(r => r.routes)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.routes').then(r => r.routes)
  }
];
