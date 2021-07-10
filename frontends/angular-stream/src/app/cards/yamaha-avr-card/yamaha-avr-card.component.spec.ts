import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YamahaAvrCardComponent } from './yamaha-avr-card.component';

describe('YamahaAvrCardComponent', () => {
  let component: YamahaAvrCardComponent;
  let fixture: ComponentFixture<YamahaAvrCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YamahaAvrCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YamahaAvrCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
