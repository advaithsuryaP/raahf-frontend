export interface AddTransactionPayload {
    date: string;
    activity: string;
    category: string;
    account: string;
    value: number;
}

export interface UpdateTransactionPayload {
    id: string;
    date: string;
    activity: string;
    category: string;
    account: string;
    value: number;
}

export interface DeleteTransactionPayload {
    id: string;
}
