import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseraComponent } from './coursera.component';

describe('CourseraComponent', () => {
  let component: CourseraComponent;
  let fixture: ComponentFixture<CourseraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
