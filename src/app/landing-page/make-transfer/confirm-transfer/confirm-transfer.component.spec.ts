import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTransferComponent } from './confirm-transfer.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ConfirmTransferComponent', () => {
  let component: ConfirmTransferComponent;
  let fixture: ComponentFixture<ConfirmTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [ ConfirmTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
