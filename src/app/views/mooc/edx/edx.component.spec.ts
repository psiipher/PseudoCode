import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdxComponent } from './edx.component';

describe('EdxComponent', () => {
  let component: EdxComponent;
  let fixture: ComponentFixture<EdxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
