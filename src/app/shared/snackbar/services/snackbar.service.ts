import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    const panelClass = `snack-${type}`; // Usa a classe baseada no tipo

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass], // Define a classe CSS dinamicamente
    });
  }
}
