import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCastCardComponent } from './google-cast-card.component';

describe('GoogleCastCardComponent', () => {
  let component: GoogleCastCardComponent;
  let fixture: ComponentFixture<GoogleCastCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleCastCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
