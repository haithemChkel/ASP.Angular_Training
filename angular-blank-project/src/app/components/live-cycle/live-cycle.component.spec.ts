import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCycleComponent } from './live-cycle.component';

describe('LiveCycleComponent', () => {
  let component: LiveCycleComponent;
  let fixture: ComponentFixture<LiveCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
