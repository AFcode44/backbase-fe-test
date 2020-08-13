import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';
import { Subject } from 'rxjs';
import { RecentTransactionsModel } from 'src/app/shared/model/recent-transactions-model';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  let recentTx$ = new Subject<RecentTransactionsModel[]>();

  let transactionsServiceMock = {
    filterTransactions() { }
  };

  let httpClientMock = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [SearchBoxComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientMock},
        { provide: TransactionsService, useValue: transactionsServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterTransaction on keyPress', () => {
    const filterSpy = spyOn(transactionsServiceMock, 'filterTransactions');

    component.searchValue = 'search'
    component.onKeyPress();

    expect(filterSpy).toHaveBeenCalled();
  });

  it('should reset filter on resetSearching', () => {
    const filterSpy = spyOn(transactionsServiceMock, 'filterTransactions');

    component.searchValue = 'search'
    component.resetSearching();

    expect(filterSpy).toHaveBeenCalled();
    expect(component.searchValue).toEqual('');
  });
});
