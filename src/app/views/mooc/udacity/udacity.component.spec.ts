import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdacityComponent } from './udacity.component';

describe('UdacityComponent', () => {
  let component: UdacityComponent;
  let fixture: ComponentFixture<UdacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdacityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
