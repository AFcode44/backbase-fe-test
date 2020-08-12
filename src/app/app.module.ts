import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecentTransactionsComponent } from './landing-page/recent-transactions/recent-transactions.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MakeTransferModule } from './landing-page/make-transfer/make-transfer.module';
import { TransactionsService } from './shared/transactions/transactions.service';
import { SearchBoxComponent } from './landing-page/recent-transactions/search-box/search-box.component';
import { SortBoxComponent } from './landing-page/recent-transactions/sort-box/sort-box.component';
import { TransactionItemComponent } from './landing-page/recent-transactions/transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    RecentTransactionsComponent,
    SearchBoxComponent,
    SortBoxComponent,
    TransactionItemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),
    MakeTransferModule
  ],
  providers: [
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
