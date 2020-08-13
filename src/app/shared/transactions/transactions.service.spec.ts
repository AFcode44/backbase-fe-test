import { TestBed, async } from '@angular/core/testing';
import { TransactionsService } from './transactions.service';
import { RecentTransactionsModel, RecentTransactionWrapper } from '../model/recent-transactions-model';
import { Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DateSortingModel } from '../model/sorting-model';

describe('TransactionsService', () => {
  let service: TransactionsService;

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
      merchant: 'Other',
      merchantLogo: 'Log2',
      transactionDate: 1276933842000,
      transactionType: 'Online Payment'
    }
  ];
  const httpFakeRsp$ = new ReplaySubject<RecentTransactionWrapper>();

  let httpClientMock = {
    get () {return httpFakeRsp$;}
  }

  beforeEach(() => {
    service = new TransactionsService((httpClientMock as any) as HttpClient);
  });

  it('should emit filtered account if found any ', (done) => {
    service.defaultTransactionsList = fakeRsp;

    service.recentTransactions.subscribe((filtered) => {
      expect(filtered[0]).toEqual(fakeRsp[0]);
      done();
    });

    service.filterTransactions('Merch');
  });

  it('should emit empty array if filter does not work', (done) => {
    service.defaultTransactionsList = fakeRsp;

    service.recentTransactions.subscribe((filtered) => {
      expect(filtered).toEqual([]);
      done();
    });

    service.filterTransactions('XXXXXXX');
  });

  it('should add new transaction at the top of the list', (done) => {
    service.defaultTransactionsList = fakeRsp;

    const newTx: RecentTransactionsModel =
    {
      amount: '5',
      categoryCode: '6',
      merchant: 'Merchant3',
      merchantLogo: 'Logo3',
      transactionDate: 1076933842000,
      transactionType: 'Other'
    };

    service.recentTransactions.subscribe((updated) => {
      expect(updated[0]).toEqual(newTx);
      done();
    });

    service.addNewTransaction(newTx);
  });

  it('should sort ascending by Date', (done) => {
    service.recentTransactions.subscribe((sorted) => {
      expect(sorted[0]).toEqual(fakeRsp[0]);
      expect(sorted[1]).toEqual(fakeRsp[1]);
      done();
    });

    service.sortByDate(fakeRsp, DateSortingModel.ASCENDING);
  });

  it('should sort descending by Date', (done) => {
    service.recentTransactions.subscribe((sorted) => {
      expect(sorted[0]).toEqual(fakeRsp[0]);
      expect(sorted[1]).toEqual(fakeRsp[1]);
      done();
    });

    service.sortByDate(fakeRsp, DateSortingModel.DESCENDING);
  });

  it('should sort ascending by Beneficiary', (done) => {
    service.recentTransactions.subscribe((sorted) => {
      expect(sorted[0]).toEqual(fakeRsp[0]);
      expect(sorted[1]).toEqual(fakeRsp[1]);
      done();
    });

    service.sortByBeneficiary(fakeRsp, DateSortingModel.ASCENDING);
  });

  it('should sort descending by Beneficiary', (done) => {
    service.recentTransactions.subscribe((sorted) => {
      expect(sorted[0]).toEqual(fakeRsp[0]);
      expect(sorted[1]).toEqual(fakeRsp[1]);
      done();
    });

    service.sortByBeneficiary(fakeRsp, DateSortingModel.DESCENDING);
  });

  it('should sort ascending by Amount', (done) => {
    service.recentTransactions.subscribe((sorted) => {
      expect(sorted[0]).toEqual(fakeRsp[0]);
      expect(sorted[1]).toEqual(fakeRsp[1]);
      done();
    });

    service.sortByAmount(fakeRsp, DateSortingModel.ASCENDING);
  });

  it('should sort descending by Amount', (done) => {
    service.recentTransactions.subscribe((sorted) => {
      expect(sorted[0]).toEqual(fakeRsp[0]);
      expect(sorted[1]).toEqual(fakeRsp[1]);
      done();
    });

    service.sortByAmount(fakeRsp, DateSortingModel.DESCENDING);
  });
});
