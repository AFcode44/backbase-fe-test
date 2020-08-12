import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';
import { RecentTransactionsModel } from 'src/app/shared/model/recent-transactions-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.less']
})
export class MakeTransferComponent implements OnInit, OnDestroy {

  public currentOverdraft = 5824.76;

  public overdraftLimit = 500;

  public makeTransferFormGroup: FormGroup;

  public showConfirmTransfer = false;

  public defaultLogo: string;

  public formSubmitted = false;

  private firstLogoSub: Subscription;

  constructor(private formBuilder: FormBuilder, private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.makeTransferFormGroup = this.formBuilder.group({
      amount: ['', [Validators.required, (control: AbstractControl) => Validators.max(this.currentOverdraft - this.overdraftLimit)(control)]],
      categoryCode: ['#c89616'],
      merchant: ['', Validators.required],
      merchantLogo: [''],
      transactionDate: [Date.now()],
      transactionType: ['Online Transfer']
    });
    this.firstLogoSub = this.transactionsService.firstLogo$.subscribe((logo) => {
      this.defaultLogo = logo;
    });
  }

  ngOnDestroy(): void {
    this.firstLogoSub.unsubscribe();
  }

  public addTransaction(): void {
    this.formSubmitted = true;
    this.makeTransferFormGroup.updateValueAndValidity();
    if (this.makeTransferFormGroup.valid) {
      this.showConfirmTransfer = true;
    } else {
      this.showConfirmTransfer = false;
    }

  }

  public onMoneyTransfer(): void {
    this.showConfirmTransfer = false;

    const transaction: RecentTransactionsModel = {
      amount: String(this.makeTransferFormGroup.get('amount').value),
      categoryCode: this.makeTransferFormGroup.get('categoryCode').value,
      merchant: this.makeTransferFormGroup.get('merchant').value,
      merchantLogo: this.defaultLogo,
      transactionDate: this.makeTransferFormGroup.get('transactionDate').value,
      transactionType: this.makeTransferFormGroup.get('transactionType').value
    };

    this.transactionsService.addNewTransaction(transaction);

    this.currentOverdraft -= Number(transaction.amount);
    this.currentOverdraft = Math.round((this.currentOverdraft + Number.EPSILON) * 100) / 100;

    this.resetFormFields();
  }

  private resetFormFields(): void {
    this.makeTransferFormGroup.get('amount').reset();
    this.makeTransferFormGroup.get('merchant').reset();
    this.formSubmitted = false;
  }
}