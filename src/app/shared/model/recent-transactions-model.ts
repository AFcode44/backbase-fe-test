export class RecentTransactionWrapper {
    data: RecentTransactionsModel[];
}

export class RecentTransactionsModel {
    amount: string;
    categoryCode: string;
    merchant: string;
    merchantLogo: string;
    transactionDate: number;
    transactionType: string;
}


