import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  // Injeção de dependência fazendo referência ao objeto que será injetado (matDialogRef)
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  // Método para confirmar 
  onConfirm() {
    this.dialogRef.close(true);
  }

  // Método para fechar o dialog
  onCancel() {
    this.dialogRef.close(false);
  }
}
