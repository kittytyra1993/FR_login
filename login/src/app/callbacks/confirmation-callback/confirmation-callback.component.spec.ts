import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCallbackComponent } from './confirmation-callback.component';

describe('ConfirmationCallbackComponent', () => {
  let component: ConfirmationCallbackComponent;
  let fixture: ComponentFixture<ConfirmationCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
