import { Component, Inject, inject } from '@angular/core';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskDTO } from '../../../../DTO/tasks/taskDTO';
import { UserDTO } from '../../../../DTO/users/userDTO';

@Component({
  selector: 'app-releases-form',
  templateUrl: './releases-form.component.html',
  styleUrl: './releases-form.component.css'
})
export class ReleasesFormComponent {
  snackbar: SnackbarService = inject(SnackbarService);
  readonly dialogRef = inject(MatDialogRef<ReleasesFormComponent>);
  isClosing = false;
  tasks: TaskDTO[] = [];
  users: UserDTO[] = [];

  newReleaseForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    taskId: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // Implementar a lógica
    // Buscar todos os usuários no banco de dados e armazená-los no array users

    // Se o release está editando um release, preencher o formulário com os dados do release recebidos no parâmetro data
    if (this.data && this.data.release) {
      this.newReleaseForm.patchValue({
        description: this.data.release.description,
        taskId: this.data.release.taskId,
        userId: this.data.release.userId,
        startDate: this.formatTime(this.data.release.startDate),
        endDate: this.formatTime(this.data.release.endDate)
      });
    }
  }

  private formatTime(dateString: string): string {
    if (!dateString) return '';
    // Converte a data para horário local antes de formatar
    const date = new Date(dateString);

    // Formata para "HH:mm" com base no horário local
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  addRelease(): void {
    // Posteriormente implementar a lógica chamando o serviço de releases
    // Verificar se o dialog está fechando ou não, para evitar a mensagem do snackbar
    if (this.isClosing) {
      return;
    }

    const releaseData = this.newReleaseForm.value;
    // Se o formulário estiver inválido, exibe uma mensagem de erro
    // Se o release (data) não existir e o formulário estiver válido, criar um novo release
    // Se o release (data) existir e o formulário estiver válido, atualizar o release
    if (!this.newReleaseForm.valid || !this.newReleaseForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning')

    } else if (!this.data && this.newReleaseForm.valid && this.newReleaseForm.value) {
      console.log(releaseData); // Aqui chamaria um serviço de criação
      this.snackbar.openSnackBar('Release criada com sucesso!', 'success');
      this.newReleaseForm.reset();
      this.dialogRef.close();

    } else {
      console.log('Editando release:', { ...this.data.release, ...releaseData }); // Aqui chamaria um serviço de atualização
      this.snackbar.openSnackBar('Release atualizada com sucesso!', 'success');
      this.newReleaseForm.reset();
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.isClosing = true; // Marca que o modal está sendo fechado
    this.dialogRef.close();
  }
}
