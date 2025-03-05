import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsModalComponent } from './collaborators-modal.component';

describe('CollaboratorsModalComponent', () => {
  let component: CollaboratorsModalComponent;
  let fixture: ComponentFixture<CollaboratorsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollaboratorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
