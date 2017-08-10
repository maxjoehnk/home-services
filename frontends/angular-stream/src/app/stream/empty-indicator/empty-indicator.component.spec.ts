import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyIndicatorComponent } from './empty-indicator.component';

describe('EmptyIndicatorComponent', () => {
  let component: EmptyIndicatorComponent;
  let fixture: ComponentFixture<EmptyIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
