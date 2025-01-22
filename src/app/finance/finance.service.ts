import { inject, Injectable } from '@angular/core';
import { Transaction } from '../core/models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../core/constants/app.constants';
import { AddTransactionPayload } from '../core/payloads/transaction.payload';

@Injectable({
    providedIn: 'root',
})
export class FinanceService {
    private _http = inject(HttpClient);

    private _transactions: Transaction[] = [];
    private _transactionSubject = new BehaviorSubject<Transaction[]>([]);
    transactions$ = this._transactionSubject.asObservable();

    fetchTransactions(forceReload: boolean = false): void {
        if (this._transactions.length === 0 || forceReload) {
            this._http
                .get<Transaction[]>(API_ENDPOINTS.transactions)
                .subscribe({
                    next: (response) => {
                        this._transactions = response;
                        this._transactionSubject.next(this._transactions);
                    },
                    error: (error) => {
                        console.error(error);
                    },
                });
        } else {
            this._transactionSubject.next(this._transactions);
        }
    }

    fetchTransaction(id: string): Observable<Transaction> {
        return this._http.get<Transaction>(API_ENDPOINTS.transaction(id));
    }

    addTransaction(transaction: AddTransactionPayload): void {
        this._http
            .post<Transaction>(API_ENDPOINTS.transactions, transaction)
            .subscribe({
                next: (response) => {
                    this._transactions.push(response);
                    this._transactionSubject.next(this._transactions);
                },
                error: (error) => {
                    console.error(error);
                },
            });
    }

    updateTransaction(transaction: any): void {
        this._http
            .put<Transaction>(
                API_ENDPOINTS.transaction(transaction.id),
                transaction
            )
            .subscribe({
                next: (response) => {
                    const index = this._transactions.findIndex(
                        (t) => t.id === response.id
                    );
                    this._transactions[index] = response;
                    this._transactionSubject.next(this._transactions);
                },
                error: (error) => {
                    console.error(error);
                },
            });
    }

    deleteTransaction(id: string): void {
        this._http
            .delete<Transaction>(API_ENDPOINTS.transaction(id))
            .subscribe({
                next: (response) => {
                    this._transactions = this._transactions.filter(
                        (t) => t.id !== id
                    );
                    this._transactionSubject.next(this._transactions);
                },
                error: (error) => {
                    console.error(error);
                },
            });
    }
}
