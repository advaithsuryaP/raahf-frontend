import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'finance',
        loadChildren: () =>
            import('./modules/finance/finance.routes').then((r) => r.routes),
    },
    {
        path: 'portfolio',
        loadChildren: () =>
            import('./modules/portfolio/portfolio.routes').then(
                (r) => r.routes
            ),
    },
];
