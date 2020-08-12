import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { RecentTransactionsModel, RecentTransactionWrapper } from '../model/recent-transactions-model';
import { DateSortingModel } from '../model/sorting-model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private defaultTransactionsList = new Array<RecentTransactionsModel>();

  private filteredTransactionsList = new Array<RecentTransactionsModel>();

  private recentTransactions$ = new Subject<RecentTransactionsModel[]>();

  private defaultLogo = new ReplaySubject<string>();

  constructor(private http: HttpClient) {
    this.http.get('/assets/mock/transactions.json').subscribe((transactions: RecentTransactionWrapper) => {
      this.defaultTransactionsList = transactions.data;
      this.filteredTransactionsList = this.defaultTransactionsList;
      this.recentTransactions$.next(transactions.data);
      this.defaultLogo.next(this.defaultTransactionsList[0].merchantLogo);
    });
  }

  public get firstLogo$(): Observable<string> {
    return this.defaultLogo.asObservable();
  }

  public get recentTransactions(): Observable<RecentTransactionsModel[]> {
    return this.recentTransactions$.asObservable();
  }

  public filterTransactions(filterText: string): void {
    this.filteredTransactionsList = [];
    this.defaultTransactionsList.forEach((el) => {
      if (el.merchant.includes(filterText) || el.transactionType.includes(filterText)) {
        this.filteredTransactionsList.push(el);
      }
    });

    if (this.filteredTransactionsList.length > 0) {
      this.recentTransactions$.next(this.filteredTransactionsList);
    } else {
      this.recentTransactions$.next([]);
    }
  }

  public addNewTransaction(transaction: RecentTransactionsModel): void {
    this.defaultTransactionsList.unshift(transaction);
    this.recentTransactions$.next(this.defaultTransactionsList);
  }

  public sortByDate(dataToSort: RecentTransactionsModel[], sortOrder: DateSortingModel): void {
    let sortedData = [];
    sortedData = dataToSort.sort((a, b) => {
      return b.transactionDate - a.transactionDate;
    });
    if (sortOrder === DateSortingModel.ASCENDING) {


      sortedData = sortedData.reverse();
    }

    this.recentTransactions$.next(sortedData);
  }

  public sortByBeneficiary(dataToSort: RecentTransactionsModel[], sortOrder: DateSortingModel): void {
    let sortedData = dataToSort.sort((a, b) => {
      return a.merchant.toLocaleLowerCase() > b.merchant.toLocaleLowerCase() ? -1 : 1;
    });

    if (sortOrder === DateSortingModel.DESCENDING) {
      sortedData = dataToSort.reverse();
    }

    this.recentTransactions$.next(sortedData);
  }

  public sortByAmount(dataToSort: RecentTransactionsModel[], sortOrder: DateSortingModel): void {
    let sortedData = dataToSort.sort((a, b) => {
      return (-a.amount) > (-b.amount) ? -1 : 1;
    });

    if (sortOrder === DateSortingModel.ASCENDING) {
      sortedData = dataToSort.reverse();
    }

    this.recentTransactions$.next(sortedData);
  }
}
