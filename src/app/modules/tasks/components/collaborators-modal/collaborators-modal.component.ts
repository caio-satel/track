import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborators-modal',
  templateUrl: './collaborators-modal.component.html',
  styleUrl: './collaborators-modal.component.css'
})
export class CollaboratorsModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { collaborators: any[] }) {}
}
