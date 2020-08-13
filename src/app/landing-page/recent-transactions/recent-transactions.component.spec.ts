import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTransactionsComponent } from './recent-transactions.component';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';
import { RecentTransactionsModel } from 'src/app/shared/model/recent-transactions-model';
import { Subject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('RecentTransactionsComponent', () => {
  let component: RecentTransactionsComponent;
  let fixture: ComponentFixture<RecentTransactionsComponent>;

  let recentTx$ = new Subject<RecentTransactionsModel[]>();

  let transactionsServiceMock = {
    recentTransactions: recentTx$
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [ RecentTransactionsComponent ],
      providers: [
        {provide: TransactionsService, useValue: transactionsServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should receive transactions list after initialization', (done) => {
    component.transactionsService.recentTransactions.subscribe((transactions) => {
      expect(transactions).toEqual(fakeRsp);
      done();
    });

    recentTx$.next(fakeRsp);
  });


  let fakeRsp: RecentTransactionsModel[] = [
    {
      amount: '1',
      categoryCode: '2',
      merchant: 'Merchant',
      merchantLogo: 'Logo',
      transactionDate: 1476933842000,
      transactionType: 'Credit Card'
    },
    {
      amount: '3',
      categoryCode: '4',
      merchant: 'Merchant2',
      merchantLogo: 'Log2',
      transactionDate: 1276933842000,
      transactionType: 'Online Payment'
    }
  ];
});
