import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, take, takeUntil, tap } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FinanceService } from '../../finance.service';
import { AddTransactionPayload } from '../../../../core/constants/payloads/transaction.payload';

@Component({
    selector: 'app-transaction-edit',
    imports: [
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    templateUrl: './transaction-edit.component.html',
    styleUrls: ['./transaction-edit.component.scss'],
})
export class TransactionEditComponent implements OnInit, OnDestroy {
    private _router = inject(Router);
    private _route = inject(ActivatedRoute);
    private _financeService = inject(FinanceService);

    isLoading: boolean = false;
    isEditMode: boolean = false;

    transactionForm = new FormGroup({
        id: new FormControl<string>('', { nonNullable: true }),
        date: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        activity: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        category: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        account: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        value: new FormControl<number>(0, {
            validators: [Validators.required],
            nonNullable: true,
        }),
    });

    private _unsubscribeAll = new Subject<void>();

    ngOnInit(): void {
        this.isLoading = true;
        this._route.paramMap
            .pipe(
                switchMap((paramMap) => {
                    const transactionId = paramMap.get('id');
                    if (transactionId) {
                        return this._financeService
                            .fetchTransaction(transactionId)
                            .pipe(
                                tap((transaction) => {
                                    this.transactionForm.setValue({
                                        id: transaction.id,
                                        date: transaction.date,
                                        activity: transaction.activity,
                                        category: transaction.category,
                                        account: transaction.account,
                                        value: transaction.value,
                                    });
                                    this.isEditMode = true;
                                })
                            );
                    }
                    this.transactionForm.controls.date.setValue(
                        new Date().toISOString()
                    );
                    this.isEditMode = false;
                    return [];
                }),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe({
                next: (response) => {
                    this.isLoading = false;
                    console.log(response);
                },
                error: (error) => {
                    this.isLoading = false;
                    console.error(error);
                },
            });
    }

    onSubmit(): void {
        if (this.transactionForm.invalid) return;

        if (this.isEditMode) {
            this._financeService.updateTransaction(this.transactionForm.value);
            return;
        }

        const payload: AddTransactionPayload = {
            date: this.transactionForm.getRawValue().date,
            activity: this.transactionForm.getRawValue().activity,
            category: this.transactionForm.getRawValue().category,
            account: this.transactionForm.getRawValue().account,
            value: this.transactionForm.getRawValue().value,
        };
        this._financeService.addTransaction(payload);
    }

    onCancel(): void {
        this._router.navigate(['/finance', 'transactions']);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
