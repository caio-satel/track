import { Component } from '@angular/core';
import { Task } from 'zone.js/lib/zone-impl';
import { TasksService } from '../../../services/tasks/tasks.service';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';
import { TaskDTO } from '../../../DTO/tasks/taskDTO';
import { CreateTaskDTO } from '../../../DTO/tasks/CreateTaskDTO';
import { UpdateTaskDTO } from '../../../DTO/tasks/UpdateTaskDTO';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: TaskDTO[] = [];

  constructor(private taskService: TasksService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar tarefas!', 'error')
    });
  }

  onTaskAdded(newTask: CreateTaskDTO) {
    this.taskService.createTask(newTask).subscribe({
      next: (response) => {
        if(response) {
          this.tasks = [...this.tasks, response];
          this.snackbar.openSnackBar('Tarefa criada com sucesso!', 'success');
        }
      },
      error: (err) => {
        if (err.status === 404) {
          // Erro de projeto não encontrado
          this.snackbar.openSnackBar('Projeto não encontrado!', 'error');
        } else if (err.status === 400) {
          // Erro de datas inválidas
          this.snackbar.openSnackBar('Datas da tarefa fora do intervalo do projeto.', 'warning');
        } else {
          // Erro genérico
          this.snackbar.openSnackBar('Erro ao criar tarefa!', 'error');
        }
      }
    });
  }

  onTaskEdited(updatedTask: UpdateTaskDTO) {
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe({
      next: (response) => {
        if (response) {
          this.tasks = this.tasks.map(task => {
            if (task.id === updatedTask.id) {
              return { ...task, ...response };
            }
            return task;
          });
          this.snackbar.openSnackBar('Tarefa atualizada com sucesso!', 'success');
        }
      },
      error: () => this.snackbar.openSnackBar('Erro ao atualizar tarefa!', 'error')
    });
  }

  onTaskDeleted(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.snackbar.openSnackBar('Tarefa excluída com sucesso!', 'success');
      },
      error: (err) => {
        if (err.status === 404) {
          // Erro de tarefa não encontrada
          this.snackbar.openSnackBar('Tarefa não encontrada!', 'error');
        } else if (err.status === 400) {
          // Erro de tarefa não concluída
          this.snackbar.openSnackBar('A tarefa não pode ser excluída porque não está concluída.', 'warning');
        } else {
          // Erro genérico
          this.snackbar.openSnackBar('Erro ao excluir tarefa!', 'error');
        }
      }
    });
  }
}
