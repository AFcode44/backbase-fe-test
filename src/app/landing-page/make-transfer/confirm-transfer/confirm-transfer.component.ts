import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-transfer',
  templateUrl: './confirm-transfer.component.html',
  styleUrls: ['./confirm-transfer.component.less']
})
export class ConfirmTransferComponent implements OnInit {

  @Input() makeTransferFormGroup: FormGroup;

  @Output() transferingMoneyConfirm = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public transferMoney(): void {
    this.transferingMoneyConfirm.emit();
  }
}
