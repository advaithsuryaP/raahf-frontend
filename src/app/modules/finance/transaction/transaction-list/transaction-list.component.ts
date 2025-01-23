import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-transaction-list',
    imports: [
        DatePipe,
        CurrencyPipe,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
    ],
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'date',
        'activity',
        'category',
        'account',
        'value',
        'actions',
    ];
    dataSource = new MatTableDataSource<Transaction>(TRANSACTION_DATA);

    ngOnInit(): void {}

    editTransaction(id: string): void {
        // Navigate to the edit transaction page
    }

    deleteTransaction(id: string): void {
        // Delete the transaction
    }
}

export interface Transaction {
    id: string;
    date: string;
    activity: string;
    category: string;
    account: string;
    value: number;
}

const TRANSACTION_DATA: Transaction[] = [
    {
        id: '1',
        date: '2021-01-01',
        activity: 'Salary',
        category: 'Income',
        account: 'Cash',
        value: 1000,
    },
    {
        id: '2',
        date: '2021-01-02',
        activity: 'Groceries',
        category: 'Expense',
        account: 'Credit Card',
        value: -150,
    },
    // Add more transactions as needed
];
