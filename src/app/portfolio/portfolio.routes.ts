import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio.component').then(c => c.PortfolioComponent)
  }
];
