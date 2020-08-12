import { Component, OnInit, Input } from '@angular/core';
import { DateSortingModel, OtherSortingOptions } from 'src/app/shared/model/sorting-model';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';
import { RecentTransactionsModel } from 'src/app/shared/model/recent-transactions-model';

@Component({
  selector: 'app-sort-box',
  templateUrl: './sort-box.component.html',
  styleUrls: ['./sort-box.component.less']
})
export class SortBoxComponent implements OnInit {

  @Input() transactions: RecentTransactionsModel[];

  public dateSortOrder = DateSortingModel.DESCENDING;
  public otherSortingFilter = OtherSortingOptions.NONE;

  public DateSortingModel = DateSortingModel;
  public OtherSortingOptions = OtherSortingOptions;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
  }

  public sortByDate(): void {
    this.changeSortingOrder();
    this.otherSortingFilter = OtherSortingOptions.NONE;
    this.transactionsService.sortByDate(this.transactions, this.dateSortOrder);
  }

  public sortByBeneficiary(): void {
    this.otherSortingFilter = OtherSortingOptions.BENEFICIARY;
    this.transactionsService.sortByBeneficiary(this.transactions, this.dateSortOrder);
  }

  public sortByAmount(): void {
    this.otherSortingFilter = OtherSortingOptions.AMOUNT;
    this.transactionsService.sortByAmount(this.transactions, this.dateSortOrder);
  }

  private changeSortingOrder(): void {
    if (this.dateSortOrder === DateSortingModel.DESCENDING) {
      this.dateSortOrder = DateSortingModel.ASCENDING;
    } else {
      this.dateSortOrder = DateSortingModel.DESCENDING;
    }
  }
}
