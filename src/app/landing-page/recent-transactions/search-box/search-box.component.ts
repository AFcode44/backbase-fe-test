import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.less']
})
export class SearchBoxComponent implements OnInit {

  public searchValue = '';
  private prevSearch = null;
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
  }

  public onKeyPress(): void {
    if (this.prevSearch === null || this.prevSearch !== this.searchValue) {
      this.transactionsService.filterTransactions(this.searchValue);
      this.prevSearch = this.searchValue;
    }
  }

  public resetSearching(): void {
    this.searchValue = '';
    this.prevSearch === null
    this.transactionsService.filterTransactions(this.searchValue);
  }
}
