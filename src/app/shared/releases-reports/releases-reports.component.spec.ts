import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesReportsComponent } from './releases-reports.component';

describe('ReleasesReportsComponent', () => {
  let component: ReleasesReportsComponent;
  let fixture: ComponentFixture<ReleasesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleasesReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleasesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
