import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-transaction-edit',
    imports: [ReactiveFormsModule],
    templateUrl: './transaction-edit.component.html',
    styleUrl: './transaction-edit.component.scss',
})
export class TransactionEditComponent implements OnInit, OnDestroy {
    private _route = inject(ActivatedRoute);

    isEditMode: boolean = false;

    transactionForm: FormGroup = new FormGroup({
        id: new FormControl<string>(''),
        date: new FormControl<string>(''),
        activity: new FormControl<string>(''),
        category: new FormControl<string>(''),
        account: new FormControl<string>(''),
        value: new FormControl<number>(0),
    });

    private _unsubscribeAll = new Subject<void>();

    ngOnInit(): void {
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((paramMap) => {
                const transactionId = paramMap.get('id');
                if (transactionId) {
                    this.isEditMode = true;
                    this.loadTransaction(transactionId);
                }
            });
    }

    loadTransaction(id: string): void {
        this.transactionForm.setValue({
            id: '1',
            date: '2021-01-01',
            activity: 'Salary',
            category: 'Income',
            account: 'Cash',
            value: 1000,
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
