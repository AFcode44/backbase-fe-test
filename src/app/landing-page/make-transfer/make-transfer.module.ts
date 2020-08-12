import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MakeTransferComponent } from './make-transfer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmTransferComponent } from './confirm-transfer/confirm-transfer.component';

@NgModule({
  declarations: [
    MakeTransferComponent,
    ConfirmTransferComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MakeTransferComponent
  ],
  providers: [],
})
export class MakeTransferModule { }
