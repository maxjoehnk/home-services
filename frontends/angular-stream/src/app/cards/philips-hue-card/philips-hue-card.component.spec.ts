import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilipsHueCardComponent } from './philips-hue-card.component';

describe('PhilipsHueCardComponent', () => {
  let component: PhilipsHueCardComponent;
  let fixture: ComponentFixture<PhilipsHueCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhilipsHueCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhilipsHueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
