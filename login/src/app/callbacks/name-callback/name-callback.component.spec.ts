import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCallbackComponent } from './name-callback.component';

describe('NameCallbackComponent', () => {
  let component: NameCallbackComponent;
  let fixture: ComponentFixture<NameCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NameCallbackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
