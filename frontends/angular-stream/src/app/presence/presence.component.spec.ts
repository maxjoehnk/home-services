import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceComponent } from './presence.component';

describe('PresenceComponent', () => {
  let component: PresenceComponent;
  let fixture: ComponentFixture<PresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
