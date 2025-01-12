import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./finance.component').then((c) => c.FinanceComponent),
        children: [
            {
                path: 'transaction',
                loadComponent: () =>
                    import('./transaction/transaction.component').then(
                        (c) => c.TransactionComponent
                    ),
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                './transaction/transaction-list/transaction-list.component'
                            ).then((c) => c.TransactionListComponent),
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () =>
                            import(
                                './transaction/transaction-edit/transaction-edit.component'
                            ).then((c) => c.TransactionEditComponent),
                    },
                ],
            },
        ],
    },
];
