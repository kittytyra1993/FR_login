import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceCallbackComponent } from './choice-callback.component';

describe('ChoiceCallbackComponent', () => {
  let component: ChoiceCallbackComponent;
  let fixture: ComponentFixture<ChoiceCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
