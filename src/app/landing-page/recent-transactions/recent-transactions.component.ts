import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';
import { RecentTransactionsModel } from 'src/app/shared/model/recent-transactions-model';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.less']
})
export class RecentTransactionsComponent implements OnInit {

  public recentTransactions = new Array<RecentTransactionsModel>();

  constructor(public transactionsService: TransactionsService) { }

  ngOnInit() {
    this.transactionsService.recentTransactions.subscribe(
      (transactions: RecentTransactionsModel[]) => {
        this.recentTransactions = transactions;
      });
  }

}
