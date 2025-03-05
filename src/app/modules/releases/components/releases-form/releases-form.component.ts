import { Component, Inject } from '@angular/core';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { TaskDTO } from '../../../../DTO/tasks/taskDTO';
import { format } from 'date-fns';

@Component({
  selector: 'app-releases-form',
  templateUrl: './releases-form.component.html',
  styleUrl: './releases-form.component.css'
})
export class ReleasesFormComponent {
  newReleaseForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    dateRelease: new FormControl(null, [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    taskId: new FormControl('', [Validators.required]),
  });

  tasks: TaskDTO[] = [];
  hoursReleased: string = '0h';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private taskService: TasksService,
    readonly dialogRef: MatDialogRef<ReleasesFormComponent>
  ) {}

  ngOnInit(): void {
    this.listTasksByUser();
    this.newReleaseForm.get('startTime').valueChanges.subscribe(() => this.calculateHours());
    this.newReleaseForm.get('endTime').valueChanges.subscribe(() => this.calculateHours());
  }

  // Método para converter "HH:mm" em minutos
  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Método para calcular a diferença de horas
  calculateHours(): void {
    const startTime = this.newReleaseForm.get('startTime').value;
    const endTime = this.newReleaseForm.get('endTime').value;

    if (startTime && endTime) {
      // Converte as strings "HH:mm" para minutos
      const startMinutes = this.timeToMinutes(startTime);
      const endMinutes = this.timeToMinutes(endTime);

      // Calcula a diferença em minutos
      const diffMinutes = endMinutes - startMinutes;

      // Converte a diferença para horas
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      // Formata o resultado
      this.hoursReleased = `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    } else {
      this.hoursReleased = '0h';
    }
  }

  listTasksByUser(): void {
    this.taskService.getTasksByUser().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar tarefas!', 'error')
    });
  }

  addRelease(): void {
    if (!this.newReleaseForm.valid) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning')
    }

    const releaseData = this.newReleaseForm.value;
    const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

    const payload = {
      description: releaseData.description,
      dateRelease: formatDate(releaseData.dateRelease),
      startTime: releaseData.startTime,
      endTime: releaseData.endTime,
      taskId: releaseData.taskId,
    };

    this.dialogRef.close(payload);
  }
}
