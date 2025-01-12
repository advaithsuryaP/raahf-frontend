import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./finance.component').then(c => c.FinanceComponent)
  }
];
