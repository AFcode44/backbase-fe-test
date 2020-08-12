import { Component, OnInit, Input } from '@angular/core';
import { RecentTransactionsModel } from 'src/app/shared/model/recent-transactions-model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.less']
})
export class TransactionItemComponent implements OnInit {

  @Input() transaction: RecentTransactionsModel;
  @Input() isLastItem: boolean;

  constructor() { }

  ngOnInit(): void {
  }


}
