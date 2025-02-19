import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesFormComponent } from './releases-form.component';

describe('ReleasesFormComponent', () => {
  let component: ReleasesFormComponent;
  let fixture: ComponentFixture<ReleasesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleasesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleasesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
