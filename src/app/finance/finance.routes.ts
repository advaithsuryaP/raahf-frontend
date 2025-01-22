import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./finance.component').then((c) => c.FinanceComponent),
        children: [
            {
                path: 'transactions',
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
                        path: 'add',
                        loadComponent: () =>
                            import(
                                './transaction/transaction-edit/transaction-edit.component'
                            ).then((c) => c.TransactionEditComponent),
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
