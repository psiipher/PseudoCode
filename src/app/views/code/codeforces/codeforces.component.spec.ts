import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeforcesComponent } from './codeforces.component';

describe('CodeforcesComponent', () => {
  let component: CodeforcesComponent;
  let fixture: ComponentFixture<CodeforcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeforcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeforcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
