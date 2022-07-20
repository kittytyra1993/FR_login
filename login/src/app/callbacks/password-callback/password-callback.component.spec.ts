import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCallbackComponent } from './password-callback.component';

describe('PasswordCallbackComponent', () => {
  let component: PasswordCallbackComponent;
  let fixture: ComponentFixture<PasswordCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordCallbackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
