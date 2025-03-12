import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborators-modal',
  templateUrl: './collaborators-modal.component.html',
  styleUrl: './collaborators-modal.component.css'
})
export class CollaboratorsModalComponent {
  collaborators: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { collaborators: any[] },
    private dialogRef: MatDialogRef<CollaboratorsModalComponent>
  ) {
    this.collaborators = data.collaborators; 
  }
}
