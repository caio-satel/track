import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsReportsComponent } from './projects-reports.component';

describe('ProjectsReportsComponent', () => {
  let component: ProjectsReportsComponent;
  let fixture: ComponentFixture<ProjectsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
