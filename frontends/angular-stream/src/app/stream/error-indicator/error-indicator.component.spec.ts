import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorIndicatorComponent } from './error-indicator.component';

describe('ErrorIndicatorComponent', () => {
  let component: ErrorIndicatorComponent;
  let fixture: ComponentFixture<ErrorIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
